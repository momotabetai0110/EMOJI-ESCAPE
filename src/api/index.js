// src/api/に配置
import axios from 'axios'
const api = axios.create({
    //baseURL: 'http://localhost:8000/api',
    baseURL:'http://43.207.234.25/api',
    timeout: 30000,//15秒
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