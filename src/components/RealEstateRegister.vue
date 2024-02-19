<script>
export default{
    data(){
        return{
            name:"",
            Email:"",
            Password:"",
            Repassword:"",
            showText:"",
            
        }
    },
    methods:{

        RegisterBtn(){
            let Data = {
                    Account : this.Email,
                    Password : this.Password,
                    id: this.name,
            }

            /////防呆/////
            if(Data.Account ==""){
                this.showText="Email不能為空"
            }

            else if(this.name ==""){
                this.showText="name不能為空"
            }

            else if(this.Repassword != this.Password ){
                this.showText ="密碼不一致"
            }

            else{
                ///// 如果是空的回傳null/////
                let DBData = JSON.parse(localStorage.getItem('user'))||[];  
                let isAlreadyRegistered = false;
                let registrationSuccess = false;
                
                for (let i = 0; i < DBData.length; i++) {
                    if (Data.Account === DBData[i].Account) {
                        isAlreadyRegistered = true;
                        alert('此帳號已被註冊');
                        // 如果找到已注册的帐户，终止循环
                        break;
                    }
                }

                if (!isAlreadyRegistered) {
                    // 将新用户数据添加到已有数据中
                    DBData.push(Data);
                    // 保存更新后的用户数据到localStorage
                    localStorage.setItem("user", JSON.stringify(DBData));
                    registrationSuccess = true;
                }

                if (registrationSuccess) {
                    alert('註冊成功');
                    this.name = "";
                    this.Email = "";
                    this.Password = "";
                    this.Repassword = "";

                } else {
                    alert('註冊失敗');
                }
            }
        },

        LogIn(){
            let x = 1
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
                </div>
                <div class="namebox">
                    <p>name</p>
                    <input type="text" v-model="name">
                </div>
                <div class="passwordbox">
                    <p>password</p>
                    <input type="password" v-model="Password" >
                </div>
                <div class="repeatpasswordbox">
                    <p >Repeatpassword</p>
                    <input type="password" v-model="Repassword">
                </div>
                <!-- <p>{{ showText }}</p> -->
                <div class="Signupbtnbox">
                    <button @click="RegisterBtn()">Register</button>
                    <button type="button" @click="LogIn()">logIn</button>
                </div>
            </div>
        </div>
</div>
</template>

<style lang="scss" scoped>
.body{
    height: 100%;
    margin: 0;
    background-color:gray;
    display: flex;
    align-items: center;
    justify-content: center;
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
    margin-bottom: 10px;
}

.page{
    width: 500px;
    height: 400px;
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

    button{
        margin: 10px 10px
        ;
    }
}

</style>