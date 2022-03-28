/*
 * @Author: liweibiao
 * @Date: 2022-03-18 17:33:46
 * @LastEditTime: 2022-03-21 16:48:46
 * @LastEditors: liweibiao
 * @Description:
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Avatar, Button, Input, Icon, Skeleton, List, Audio, Progress, Cell} from '@nutui/nutui-taro';
// 定制化主题必须使用 scss
import '@nutui/nutui-taro/dist/styles/themes/default.scss';
// 导入全局样式
import './app.scss';
import Taro from '@tarojs/taro';

const App = createApp({
  onShow(options) {
    console.log('app-options: ',options)
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

// 创建全局音频管理器
App.config.globalProperties.$innerAudioContext = Taro.createInnerAudioContext()
App.config.globalProperties.$innerAudioContext.onCanplay(() =>{
  // 初始化参数
  App.config.globalProperties.$innerAudioContext.duration;
  App.config.globalProperties.$innerAudioContext.currentTime;
})

// App.config.globalProperties.$innerAudioContext.onTimeUpdate(() => {
//   //音频进度更新事件
//   let current = App.config.globalProperties.$innerAudioContext.currentTime;
//   let duration = App.config.globalProperties.$innerAudioContext.duration;
//   let progressWidth = (current/duration) * 100
//   console.log(' progressWidth(appts) ===>', progressWidth)
// })

App.use(createPinia())
App.use(Button)
App.use(Input)
App.use(Icon)
App.use(Skeleton)
App.use(List)
App.use(Audio)
App.use(Avatar)
App.use(Progress)
App.use(Cell)

export default App
