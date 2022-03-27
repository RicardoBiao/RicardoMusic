<!--
 * @Author: liweibiao
 * @Date: 2022-03-21 15:51:54
 * @LastEditTime: 2022-03-27 09:55:54
 * @LastEditors: liweibiao
 * @Description:
-->

<template>
  <view>
    <input type="text" style="background-color: aqua;" :value="page.keywork" />
    <nut-button type="primary" @click="search">search</nut-button>
    <nut-list
      v-if="page.musicResultList"
      :height="50"
      :listData="page.musicResultList"
      @scroll="handleScroll"
    >
      <template v-slot="{ item }">
        <div class="list-item" @click="toPlayer(item)">{{ item.name }}</div>
      </template>
    </nut-list>
  </view>
</template>

<script lang="ts" setup>

import { API, PATH } from '../../module'
import { reactive } from 'vue'
import './search.scss'
import Taro, { useDidShow } from '@tarojs/taro';
import { Song } from '../../styles/songs'
import { useSongStore } from '../../stores/song';

const songStore = useSongStore()

const page = reactive<{
  musicResultList: Song[],
  keywork: string,
  songCount: number,
  limit: number,
  type: number,
  pageNum: number,
  methods: any
}>({
  keywork: "雨爱",
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

const search = () => {
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

const _getMusicUrl = async (id: string = '') => {
  if (!id) {
    return
  }
  return API.getSongUrl({
    id
  }).then(res => {
    if (res.statusCode === 200) {
      console.log(' getSongUrl-res===>', res.data.data[0].url)
      return res.data.data[0].url
    }
  }).catch(err => {
    console.log(' getSongUrl-err===>', err)
  })
}

const toPlayer = (item: Song) => {
  _getMusicUrl(item.id).then( res => {
    item.url = res
    songStore.currentSong = item
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


