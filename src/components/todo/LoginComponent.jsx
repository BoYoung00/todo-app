import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginComponent() {
    const [username, setUsername] = useState('kim')
    const [password, setPassword] = useState('')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate();

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleSubmit() {
        if(username === 'kim' && password === '123') {
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
            // /welcome 경로로 이동
            navigate(`/welcome/${username}`)
        } else {
            setShowErrorMessage(true)
            setShowSuccessMessage(false)
        }
    }

    return (
        <div className="Login">
            {showSuccessMessage && <div className="successMessage">로그인 성공</div>}
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