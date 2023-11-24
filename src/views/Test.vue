<script>
export default{
    data(){
        return{
            weather:"",
            imgSrc: "../../public/WeatherAPP/images/clear.png",
        }
    },

    methods:{
        change(){
            switch(this.weather){
                case "晴時多雲":
                    this.imgSrc = "../../public/WeatherAPP/images/cloud.png"
                    break;
                case "晴天":
                    this.imgSrc = "../../public/WeatherAPP/images/clear.png"
                    break;
                case "雨天":
                    this.imgSrc = "../../public/WeatherAPP/images/rain.png"
                    break;
            }
        }
    }
}
</script>
<template>

    <div class="body">
        <select name="" id="" v-model="weather" @change="change()">
            <option value="陰天">陰天</option>
            <option value="晴時多雲">晴時多雲</option>
            <option value="晴天">晴天</option>
            <option value="雨天">雨天</option>
        </select>
        <img :src="imgSrc">
    </div>

</template>
<style lang="scss" scoped></style>