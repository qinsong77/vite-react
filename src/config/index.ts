export default {
  /**
   * @description api请求基础路径
   */
  baseUrl: '/api',
  /**
   * @description mock api请求基础路径
   */
  mockUrl: '/mock/53',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 10,
  /**
   * @description 是否为app环境
   */
  tokeKey: 'Authorization',
  setUserInfo: function (data) {
    localStorage.setItem('user-info', JSON.stringify(data))
  },
  getUserInfo: function () {
    return JSON.parse(localStorage.getItem('user-info'))
  }
}
