import { apiClient } from "./ApiClient"

// export function retrievHelloWorldBean() {
//     return axios.get('http://localhost:8080/hello-world-bean')
// }

export const retrieveHelloWorldBean
    = () => apiClient.get('/hello-world-bean')

export const retrievHelloWorldPathVariable
    = (username, token) => apiClient.get(`/hello-world/path-variable/${username}`, 
        // {
        // headers: {
        //         Authorization: token
        //     }   
        // }
    )


    