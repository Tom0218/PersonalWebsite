<script setup>
import {RouterView} from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <div class="page">
    <div class="Top Area">
      <Header/>
    </div>
    <div class="content">
    <RouterView/>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.page{
  height: 100vh;
    .Top{
      width: 100%;
      height: 12%;
    }
    .content{
      width: 100%;
      height: 80%;
      margin: 0;
    }
}
</style>
