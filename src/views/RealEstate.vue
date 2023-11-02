<script>
import { RouterLink,RouterView } from 'vue-router';

export default{
    components:{
        RouterLink,
        RouterView,
    },
    data(){
        return{
            page:1
        }
    },
    methods:{
        golocationSearch(){
            this.page =2;
        },
        gohome(){
            this.page = 1;
        }
    }
}
</script>
<template>

<div class="header">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <div class="MainArea">
            <div class="square"></div>
            <div class="d-flex TopRight">
                <div class="hyperlink " @click="gohome()">
                    <RouterLink to="/RealEstate">会社案内</RouterLink>
                    <span>|</span>
                    <a href="">店舗．アクセス</a>
                </div>
                <div class="phoneNumber">
                    <i class="fa-solid fa-phone" ></i>
                    <span>010-123456789</span>
                </div>
                <div class="headerLink">
                    <div class="d-flex">
                    <RouterLink to="/RealEstate/RealEstateLogInPage" @click="golocationSearch()">ログイン</RouterLink>
                    <p>｜</p>
                    <RouterLink to="/RealEstate/RealEstateAsk" @click="golocationSearch()">お問い合わせ</RouterLink>
                </div>
            </div>
        </div>
    </div>
</div>
<div v-if="this.page ==1">
<div class="imgArea">
        <div>
            <!-- ///////////////////////輪播//////////////////////////////////////////////// -->
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active ">
                <img src="../../public/RealEstate/banner1.png" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item ">
                <img src="../../public/RealEstate/banner2.png" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item ">
                <img src="../../public/RealEstate/banner3.png" class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>        
            <div class="footer">
                <div class="footerContent">
                <div class="HomeBox1">
                <RouterLink to="#">タッグから探す</RouterLink>
                </div>
                <div class="HomeBox1">
                    <RouterLink to="/RealEstate/RealEstateLocationSearch" @click="golocationSearch()">エリアから探す</RouterLink>
                    
                </div>
                <div class="HomeBox1">
                <RouterLink to="#">沿線．駅から探す</RouterLink>
                </div>
                </div>
        </div>
    </div>
</div>
</div>
    <div v-if="this.page=== 2">
        <RouterView/>
    </div>

</template>
<style lang="scss" scoped>
.header{
    height: 15%;
    margin: 0;
    background-color: white;
    a{
        font-weight: bold;
        text-decoration: none;
        color: white;
    }
    .MainArea{
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;.square{
            background-color: #475467;
            height: 70px;
            width: 70px;
            margin-left: 6%;
        }
        .hyperlink{
            display: flex;
            justify-content: center;
            align-items: end;
            margin-left: 200px;
            a{
                color: black;
            }
                }
        .phoneNumber{
            display: flex;
            justify-content: center;
            align-items: end;
            margin-left: 400px;
        }
        .headerLink{
            border-radius: 5px;
            background-color: #475467;
            height: 25px;
            margin-left: 10px;
            p{
                color: white;
            }
        }
        span{
            margin: 0 10px;
        }
    }




}
.imgArea{
    a{
    color: white;
    font-weight: bold;
    text-decoration: none;
    text-align: center;
}

.carousel-inner{
    height: 50vh;
}
.footer{
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .footerContent{
        width: 50%;
        height: 60%;
        display: flex;
        justify-content: space-between;
        .HomeBox1{
            height: 100px;
            width: 200px;
            border-radius: 10px;
            background-color: #475467;   
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    } 
}
}
</style>