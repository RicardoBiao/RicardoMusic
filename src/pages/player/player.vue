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

// import { API } from '../../module'
import { reactive } from 'vue'
import './player.scss'
import { useDidShow } from '@tarojs/taro'
import { useSongStore } from '../../stores/song'
import { Song } from 'src/styles/songs'

const songStore = useSongStore()




useDidShow(() => {
  console.log('onShow')
  console.log(' song 1 ===>', page.song)
  if(page.song.url) {
    songStore.setAudioUrl(page.song.url)
    console.log(' songStore ===>', songStore.innerAudioContext)
  }
})

const page = reactive<{
  song: Song,
  muted: boolean,
  autoplay: boolean,
}>({
  song: songStore.currentSong,
  muted: false,
  autoplay: false,
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

</script>


