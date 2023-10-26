<script>
export default{
    data(){
        return{
            name:false,
            name2:false,
            house:0,
            man:0,
        }
    },
    methods:{

    }
}
</script>
<template>
<!-- //////////////////////////////////////////////////////////////////////// -->
<div class="body">
<div class="MainArea">
            <h1>v-if</h1>
            <p>v-if條件成立才會建立標籤</p>
<pre>
<code>
 &lt;script>
export default{
    data(){
        return{
            name:false,
        }
    },
}
&lt;/script>
&lt;template>
&lt;label for="">我是&lt;/label>
    &lt;input type="checkbox" value="true" v-model="name">
    &lt;p v-if="name">tom&lt;/p>
&lt;/template>
</code>
</pre>
    <div class="vifImg"></div>  
        <div class="d-flex ">
            <label for="">我是</label>
            <input type="checkbox" value="true" v-model="name">
            <p v-if="name">Tom</p>
        </div>
    <!-- //////////////////////////////////////////////////////////////////////// -->
            <h1>v-if & v-else</h1>
<pre>
<code>
&lt;script>
export default{
    data(){
        return{
            house:0,
        }
    },
}
&lt;/script>
&lt;template>
&lt;p>我有&lt;/p>
&lt;select name="" id="" v-model="house">
    &lt;option value="1">1&lt;/option>
    &lt;option value="2">2&lt;/option>
&lt;/select>
&lt;p>間房&lt;/p>
&lt;p v-if="house ==1">不錯呢&lt;/p>
&lt;p v-else>讚喔喔&lt;/p>
</code>
</pre>       
            <label for="">我有</label>
            <select name="" id="" v-model="house">
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
            <p>間房</p>
            <p v-if="house ==1">不錯呢</p>
            <p v-else>讚喔喔</p>
<!-- ///////////////////////////////////v-if &v-else-if & v-else///////////////////////////////////// -->
            <h1>v-if &v-else-if & v-else</h1>
                <label for="">我有</label>
                <select name="" id=""  v-model="man">
                    <option value="0">1</option>
                    <option value="1">2</option>
                    <option value="2">3</option>
                </select>
                <label>個小弟</label>
            <p v-if="man==0">就你倆 能搞出啥花樣</p>
            <p v-else-if="man==1">有點東西</p>
            <p v-else>挖操塊逃</p>
<!-- //////////////////////////v-show//////////////////////////////////////////////v-show -->
            <h1>v-show</h1>
            <p>在條件未達成前為display:none</p>
            <div class="vshowimg"></div>
            <label for="">我是</label>
            <input type="checkbox" value="true" v-model="name2">
            <label v-show="name2">jenny</label>
        </div>
</div>
</template>
<style lang="scss" scoped>
.body{
    padding-top: 5%;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
}
pre{
    background-color: whitesmoke;
}
label{
    font-size: 20pt;
    margin-bottom: 5px;
}
p{
    font-size: 20pt;
    margin-bottom: 10px;
}

h1{
    background-color: orangered;
    border-radius: 10px;
    padding-left: 2%;
}
.MainArea{
    width: 50%;
    margin: 0 25%;
}
.vifImg{
    height: 169px;
    background-repeat: no-repeat;
    background-image: url(../../public/v-if.PNG);

}
input{
    width: 20pt;
}
select{
    height: 25px;
}
.v-else{
}
.vshowimg{
    background-image: url(../../public/v-show.PNG);
    height: 100px;
    background-repeat: no-repeat;
}


</style>