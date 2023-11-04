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
            <div class="square"></div>
            <div class="linkArea">
                <div class="leftLink " @click="gohome()">
                    <RouterLink to="/RealEstate">会社案内</RouterLink>
                    <p>|</p>
                    <a href="">店舗．アクセス</a>
                </div>
                <div class="phone">
                    <i class="fa-solid fa-phone" ></i>
                    <span>010-123456789</span>
                </div>
                <div class="rightLink">
                    <div class="d-flex">
                    <RouterLink to="/RealEstate/RealEstateLogInPage" @click="golocationSearch()" class="link">ログイン</RouterLink>
                    <p>｜</p>
                    <RouterLink to="/RealEstate/RealEstateAsk" @click="golocationSearch()" class="link">お問い合わせ</RouterLink>
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
a{
    font-weight: bold;
    text-decoration: none;
}
p{
    margin: 0 10px;
}
.header{
    width: 100vw;
    height: 15vh;
    margin: 0;
    background-color: #F5F7F8;
        display: flex;
        height: 15vh;
        width: 100%;
        align-items: center;
        .square{
            background-color: #475467;
            height: 60%;
            width: 4%;
            margin-left: 6%;
        }
        .linkArea{
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            .leftLink{
                display: flex;
                margin-left: 2%;

            }
            .rightLink{
                margin-left: 4%;
                background-color: #475467;
                border-radius: 10px;
                padding: 0 1%;
                .link{
                    color: white;
                    font-weight: bold;
                }
            }
            .phone{
                margin-left: 35%;
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
        height: 55vh;
    }
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
</style>