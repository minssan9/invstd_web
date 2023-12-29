import { createApp } from 'vue'
import axios from 'axios'
import store from '@/store'
import router from "@/router";
import Cookies from "vue-cookies";

const app = createApp()
app.config.globalProperties.$APIURL = import.meta.env.VITE_APP_API

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_API, // url = base url + request url

  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // 10초
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json;charset=utf-8'
  },
})

// request interceptor
service.interceptors.request.use(
  config => {
    let token = store.state.token
      ? store.state.token
      : Cookies.get('accessToken')
    let refreshToken = store.state.refreshToken
      ? store.state.refreshToken
      : Cookies.get('refreshToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      config.headers.refreshToken = `${refreshToken}`
      config.headers.$accountId = store.getters.user.accountId
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /*** If you want to get http information such as headers or status * Please return  response => response */
  response => {
    if (response.status !== 200) {
      // Message({message: response.statusText || 'Error', type: 'error', duration: 5 * 1000})
      this.$dialog.notify.error(response.statusText + ' Error', {position: 'top-right',timeout: 3000})
      if (response.status === 405) {        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken')
        //     .then(() => {
        //       location.reload()
        //     })
        // })
      }
      return Promise.reject(new Error(response.statusText || 'Error'))
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)


const BadRequest = 400
const Unauthorized = 401
const Forbidden = 403
const NotFound = 404
const ServerError = 500

export const request = (method, url, data) => {
  return service({
    method,
    url: url,
    data
  })
    .then(result => result)
    .catch(err => errLogic(err));
}
export const requestFile = (method, url, data) => {
  return service({
    method,
    url: url,
    data,
    processData: false,
    contentType: false
  })
    .then(result => result)
    .catch(err => errLogic(err));
}

function errLogic(err) {
  if (err.response != null && err.response.status === Unauthorized) {
    store.dispatch('logout')
      .then(() => apiError.onUnauthorized(err))
      .finally(() => {
        router.replace('/')
        router.go();
      })
  }
  else if (err.response.status === Forbidden) return apiError.onForbidden(err)
  else if (err.response.status === BadRequest) return apiError.onBadRequest(err)
  else if (err.response.status === NotFound) return apiError.onNotFound(err)
  else if (err.response.status === ServerError) return apiError.onServerError(err)
  return Promise.reject(err)
}

const apiError = {
  onUnauthorized(err) {
    err.message = err.message + `\n 인증되지 않았습니다. \n   `
    return Promise.reject(err)
  },
  onForbidden(err) {
    err.message = err.message + `\n 권한이 없습니다. \n   `
    return Promise.reject(err)
  },
  onBadRequest(err) {
    err.message = err.message +`\n 잘못된 요청입니다. \n   `
    return Promise.reject(err)
  },
  onNotFound(err) {
    err.message = err.message + `\n 잘못된 접근입니다. \n`
    return Promise.reject(err)
  },
  onServerError(err) {
    err.message = err.message + `\n 서버 문제입니다. 관리자에게 문의 부탁드립니다. \n`
    return Promise.reject(err)
  },
}

export default service


app.config.globalProperties.$requestMethod = request
app.config.globalProperties.$requestFileMethod = requestFile
