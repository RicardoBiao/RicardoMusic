/*
 * @Author: liweibiao
 * @Date: 2022-03-21 15:35:56
 * @LastEditTime: 2022-03-21 16:24:47
 * @LastEditors: liweibiao
 * @Description:
 */
import { COMMON_API } from "./common/commonApi"
import { MUSIC_API } from "./music/musicApi"
const API = {
    ...COMMON_API,
    ...MUSIC_API
}

export { API }
