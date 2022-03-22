/*
 * @Author: liweibiao
 * @Date: 2022-03-21 15:36:13
 * @LastEditTime: 2022-03-22 14:58:33
 * @LastEditors: liweibiao
 * @Description: 公共接口
 */

import http from "../../../utils/http"

const baseUrl = "http://localhost:3000"

const COMMON_URL = {
    /** 手机号登录 */
    loginByPhone: baseUrl + '/login/cellphone',
    /** 邮箱登录 */
    loginByEmail: baseUrl + '/login',
    /** 获取账号信息 */
    userAccount: baseUrl + '/user/account',
    /** 获取登录用户详情 */
    userDetail: baseUrl + '/user/detail', 
    /** 获取用户信息 , 歌单，收藏，mv, dj 数量 */
    userSubcount: baseUrl + '/user/subcount',
}


const COMMON_API = {

    /** 手机号登录 */
    loginByPhone(params) {
        return http.get(COMMON_URL.loginByPhone, params)
    },
    /** 邮箱登录 */
    loginByEmail(params) {
        return http.get(COMMON_URL.loginByEmail, params)
    },
    /** 获取账号信息 */
    getUserAccount(params) {
        return http.get(COMMON_URL.userAccount, params)
    },
    
}

export {
    COMMON_API
}