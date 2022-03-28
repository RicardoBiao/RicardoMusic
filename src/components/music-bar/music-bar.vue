<template>
  <view>
    <nut-button type="primary" @click="songPlay">play</nut-button>
    <nut-button type="primary" @click="songPause">pause</nut-button>
    <nut-button type="primary" @click="songStop">stop</nut-button>
    <view>paused ? {{ page.paused }}</view>
    <view>progress: {{ page.progress }}</view>
    <nut-button type="primary" @click="nextSong">next</nut-button>
    <nut-button type="primary" @click="prevSong">pre</nut-button>
    <nut-avatar size="large" :icon="page.song.picUrl"></nut-avatar>
    {{page.song.picUrl}}
    <nut-cell>
      <nut-progress :percentage="page.progress" :show-text="false" stroke-height="12" />
    </nut-cell>
  </view>
</template>


<script lang="ts" setup>
import './music-bar.scss'
import { reactive, getCurrentInstance, onMounted } from 'vue'
import { InnerAudioContext, useDidShow } from '@tarojs/taro'
import { useSongStore } from '../../stores/song'
import { Song } from 'src/styles/songs'


const innerAudioContext: InnerAudioContext = getCurrentInstance()?.appContext.config.globalProperties.$innerAudioContext
const songStore = useSongStore()

const page = reactive<{
  song: Song,
  progress: number,
  paused: boolean
}>({
  song: {},
  progress: 0,
  paused: false
})

const props = defineProps<{
  name: string
}>()

onMounted(() => {
  // console.log('onShow(music-bar)===>', innerAudioContext)
  // console.log(' song (music-bar) ===>', page.song)
})

useDidShow(() => {
  // 获取当前歌曲
  page.song = songStore.currentSong
  innerAudioContext.onTimeUpdate(() => {
    //音频进度更新事件
    let current = innerAudioContext.currentTime;
    let duration = innerAudioContext.duration;
    page.progress = (current / duration) * 100
    console.log(' progress(musicBar) ===>', props.name , page.progress)
  })

})


/** 播放音乐 */
const songPlay = () => {
  if (innerAudioContext.paused) {
    innerAudioContext.play()
    page.paused = false
  }
}

/** 暂停音乐 */
const songPause = () => {
  if (!innerAudioContext.paused) {
    innerAudioContext.pause()
    page.paused = true
  }
}

/** 停止播放音乐 */
const songStop = () => {
  if (!innerAudioContext.paused) {
    innerAudioContext.stop()
  }
}

/** 下一首歌 */
const nextSong = () => {
  console.log('nextSong ===>')
}

/** 上一首歌 */
const prevSong = () => {
  console.log('prevSong ===>')
}

</script>
