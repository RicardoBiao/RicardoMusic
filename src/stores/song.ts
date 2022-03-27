import Taro, { InnerAudioContext } from '@tarojs/taro'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSongStore = defineStore('song', () => {
  const currentSong = ref({})
  const innerAudioContext:InnerAudioContext = Taro.createInnerAudioContext()
  innerAudioContext.autoplay = true
  innerAudioContext.onPlay( ()=> {
    console.log(' onPlay ===>', innerAudioContext.src)
  })

  const setAudioUrl = (url: string) => {
    innerAudioContext.src = url
  }

  const musicPlay = () => {
    if( innerAudioContext.src || innerAudioContext.paused) {
      innerAudioContext.play()
    } else {
      Taro.showToast({
        title: '暂无歌曲可播放'
      })
    }
  }

  const musicPause = () => {
    if(!innerAudioContext.paused) {
      innerAudioContext.pause()
    }
  }
  return {currentSong, innerAudioContext, setAudioUrl, musicPlay, musicPause}
})
