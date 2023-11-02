<script>
export default{
    data(){
        return{
            point:0,
            ntd:0,
        }
    },
    methods:{
        addPoint(){
            this.point +=1;
        }
    },
    watch:{ //監控實際變數
        point(){
            this.ntd = this.point*10;
        }
    },
    computed:{ //產生一個暫存的值
        jyp(){
            return this.ntd *4.63//用return回傳值
        }
    },
    beforeCreate(){
        console.log("beforeCreate "+this.point)
    },
    created(){
        console.log("Created "+this.point)
    },
    beforeMount(){
        console.log("beforeMount "+this.point)
    },
    mounted(){
        console.log("mounted "+this.point)
    },
    beforeUpdate(){
        console.log("beforeUpdate "+this.point)
    },
    updated(){
        console.log("updated "+this.point)
    },
    beforeUnmount(){ //銷毀  //切換vue的時候會出現
        console.log("beforeUnmount "+this.point)
    },
    unmounted(){
        console.log("unmounted"+ this.point)
    },
}
</script>
<template>
<div class="body">
    <p>point :{{ this.point }}</p>;
    <p>ntd :{{ this.ntd }}</p>;
    <p>jyp:{{ jyp }}</p>;
    <div class="circle" @click="addPoint()">
    </div>
    <h1 v-if="this.point == 10">100</h1>
</div>
</template>

<style lang="scss" scoped>
.body{
    height: 100%;
    width: 100%;
}
    .circle{
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-color: gray;
        transition: 0.3s;

        &:hover{
            scale: 1.05;        
        }
        &:active{
            scale: 0.95;
        }
    }
</style>