/*
 * @Author: liweibiao
 * @Date: 2022-03-18 17:33:46
 * @LastEditTime: 2022-03-21 15:51:38
 * @LastEditors: liweibiao
 * @Description:
 */
export default {
  pages: [
    'pages/index/index',
    'pages/login/login',
    'pages/search/search',
    'pages/player/player',
  ],
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页"
      },
      {
        pagePath: "pages/login/login",
        text: "登录"
      },
      {
        pagePath: "pages/search/search",
        text: "搜索"
      },
    ],
    color: '#4e4f52',
    selectedColor: '#ef01a0',
    backgroundColor: '#0e0b1f',
    borderStyle: 'white'

  },
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#0e0b1f',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white'
  }
}
