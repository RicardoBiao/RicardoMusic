<!--
 * @Author: liweibiao
 * @Date: 2022-03-21 15:51:54
 * @LastEditTime: 2022-03-27 09:55:54
 * @LastEditors: liweibiao
 * @Description:
-->

<template>
  <view class></view>
</template>

<script lang="ts" setup>

import { API } from '../../module'
import { reactive } from 'vue'
import './player.scss'
import Taro, { useDidShow } from '@tarojs/taro'
import { useSongStore } from '../../stores/song'

const songStore = useSongStore()



/** 路由参数 */
const routerParams = Taro.getCurrentInstance().router?.params
const { id = '' } = ( routerParams as any )
console.log(' id ===>', id)

useDidShow(() => {
  console.log('onShow')
  console.log(' songStore ===>', songStore.currentSong)
  if( id ) {
    getSongDetail(id)
  }
})

const page = reactive({
  state: {
    song: {},
  },
  methods: {

  },

})


const getSongDetail = (id: string) => {
  API.getSongDetail({
    ids: id
  }).then(res => {
    console.log(' getSongDetail-res===>', res)
  }).catch(err => {
    console.log(' getSongDetail-err===>', err)
  })
}

</script>


