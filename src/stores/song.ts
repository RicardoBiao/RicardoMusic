import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSongStore = defineStore('song', () => {
  const currentSong = ref({})

  return {
    currentSong,
  }
})

