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
        <div class="logo"><img src="../../public/logo.png"></div>
        <RouterLink to="/" class="Home Btn Btn shape-ex1">Home</RouterLink>
        <RouterLink to="/Note" class=" Btn shape-ex1" >Note</RouterLink>
        <RouterLink to="/About" class=" Btn shape-ex1" >About</RouterLink>
        <p class=" Btn shape-ex1 Pinia" >{{ this.location }}</p>
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
        color: #ccf407;
        font-size: 16pt;
        margin:  0 20px;
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
        background-color:#ccf407;
        position: absolute;     //絕對位置
        bottom: 0;              //最底部
        left: 0;                //由左開始
        transition: all .3s linear;   //所有css屬性於三秒內均速(lineat)變化完成
    }
    .shape-ex1:hover::after{  //當移動到.shape-ex1類別的元素上時寬度為父元素的100%
        width: 100%;
    }
    .logo{
        height: 50px;
        width: 50px;
        display: flex;
        justify-content: center;
        img{
        }
    }

</style>