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
    innerAudioContext.play()
  }
  return {currentSong, innerAudioContext, setAudioUrl}
})
