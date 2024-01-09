import axios from "axios";

// export function retrievHelloWorldBean() {
//     return axios.get('http://localhost:8080/hello-world-bean')
// }

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

export const retrieveHelloWorldBean
    = () => apiClient.get('http://localhost:8080')

export const retrievHelloWorldPathVariable
    = (username) => apiClient.get(`/hello-world/path-variable/${username}`)

    