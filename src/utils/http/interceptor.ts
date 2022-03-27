/*
 * @Author: liweibiao
 * @Date: 2022-03-22 11:30:17
 * @LastEditTime: 2022-03-22 12:00:52
 * @LastEditors: liweibiao
 * @Description: 请求拦截器
 */

import Taro, { Chain } from "@tarojs/taro"

const interceptor = function (chain: Chain) {
    const requestParams = chain.requestParams
    const { method, data, url } = requestParams
    // console.log(`http ${method || 'GET'} --> ${url} data: `, data)

    // add cookie in header
    const cookies = Taro.getStorageSync('cookies') || ''
    const token = Taro.getStorageSync('token') || ''

    if (url.indexOf("/login") === -1 && cookies && token) {
      requestParams.header.cookie = cookies
      requestParams.header.token = token
    }

    return chain.proceed(requestParams)
      .then(res => {
        // console.log(`http <-- ${url} result:`, res)
        if (url.indexOf("/login")) {
          let cookies = ''
          res.cookies.forEach((cookie, index) => {
            // windows的微信开发者工具返回的是cookie格式是有name和value的,在mac上是只是字符串的
            if (cookie.name && cookie.value) {
              cookies += index === res.cookies.length - 1 ? `${cookie.name}=${cookie.value};expires=${cookie.expires};path=${cookie.path}` : `${cookie.name}=${cookie.value};`
            } else {
              cookies += `${cookie}`
            }
          })
          Taro.setStorageSync('cookies', cookies)
          Taro.setStorageSync('token', res.data.token)
          Taro.setStorageSync('loginType', res.data.loginType)
        }
        return res
      })
}

export default interceptor
