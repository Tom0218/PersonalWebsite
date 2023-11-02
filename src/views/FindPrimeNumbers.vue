<script>
export default{
    data(){
        return{
            arr:[],
            count:0,
            userInput:0,
            showText:"",

        }
    },
    methods:{
        search(){
            this.arr = []; // 重置陣列
            this.count = 0; 
            for (let i = 2; i <= this.userInput; i++) {
            let isPrime = true; 
            
                for (let j = 2; j < i; j++) {
                    if (i % j === 0) {
                    isPrime = false; // i 被 j 整除，不是质数
                    break;
                    }
                }
            if (isPrime) {
                this.arr.push(i);
                this.count++;
            }
            }
        }
    }
}
</script>
<template>
<div class="body">
    <div class="page">
        <div class="gameBox">
            <h1>找質數</h1>
            <div class="top">
                <p>找</p>
                <input type="number" v-model="userInput">
                <p>以內的質數</p>
                <button type="button" @click="search()">Search</button>
            </div>
            <div class="mid">
                <p>總共</p>
                <p>{{ this.count }}</p>
                <p>個</p>
            </div>
            <div class="content">
                <p>{{ this.arr }}</p>
            </div>
        </div>
    </div>
</div> 
</template>
<style lang="scss" scoped>
.body{
    height: 90vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

p{
    font-size: 18pt;
    color: white;
}
h1{
    color: white;
    text-align: center;
}
.gameBox{
    background-color: black;
    width: 500px;
    height: 500px;
    border-radius: 20px;
    margin-bottom: 0;
    padding: 0 20px;

    .top{
        height: 40px;
        display: flex;
        justify-content: center;
        padding: 8px;
        input{
            height: 20px;
            margin: 0 5px;
            margin-top: 8px;
        }
        button{
            height: 30px;
            background-color: white;
            border-radius: 5px;
            margin-left: 5px;


        }
    }
    .mid{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .content{
        height: 200px;
        border: 1px white solid;
        word-wrap:break-word;
        border-radius: 20px;
        padding: 10px;
    }
}


</style>