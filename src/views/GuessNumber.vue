<script>

export default{
        data(){
        return{
            title:"e04",
            inputText:"6",
            minNum:0,
            maxNum:100,
            showText:"",
            answer : Math.floor(Math.random()*100),
            
        }
    },
    methods:{
        // print(){
        //     console.log(this.title)
        // }
        guess(){

            let guessNum = this.inputText;
            this.inputText = ""

            
            let a = parseInt(this.minNum);
            let b = parseInt(this.maxNum);
            let answer = parseInt(this.answer);
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
    <!-- <h1>V-on</h1>
    <button type="button" v-on:click="print()">btn</button>
    <button type="button" @click="print()">btn</button> -->
    <div class="body" >    
        <div class="Box">
            <div>
                <h1>猜數字</h1>
                <p>{{ this.showText }}</p>
                <div class="d-flex showArea">
                    <p>{{ this.minNum }}</p>
                    <p>-</p>
                    <p>{{ this.maxNum }}</p>
                </div>
                <div class="">
                    <input type="number" v-model.number="inputText" >
                    <button type="button" v-on:click="guess()">guess</button>
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