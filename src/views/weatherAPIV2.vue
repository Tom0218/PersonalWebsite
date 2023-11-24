<script>
const container = document.querySelector("container");
const search = document.querySelector("search");
const weatherBox = document.querySelector("weather-box");
const weatherDetails = document.querySelector("weather-details");
const error404 = document.querySelector('weather-details')


export default{

    data(){
        return{
            city: "",
            weather: "",
            tempHigh: "",
            tempLow: "",
            rainy: "",
            weather: "",
            CI: "",
            imgSrc: "",
            userInputCity: "",
            tempCity: "",
        }
    },

    methods:{      
        replaceCharacters() {
             // 使用字符串的 replace 方法来替换 "台" 为 "臺"
            this.tempCity = this.city.replace(/台/g, '臺');
            },

        search() {
            this.userInputCity = this.tempCity;
            let cityFound = false;
            for (let i = 0; i < 22; i++) {
                if (arr.records.location[i].locationName === this.userInputCity) {
                    this.weather = arr.records.location[i].weatherElement[0].time[0].parameter.parameterName;
                    this.tempLow = arr.records.location[i].weatherElement[2].time[0].parameter.parameterName;
                    this.tempHigh = arr.records.location[i].weatherElement[4].time[0].parameter.parameterName;
                    this.rainy = arr.records.location[i].weatherElement[1].time[0].parameter.parameterName;
                    this.CI = arr.records.location[i].weatherElement[3].time[0].parameter.parameterName;
                    cityFound = true; // 設置城市找到為 true
//////////////////////////////////////////////////////////////////////////////
                    container.style.height = '555px';
                    weatherBox.classList.add('active');
                    weatherDetails.classList.add('active');
                    error404.classList.remove('active');
                    ///////////////////////////////////////////////////////
                    break; // 找到城市後立即退出循環
                }
            }

            if (!cityFound) {
                console.log("查無此縣市");
                this.userInputCity = "查無此縣市"
                this.weather = "None";
                this.tempHigh = "None";
                this.tempLow = "None";
                this.rainy = "None";
                this.CI = "None";
                ///////////////////////////////////////////////////
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.remove('active');
                ///////////////////////////////////
            }

                            switch(this.weather){
                                case "晴時多雲":
                                    this.imgSrc="../../public/WeatherAPP/cloud.png"
                                    break;
                                    
                                case "多雲短暫雨":
                                    this.imgSrc="../../public/WeatherAPP/images/rain.png"
                                    break;
                                case "陰天":
                                    this. imgSrc="../../public/WeatherAPP/images/cloud.png"
                                    break;
                                case "多雲":
                                    this. imgSrc="../../public/WeatherAPP/images/clouds.png"
                                    break;
                                case "晴時多雲":
                                    this. imgSrc="../../public/WeatherAPP/images/cloud.png"
                                    break;
                                case "晴天" :
                                    this.imgSrc = "../../public/WeatherAPP/images/clear.png"
                                    break;
                                default:
                                    this.imgSrc = "../../public/WeatherAPP/images/clear.png"
                            }
                        
                    
                }
            }
        }
    

let arr = [];
fetch("https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-85E35E95-A54A-405F-97DD-42E542A42DC4")
    .then(function(response){    //.then 對fetch資料做處理
        return response.json(); //解析成json格式
    })
    // .then(response => response.json()) //變數response存放天氣資訊.json()的資料
    .then(function(data){ 
        arr = data;
        console.log(arr)
    })
    .catch(error =>{console.log(error)})   

</script>


<template>
    <div class="body">
        <div class="container">
            <form @submit.prevent="search()">
                <div class="searchBox">
                    <i class='bx bxs-map'></i>
                    <input type="text" placeholder="請輸入城市" v-model="city" @input="replaceCharacters" >
                    <form @submit.prevent="search"></form>
                    <button class="bx bx-search" @click="search"></button>
                </div>
            </form>


            <div class="weather-box">
                <div class="box">
                    <div class="info-weather">
                        <div class="weather">
                            <img src="../../public/WeatherAPP/images/cloud.png">
                        </div>
                        <p class="city">{{ userInputCity }}</p>
                        <p class="temperature"><p>{{ tempLow }}</p>~{{ tempHigh }}<span>℃</span></p>
                        <p class="description">{{ CI }}</p>
                    </div>
                </div>
            </div>

            <div class="weather-details">
                <div class="humidity">
                    <i class="fa-solid fa-cloud-rain"></i>
                    <div class="text">
                        <div class="info-humdity">
                            <span>{{ rainy }}%</span>
                            <p>降雨機率</p>
                        </div>
                    </div>
                </div>
                <div class="wind">
                    <i class='bx bx-wind'></i>
                        <div class="text">
                            <div class="info-wind">
                                <p>{{ weather }}</p>
                                <p>天氣狀況</p>
                            </div>
                        </div>
                </div>
            </div>

            <div class="not-found">
                <div class="box">
                    <img src="../../public/WeatherAPP/images/404.png">
                    <p>糟糕!查無此地點</p>
                </div>
            </div>
        </div>
    </div>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</template>


<style lang="scss" scoped>

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

.body{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: seagreen;
    background: url('../../public/weatherAPP/images/background.jpg');
    background-size: cover;//这个属性值指示背景图片应该被拉伸或缩放以覆盖整个背景区域，确保图片不留白或不拉伸变形。这通常会导致图片被裁剪，以适应背景区域的宽高比。这是一种常用于创建响应式背景图片的方法。
    background-position: center;//这个属性值告诉浏览器在元素的背景中水平和垂直方向上将背景图片定位到中心。这将确保背景图片在元素的中心显示。
    
    .container{
        position: relative;
        height: 555px;
        width: 400px;
        background-color: rgba(255,255,255,.1);
        backdrop-filter: blur(30px);
        border: 2px solid rgba(255,255,255,.2);
        border-radius: 16px;
        padding: 20px;
        color: #fff;
        .searchBox{
            position: relative;
            width: 100%;
            height: 55px;
            display: flex;
            align-items: center;

            input{
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: transparent;///////当将background-color设置为"transparent"时，意味着元素的背景将变为透明，允许元素后面的内容透过显示。换句话说，它使元素的背景完全透明。
                border:  2px solid rgba(255,255,255,2);
                outline: none;
                border-radius: 10px;
                font-size: 22px;
                color: #fff;
                font-weight: 500;
                text-transform: uppercase;//////將所有字母轉為大寫
                padding:  0 48px 0 42px ;
            }

            input::placeholder{
                color: #fff;
                text-transform: capitalize;
            }

            button{
                position: absolute;
                right: 0;
                width: 40px;
                height: 100%;
                background-color: transparent;
                border: none;
                outline: none;
                font-size: 28px;
                color: #fff;
                padding: 0 40px 0 5px;
                cursor: pointer;///當屬標停在icon時，屬標變成一只手指
            }
            i{
                position: absolute;
                left: 10px;
                font-size: 28px;
            }
        }

        .weather-box{
            text-align: center;
            margin: 40px 0;
        }

        .weather-box,
        .weather-details,
        .not-found {
            visibility: hidden;
        }

        .weather-box.active,
        .weather-details.active,
        .not-found.active {
            visibility: visible;
        }



        .weather-box img{
            width: 60%;
        }

        .weather-box .city{
            font-size: 50px;
            margin: 0;
        }

        .weather-box .temperature {
            display: flex;
            position: relative;
            font-size: 50px;
            line-height: 1;//将其设置为1意味着文本行的高度将与文本的字体大小相等，通常称为"正常"行高。
            font-weight: 700;
            justify-content: center;
            margin: 0 0 6px -10px;///上左下又， 右-30物件則會往左推
        }

        .weather-box .temperature span {
            position: absolute;
            font-size: 24px;
            right: 20%;
        }
        .weather-details{
            position: absolute;
            bottom: 40px;
            left: 0px;
            width: 100%;
            padding: 0 20px;
            display: flex;
        }
        .weather-details .humidity,
        .weather-details .wind{
            display: flex;
            align-items: center;
            width: 50%;
        }

        .weather-details .humidity{
            padding-left: 20px;
            justify-content: flex-start;//子项目在主轴上与容器的起始边对齐。这意味着它们会尽量靠近主轴的起始位置。
        }
        .weather-details .wind{
            padding-right: 20px;
            justify-content: flex-end; //子项目在主轴上与容器的结束边对齐。
        }
        .weather-details i {
            font-size: 56px;
            margin-right: 10px;
        }
        .weather-details span {
            display: inline-block;
            font-size: 22px;
            font-weight: 500;
        }
        .weather-details p {
            font-size: 14px;
            font-weight: 500;
        }

        .not-found {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            text-align: center;
            margin-top: 110px;
        }   

        .not-found img {
            width: 65%;
        }
        
        .not-found p {
            font-size: 22px;
            font-weight: 500;
            margin-top: 12px;
        }

    }
}

</style>