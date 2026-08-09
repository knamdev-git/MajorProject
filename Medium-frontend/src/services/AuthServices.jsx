import axios from "axios";

const BaseURLUSer = "http://localhost:8082/auth";

export const registerUserService = (userData) => {
    return axios.post(`${BaseURLUSer}/register`, userData);
}

export const loginUserService = (userData) => {
    return axios.post(`${BaseURLUSer}/login`, userData);
}