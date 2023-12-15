<script>

export default{
    data(){
        return{
            qnId:0,
            userName:"",
            userphone:"",
            userEmail:"",
            userAge:0,
            title:"",
            description:"",
            userList:[],
            quList:[],
        }
    },

    methods:{
        backStatic(){
            this.$router.push({
             name:'QuestionnaireStaticPage',
             query:{
                backQnId:this.qnId
             }   
            })
        },

        //獲取問題
        getQuestion(){
            console.log("fetch裡的qnId是:"+this.qnId)
                const url = 'http://localhost:8081/api/quiz/searchQuestionList';
                const queryParams = new URLSearchParams({
                    qnId: this.qnId
                });
                const urlWithParams = `${url}?${queryParams}`;
    
                fetch(urlWithParams, {
                    method: 'GET',
                    headers: {
                        "Accept": "application/json", // 指定接受的回應類型
                    },
                })
                .then(response => response.json())
                .then(data => {
                    //將 data 添加到 quList
                    this.quList = data.questionList 
                    console.log( this.quList)

                })
                .catch(error => console.error('Error:', error));  
        },

    },

    mounted(){
        this.qnId = this.$route.query.qnId;
        this.userName = this.$route.query.userName;
        this.userphone = this.$route.query.phone;
        this.userEmail = this.$route.query.email;
        this.userAge = this.$route.query.age;
        this.title = this.$route.query.title;
        this.description = this.$route.query.description;
        const userListString = this.$route.query.userList;
        this.userList = JSON.parse(userListString);
        this.getQuestion();
        console.log( this.userName)
        console.log( this.userList)
    }
}
</script>
<template>
    <div>
        <div class="body">
            <div class="mainArea">
                <h1>{{ this.title }}</h1>
                <h3>{{ this.description }}</h3>
                <div class="personinfo">
                    <div class="info">
                        <p>姓名 : {{ this.userName }}</p>
                    </div>
                    <div class="info">
                        <p>手機 : {{ this.userphone }} </p>
                    </div>
                    <div class="info">
                        <p>信箱 : {{ this.userEmail }} </p>
                    </div>
                    <div class="info">
                        <p>年齡 : {{ this.userAge }}</p> 
                    </div>
                </div>
                <div v-for="question in this.quList" class="answerBox">
                    <p>{{ question.quId }}.</p>
                    <p>{{ question.qTitle }} :</p>
                    <div v-for="answer in this.userList" >
                        <div  v-if="answer.name == this.userName &&answer.quId == question.quId ">
                            <label>{{ answer.answer }}</label>
                        </div>
                    </div>
                </div>
                <!-- <button @click="backStatic">上一頁</button> -->
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.mainArea{
    height: 100vh;
    padding: 2%;
    background-color: rgb(0, 68, 0);
}
.answerBox{
    display: flex;
    align-items: center;
}

h3{
    color: white;
}
h1{
    color: white;
}
.body{
    min-height: 100vh;
    overflow-y: auto;
    width: 70vw;
    margin: 0 15%;
}

p{
    font-size: 16pt;
    font-weight: bold;
    margin: 1% 0;
    color: white;
}

//answer
label{
    font-size: 16pt;
    color: rgb(22, 209, 22);
}
</style>