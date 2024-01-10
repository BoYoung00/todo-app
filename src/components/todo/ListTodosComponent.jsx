import { useEffect, useState } from "react"
import { deleteTodoApi, retrieveAllTodosForUsernameApi } from './api/TodoApiService';
import { useAuth } from "./security/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function ListTodosComponent() {
    const today = new Date()
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())
    
    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)

    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()
    
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
        retrieveAllTodosForUsernameApi(username)
        .then(response => {setTodos(response.data)})
        .catch(error => console.log(error))
    }

    function deleteTodo(id) {
        deleteTodoApi(username, id)
        .then(
            () => {
                setMessage(`${id}번이 삭제되었습니다.`)
                refreshTodos()
            }
        )
        .catch(error => console.log(error))
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`)
    }

    function addNewTodo() {
        navigate(`/todo/-1`)
    }

    return (
        <div className="container">
            <h1>Things You Want To Do!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>is Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        {/* <td>{todo.done.toString()}</td> */}
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-warning" 
                                        onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" 
                                        onClick={() => updateTodo(todo.id)}>Update</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-3" onClick={addNewTodo}>Add New Todo</div>
        </div>
    )
}