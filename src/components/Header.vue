<script>
import { RouterLink} from 'vue-router';
import { mapState,mapActions } from 'pinia';
import indexState from '../stores/indexState';
export default{
    components:{
        RouterLink
    },
    computed:{
        ...mapState(indexState,["location","locationInfo"])
    },
    methods:{
        ...mapActions(indexState,["getLocation","setLocation"])
    },
    mounted() {
        this.getLocation();
        // this.setLocation();
    }
}

</script>

<template>
    <div class="headerpage">
        <RouterLink to="/" class="Home Btn Btn shape-ex1">Home</RouterLink>
        <RouterLink to="/VtextAndVmodel" class=" Btn shape-ex1" >Vtext and Vmodel</RouterLink>
        <RouterLink to="/VifandVshow" class=" Btn shape-ex1" >v-If and v-show</RouterLink>
        <RouterLink to="/Props" class=" Btn shape-ex1" >Props</RouterLink>
        <RouterLink to="/Emit" class=" Btn shape-ex1" >Emit</RouterLink>
        <RouterLink to="/PropsAndEmit" class=" Btn shape-ex1" >Props and Emit</RouterLink>
        <RouterLink to="/Practice01" class=" Btn shape-ex1" >切版01</RouterLink>
        <RouterLink to="/Practice02" class=" Btn shape-ex1" >切版02</RouterLink>
        <RouterLink to="/Snack" class=" Btn shape-ex1" >甜點切版</RouterLink>
        <RouterLink to="/GuessNumber" class=" Btn shape-ex1" >猜數字遊戲</RouterLink>
        <RouterLink to="/FindPrimeNumbers" class=" Btn shape-ex1" >找質數</RouterLink>
        <RouterLink to="/Login" class=" Btn shape-ex1" >登入 & 註冊</RouterLink>
        <RouterLink to="/RealEstate" class=" Btn shape-ex1" >房地產管理系統</RouterLink>
        <RouterLink to="/WeatherAPI" class=" Btn shape-ex1" >天氣API</RouterLink>
        <RouterLink to="/WaterFall" class=" Btn shape-ex1" >瀑布流練習</RouterLink>
        <RouterLink to="/WatchandComputed" class=" Btn shape-ex1" >watch and computed</RouterLink>
        <RouterLink to="/ProvideAndInject" class=" Btn shape-ex1" >Provide and inject</RouterLink>
        <RouterLink to="/ExpenseTracker" class=" Btn shape-ex1" >記帳網頁</RouterLink>
        <RouterLink to="Note" class=" Btn shape-ex1" >Note</RouterLink>
        <RouterLink to="About" class=" Btn shape-ex1" >About</RouterLink>

        <!-- <p class=" Btn shape-ex1 Pinia" >{{ this.location }}</p> -->
    </div>
</template>

<style lang="scss" scoped>
    .headerpage{
        background-color: #1b1818;
        height: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .Btn{
        color: white;
        font-size: 16pt;
        margin:  20px;
        text-decoration: none;
        text-align: center;
    }
    .shape-ex1{
    font-size: 18px;
    display: inline-block;   //以inline的方式呈現同時有block的屬性
    vertical-align: middle; //讓block垂直對齊到父元素
    position: relative; 
    margin-left: 20px;
    }
    .shape-ex1:after{
        content: '';
        width: 0%;
        height: 1px;
        background-color:white;
        position: absolute;     //絕對位置
        bottom: 0;              //最底部
        left: 0;                //由左開始
        transition: all .3s linear;   //所有css屬性於三秒內均速(lineat)變化完成
    }
    .shape-ex1:hover::after{  //當移動到.shape-ex1類別的元素上時寬度為父元素的100%
        width: 100%;
    }

</style>