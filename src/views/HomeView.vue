<script >
import { RouterLink,RouterView } from 'vue-router'

export default{
  data(){
    return{

      name: 'home',//11/23
    }
    },
    components :{
      RouterLink,
    }
}
</script>


<template>
    <!-- ----------------------------------------------------------------------------version1 -->
  <!-- <div class="page">
    <div>
      <h2>Hi! guys 我是謝育騰 Hsieh YuTeng </h2>
      <div class="ContentArea">
        <div class="Img"></div>
        <div class="Introduction">
          <ul>
            <li>我畢業於台南應用科技大學資訊管理系，於2023年9月份參加了產業新尖兵計畫，對整個網頁前後端有了新的認知，從起初只會簡單的CSS切版以到能使用Vue框架建構網頁，使用Bootstrap將各個元件插入網頁使建構網頁更快速、學習網頁設計讓我能具體化我的想法並以網頁的方式呈現出來，建構網站的過程使我付有成就感，能把自己的想法體現出來。</li>
            <li>應用 :  HTML、CSS、JavaScript、Boostrap、Vue.js</li>
          </ul>
        </div>
      </div>
    </div>
  </div> -->

  <!-- ----------------------------------------------------------------------------version1 -->

  <!-- ----------------------------------------------------------------------------version2 -->
<div class="v2Body">
  <div class="linkArea">
        <RouterLink to="/Practice01" class=" btncss2">切版01</RouterLink>
        <RouterLink to="/Practice02" class=" btncss2" >切版02</RouterLink>
        <RouterLink to="/Snack" class=" btncss2" >切版03</RouterLink>
        <RouterLink to="/GuessNumber" class=" btncss2" >猜數字</RouterLink>
        <RouterLink to="/FindPrimeNumbers" class=" btncss2" >找質數</RouterLink>
        <RouterLink to="/Login" class=" btncss2" >登入 & 註冊</RouterLink>
        <RouterLink to="/RealEstate" class=" btncss2" >房地產管理系統</RouterLink>
        <RouterLink to="/WeatherAPI" class=" btncss2" >天氣API</RouterLink>
        <RouterLink to="/weatherAPIV2" class="btncss2" >天氣API 2.0</RouterLink>
        <RouterLink to="/WaterFall" class=" btncss2" >瀑布流</RouterLink>
        <RouterLink to="/ExpenseTracker" class="btncss2" >記帳</RouterLink>
        <RouterLink to="/Questionnaire" class=" btncss2" >動態問卷(後台)</RouterLink>
        <RouterLink to="/QuestionnaireFront" class=" btncss2" >動態問卷(前台)</RouterLink>
        <RouterLink to="/Test" class="btncss2" >測試</RouterLink>
        
    </div>
   
</div>


</template>


<style lang="scss" scoped>
  //<!-- ----------------------------------------------------------------------------version1 -->
  // h2{
  //   color: white;
  //   font-size: 28pt;
  //   padding: 0 20px;
  //   background-color: #008170;
  //   border-radius: 20px;
  // }

  // p{
  //   color: white;
  // }
  // li{
  //   color: white;
  //   font-size: 16pt;
  //   margin: 2% 0;
  // }
  // .page{
  //   height: 100%; 
  //   background-color: #232D3F;
  //   border-top: 1px white solid;
  //   padding: 100px;
  //   display: flex;
  //   justify-content: center;
  //   .ContentArea{
  //     height: 100%;
  //     width: 100%;
  //     display: flex;
  //     background-color: rgb(0, 91, 65);
  //     border-radius: 10%;
  //     .Img{
  //       width: 50%;
  //       height: 100%;
  //       background-image: url(../../public/bike01.jpg);
  //       background-size: contain;
  //       background-position: 50% 50%;
  //       background-repeat: no-repeat;
  //       margin:0 4%;
  //       border-radius: 5%;
        
  //     }
  //     .Introduction{
  //       width: 500px;
  //       margin-top: 20px;
  //     }
  // }
  // }
  //<!-- ----------------------------------------------------------------------------version1 -->
  .Btn{
        color:white;
        font-size: 16pt;
        font-weight: bold;
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

.v2Body{
  height: 100vh;
  background-color: #232D3F;
  display: flex;
  justify-content: center;
  align-items: center;
  .linkArea{
    width: 70%;
    height: auto;
    margin: 0 15%;
  }
}

// ------------------------------------------------------btn特效
.btncss2,
.btncss2:focus {
  display: inline-block; 
    position: relative;
    min-width: 200px;
    background: transparent;
    color: #ccf407;
    font-size: 1rem;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    box-sizing: inherit;
    padding: 10px 20px;
    border: 1px solid;
    box-shadow: inset 0 0 20px rgba(225, 51, 45, 0);
    outline: 1px solid !important;
    outline-color: rgba(207, 225, 45, 0.5);
    outline-offset: 0px;
    text-shadow: none;
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);

}
.btncss2:hover {
    color: #e0fd05;
    border: 1px solid;
    box-shadow: inset 0 0 20px rgba(214, 254, 10, 0.5), 0 0 20px rgba(225, 51, 45, 0.2);
    outline: 1px solid !important;
    outline-color: rgba(225, 51, 45, 0) !important;
    outline-offset: 15px;
    text-shadow: 1px 1px 2px #427388;
}
//------------------------------------------------------btn特效


</style>


