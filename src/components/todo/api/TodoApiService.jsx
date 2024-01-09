import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

export const retrieveAllTodosForUsername
    = (username) => apiClient.get(`/users/${username}/todos`)
    // http://localhost:8080/users/kim/todos
    