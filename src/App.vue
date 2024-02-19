<script setup>
import {RouterView} from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <Header/>
  <div class="content">
    <RouterView/>
    </div>
</template>

<style lang="scss" scoped>

    .content{
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: auto;
      margin: 0;
      background-color: #232D3F;
    }

</style>
