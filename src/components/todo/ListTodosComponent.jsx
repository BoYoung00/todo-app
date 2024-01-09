import { useEffect, useState } from "react"
import { retrieveAllTodosForUsername } from './api/TodoApiService';

export default function ListTodosComponent() {
    const today = new Date()
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())
    
    const [todos, setTodos] = useState([])
    
    // const todos = [
    //              {id:1, description: 'kim', done:false, targetDate:targetDate},
    //              {id:2, description: 'kim1', done:false, targetDate:targetDate},
    //              {id:3, description: 'kim2', done:false, targetDate:targetDate},
    //             ]

    // 컴포넌트 외부의 데이터 가져오기, 구독 설정, 수동으로 DOM 조작하는 훅
    useEffect ( // 컴포넌트가 렌더링(사용자에게 UI 보여짐)될 때마다 실행
        () => refreshTodos(), [] // 데이터 새로고침 시 화면에 보여짐
    )

    function refreshTodos() {
        retrieveAllTodosForUsername('kim')
        .then(response => {setTodos(response.data)})
        .catch(error => console.log(error))
    }

    return (
        <div className="container">
            <h1>Things You Want To Do!</h1>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>description</td>
                            <td>is Done?</td>
                            <td>Target Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}