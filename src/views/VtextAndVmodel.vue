<script >

export default{
    data(){
        return{
            emptyText:"",
            name:"andy",
            age:18,
            address:"台南市永康區00號",
            selectText:"",
            lazyText:"",
            numberText:"",
            trimText:"",
            radioText:"",
            checkboxText:[],

        }

    }

    }
</script>
<template>
    <div class="body">
        <div class="mainArea">
            <div class="Vtext">
                <h1>V-text</h1>
                <p>使用方法 : { { } }，兩個大括號</p>
<pre>
<code>
&lt;p&gt;Name : { { this.name } }&lt;p&gt;
&lt;p&gt;age : { { this.age } }&lt;p&gt;
&lt;p&gt;address : { { this.address } }&lt;p&gt;
</code>
</pre>           
            </div>
            <h1>V-model</h1>
            <p>雙向資料綁定</p>
<pre>
<code>
&lt;input type="text" v-model="age"&gt;
&lt;p&gt; { { this.age} } &lt;/p&gt;

&lt;select v-model="selectText" &gt;
    &lt;option value="1"&gt;1&lt;/option&gt;
    &lt;option value="2"&gt;2&lt;/option&gt;
    &lt;option value="3"&gt;3&lt;/option&gt;
&lt;/select&gt;
&lt;p&gt;{ { selectText } }&lt;/p&gt;
</code>
</pre>
            <div class="Vmodel-1">
                <input type="text" v-model="age">
                <p>即時同步資料 [ {{ this.age}} ]</p>
            </div>
            <div class="Vmodel-Select">
            <select v-model="selectText" >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
                <p>[ {{ selectText }} ]</p>
            </div>
            <h1>V-model.lazy</h1>
                <p>點擊input外側才會更動</p>
<pre>
<code>
&lt;input type="text" v-model.lazy ="lazyText"&gt;
&lt;p&gt;{ { this.lazyText } }&lt;p&gt;
</code>
</pre>       
            <div class="Vmodel-Lazy">
                <input type="text" v-model.lazy ="lazyText">
                <p>[ {{ this.lazyText }} ]</p>
            </div>

            <h1>V-model.number</h1>
            <p>Input中輸入數字時可強制換成數字型態</p>
<pre>
<code>
&lt;input type="text" v-model.number="numberText"&gt;
&lt;div class="number"&gt;
&lt;p&gt;[{ {this.numberText} }]&lt;/p&gt;
&lt;p&gt;[{ {typeof(this.numberText)} }]&lt;/p&gt;   
</code>
</pre>
            <input type="text" v-model.number="numberText">
            <div class="number">
            <p>[ {{ this.numberText }} ]</p>
            <p>[ {{ typeof(this.numberText) }} ]</p>
            </div>

            <h1>V-model.trim</h1>
            <p>去掉頭尾空格</p>
<pre>
<code>
&lt;input type="text" v-model="emptyText"&gt;
&lt;p&gt;頭{ {this.emptyText} }尾  (無trim 可接收首尾輸入的空格)&lt;/p&gt;
&lt;input type="text" v-model.trim="trimText"&gt;
&lt;p&gt;頭{ {this.trimText} }尾  (有trim 首尾輸入的空格會被去除)&lt;/p&gt;   
</code>
</pre>
            <input type="text" v-model="emptyText">
            <p>[ 頭{{this.emptyText}}尾 ] (無trim 可接收首尾輸入的空格)</p>
            <input type="text" v-model.trim="trimText">
            <p>[ 頭{{this.trimText}}尾 ] (有trim 首尾輸入的空格會被去除)</p>


            <h1>radio</h1>
            <p>單選按鈕</p>
<pre>
<code>
&lt;label>早餐&lt;/label&gt;
    &lt;input type="radio" v-model="radioText" name="food" value="pork" id="breakfast"&gt;
&lt;label>中餐&lt;/label&gt;
    &lt;input type="radio" v-model="radioText" name="food" value="fish" id="launch"&gt;
&lt;label>晚餐&lt;/label&gt;
    &lt;input type="radio" v-model="radioText" name="food" value="beef" id="dinner"&gt;
</code>
</pre>
            <label for="">早餐</label>
            <input type="radio" v-model="radioText" name="food" value="pork" id="breakfast">
            <label for="">中餐</label>
            <input type="radio" v-model="radioText" name="food" value="fish" id="launch">
            <label for="">晚餐</label>
            <input type="radio" v-model="radioText" name="food" value="beef" id="dinner">

            <p>{{ this.radioText }}</p>


            <h1>checkbox</h1>
            <p>若變數設為""則回全選且checkboxText也會變成布林值，所以必須設成陣列[]</p>
<pre>
<code>
&lt;label>早餐&lt;/label&gt;
    &lt;input type="checkbox" v-model="checkboxText" name="meal" value="breakfast" id="breakfast"&gt;
&lt;label>中餐&lt;/label&gt;
    &lt;input type="checkbox" v-model="checkboxText" name="meal" value="launch" id="launch"&gt;
&lt;label>晚餐&lt;/label&gt;
    &lt;input type="checkbox" v-model="checkboxText" name="meal" value="dinner" id="dinner"&gt; 
&lt;p>{ {this.checkboxText} }&lt;/p>  
</code>
</pre>
            <label>早餐</label>
            <input type="checkbox" v-model="checkboxText" name="meal" value="breakfast" id="breakfast">
            <label for="">午餐</label>
            <input type="checkbox" v-model="checkboxText" name="meal" value="launch" id="launch">
            <label for="">晚餐</label>
            <input type="checkbox" v-model="checkboxText" name="meal" value="dinner" id="dinner">
            <p>{{ this.checkboxText }}</p>
        </div>
    </div>    


</template>

<style lang="scss" scoped>
    .body{
        background-color: black;
        display: flex;
        justify-content: center;
        border-top: 1px white solid;
    }

    p{
        font-size: 14pt;
        color: white;
    }
    h1{ 
        color: white;
        margin-top: 60px;
        margin-bottom: 20px;
    }
    input{
        width: 40px;
        margin-right: 10px;
    }
    select{
        width: 40px;
        margin-right: 10px;
                
    }
    pre{
        background-color: rgb(34, 33, 33);
    }
    code{
        color: white;
    }
    label{
        color: white;
    }

    .mainArea{
        width: 50vw;
        margin: 0 25%;

        .Vtext{
            .VtextText{
                margin: 0;
            }
        }
        .Vmodel-1{
            display: flex;
            height: 30px;
            margin-bottom: 10px;
        }

        .Vmodel-Select{
            height: 30px;
            display: flex;
            margin-bottom: 60px;       
        }

        .Vmodel-Lazy{
            height: 30px;
            display: flex;
           
        }

        .number{
            display: flex;
        }
    }

</style>
