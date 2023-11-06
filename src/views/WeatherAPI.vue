<script>
export default{
    data(){
        return{
            city:"城市",
            cloud:"",
            tempHigh:"",
            tempLow:"",
            rainy:"",
        }
    },
    methods:{
        cityChange() {
            for (let i=0;i<22;i++){
                if(arr.records.location[i].locationName==this.city){
                    // console.log(arr.records.location[i].)
                    this.cloud = arr.records.location[i].weatherElement[0].time[0].parameter.parameterName
                    
                    this.tempLow =  arr.records.location[i].weatherElement[2].time[0].parameter.parameterName
                    
                    this.tempHigh =  arr.records.location[i].weatherElement[4].time[0].parameter.parameterName

                    this.rainy = arr.records.location[i].weatherElement[1].time[0].parameter.parameterName
                    break
                }
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
    .catch(error =>{console.log(error)}) //發生200 or 400錯誤時會捕捉速誤訊息並印出來，提示使用fetch時發生甚麼狀況


    
</script>
<template>
<div class="body">
    <div class="page">
        <div class="content">
            <h1>天氣預報</h1>
                <select  v-model="city" @change="cityChange">
                        <option value="新北市"> 新北市</option>
                        <option value ="台北市">台北市</option>
                        <option value ="桃園市">桃園市</option>
                        <option value ="台中市">台中市</option>
                        <option value ="台南市">台南市</option>
                        <option value ="高雄市">高雄市</option>       
                </select>
            <div class="bottom">
                <div class="weatherDetial">
                    <p>{{city}}</p>
                    <p>{{ this.cloud }}</p>
                    <div class="Temp">
                        <p>{{ this.tempLow }}</p>
                        <p> ~ </p>
                        <p>{{ this.tempHigh }}</p>
                        <p>°C</p>
                    </div>
                    <div class="Pop">
                        <p>降雨機率:</p>
                        <p>{{ rainy }}</p>
                        <p>%</p>
                    </div>
                </div>
                <div class="weatherPic">
                    <img id="img" alt="氣象小圖">
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<style lang="scss" scoped>
.body{
    height: 100vh;
    background-color:black;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
p{
    color: white;
    font-size: 16pt;
}
h1{
    color: white;
    text-align: center;
}


.page{
    height: 400px;
    width: 500px;
    display: flex;
    justify-content: center;
    background-color: rgb(135, 5, 210);
    border-radius: 20px;
}

.content{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    select{
        width: 200px;
        font-size: 16pt;
        text-align: center;
        font-weight: bold;
    }

    .bottom {
        width: 400px;
        display: flex;
        margin-top: 20px;
        .weatherDetial{
            width: 50%;
            p{
                margin: 10px 2px;
                color: white;
                
            }
            .Temp{
                height: auto;
                display: flex;
            }
            .Pop{
                display: flex;
                align-items: center;
            }

            }

        
        .weatherPic{
            width: 50%;
            height: 200px;
        }
        
    }

}
</style>