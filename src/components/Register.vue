<script>
export default{
    data(){
        return{
            Email:"",
            Password:"",
            showText:"",
        }
    },
    methods:{
        closePage() {
            let x = 1
            this.$emit('changepage',x)
        },
        Register() {
            let Data = {
                    Account : this.Email,
                    Password : this.Password,
            }
            console.log(Data.Account)

            if(Data.Account ==""){
                this.showText="Email不能為空"     
            }
            else{
                let DBData = JSON.parse(localStorage.getItem('user'))||[];  // 如果是空的回傳null
                let isAlreadyRegistered = false;
                
                for (let i = 0; i < DBData.length; i++) {
                    if (Data.Account === DBData[i].Account) {
                        isAlreadyRegistered = true;
                        this.showText = Data.Account + " 已被註冊";
                            break; // 如果找到已註冊的帳戶，終斷迴圈
                    }
                }
                if (!isAlreadyRegistered) {
                    DBData.push(Data); // 将新用户数据添加到已有数据中
                    localStorage.setItem("user", JSON.stringify(DBData)); // 保存更新后的用户数据到localStorage
                    this.showText ="註冊成功";
                }
            }
        }   
    }
}
</script>

<template>
<div class="body">
    <div class="MainArea">
        <h1>Register</h1>
        <div class="Email Box">
        <p>Email</p>
        <input type="text" v-model="Email">
        </div>
        <div class="Password Box">
        <p>Password</p>
        <input type="text" v-model="Password">
        </div>
        <div class="btnBox">
            <button type="button" @click="Register()"> Register</button>
            <button type="button" @click="closePage()">canecl</button>
        </div>
        <p>{{ this.showText }}</p>
    </div>
</div>
</template>

<style lang="scss" scoped>
.body{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    .box{
        display: flex;
        margin: 0 20px;
    }
    p{
    font-size: 12pt;
    margin-bottom: 2px;
    }
    .MainArea{
        margin-top: 8%;
        h1{
            text-align: center;
        }
        input{
            width: 300px;
            border-radius: 5px;
        }
        .btnBox{
            display: flex;
            justify-content: center;
            margin-top: 5%;
            button{
                background-color: #475467;
                color: white;
                margin: 0 10px;
                border-radius: 5px;
            }
        }
    }
}
</style>