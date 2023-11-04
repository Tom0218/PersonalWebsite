<script setup>
import {RouterView} from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
    <div class="Top Area">
      <Header/>
    </div>
    <div class="content">
    <RouterView/>
    </div>
</template>

<style lang="scss" scoped>
    .Top{
      height: 10vh;
    }
    .content{
      width: 100%;
      height: auto;
      margin: 0;
      background-color: #232D3F;
    }

</style>
