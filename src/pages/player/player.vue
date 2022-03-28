<!--
 * @Author: liweibiao
 * @Date: 2022-03-21 15:51:54
 * @LastEditTime: 2022-03-27 09:55:54
 * @LastEditors: liweibiao
 * @Description:
-->

<template>
  <view></view>
</template>

<script lang="ts" setup>

import { PATH } from '../../module'
import { reactive, getCurrentInstance } from 'vue'
import './player.scss'
import Taro, { InnerAudioContext, useDidShow } from '@tarojs/taro'
import { useSongStore } from '../../stores/song'
import { Song } from 'src/styles/songs'

const songStore = useSongStore()
const innerAudioContext: InnerAudioContext = getCurrentInstance()?.appContext.config.globalProperties.$innerAudioContext

// innerAudioContext.onTimeUpdate(() => {
//   //音频进度更新事件
//   let current = innerAudioContext.currentTime;
//   let duration = innerAudioContext.duration;
//   page.progressWidth = (current/duration) * 100
//   console.log(' progressWidth(play) ===>', page.progressWidth)
// })

useDidShow(() => {
  console.log('onShow===>', innerAudioContext)
  console.log(' song 1 ===>', page.song)
  if(page.song.url) {
    innerAudioContext.src = page.song.url
    innerAudioContext.play()
    innerAudioContext.loop = true
    toIndexPage()
  }
})

const page = reactive<{
  song: Song,
  muted: boolean,
  autoplay: boolean,
  progressWidth: number
}>({
  song: songStore.currentSong,
  muted: false,
  autoplay: false,
  progressWidth: 0
})



// const getSongDetail = (id: string) => {
//   API.getSongDetail({
//     ids: id
//   }).then(res => {
//     console.log(' getSongDetail-res===>', res)
//   }).catch(err => {
//     console.log(' getSongDetail-err===>', err)
//   })
// }


const toIndexPage = () => {
    Taro.switchTab({ url: PATH.INDEX })
}

</script>


