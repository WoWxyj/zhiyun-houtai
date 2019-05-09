import axios from 'axios'
import router from '../router/index'

// http request 拦截器
// http response 拦截器
const instance = axios.create()
instance.interceptors.response.use(
  response => {
    switch (response.data.code) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        sessionStorage.removeItem('token')
        router.replace({
          path: 'login',
          query: {redirect: router.currentRoute.fullPath}
        })
        break
      default:
        return response
    }
  },
  error => {
    if (error.response) {
      switch (error.response.data.code) {
        case 401:
        case 400:
          // 返回 401 清除token信息并跳转到登录页面
          sessionStorage.removeItem('token')
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  })
export default instance
