<!--
 * @Author: liweibiao
 * @Date: 2022-03-21 15:51:54
 * @LastEditTime: 2022-03-27 09:55:54
 * @LastEditors: liweibiao
 * @Description:
-->

<template>
    <view class="">
        <nut-input placeholder="请输入账号"
            v-model="page.state.email"
            :require-show="true"
            label="Email"
        />
        <nut-input placeholder="请输入密码"
            v-model="page.state.password"
            :require-show="true"
            label="password"
            type="password"
        />

        <nut-button type="primary" @click="login()">login</nut-button>
        <nut-button type="primary" @click="getUserInfo()">getUserInfo</nut-button>

	</view>
</template>

<script lang="ts" setup>

import { API } from '../../module'
import { reactive } from 'vue'
import './login.scss'
import Taro from '@tarojs/taro';


 const page = reactive({
     state: {
        email: "RicardoLe@yeah.net",
        password: "qinqinqin753"
     },
     methods: {

     },

 })

 const login = () => {
     API.loginByEmail({
         email: page.state.email,
         password: page.state.password
     }).then( res => {
         console.log("login===>", res)

     }).catch( err => {
         console.error("login===>", err)
     })
 }

 const getUserInfo = () => {
     API.getUserAccount({
         cookie: Taro.getStorageSync('cookies')
     })
        .then( res => {
            console.log('getUserAccount-res===>', res)
        })
        .catch( err => {
            console.log('getUserAccount-err ===>', err)
        })
 }



</script>


