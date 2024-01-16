import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext, useAuth } from './security/AuthContext';

export default function LoginComponent() {
    const [username, setUsername] = useState('kim')
    const [password, setPassword] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const authContext = useAuth()
    const navigate = useNavigate();

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    // 로그인 인증하기까지 비동기로 작업하기 때문에 
    // handleSubmit 메서드도 비동기
    async function handleSubmit() {
        if(await authContext.login(username, password)) {
            // /welcome 경로로 이동
            navigate(`/welcome/${username}`)
        } else {
            setShowErrorMessage(true)
        }
    }

    return (
        <div className="Login">
            {showErrorMessage && <div className="errorMessage">로그인 실패</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                <button type="button" name="login" onClick={handleSubmit}>로그인</button>
                </div>
            </div>
        </div>
    )
}