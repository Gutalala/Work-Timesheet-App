import axios from 'axios';

export function openTimesheetFrontend(loginInfo) {
    return axios.post('http://localhost:10203/auth/login', loginInfo, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
        }
    })
}


export function login(loginInfo) {
    return axios.post('http://localhost:10203/auth/login', loginInfo, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With"
        }
    })
}