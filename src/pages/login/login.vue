<!--
 * @Author: liweibiao
 * @Date: 2022-03-21 15:51:54
 * @LastEditTime: 2022-03-21 16:51:05
 * @LastEditors: liweibiao
 * @Description: 
-->

<template>
    <view>
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

	</view>
</template>

<script lang="ts" setup>

import { API } from '../../module'
import { reactive } from 'vue'
import './login.scss'


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



</script>


