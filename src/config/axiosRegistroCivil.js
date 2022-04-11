import axios from "axios"

const {TOKEN_URL} = 'https://account.srcei.cl/auth/realms/IAM/protocol/openid-connect/token'
const {API_URL} = 'https://priv.srcei.cl/api/gob/minsal-reg/personaBasico'

const httpInstanceToken = axios.create({ baseURL: 'https://account.srcei.cl/auth/realms/IAM/protocol/openid-connect/token' });

const payload = new URLSearchParams({
    client_id: 'minsal',
    client_secret: 'ba5901e6-5628-4337-b1f3-8c1d3db63dd1',
    grant_type: 'password',
    username: 'yomevacuno',
    password: 'kash5uoB5Vai5ahlien0OoQu'
});

const defaultHeaders = {
    "Content-Type"  : "application/x-www-form-urlencoded",
    "user-agent"    : "advanced-rest-client",
    "accept"        : "/"
};


axios.post('https://account.srcei.cl/auth/realms/IAM/protocol/openid-connect/token',payload.toString(),{headers: defaultHeaders,httpsAgent:agent})
    .then((response)=>{
        console.log("OK",response)
    })
    .catch(function(error){
        console.log("ERROR",error)
    });

const setToken = (newToken) => {
    if (newToken) {
        httpInstanceToken.defaults.headers.common["Authorization"] =
            "Bearer " + newToken;
    }
};

const httpInstancebase = axios.create({ API_URL });




const api = axios.create({ baseURL: 'http://192.168.60.123:8080/fhir' });

export default  api;
