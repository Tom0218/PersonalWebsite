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
      height: auto;
    }
    .content{
      width: 100%;
      height: 100vh;
      margin: 0;
    }

</style>
