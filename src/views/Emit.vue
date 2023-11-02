<script>

import child2 from "../components/Child.2.vue"
export default{
    data(){
        return{
            ChildText:"",
        }
    },
    components:{
        child2
    },
    methods:{
        emitObj(params){
                console.log(params)
                this.ChildText = params   
        }
    }
}
</script>

<template>
<div class="showArea">
    <div class="inputArea">
        <div class="MainArea">
            <h1>Emit</h1>
            {{ this.ChildText }}
<pre>
<code>
&lt;script>
-------------------------------------------------|
import child2 from "../components/Child.2.vue"   |  導入child
-------------------------------------------------|
export default{
----------------------|
    components:{      |
        child2        | 導入child
    },                |
----------------------|
    methods:{
        emitObj(params){
                console.log(params)
                this.ChildText = params    
        }
    }
}
&lt;/script>
&lt;template>
{ { this.ChildText } }
-------------------------------|
&lt;child2 @apple="emitObj"/>     |   以變數名稱接收子層訊息，
-------------------------------|        並以方法執行他
&lt;/template>
</code>
</pre>
        </div>
        <div>
    <!-- 告知子元件想要父元件做什麼事就傳遞apple暗號 -->
    <child2 @apple="emitObj"/>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.showArea{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    .MainArea{

        width: 500px;
        margin-right: 5%;
    }
}
pre{
    background-color: whitesmoke;
    margin-top: 20px;
}
p{
    font-weight: bold;
}
.inputArea{
    margin-top: 3%;
    display: flex;
    height: auto;
}
</style>