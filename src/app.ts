/*
 * @Author: liweibiao
 * @Date: 2022-03-18 17:33:46
 * @LastEditTime: 2022-03-18 18:06:56
 * @LastEditors: liweibiao
 * @Description: 
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './app.scss'

const App = createApp({
  onShow(options) {
    console.log('app-options: ',options)
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(createPinia())

export default App
