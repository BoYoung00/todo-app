import { apiClient } from "./ApiClient"

export const retrieveAllTodosForUsernameApi
    = (username) => apiClient.get(`/users/${username}/todos`)
    // http://localhost:8080/users/kim/todos

export const deleteTodoApi
    = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`)
    // http://localhost:8080/users/kim/todos/1

export const retrieveTodoApi
    = (username, id) => apiClient.get(`/users/${username}/todos/${id}`)

export const updateTodoApi
    = (username, id, todo) => apiClient.put(`/users/${username}/todos/${id}`, todo)

export const crateTodoApi
    = (username, todo) => apiClient.post(`/users/${username}/todos`, todo)
  