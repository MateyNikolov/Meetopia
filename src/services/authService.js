import { request } from "./requester"

export const authFactory = (data) => {
    const baseUrl = "http://localhost:3030/users/"

    return {
        login: request(`${baseUrl}login`, 'POST', data),
        register: request(`${baseUrl}register`, 'POST', data),
        logout: request(`${baseUrl}logout`, 'GET')
    }
}