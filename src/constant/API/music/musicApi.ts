import http from "../../../utils/http"
const baseUrl = "http://localhost:3000"


const MUSIC_URL = {
  /** 搜索歌曲 */
  searchMusic: baseUrl + '/cloudsearch',
  /** 获取默认搜索关键词 */
  searchDefault: baseUrl + '/search/default',
  /** 获取歌曲播放url */
  songUrl: baseUrl + '/song/url',
  /** 获取歌曲详情 */
  songDetail: baseUrl + '/song/detail',

}

const MUSIC_API = {
  /** 搜索歌曲 */
  searchMusic(params) {
    return http.get(MUSIC_URL.searchMusic, params)
  },
  /** 获取默认搜索关键词 */
  searchDefault(params) {
    return http.get(MUSIC_URL.searchDefault, params)
  },
  /** 获取歌曲播放url */
  getSongUrl(params) {
    return http.get(MUSIC_URL.songUrl, params)
  },
  /** 获取歌曲详情 */
  getSongDetail(params) {
    return http.get(MUSIC_URL.songDetail, params)
  },
}

export {
  MUSIC_API
}
