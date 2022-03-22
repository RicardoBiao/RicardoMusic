/*
 * @Author: liweibiao
 * @Date: 2022-03-21 10:52:46
 * @LastEditTime: 2022-03-22 11:31:30
 * @LastEditors: liweibiao
 * @Description: 
 */

import Taro from "@tarojs/taro"
import qs from "qs"
import interceptor from './interceptor'

type Method = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
type OptionType = {
    url: string,
    data?: object | string,
    method?: Method,
    header?: object,
    success?: any,
    error?: any,
}


Taro.addInterceptor(interceptor)

class Http {

    /**
     * 基础请求
     * @param options 
     */
    baseRequest<T = any>(options: OptionType) {
        console.log(options)
        return Taro.request<T>({
            ...options,
            success: function (res) {
              console.log(res.data)
            },
            fail: function (err) {
                console.log(err)
            }
          })
    }

    /**
     * get请求
     *
     * @template T
     * @param {string} url
     * @param {Object} [data]
     * @return {*} 
     * @memberof Http
     */
    get<T = any>(url: string, data?: Object) {
        const option = { url, data, header: {'content-type': 'application/json'} }
        return this.baseRequest<T>(option)
    }

    /**
     * post请求<application/json>
     *
     * @template T
     * @param {string} url
     * @param {Object} [data]
     * @return {*} 
     * @memberof Http
     */
    postJson<T = any>(url: string, data?: Object) {
        const option = { url, data, header: {'content-type': 'application/json'} }
        return this.baseRequest<T>(option)
    }

    /**
     * post请求<application/x-www-form-urlencoded>
     *
     * @template T
     * @param {string} url
     * @param {Object} [data]
     * @return {*} 
     * @memberof Http
     */
    postData<T = any>(url: string, data?: Object) {
        const option = { url, data, header: {'content-type': 'application/x-www-form-urlencoded'} }
        return this.baseRequest<T>(option)
    }

    /**
     * post请求<multipart/form-data>
     *
     * @template T
     * @param {string} url
     * @param {Object} [data]
     * @return {*} 
     * @memberof Http
     */
    postFrom<T = any>(url: string, data?: Object) {
        data = qs.stringify(data)
        const option = { url, data, header: {'content-type': 'multipart/form-data'} }
        return this.baseRequest<T>(option)
    }

}

const http = new Http()

export default http