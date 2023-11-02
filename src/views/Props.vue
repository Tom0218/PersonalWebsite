<script>
import  Child  from "../components/Child.vue";
export default{

    data(){
        return{
            Page:1,
            propsObject:{
                Name:"",
                Phone:"",
                Eamil:"",
                Address:"",
                GraduatedSchool:"",
                sex:"",
                Interest:""
            },
        }
    },
    components:{
        Child
    },
    methods:{
        changePage(){
            this.Page+=1
        },
        PageControl(x){
            this.Page =1;
        }
    }
}
</script>

<template>
<div class="MainArea">
        
<div class="inputArea">
        <div class="d-flex Register" v-if="Page===1">
<div class="code">
<pre>
<code>
&lt;script>
----------------------------------------------------------|
import  Child  from "../components/Child.vue";            | 導入子層 
----------------------------------------------------------|
export default{
    data(){
        return{
            Page:1,
            propsObject:{  
                Name:"",
                Phone:"",
                Eamil:"",
                Address:"",
                GraduatedSchool:"",
                sex:"",
                Interest:""      
            },
    }
},
-------------------|
    components:{   |
        Child      |串接
    },             |
-------------------|
    methods:{
        changePage(){
            this.Page+=1
        }
    }
}
&lt;/script>
&lt;template>
    &lt;button type="button" @click="changePage()">Gochildren&lt;/button>
            
    &lt;/div>
    &lt;div class="show" v-else-if="Page ==2">
----------------------------------|
    &lt;Child                        |      
        :person= propsObject      | 將propsObject v-bind綁定變數person
        />                        |
----------------------------------|
    &lt;/div>
    &lt;/div> 
&lt;/template>
</code>
</pre>
</div>
            <div>
                <p>Name</p>
                <input type="text" v-model="this.propsObject.Name">
                <p>Phone</p>
                <input type="text" v-model="this.propsObject.Phone">
                <p>Eamil</p>
                <input type="text" v-model="this.propsObject.Eamil">
                <p>Address</p>
                <input type="text" v-model="this.propsObject.Address">
                <p>GraduatedSchool</p>
                <input type="text" v-model="this.propsObject.GraduatedSchool">
                <div class="d-flex">
                <p class="sextext">sex : </p>
                    <input type="radio" name="sex" value="man" v-model="this.propsObject.sex">man
                    <input type="radio" name="sex" value="wemon" v-model="this.propsObject.sex">wemen
                </div>
                <p>Interest</p>
                <input type="text" v-model="this.propsObject.Interest">
                <div>
                    <button type="button" @click="changePage()">Gochildren</button>
                </div>
            </div>
        </div>
        <div class="show" v-else-if="Page ===2">
        <Child
        :person= propsObject @PageControl="PageControl"
        />    
        </div>
</div>

</div>
</template>

<style lang="scss" scoped>
input{
    margin: 0;
    
}

p{
    color: black;
    margin: 0;
    font-weight: bold;
}
.MainArea{
        height: auto;
        display: flex;
        justify-content: center;
}
.code{
    margin-right: 100px;
}
.sex{
    margin:10px 0;
}
pre{
    background-color: whitesmoke;
}
.sextext{
    margin-right: 10px;
}
button{
    font-weight: bold;
    margin-top: 10px;
}
.inputArea{
    margin-top: 5%;
}

</style>