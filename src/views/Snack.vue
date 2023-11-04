<script>
export default{
    data(){
        return{
        }
    }
}
</script>

<template>
<div class="body">
    <div class="mainArea">
        <div class="area1">
            <div class="area1Box"></div>
            <div class="area1Hamgurger"></div>
        </div>
        <div class="area2">
            <div class="area2text">
                <h1>Title</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, dignissimos. Commodi sequi quam omnis eius, rem nobis libero assumenda distinctio porro nemo aut sit cumque laborum nostrum laudantium veniam consequatur?</p>
            </div>
            <div class="area2Img"></div>
        </div>
        <div class="area3">
            <h1 >OnSale</h1>
            <div class="area3ImgArea">
                <div class="area3Img"  v-for="x in 3">

                    <button>buy it!</button>
                </div>
            </div>
        </div>
        <div class="area4">
            <h1>News</h1>
            <div class="cardArea">
                <div class="card" style="width: 16rem;">
                    <img src="../../public/Snackphoto/6.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on thcontent.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>

                <div class="card" style="width: 16rem;">
                    <img src="../../public/Snackphoto/5.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on thcontent.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>

                <div class="card" style="width: 16rem;">
                    <img src="../../public/Snackphoto/7.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on thcontent.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
            <button type="button">more</button>
        </div>
        <div class="area5">
            <div class="area5Img"></div>
            <div class="area5Text">
                <h1>Title</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium optio magnam repudiandae officia explicabo dolores, sit nemo voluptas quos cupiditate, a vero libero neque! Doloremque earum commodi perferendis illum libero?
                </p> 
                </div>
        </div>
        <div class="area6">
        </div>
    </div>
</div>
</template>



<style lang="scss" scoped>
$color: #ECE3CE;
$color1: #739072;
$color2: #4F6F52;
$color3: #3A4D39;

p{
    color: $color;
    font-weight: bold;
}

h1{
    color: $color;
    text-align: center;
}

h5{
    color: $color;
}

.body{
    height: auto;
    background-color: #232D3F;
    .mainArea{
        width: 70%;
        height: auto;
        margin: 0 15%;
        .area1{
            height: 15vh;
            background-color: $color2;
            position: relative;
            .area1Box{
                height: 70%;
                width: 8%;
                background-color: $color;
                position: absolute;
                bottom: 0;
                left: 10%;
            }
            .area1Hamgurger{
                height: 50%;
                width: 10%;
                background-image: url(../../public/Snackphoto/Group\ 10.png);
                background-repeat: no-repeat;
                position: absolute;
                bottom: 0;
                right:10%;
            }
        }
        .area2{
            height: 70vh;
            background-color: $color2;
            padding: 5%;
            display: flex;
            .area2text{
                width: 50%;
                padding: 0 2%;
            }
            .area2Img{
                height: 100%;
                width: 50%;
                background-image: url(../../public/Snackphoto/1.png);
                background-size: contain;
            }
        }
        .area3{
            width: 100%;
            height: 60vh;
            background-color: $color2;
            padding-bottom: 5%;
            .area3ImgArea{
                width: 100%;
                height: 83%;
                display: flex;
                justify-content: space-around;
                .area3Img{
                    width: 30%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    background-image: url(../../public/Snackphoto/3.png);
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: 50% 50%;
                    button{
                        position: absolute;
                        bottom: 2%;
                        width: 50%;
                        height: 15%;
                        background-color: rgb(137, 4, 4);
                        color: $color;
                        font-weight: bold;
                    }
                }
            }
            

        }
        .area4{
            background-color: $color1;

            .cardArea{
                display: flex;
                justify-content: space-around;
                .card{
                    background-color: $color3;
                }
            }
            button{
                width: 20%;
                height: 50px;
                margin: 0 40%;
                margin-top: 2%;
                background-color: $color;
                color: $color3;
                font-weight: bolder;
            }
            
        }
        .area5{
            height: 60vh;
            background-color: $color1;
            padding: 5%;
            display: flex;
            .area5Img{
                width: 50%;
                height: 100%;
                background-image: url(../../public/Snackphoto/8.png);
                background-size: contain;
                background-repeat: no-repeat;
            }
            .area5Text{
                width: 50%;
                height: 100%;
                padding: 2%;
            }
        }
        .area6{
            height: 10vh;
            background-color: $color2;

        }
    }
}

</style>