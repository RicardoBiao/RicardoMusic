/*
 * @Author: liweibiao
 * @Date: 2022-03-18 17:33:46
 * @LastEditTime: 2022-03-21 16:48:46
 * @LastEditors: liweibiao
 * @Description:
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Button, Input, Icon, Skeleton, List, Audio} from '@nutui/nutui-taro';
// 定制化主题必须使用 scss
import '@nutui/nutui-taro/dist/styles/themes/default.scss';
// 导入全局样式
import './app.scss';

const App = createApp({
  onShow(options) {
    console.log('app-options: ',options)
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(createPinia())
App.use(Button)
App.use(Input)
App.use(Icon)
App.use(Skeleton)
App.use(List)
App.use(Audio)

export default App
