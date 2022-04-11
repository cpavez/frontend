import axios from "axios"
const {HAPI_URL} = 'http://192.168.60.123:8080/fhir'
const baseURL = HAPI_URL;
const httpInstance = axios.create({ baseURL });
const defaultHeaders = {
    "Content-Type": "application/fhir+json",
};

const api = axios.create({ baseURL: 'http://192.168.60.123:8080/fhir' ,headers:defaultHeaders});

export default  api;
