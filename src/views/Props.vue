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
        }
    }
}
</script>

<template>
    <div class="MainArea">
        <div class="Register" v-if="Page==1">
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
            <p>sex</p>
            <input type="radio" name="sex" value="man" v-model="this.propsObject.sex">男
            <input type="radio" name="sex" value="wemon" v-model="this.propsObject.sex">女
            <p>Interest</p>
            <input type="text" v-model="this.propsObject.Interest">

            <button type="button" @click="changePage()">next</button>
            
            </div>
            <div class="show" v-else-if="Page ==2">
                <Child
                :person= propsObject
                />    
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
}
.MainArea{
        height: 80vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
}
.sex{
    margin:10px 0;
    label{
    
    }
}

</style>