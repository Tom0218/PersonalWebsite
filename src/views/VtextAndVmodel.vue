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
            title:"cool",
            isRed:"false",
            isLarge:"false",
            styleArr:[],
            item:[
                "../../public/Snackphoto/7.png",
                "../../public/Snackphoto/5.png",
                "../../public/Snackphoto/6.png",
            ],

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
                <p>{{ this.name }}</p>
                <p>{{ this.age }}</p>
                <p>{{ this.address }}</p>
<pre>
<code>
&lt;script>
    export deflault{
        data(){
            return{ 
                name:"andy",
                age:18,
                address:"台南市永康區00號",
            }
        }
    }
&lt;/script>

&lt;template>
    &lt;p&gt;Name : { { this.name } }&lt;p&gt;
    &lt;p&gt;age : { { this.age } }&lt;p&gt;
    &lt;p&gt;address : { { this.address } }&lt;p&gt;
&lt;/template>
</code>
</pre>           
            </div>
            <h1>V-model</h1>
            <p>雙向資料綁定</p>
<pre>
<code>
&lt;script>
export default{
    data(){
        return{
            age:18,
            selectText:"",
        }
    }
}
&lt;/script>
&lt;template>
    &lt;input type="text" v-model="age"&gt;
    &lt;p&gt; { { this.age} } &lt;/p&gt;

    &lt;select v-model="selectText" &gt;
        &lt;option value="1"&gt;1&lt;/option&gt;
        &lt;option value="2"&gt;2&lt;/option&gt;
        &lt;option value="3"&gt;3&lt;/option&gt;
    &lt;/select&gt;
&lt;p&gt;{ { selectText } }&lt;/p&gt;
&lt;/template>
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

            <h1>V-model綁定物件</h1>
            <p>未啟動時h2無class名稱，當isRed or isLarge為true時便賦予h2標籤class名稱</p>
<pre>
<code>
&lt;script>
export default{
    data(){
        return{
            isRed:"false",
            isLarge:"false",
        }
    }
}
&lt;/script>

&lt;template>
&lt;label for=""isred&lt;/label>
&lt;input type="checkbox" value="true" v-model="isRed">
&lt;label for="">islarge&lt;/label>
&lt;input type="checkbox" value="true" v-model="isLarge">
&lt;h2 :class="{red:isRed,large:isLarge}">here&lt;/h2>
&lt;/template>

&lt;style>
    .red{ color: red;}
    .large{font-size: 36pt;}
&lt;/style>
</code>
</pre>
            <div class="d-flex">
                <div>
                    <label for="">isred</label>
                    <input type="checkbox" value="true" v-model="isRed">
                    <label for="">islarge</label>
                    <input type="checkbox" value="true" v-model="isLarge">
                </div>
            <h2 :class="{red:isRed,large:isLarge}">here</h2>
            </div>

            <h1>v-model綁定陣列array</h1>
<pre>
<code>
&lt;script>
    export deflault{
        data(){
            return{ styleArr:[] }
        }
    }
&lt;/script>

&lt;template>
    &lt;label for="">Red&lt;/label>
    &lt;input type="checkbox" value="red" v-model="styleArr">
    &lt;label for="">Large&lt;/label>
    &lt;input type="checkbox" value="large" v-model="styleArr">
    &lt;label for="">bold&lt;/label>
    &lt;input type="checkbox" value="bold" v-model="styleArr">
&lt;/template>

&lt;style>
    .red{ color: red;}
    .large{font-size: 36pt;}
    .bold{font-weight: bolder;}
&lt;/style>
</code>
</pre>
            <div class="d-flex">
                <div>
                <label for="">Red</label>
                <input type="checkbox" value="red" v-model="styleArr">
                <label for="">Large</label>
                <input type="checkbox" value="large" v-model="styleArr">
                <label for="">bold</label>
                <input type="checkbox" value="bold" v-model="styleArr">
                </div>
            <h2 :class="styleArr">here</h2>
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

            <h1>V-mode與radio</h1>
            <p>單選按鈕</p>
<pre>
<code>
&lt;script>
    export deflault{
        data(){
            return{ 
                radioText:"" 
            }
        }
    }
&lt;/script>
&lt;label>早餐&lt;/label&gt;
    &lt;input type="radio" v-model="radioText" name="food" value="pork" id="breakfast"&gt;
&lt;label>中餐&lt;/label&gt;
    &lt;input type="radio" v-model="radioText" name="food" value="fish" id="launch"&gt;
&lt;label>晚餐&lt;/label&gt;
    &lt;input type="radio" v-model="radioText" name="food" value="beef" id="dinner"&gt;

    &lt;p>{ { this.radioText } }&lt;/p>
</code>
</pre>
            <label for="">早餐</label>
            <input type="radio" v-model="radioText" name="food" value="pork" id="breakfast">
            <label for="">中餐</label>
            <input type="radio" v-model="radioText" name="food" value="fish" id="launch">
            <label for="">晚餐</label>
            <input type="radio" v-model="radioText" name="food" value="beef" id="dinner">

            <p>{{ this.radioText }}</p>


            <h1>V-model與checkbox</h1>
            <p>若變數設為""則會全選且checkboxText也會變成布林值，所以必須設成陣列[]</p>
<pre>
<code>
&lt;script>
    export deflault{
        data(){
            return{ 
                checkboxText:[] 
            }
        }
    }
&lt;/script>
&lt;label>早餐&lt;/label&gt;
    &lt;input type="checkbox" v-model="checkboxText" name="meal" value="breakfast" id="breakfast"&gt;
&lt;label>中餐&lt;/label&gt;
    &lt;input type="checkbox" v-model="checkboxText" name="meal" value="launch" id="launch"&gt;
&lt;label>晚餐&lt;/label&gt;
    &lt;input type="checkbox" v-model="checkboxText" name="meal" value="dinner" id="dinner"&gt; 
&lt;p>{ {this.checkboxText} }&lt;/p>  
</code>
</pre>
            <label for="">早餐</label>
            <input type="checkbox" v-model="checkboxText" name="meal" value="breakfast" id="Bf">
            <label for="">午餐</label>
            <input type="checkbox" v-model="checkboxText" name="meal" value="launch" id="Lh">
            <label for="">晚餐</label>
            <input type="checkbox" v-model="checkboxText" name="meal" value="dinner" id="Din">
            <p>{{ this.checkboxText }}</p>


            <h1>v-bind</h1>
            <p>綁定標籤屬性 css or class，此處h2綁定title的屬性cool</p>
<pre>
<code>
&lt;script>
    export deflault{
        data(){
            return{ 
                title:"cool"
            }
        }
    }
&lt;/script>
&lt;h1 class="cool">cool1&lt;/h1>
&lt;h2 v-bind:class="title">cool2&lt;/h2>  

&lt;style>
.cool{
        color: blueviolet;
        margin-right: 50px;
    }
&lt;/style>          
</code>
</pre>
            <div class="d-flex">
            <h3 class="cool">cool1</h3>
            <h2 v-bind:class="title">cool2</h2>
            </div>
            
            <h1>v-bind綁定陣列</h1>
            <p>此範例為應用v-blind綁定陣列item，並以item裡的三個圖片做for迴圈便能快速做出三張卡片</p>
<pre>
<code>
&lt;script>
    export deflault{
        data(){
            return{ 
                item:[
                "../../public/Snackphoto/7.png",
                "../../public/Snackphoto/5.png",
                "../../public/Snackphoto/6.png",
            ],
            }
        }
    }
&lt;/script>
&lt;div class="d-flex ">
    &lt;div class="card " style="width: 18rem;" v-for="x in item" >
        &lt;img  v-bind:src= "x" class="card-img-top" alt="..." >
            &lt;div class="card-body">
            &lt;h5 class="card-title">Card title&lt;/h5>
            &lt;p class="card-text">Some quick example text to build on the card title&lt;/p>
            &lt;a href="#" class="btn btn-primary">Go somewhere&lt;/a>
            &lt;/div>
    &lt;/div>
&lt;/div>
</code>
</pre>
            <div class="d-flex ">
                <div class="card " style="width: 18rem;" v-for="x in item" >
                    <img  v-bind:src= "x" class="card-img-top" alt="..." >
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>



        
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
    h2{
        color: white;
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
        width: 50%;
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
    .cool{
        color: blueviolet;
        margin-right: 50px;
    }
    .red{
        color: red;
    }
    .large{
        font-size: 36pt;
    }
    .bold{
        font-weight: bolder;
    }
    .card-text{
        color: black;
    }



</style>
