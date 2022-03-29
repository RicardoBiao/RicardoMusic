<!--
 * @Author: liweibiao
 * @Date: 2022-03-21 15:51:54
 * @LastEditTime: 2022-03-27 09:55:54
 * @LastEditors: liweibiao
 * @Description:
-->

<template>
  <view class="app-bgc">
    <nut-searchbar v-model="page.keywork" class="search-bar" @search="search">
      <template v-slot:leftin>
        <nut-icon size="14" name="search"></nut-icon>
      </template>
    </nut-searchbar>
    <nut-list
      class="search-list"
      v-if="page.musicResultList"
      :height="60"
      :listData="page.musicResultList"
      @scroll="handleScroll"
    >
      <template v-slot="{ item }">
        <nut-cell class="list-item" :title="item.name" @click="toPlayer(item)"></nut-cell>
      </template>
    </nut-list>
  </view>
</template>

<script lang="ts" setup>

import { API, PATH } from '../../module'
import { reactive, watch } from 'vue'
import './search.scss'
import Taro, { useDidShow } from '@tarojs/taro'
import { Song } from '../../styles/songs'
import { useSongStore } from '../../stores/song'
import { _getMusicUrl } from '../../utils/music'

const songStore = useSongStore()

const page = reactive<{
  musicResultList: Song[],
  keywork: string,
  oldKeywork: string,
  songCount: number,
  limit: number,
  type: number,
  pageNum: number,
  methods: any
}>({
  keywork: '汪苏泷',
  oldKeywork: '',
  musicResultList: [],
  songCount: 0,
  limit: 30, // 搜索返回数量，默认30
  type: 1, // 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
  pageNum: 1, // 当前页数
  methods: {
  },
})

useDidShow(() => {
  console.log('onShow')
  getSearchDefault()
})

watch( () => page.keywork, (newWork, oldWork) => {
  if( newWork != oldWork ) {
    page.oldKeywork = oldWork
  }
})

const search = () => {
  if(page.keywork != page.oldKeywork) {
    page.musicResultList = []
    page.pageNum = 1
  }
  console.log(' page.keywork ===>', page.keywork)
  API.searchMusic({
    keywords: page.keywork,
    offset: (page.pageNum - 1) * page.limit, // 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
    limit: page.limit,
    type: page.type
  }).then(res => {
    console.log("searchMusic===>", res)
    if (res.statusCode === 200) {
      const data = res.data.result
      page.songCount = data.songCount
      _initSongList(data.songs)
      page.pageNum++
    }
  }).catch(err => {
    console.error("searchMusic===>", err)
  })
}

const getSearchDefault = () => {
  API.searchDefault({

  }).then(res => {
    console.log('searchDefault-res===>', res)
  }).catch(err => {
    console.log('searchDefault-err ===>', err)
  })
}

const handleScroll = () => {
  // console.log(' handleScroll ===>')
}


const toPlayer = (item: Song) => {
  _getMusicUrl(item.id).then(res => {
    if(songStore.currentSong?.['url'] != res) {
      item.url = res
      songStore.currentSong = item
    }
    Taro.navigateTo({
      url: PATH.PLAYER
    })
  })
}

/**
 * 重构歌曲列表（过滤无用字段和拼接分页数据）
 */
const _initSongList = (arr: any[]) => {
  const result = arr.map(item => {
    let newItem: Song = {}
    newItem.name = item.name
    newItem.id = item.id
    newItem.picUrl = item.al.picUrl
    newItem.subhead = item.al.name || ''
    newItem.singerName = item.ar[0].name
    newItem.singerId = item.ar[0].id
    return newItem
  })
  if (page.pageNum > 1) {
    page.musicResultList = page.musicResultList.concat(result)
  } else {
    page.musicResultList = result
  }
  console.log(' musicResultList ===>', page.musicResultList)
}



</script>


