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
        //點擊後回到主頁
        emitGo(){
            let x = 0; 
            this.$emit("closepage",x);
            this.delmoney = this.delarr[this.DelIndex].Amount;
            //回傳該索引值之金額
            this.$emit("delemoney",this.delmoney);
            
            //刪除delarr陣列中DelIndex索引值的1個數
            this.delarr.splice(this.DelIndex,1);
            //將移除陣列後的陣列存到自建變數deleteArr以便回傳
            this.deletedArr = this.delarr;
            this.$emit("deleteArr",this.deleteArr);
            
        },
    }
}
        
        
</script>

<template>
    <div class="delebox">
            <p>Sure to Delete ? </p>
            <button type="button" @click="emitGo">Sure</button>
    </div>

</template>

<style lang="scss" scoped>
    .delebox{
        height: 15vh;
        width: 20vw;
        display: flex;
        justify-content: center;
        flex-direction: column;

        p{
            font-size: 20pt;
            color: #3C7FA5;
            text-align: center;
        }

        button{
            color: white;
            background-color: #A53C42;
            border-radius: 10px;
        }


    }
</style>