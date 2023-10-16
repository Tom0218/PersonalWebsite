<script setup>
import Title from '../components/DessertTitle.vue'
import Vfor from '../components/DessertVfor.vue'
import Content from'../components/DessertContent.vue'
import Bottom from'../components/DessertBottom.vue'
</script>

<template>

    <div class="headerShow">
        <Title/>
    </div>

    <div class="box" >
        <Vfor/>
    </div>

    <div class="content">
        <Content/>
    </div>
    <div class="bottom">
        <Bottom/>
    </div>


</template>

<style lang="scss" coped>
    body{
        margin: 0;
    }
    .headerShow{
        width: 100vw;
        height: 20vh
        ;
    }
    .box{
        display: flex;
        justify-content: space-around;
        margin-top: 50px;
    }
    .content{
        margin-top: 100px;
    }
    .bottom{
        margin-top: 100px;
    }
    
</style>