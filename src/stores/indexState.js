//匯入預設管理工具
import {defineStore} from 'pinia';
//建立
export default defineStore("indexState", {
    state:() => ({
        location:867  //起始值不能為0 ex.0678
    }),
    getters:{
        locationInfo(state){
            return  `現在位置${state.location}`
        }
    },
    actions:{
        getLocation(){
            console.log(this.location)
        },
        setLocation(num){
            this.location = num;
        }
    }
})