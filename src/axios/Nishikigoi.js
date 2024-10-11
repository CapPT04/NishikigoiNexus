import axios from "axios";
import axiosClient from "./axiosClient";
const END_POINT = {
    LOGIN: "Login"
}

export const handleLoginApi = (userEmail, userPassword) => {
    return axiosClient.post(`${END_POINT.LOGIN}`, { email: userEmail, password: userPassword });
}


