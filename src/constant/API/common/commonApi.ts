/*
 * @Author: liweibiao
 * @Date: 2022-03-21 15:36:13
 * @LastEditTime: 2022-03-21 17:08:43
 * @LastEditors: liweibiao
 * @Description: 公共接口
 */

import http from "../../../utils/http"

const baseUrl = "http://localhost:3000"

const COMMON_URL = {
    /** 手机号登录 */
    loginByPhone: baseUrl + '/login/cellphone',
    /** 邮箱登录 */
    loginByEmail: baseUrl + '/login'
}


const COMMON_API = {

    /** 手机号登录 */
    loginByPhone(params) {
        return http.get(COMMON_URL.loginByPhone, params)
    },

    /** 邮箱登录 */
    loginByEmail(params) {
        return http.get(COMMON_URL.loginByEmail, params)
    }
    
}

export {
    COMMON_API
}