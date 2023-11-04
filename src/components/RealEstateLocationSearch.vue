<script>
import { RouterLink,RouterView} from 'vue-router';
export default{
    data(){
        return{
            location:[ "千代田区","千代田区","千代田区","千代田区","六本木区","六本木区","六本木区","六本木区","秋葉原区","秋葉原区","秋葉原区","秋葉原区"],
            location2:["台場区","台場区","台場区","台場区","秋葉原区","秋葉原区","秋葉原区","秋葉原区"],
            location3:["千代田区","千代田区","千代田区","千代田区","六本木区","六本木区","六本木区","六本木区",,"秋葉原区","秋葉原区","秋葉原区","秋葉原区"],
            page : 1,
        }
    },
    components:{
        RouterLink,
        RouterView,
    },
    methods:{
        GoCenterArea(){
            this.page = 2;
        }
    }
}
</script>

<template>
<div class="body">
    <div class = MainArea v-if="page===1">
        <div class="CeneterArea">
            <RouterLink to="/RealEstate/RealEstateCenterAreaPage" class="routerlink" >都心区</RouterLink>
        </div>
        <hr>
        <div class="CenterBox">
            <div class="AreaBox" v-for="i in this.location">
                <input type="checkbox"><p>{{ i }}</p>
            </div>
        </div>
        <div class="EastArea">
            <h2>23区東部</h2>
        </div>
        <hr>
        <div class="CenterBox">
            <div class="AreaBox" v-for="x in this.location2">
                <input type="checkbox"><p>{{ x }}</p>
            </div>
        </div>
        <div class="EastArea">
            <h2>23区西部</h2>
        </div>
        <hr>
        <div class="CenterBox">
            <div class="AreaBox" v-for="j in this.location2">
                <input type="checkbox"><p>{{ j }}</p>
            </div>
        </div>
        
    </div>
    <div v-if="page === 2">
    <RouterView/>

    </div>
</div>
</template>

<style lang="scss" scoped>
button{
    background-color: #BEC0CD;
    color: #475467;
    font-weight: bold;
    border: none;
    font-size: 20pt;
    
}

a{
    color: black;
    font-size: 22pt;
}

p{
    margin: 0;
    color: white;
    margin-left: 5px;
}

hr{
    color: black;
    margin:0;
    margin-top: 2px;
    margin-bottom: 15px;
}
.body{
    height: auto;
    width: 100%;
    background-color: #BEC0CD;
    .MainArea{
        height: 100%;
        width: 60%;
        margin: 0 25%;
        padding-top: 2%;
        
        .CenterBox{
            display: flex;
            flex-wrap: wrap;
            
            .AreaBox{
                width: 150px;
                height: 30px;
                background-color: #475467;
                display: flex;
                align-items: center;
                margin: 10px 10px;
                border-radius: 5px;
                input{
                    margin-left: 10px;
                }

                }
            }
        .EastArea{
            display: flex;
            flex-wrap: wrap;
        }
        .routerlink{
            text-decoration: none;
        }
        
    }
}
</style>