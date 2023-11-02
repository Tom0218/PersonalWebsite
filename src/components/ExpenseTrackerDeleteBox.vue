<script>
export default{
        data(){
            return{
                delmoney:"",
                deleteArr:[],
            }
        },
        props:[
            "DelIndex",
            "delarr"
        ],
        methods: {
            emitGo(){
                let x = 0; //點擊後回到主頁
                this.$emit("closepage",x);
                //扣除金錢
                this.delmoney = this.delarr[this.DelIndex].Amount
                this.$emit("delemoney",this.delmoney)
                //刪除陣列
                this.delarr.splice(this.DelIndex,1)//對匯入的陣列操作
                this.deletedArr = this.delarr //將移除陣列後的陣列存到自建變數deleteArr以便回傳
                this.$emit("deleteArr",this.deleteArr)
                
            },
        }
        }
        
        
</script>

<template>
    <div class="delebox">
        <div class="MainArea">
            <p>Sure to Delete?</p>
            <button type="button" @click="emitGo">Sure</button>
        </div>
    </div>

</template>

<style lang="scss" scoped>
    .delebox{
        height: auto;
        width: 200px;
        display: flex;
        justify-content: center;
    }
    p{
        font-size: 16pt;
        color: #3C7FA5;
        text-align: center;
    }
    button{
        color: white;
        background-color: #A53C42;
    }
    .MainArea{

    }
</style>