import { useNavigate, useParams } from "react-router-dom"
import { crateTodoApi, retrieveTodoApi, updateTodoApi } from './api/TodoApiService';
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik'
import moment from "moment";

export default function TodoComponent() {
    const {id} = useParams() // URL의 파라미터 값을 가져오는 훅
    const authContext = useAuth() // 인증 훅, 로그인 상태 제공
    const navigate = useNavigate()
    const username = authContext.username
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')

    useEffect( // id 값이 변경될 때마다 retrieveTodos() 함수 호출
        () => retrieveTodos(),
        [id]
    )

    // REST 데이터 가져오기
    function retrieveTodos() {
        if(id != -1) {
            retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        if(id == -1) { // Todo 추가
            crateTodoApi(username, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))
        } else { // Todo 수정
            updateTodoApi(username, id, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))
        }
    }

    // 유효성 검사
    function validate(values) {
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date'
        }

        if(values.description.length < 5) {
            errors.description = 'Enter atleast 5 characters'
        }

        // moment.js 달력
        if(values.targetDate == null || values.targetDate == '' 
            || !moment(values.targetDate).isValid()) { // targetDate 값을 moment 객체로 변환 후에 유효한 날짜인지 확인
            errors.targetDate = 'Enter a target date'
        }

        return errors
    }

    // formik : 폼 상태관리, 유효성 검사 등
    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={ {description, targetDate} }
                    enableReinitialize={true} // 재초기화 활성
                    onSubmit={onSubmit}
                    validate={validate} // validate()가 리턴되면 onSubmit은 실행이 안 됨
                    validateOnBlur={false} // 포커스를 잃을 때 유효성 검사할지
                    validateOnChange={false} // 필드 수정할 때마다 유효성 검사할지
                >
                {
                    (props) => ( // 렌더링
                        <FormikForm>
                            <ErrorMessage 
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            />
                            <ErrorMessage 
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                            />

                            <fieldset className="form-group" >
                                <label>Description</label>
                                <Field type="text" className="for-control" name="description"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="for-control" name="targetDate" />
                            </fieldset>
                            <button className="btn btn-success">Save</button> 
                        </FormikForm>
                    )
                }
                </Formik>
            </div>
        </div>
    )
}