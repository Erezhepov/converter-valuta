import axios from "axios";

const URL = 'https://v6.exchangerate-api.com/v6/d03cbb36233565f9c571bd00/'

export const instance = axios.create({
    baseURL: URL,
    headers: {
        API: 'd03cbb36233565f9c571bd00'
    }
})