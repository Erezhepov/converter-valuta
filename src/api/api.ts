import axios from "axios";

const URL = 'https://v6.exchangerate-api.com/v6/cb3c6a57fd55ae39ba4b595a/'

export const instance = axios.create({
    baseURL: URL,
    headers: {
        API: 'a4cb28574014351c8fa6657c'
    }
})