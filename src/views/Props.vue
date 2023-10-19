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
            Info:["Name","Phone","Email","Address","GraduatedSchool","sex","Interest"]
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
            <input type="text" v-model="this.Name">
            <p>Phone</p>
            <input type="text" v-model="this.Phone">
            <p>Eamil</p>
            <input type="text" v-model="this.Eamil">
            <p>Address</p>
            <input type="text" v-model="this.Address">
            <p>GraduatedSchool</p>
            <input type="text" v-model="this.GraduatedSchool">
            <p>sex</p>
            <input type="radio" name="sex" value="man" v-model="sex">男
            <input type="radio" name="sex" value="wemon" v-model="sex">女
            <p>Interest</p>
            <input type="text" v-model="this.Interest">

            <button type="button" @click="changePage()">next</button>
            
            </div>
            <div class="show" v-else-if="Page ==2">
                <Child
                :person={Name,Phone,Eamil,Address,GraduatedSchool,sex,Interest}
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