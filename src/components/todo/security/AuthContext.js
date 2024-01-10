import { createContext, useContext, useState } from "react";

// 여러 컴포넌트 간에 데이터 공유하기 위함
export const AuthContext = createContext();

// 인증 컨텍스트, 특정 컨텍스트 값을 가져올 수 있게 해줌
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
    
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)

    // setInterval(() => setNumber(number + 1), 1000)

    function login(username, password) {
        if(username === 'kim' && password === '123') {
            setAuthenticated(true)
            setUsername(username)
            return true
        } else {
            setAuthenticated(false)
            setUsername(null)
            return false
        }
    }

    function logout() {
        setAuthenticated(false)
        setUsername(null)
    }

    const valueToBeShared = { isAuthenticated, login, logout, username }

    return (
        <AuthContext.Provider value={valueToBeShared}>
            {children}
        </AuthContext.Provider>
    );
}
