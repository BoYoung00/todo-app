import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { retrievHelloWorldPathVariable } from './api/HelloWorldApiService'
import { useAuth } from './security/AuthContext'

export default function WelcomeComponent() {
    const {username} = useParams()
    const authContext = useAuth() // 토근 가져오기
    const [message, setMessage] = useState(null)

    function callHelloWorldRestApi() {
        console.log("call")

        // axios.get('http://localhost:8080/hello-world')
        //     // 만약 요청이 들어오면 함수 호출
        //     .then((response) => successfulResponse(response)) 
        //     // 예외처리
        //     .catch( (error) => errorResponse(error))
        //     .finally( () => console.log('cleanup'))

        // retrievHelloWorldBean()
        //     .then((response) => successfulResponse(response)) 
        //     .catch( (error) => errorResponse(error))
        //     .finally( () => console.log('cleanup'))

        retrievHelloWorldPathVariable('kim', authContext.token)
            .then((response) => successfulResponse(response)) 
            .catch((error) => errorResponse(error))
            .finally(() => console.log('cleanup'))
    }

    function successfulResponse(response) {
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error)
    }


    return (
        <div className="WelcomeComponent">
            Welcome {username}
            <div>
                {/* 바꿔야하는 특정 컴포넌트만 새로고침 */}
                Manage Your todos. <Link to="/todos">Go here</Link>
            </div>
            <div>
                <button className='btn btn-success m-5' onClick={callHelloWorldRestApi}>
                    Call Hello world
                </button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}