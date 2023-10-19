<script setup>
import {RouterView} from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
    <div class="Top Area">
      <Header/>
    <div class="content">
    <RouterView/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
    .Top{
      width: 100vw;
      height: auto;
    }
    .content{
      width: 100%;
      height: 90vh;
      margin: 0;
    }

</style>
