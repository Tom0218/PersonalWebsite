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
                <h1>login</h1>
                <p>Email</p>
                <input type="text" v-model="Account">
                <p>Password</p>
                <input type="password" v-model="Password">
                <div class="line-5">
                    <i class="fa-sharp fa-regular fa-eye"></i>
                    <!-- <input type="checkbox" class="chekBox">
                    <small>Keep login</small> -->
                    <button type="button" class="loginbtn btn" @click="LogIn()" >Log In</button>
                    <button type="button" @click="GoRegister()" class="btn">Sign up</button>
                    <button type="button" @click="" class="btn">Forget Password</button>
                    
                </div>
                <div><p>{{ check1 }}</p></div>
            </div>
            <div v-else-if="page ===2">
                <Register @changepage ="changePage"/>
            </div>
        </div>
        </div>


        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</template>

<style lang="scss" scoped>
.body{
    height: 90vh;
    margin: 0;
    background-color: #232D3F;
    display: flex;
    justify-content: center;
    align-items: center;
}
p{
    font-size: 16pt;
    margin: 10px 0;
    font-weight: bold;
    color: #ccf407;
}
h1{
    text-align: center;
    margin-bottom: 30px;
    color: #ccf407;
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
            align-items: center;
            position: relative;
            margin-top: 2%;
        }       
        button{
            width: 100%;
            border: none;
            font-size: 16pt;
            border-radius: 10px;
            margin: 2% 2%;
        }
        #check1{
            text-align: center;
            color: #ccf407;
        }     

    }
////////////////////////////////////////////////////////button
.btn,
.btn:hover,
.btn:focus {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    // width: 100px;
    height: 40px;
    font-weight: bold;
    // border-radius: 50%;
    border: none;
    background: #232D3F;
    color: #ccf407;
    // font-size: 2rem;
    transition: box-shadow 400ms cubic-bezier(0.2, 0, 0.7, 1), transform 5s cubic-bezier(0.2, 0, 0.7, 1);
}
.btn:hover {
    // transform: rotate(45deg);
    box-shadow: 0 0 1px 5px #ccf407,;
}
}

</style>