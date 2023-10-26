<script>
import Dog1 from "../components/dog1.vue"
import Dog2 from "../components/Dog2.vue"
export default{
    data(){
        return{
            page : 1,
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
            this.page = userinfo.page
        },
        GoDog1(){
            this.page = 2 ;
        }

    }
}

</script>

<template>
    <div class="MainArea">
        <div class="TextArea">
            此時做主要功能是讓使用者在子網頁(dog1)進行輸入並傳送至主網頁(Father)，並由主網頁再將資料帶到另一個子網頁(Dog2)且可直接於dog2上進行修改
        </div>
        <div class="Register" v-if="page == 1">
            <div>
            <h1>後台</h1>
            <P>Name is  {{ this.infoBox.name}}</P>
            <p>Age is  {{ this.infoBox.age }}</p>
            <button type="button" @click="GoDog1">GoDog1</button>
            </div>
        </div>  
        <div v-else-if="page === 2">
            <Dog1 @userinfo = "GoFatherObj"/>
        </div>
            <div>
            <Dog2 :userData = this.infoBox v-model:age="infoBox.age" v-model:name="infoBox.name" />
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
            display: flex;
            padding-left: 4%;
            padding-top: 0.5%;
        }
        .TextArea{
            width: 200px;
            height: 200px;
            margin-right: 2%;
            border-radius: 5px;
            border: 1px black solid;
        }
    }

</style>