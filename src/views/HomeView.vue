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
    <h2>Hi! guys 我是謝育騰 Hsieh YuTeng </h2>

    <div class="ContentArea">
      <div class="Img"></div>
      <div class="Introduction">
        <ul>
          <li>我畢業於台南應用科技大學資訊管理系，於2023年9月份參加了產業新尖兵計畫，對整個網頁前後端有了新的認知，從剛開始只會簡單的CSS切版以到現在使用Vue框架將各個元件插入網頁使我的程式碼不再日漸壯大也增加了易讀性、以及Bootstrap套件的應用使得建構網頁更快速。學習網頁設計讓我能具體化我的想法並以網頁的方式呈現出來，建構網站的過程使我沉溺其中。</li>
          <li>此網頁彙整了整個學習歷程的點點滴滴，不定期更新中!!!</li>
        </ul>
      </div>
    </div>
  </div>
  
  

</template>


<style lang="scss" scoped>
  h2{
    color: white;
    margin-top: 50px;
    font-size: 36pt;
    padding: 0 20px;
  }

  p{
    color: white;
  }
  li{
    color: white;
  }
  .page{
    height: 100vh; 
    align-items: center;
    background-color: black;
    border-top: 1px white solid;
    margin: 0%;
    .ContentArea{
      display: flex;
      margin-top: 50px;
      margin-left: 20%;
    .Img{
      width: 30%;
      height: 400px;
      background-image: url(../../public/selfie.JPG);
      background-size: contain;
      background-position: 50% 50%;
      background-repeat: no-repeat;
    }
    .Introduction{
      width: 400px;
      margin-top: 20px;

    }
  }
  }


</style>


