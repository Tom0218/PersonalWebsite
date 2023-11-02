<script>
import Register from "../components/ExpenseTrackerRegister.vue"; 

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
        changePage(x){
                this.page = x
        },

        GoRegister(){
            this.page +=1
        },

        LogIn(){
            this.getData = localStorage.getItem('user');
            this.userData = JSON.parse( this.getData );
            this.UserDatalength = this.userData.length;
            for(let i = 0; i <  this.UserDatalength ;i++) {
                if (this.Email === this.userData[i].account && this.Password == this.userData[i].pwd){
                    console.log("有這個帳號跟密碼");
                    this.check1 = "登入成功";  
                    this.Email = ""
                    this.Password=""
                    this.$router.push('/ExpenseTrackerMain');
                    return    
                }
                else {
                    this.check1 = "帳號或密碼錯誤"
                }
            }
        },
    }
}
</script>
<template>
<div class="body" >
    <div class="mainArea">
        <div class="Gamebox" v-if="this.page==0">
            <h1>Expense Tracker</h1>
            <p>Email</p>
            <input type="text" v-model="Email">
            <p>Password</p>
            <input type="text" v-model="Password">
            <div class="line-5">
                <button type="button" class="loginbtn" @click="LogIn()">Log In</button>
                <button type="button" @click="GoRegister()">Register</button>
            </div>
            
            <div class="showText"><p>{{ check1 }}</p></div>
                
            </div>
            <div v-else-if="page ==1">
                <Register @changepage ="changePage"/>
            </div>
    </div>
</div>
</template>
<style lang="scss" scoped>
.body{
    height: 100vh;
    margin: 0;
    background-color: whitesmoke;
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
            background-color: #3C7FA5;
            border-radius: 10px;
            margin: 0 10px;
        }
        #check1{
            text-align: center;
        }
        small{
            width: 50px;
            margin-left: 5%;
        }
        .showText{
            margin-left: 50px;
        }
        

    }
    
}
</style>