import axios from 'axios'
// 进度条效果引入
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 获取token值
import { getToken } from '../utils/token'
// 引入vuex库
import store from '../store'
// 引入eleUI库
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: 'http://39.98.123.211/',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 进度条开始
    nprogress.start()
    const token = store.state.login.token
    if (store.state.login.token) {
      token && (config.headers.token = getToken())
      config.headers.Authorization = getToken()
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (res) {
    // 进度条结束
    nprogress.done()
    // 对响应数据做点什么
    if (res.data.code !== 20000 && res.data.code !== 200) {
      // return Promise.reject(new Error('faile'))
      Message({
        message: res.data.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      return res
    }
  },
  function (error) {
    // 对响应错误做点什么
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default request
