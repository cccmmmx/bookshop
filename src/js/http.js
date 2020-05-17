import axios from 'axios'
import store from '../store'
import QS from 'qs'
axios.defaults.baseURL = 'http://120.25.232.119/'
// axios.defaults.baseURL = 'http://192.168.1.103:8082/'
// axios.defaults.baseURL = 'http://192.168.31.159:8082/'
axios.defaults.timeout = 10000
    // 请求头信息是为post请求设置

// 请求拦截
axios.interceptors.request.use(config => {
    store.state.token && (config.headers.token = store.state.token)
        return config
    }, err => {
        return Promise.reject(err)
    })
    // 响应拦截
axios.interceptors.response.use(res => {
    return res
}, error => {
    return Promise.reject(error)
})



// get封装
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

// post封装
export function post(url, params = {}) {
    // console.log(QS.stringify(parmas))
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params) ).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

export default axios
