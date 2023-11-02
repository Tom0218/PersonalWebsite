<script >
import { RouterLink,RouterView } from 'vue-router'
import Header from '../components/Header.vue'

export default{
  data(){
    return{
    }
    },
    components :{
      RouterLink,
      Header,
    }
}
</script>


<template>
  <div class="page">
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
  </div>
</template>


<style lang="scss" scoped>
  h2{
    color: white;
    font-size: 28pt;
    padding: 0 20px;
    background-color: #008170;
    border-radius: 20px;
  }

  p{
    color: white;
  }
  li{
    color: white;
    font-size: 16pt;
    margin: 2% 0;
  }
  .page{
    height: 100%; 
    background-color: #232D3F;
    border-top: 1px white solid;
    padding: 100px;
    display: flex;
    justify-content: center;
    .ContentArea{
      height: 100%;
      width: 100%;
      display: flex;
      background-color: rgb(0, 91, 65);
      border-radius: 10%;
      .Img{
        width: 50%;
        height: 100%;
        background-image: url(../../public/bike01.jpg);
        background-size: contain;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        margin:0 4%;
        border-radius: 5%;
        
      }
      .Introduction{
        width: 500px;
        margin-top: 20px;
      }
  }
  }


</style>


