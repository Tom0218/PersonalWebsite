<script>
import Register from "../components/Register.vue"; 
export default{
        data(){
            return{
                Account : "",
                Password : "",
                check1:"",
                page:1,

            }
        },
        components:{
            Register
        },
        methods:{
            LogIn(){
            let localStorageData = JSON.parse(localStorage.getItem('user'));
            let isRegistered = localStorageData.some(item => item.Account === this.Account && item.Password ===this.Password);
                
                if(isRegistered){
                    this.check1="登入成功"
                }
                else{
                    this.check1="帳號或密碼錯誤"
                }
            },

            changePage(x){
                this.page = x
            },

            GoRegister(){
                this.page +=1
            }
        }
}
</script>

<template>
<div class="body" >
    <div class="mainArea">
            <div class="Gamebox" v-if="this.page=== 1">
                <h1>login Page</h1>
                <p>Email</p>
                <input type="text" v-model="Account">
                <p>Password</p>
                <input type="text" v-model="Password">
                <div class="line-5">
                    <input type="checkbox" class="chekBox">
                    <small>Keep login</small>
                    <button type="button" @click="GoRegister()">Register</button>
                </div>
                <button type="button" class="loginbtn" @click="LogIn()">Log In</button>
                <div><p>{{ check1 }}</p></div>
                
            </div>
            <div v-else-if="page ===2">
                <Register @changepage ="changePage"/>
            </div>
        </div>
        </div>

</template>

<style lang="scss" scoped>
.body{
    height: 100%;
    margin: 0;
    background-color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
}
p{
    font-size: 16pt;
    margin: 10px 0;
    font-weight: bold;
}
h1{
    text-align: center;
    margin-bottom: 30px;
}

.mainArea{
    height: 400px;
    width: 500px;
    display: flex;
    justify-content: center;
    .Gamebox{
        width: 60%;
        input{
            height: 25px;
            width: 100%;
            margin: 0;
            padding: 2px;

        }
        .line-5{
            width: 100%;
            display: flex;
            align-items: center;
            position: relative;
            margin-top: 20px;
            a{
                width: 80px;
                text-align: center;
                text-decoration: none;
                background-color: white;
                color: black;
                font-size: 16pt;
                position: absolute;
                right: 0;
            }
        }       
        .chekBox{
            margin: 2px;
            height: 20px;
            width: 20px;
        }
        button{
            width: 40%;
            height: 40px;
            border: none;
            font-size: 16pt;
            margin-left: 29%;
        }
        #check1{
            text-align: center;
        }
        .loginbtn{
            margin-top: 30px;
        }
        small{
            width: 50px;
            margin-left: 5%;
        }
        

    }
    
}

</style>