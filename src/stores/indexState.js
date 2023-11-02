//匯入預設管理工具
import {defineStore} from 'pinia';
//需輸入兩個參數，1.自建資料庫名稱，2.資料庫內容
export default defineStore("indexState", {
    //與<script>預設匯出概念相同
    //data
    state:() => ({
        location:867  //起始值不能為0 ex.0678
    }),
    //computed
    getters:{
        locationInfo(state){
            return  `現在位置${state.location}`
        }
    },
    //methods
    actions:{
        getLocation(){
            console.log(this.location)
        },
        setLocation(num){
            this.location = num;
        }
    }
})