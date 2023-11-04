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
    <div class="body" >
    <div class="mainArea">
            <div class="Gamebox">
                <h1>Sign up</h1>
                <p>Email</p>
                <input type="text" v-model="Email">
                <p>Password</p>
                <input type="text" v-model="Password">
                <div class="line-5">
                    <!-- <input type="checkbox" class="chekBox">
                    <small>Keep login</small> -->
                    <button type="button" class="btn" @click="Register()"> Register</button>
            <button type="button" class="btn" @click="closePage()">canecl</button>
                </div>
                <p>{{ this.showText }}</p>
            </div>
        </div>
        </div>
    ---------------------------------------------

</template>

<style lang="scss" scoped>
.body{
    height: 100%;
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
            display: flex;
            align-items: center;
            position: relative;
            margin-top: 20px;
        }       
        button{
            width: 100%;
            border: none;
            font-size: 16pt;
            border-radius: 10px;
            margin: 0 2%;
        }
        #check1{
            text-align: center;
            color: #ccf407;
        }     

    }
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