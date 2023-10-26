<script>
import Register from "../components/Register.vue"; 
export default{
        data(){
            return{
                getData :"",
                Email : "",
                Password : "",
                check1:"",
                userData :{},
                UserDatalength : "",
                page:0

            }
        },
        components:{
            Register
        },
        methods:{
            LogIn(){
                this.getData = localStorage.getItem('user');
                this.userData = JSON.parse( this.getData );
                this.UserDatalength = this.userData.length;
                for(let i = 0; i <  this.UserDatalength+1 ;i++){
                    console.log(this.userData[i].account);
                    console.log(this.userData[i].pwd);
                    if (this.Email == this.userData[i].account && this.Password == this.userData[i].pwd){

                        console.log("有這個帳號跟密碼");
                        this.check1 = "登入成功";         
                        return
                        
                    }else{
                        this.check1 = "帳號或密碼錯誤"
                    }
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
            <div class="Gamebox" v-if="this.page==0">
                <h1>login Page</h1>
                <p>Email</p>
                <input type="text" v-model="Email">
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
            <div v-else-if="page ==1">
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