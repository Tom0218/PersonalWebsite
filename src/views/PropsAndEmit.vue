<script>
import Dog1 from "../components/dog1.vue"
import Dog2 from "../components/Dog2.vue"
export default{
    data(){
        return{
            page : 0,
            infoBox:"",
        }
    },
    components:{
        Dog1,
        Dog2,
    },
    methods:{
        GoFatherObj(userinfo){
            console.log(userinfo)
            this.infoBox = userinfo
        },
        GoDog2(){
            this.page+=2
            this.infoBox.page+=1
            console.log(this.infoBox.page)
        }

    }
}

</script>

<template>
    <div class="MainArea">
        <div class="Register" v-if="this.infoBox.page==1">
            <h1>Father</h1>
            <P>Name is  {{ this.infoBox.name}}</P>
            <p>Age is {{ this.infoBox.age }}</p>
            <button type="button" @click="GoDog2">GoDog2</button>
            </div>
            <div v-else-if="page==0">
            <Dog1 @userinfo = "GoFatherObj"/>
            </div>
            <div v-else>
            <Dog2 :userData = this.infoBox></Dog2>
            </div>
    </div>
</template>

<style lang="scss" scoped>
    .MainArea{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 50px;
        .Register{
            width: 300px;
            height: 300px;
            border: 1px black solid;
        }
    }

</style>