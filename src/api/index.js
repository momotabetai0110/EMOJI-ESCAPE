// src/api/に配置
import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 15000,//15秒
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.response.use(
    response => response.data,
    error =>{
        console.error('APIエラー',error)
        return Promise.reject(error)
    }
)

export default api