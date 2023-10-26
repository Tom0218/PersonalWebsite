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
            return this.ntd *4.63
        }
    }
}
</script>
<template>
<div class="body">
    point :{{ this.point }};
    ntd :{{ this.ntd }};
    jyp:{{ jyp }}
    <div class="circle" @click="addPoint()">
    </div>
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
    }
</style>