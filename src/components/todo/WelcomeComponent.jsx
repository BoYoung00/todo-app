import { useParams, Link } from 'react-router-dom'

export default function WelcomeComponent() {
    const {username} = useParams()
    console.log(username)
    return (
        <div className="WelcomeComponent">
            Welcome {username}
            <div>
                {/* 바꿔야하는 특정 컴포넌트만 새로고침 */}
                Manage Your todos. <Link to="/todos">Go here</Link>
            </div>
        </div>
    )
}