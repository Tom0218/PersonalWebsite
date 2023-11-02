<script>

export default{
        data(){
        return{
            inputText:0,
            minNum:0,
            maxNum:100,
            showText:"",
            answer : Math.floor(Math.random()*100),
            
        }
    },
    methods:{
        guess(){

            let guessNum = this.inputText;
            this.inputText = ""

            
            let a = this.minNum;
            let b = this.maxNum;
            let answer =this.answer;
            console.log(guessNum)
            console.log("答案 : "+answer)

            if (guessNum == answer){
                this.showText = "bingo"
            }
            if (guessNum < a || guessNum >b){
                this.showText = "out of range"
            }
            if (guessNum >a && guessNum <answer){
                this.showText = "too low";
                this.minNum = guessNum;
            }
            if (guessNum <b && guessNum >answer){
                this.showText = "too high"
                this.maxNum =guessNum
            }
    
        }
    }
}
</script>


<template>
    <div class="body" >    
        <div class="Box">
            <div>
                <h1>猜數字</h1> 
                <div class="d-flex showArea">
                    <p>{{ this.minNum }}</p>
                    <p>-</p>
                    <p>{{ this.maxNum }}</p>
                </div>
                <div class="">
                    <input type="number" v-model.number="inputText" >
                    <button type="button" v-on:click="guess()">guess</button>
                    <p>{{ this.showText }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    p{
        font-size: 18pt;
        font-weight: bold;
    }
    .body{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .Box{
        height: 300px;
        width: 300px;
        background-color: orangered;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        text-align: center;
        .showArea{
            display: flex;
            justify-content: center;
        }
        h1{
            margin-top: 50px;
        }
        

    }
   
</style>