import axios from "axios"
const HIBA_URL = 'https://api.minsal.cl/'
const baseURL = HIBA_URL;

const httpInstance = axios.create({baseURL});
httpInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const payload = {'grant_type':'client_credentials'}
const token = await httpInstance.post('oauth/token',payload,{
    headers: {
        "Access-Control-Allow-Origin"        : "*",
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ZXRiWWxOamJ6OXNLdzNRdG1HdVh3Y3pnT1F1TWx4OFA6cDF3anVlb3FIc3RGUEFzSw=='
    },
    rejectUnauthorized: false,
    requestCert: false,
    agent: false
})

console.log(HIBA_URL)

const setToken = (newToken) => {
    if (newToken) {
        httpInstance.defaults.headers.common["Authorization"] =
            "Bearer " + newToken;
    }
}

export default  httpInstance;
