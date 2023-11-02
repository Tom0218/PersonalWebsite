<script>
export default{
    data(){
        return{
            Email:"",
            Password:"",
            Repassword:"",
            showText:"",
            outputArr:"",
            userData:[],

        }
    },

    methods:{

        RegisterBtn(){
            if (this.Email =="") {
                this.showText ="信箱不能為空"     
            }
            else if (this.Password ==""){
                this.showText = "密碼不能為空"
            }
            else if (this.Password != this.Repassword){
                this.showText = "密碼不一致"
            }
            else{
                let userinfo={
                    account:this.Email,
                    pwd:this.Password
                }
                this.userData.push(userinfo)
                let existingUserData = JSON.parse(localStorage.getItem("user")) || [];
                let isRegistered = existingUserData.some(item => item.account === this.Email);
                if (isRegistered) {
                this.showText = "帳號已被註冊";
                } 
                else {
                    this.showText = "註冊成功";
                    existingUserData.push(userinfo);
                    localStorage.setItem("user", JSON.stringify(existingUserData));
                }
            }
        },
        LogIn(){
            let x = 0
            this.$emit('changepage',x)
        }
    }
}

</script>

<template>
<div class="body">
    <div class="page">
            <div class="mainArea">
                <h1>Register</h1>
                <div class="emailbox">
                    <p >email</p>
                    <input type="text" v-model="Email">
                    <p></p>
                </div>
                <div class="passwordbox">
                    <p>password</p>
                    <input type="text" v-model="Password" >
                </div>
                <div class="repeatpasswordbox">
                    <p >Repeatpassword</p>
                    <input v-model="Repassword">
                </div>
                <p>{{ showText }}</p>
                <div class="Signupbtnbox">
                    <button @click="RegisterBtn">Register</button>
                </div>
                <button type="button" @click="LogIn()">logIn</button>
            </div>
        </div>
</div>
</template>

<style lang="scss" scoped>
.body{
    height: 100%;
    margin: 0;
    background-color:#3C7FA5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
}

p{
    font-size: 16pt;
    margin: 10px 0;
    font-weight: bold;
}

input{
    height: 25px;
    width: 300px;
    margin: 0;
    padding: 0;
}

a{
    color: black;
    text-decoration: none;
    display: flex;
    justify-content: end;
    font-weight: bold;
}

h1{
    text-align: center;
    margin-bottom: 30px;
}

.page{
    width: 500px;
    height: 500px;
    display: flex;
    justify-content: center;
    .mainArea{
        flex-direction: column;
    }
    
}

#end{
    text-align: center;
}
.Signupbtnbox{
    text-align: center;
}

</style>