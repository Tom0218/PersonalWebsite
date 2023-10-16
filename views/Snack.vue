<script></script>

<template>
    <div class="body">
        <div class="header page">
                <div class="headerSquare">

                </div>
                <img src="../../public/Snackphoto/Group 10.png" alt="" class="hanburger">
            </div>
            <div class="second page">
                <div class="secondText">
                    <h1>Title</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos pariatur vitae officia excepturi? Quas voluptatum minima quibusdam neque laborum iste quo saepe. Excepturi autem ipsum eius rerum neque voluptates ea facere dolore laborum delectus vitae obcaecati quaerat consequuntur voluptatibus asperiores dolor, totam ad doloremque est blanditiis facilis reiciendis. Quisquam, ratione.</p>
                </div>
                <div class="secondImg">

                </div>
            </div>
            <div class="onSale page">
                
                <h1 class="onsaleText">On sale</h1>
                <div class="onSaleImgs">
                    <div class="saleImg1">
                        <button type="button" class="saleBtn1">item</button>
                    </div>
                    <div class="saleImg2">
                        <button type="button" class="saleBtn1">item</button>
                    </div>
                    <div class="saleImg3">
                        <button type="button" class="saleBtn1">item</button>
                    </div>
                </div>
            </div>
            <hr />
            <div class="news page">
                <h1>News</h1>
                <div class="cradsArea">
                    <div class="crad1">
                        <img src="../../public/Snackphoto/5.png" alt="">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet veritatis unde pariatur</p>
                        <button type="button" class="cradBtn">Detail</button>
                    </div>
                    <div class="crad2">
                        <img src="../../public/Snackphoto/6.png" alt="">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet veritatis unde pariatur</p>
                        <button type="button" class="cradBtn">Detail</button>
                    </div>
                    <div class="crad3">
                        <img src="../../public/Snackphoto/7.png" alt="">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet veritatis unde pariatur</p>
                        <button type="button" class="cradBtn">Detail</button>
                    </div>
                </div>
                <button type="button" class="newBtn">More</button>
            </div>
            <div class="arrival page">
                <img src="../../public/Snackphoto/8.png" alt="">
                <div class="arrivalText">
                    <h1>New Arrival</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore debitis dolores architecto eos? Perspiciatis quasi non obcaecati esse tempore. Reiciendis natus ad accusamus maiores ab obcaecati, sapiente quos adipisci, commodi recusandae blanditiis molestiae consequatur beatae aut ipsam reprehenderit et consequuntur iusto aliquam culpa nemo eum perferendis. Dignissimos nisi recusandae numquam autem tempore dolor? Provident rerum eum eveniet laudantium sequi ab?</p>
                </div>
            </div>
            <div class="footer page">
                <p>Copyright©2023 by kouhei</p>
            </div>
    </div>
</template>



<style lang="scss" scoped>
$mainColor: orange;

.body{
    background-color: whitesmoke;
}

.page {
    width: 90%;
    margin: 0 5%;
    margin-top: 5%;
    display: flex;
}

.header {
    height: 15vh;
    position: relative;

    .headerSquare {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        background-color: $mainColor;
    }

    .hanburger {
        position: absolute;
        right: 0;
        top: 20px;
        width: 41px;
        height: 40px;
    }
}

.second {
    height: 60vh;
    justify-content: space-between;

    .secondText {
        height: 100%;
        width: 40%;

        h1 {
            margin-left: 10%;
        }
    }

    .secondImg {
        height: 100%;
        width: 50%;
        background-image: url("../../public/Snackphoto/3.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 100% 0%;
    }
}

.onSale {
    height: 60vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    background-color: $mainColor;

    .onsaleText{
        background-color: orange;
        color: white;
        border-radius: 5px;
        margin-top: 10px;

    }

    .onSaleImgs {
        width: 100%;
        height: 90%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        .saleImg1 {
            width: 30%;
            height: 95%;
            background-image: url("../../public/Snackphoto/2.png");
            background-size: contain;
            background-position: 50% 50%;
            background-repeat: no-repeat;
            position: relative;
            display: flex;
            justify-content: center;

            .saleBtn1 {
                width: 50%;
                height: 15%;
                color: white;
                font-size: 20pt;
                border: 0;
                border-radius: 10px;
                background-color: $mainColor;
                position: absolute;
                bottom: 20px;
            }
        }

        .saleImg2 {
            width: 30%;
            height: 95%;
            background-image: url("../../public/Snackphoto/4.png");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: 50% 50%;
            position: relative;
            display: flex;
            justify-content: center;

            .saleBtn1 {

                width: 50%;
                height: 15%;
                color: white;
                font-size: 20pt;
                border: 0;
                border-radius: 10px;
                background-color: $mainColor;
                position: absolute;
                bottom: 20px;

            }
        }

        .saleImg3 {
            width: 30%;
            height: 95%;
            background-image: url("../../public/Snackphoto/3.png");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: 50% 50%;
            position: relative;
            display: flex;
            justify-content: center;

            .saleBtn1 {
                width: 50%;
                height: 15%;
                color: white;
                font-size: 20pt;
                border: 0;
                border-radius: 10px;
                background-color: $mainColor;
                position: absolute;
                bottom: 20px;
            }
        }
    }
}

.news {
    height: 80vh;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 20px;
    background-color: orange;
    

    .cradsArea {
        height: 60vh;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 20px;

        .crad1 {
            height: 100%;
            width: 30%;
            background-color: #fff;
            border-radius: 20px;

            img {
                width: 100%;
                border-radius: 20px;
            }

            p {

                margin: 2% 10%;
            }

            .cradBtn {
                width: 33%;
                height: 10%;
                font-size: 16pt;
                margin-left: 35%;
                border-radius: 5px;
                color: white;
                background-color: #030303;
            }

        }

        .crad2 {
            height: 100%;
            width: 30%;
            background-color: #fff;
            border-radius: 20px;

            img {
                width: 100%;
                border-radius: 20px;
            }

            p {
                margin: 2% 10%;
            }

            .cradBtn {
                width: 33%;
                height: 10%;
                font-size: 16pt;
                color: white;
                margin-left: 35%;
                border-radius: 5px;
                background-color: #030303;
            }

        }

        .crad3 {
            height: 100%;
            width: 30%;
            background-color: #fff;
            border-radius: 20px;

            img {
                width: 100%;
                border-radius: 20px;
            }

            p {
                margin: 2% 10%;
            }

            .cradBtn {
                width: 33%;
                height: 10%;
                font-size: 16pt;
                color: white;
                margin-left: 35%;
                border-radius: 5px;
                background-color: #030303;
            }

        }
    }

    .newBtn {
        width: 25%;
        height: 10%;
        background-color: orangered;
        border: 0;
        color: white;
        font-size: 24pt;
        box-shadow: 5px 5px 5px black;
        margin-bottom: 10px;
        border-radius: 5px;
    }
}

.arrival{
    height: 65vh;
    margin-top: 20%;
    margin-bottom: 10%;
    justify-content: space-between;
    

    img{
        width: 50%;
        height: 80%;
    }

    .arrivalText{
        width: 35%;
        height: 80%;
        background-color: #fccdb9;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        p{
            margin: 1% 10%;
        }
    }

}

.footer{
    height: 10vh;
    width: 100%;
    margin: 0;
    background-color: $mainColor;
    display: flex;
    justify-content: center;
    font-size: 20pt;
}

</style>