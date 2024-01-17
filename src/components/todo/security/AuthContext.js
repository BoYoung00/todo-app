import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

// 여러 컴포넌트 간에 데이터 공유하기 위함
export const AuthContext = createContext();

// 인증 컨텍스트, 특정 컨텍스트 값을 가져올 수 있게 해줌
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
    
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    // 토근을 컨텍스트로 가지고 있기
    const [token, setToken] = useState(null)

    // setInterval(() => setNumber(number + 1), 1000)

    // function login(username, password) {
    //     if(username === 'kim' && password === '123') {
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true
    //     } else {
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }
    // }

    // async : 비동기 함수
    // async function login(username, password) {
    //     // 로그인 토큰 생성 (Base64 인코딩)
    //     const baToken = 'Basic ' + window.btoa(username + ":" + password)
        
    //     try {
    //         // await : 해당 비동기 작업이 완료되기 기다림
    //         const response = await executeBasicAuthenticationService(baToken)

    //         setAuthenticated(false)

    //         if(response.status == 200) { // 응답 성공
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(baToken)

    //             // HTTP 요청을 보내기 전 요청 객체를 가로채고 수정 (헤더 설정)
    //             // 이 헤더 설정이 있어야 다른 페이지 갈 때도 계속 인증 상태임. (요청 가능)
    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('intercepting and adding a token')
    //                     // 클라이언트가 서버에게 자신을 인증하기 위한 정보를 담음
    //                     config.headers.Authorization = baToken
    //                     return config
    //                 }
    //             )

    //             return true
    //         } else {
    //             logout()
    //             return false
    //         }
    //     } catch (error) {
    //         logout()
    //         return false
    //     }

    // }

    async function login(username, password) {

        try {
            // await : 해당 비동기 작업이 완료되기 기다림
            const response = await executeJwtAuthenticationService(username, password)

            setAuthenticated(false)

            if(response.status == 200) { // 응답 성공
                const jwtToken = 'Bearer ' + response.data.token
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                // HTTP 요청을 보내기 전 요청 객체를 가로채고 수정 (헤더 설정)
                // 이 헤더 설정이 있어야 다른 페이지 갈 때도 계속 인증 상태임. (요청 가능)
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        // 클라이언트가 서버에게 자신을 인증하기 위한 정보를 담음
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true
            } else {
                logout()
                return false
            }
        } catch (error) {
            logout()
            return false
        }

    }

    function logout() {
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }

    const valueToBeShared = { isAuthenticated, login, logout, username, token }

    return (
        <AuthContext.Provider value={valueToBeShared}>
            {children}
        </AuthContext.Provider>
    );
}
