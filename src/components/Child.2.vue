<script>
export default{
    data(){
        return{
            TextObj:{
                Text:"pen",
                Text2:"hahahahahaha"
            }
            
        }
    },
    methods:{
        emitGO(){
            //往復元件傳遞訊息，告知父元件執行apple(暗號)並給予紙條
            //暗號不能為雙引號
        this.$emit('apple', this.TextObj);
        }
    }
}
</script>

<template>

    <div>
        <div class="showArea">
            <div class="MainArea">
                <h1>Emit child</h1>
                <p>text變數:{{this.TextObj}}</p>
                <button type="button" @click="emitGO">emitGO</button>
                <!-- <button type="button" @click="$emit('apple', this.TextObj)">emitGO2(無functoin)</button> -->
<div class="code">
<pre>
<code>
&lt;script>
export default{
    methods:{
--------------------------------------------|
        emitGO(){                           |
        this.$emit('apple', this.TextObj);  |   將資料存進變數apple
        }                                   |
    }                                       |
--------------------------------------------|
},
&lt;
&lt;/script>
&lt;template>
-------------------------------------------------------------|
&lt;button type="button" @click="emitGO">emitGO&lt;/button>        |  執行
-------------------------------------------------------------|
&lt;/template>

</code>
</pre>
</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.showArea{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .MainArea{
        height: auto;
        width: 550px;
        border: 1px black solid;
    }
    .code{
        border-top: 1px black solid;
    }
    pre{
        background-color: whitesmoke;
    }
}
</style>