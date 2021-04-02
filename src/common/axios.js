import axios from 'axios'
import localConfig from '@config'
import { notification } from 'antd'

const instance = axios.create({
  timeout: 1000 * 15,

  baseURL: `${localConfig.baseUrl}`,

  validateStatus: () => {
    return true
  }
})

const openNotification = (description, title = '提示', type = 'open') => {
  notification[type]({
    message: title,
    description: description
  })
}

const localLogout = (res) => {

  openNotification('登录过期，请重新登录！', undefined , 'info')
  return Promise.reject(res)
}

instance.interceptors.request.use(config => {
  config.headers[localConfig.tokeKey] = 'Bearer ' + localStorage.getItem(localConfig.tokeKey) || ''
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(
  res => {
    if (res.status === 403) {
      return localLogout.call(res)
    }
    if (res.status === 204) return res // 获取验证码无返回
    const { code, message } = res.data
    if (code !== 200) {
      openNotification(message, '出错了', 'error')
      return Promise.reject(message)
    } else return res.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
