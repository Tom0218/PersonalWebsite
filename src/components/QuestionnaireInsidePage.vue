<script>

export default{

data(){
        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate());
        const formattedStartDate = startDate.toISOString().split('T')[0];
    return{
        questionnaireId:0,
        title:"",
        description:"",
        quList:[],
        name:"",
        phone:"",
        email:"",
        age:"",
        dateTime:formattedStartDate,
        selectedOptions: [],
        shortAnswer:"",
        answers:{},
        userList:[],
    }
},

mounted() {
    this.questionnaireId = this.$route.query.qnId; //qnId
    this.title = this.$route.query.title; //qntitle
    this.description = this.$route.query.description;//qndescription
    this.getQuestion(); // 內頁資料更新
    this.name = this.$route.query.name;
    this.email = this.$route.query.email;
    this.age = this.$route.query.age;
    this.phone = this.$route.query.phone;

    if (this.$route.query.editName) {
        this.name = this.$route.query.editName;
    }
    if (this.$route.query.editPhone) {
        this.phone = this.$route.query.editPhone;
    }
    if (this.$route.query.editEmail) {
        this.email = this.$route.query.editEmail;
    }
    if (this.$route.query.editAge) {
        this.age = this.$route.query.editAge;
    }
    if (this.$route.query.editTitle) {
        this.title = this.$route.query.editTitle;
    }
    if (this.$route.query.editTitle) {
        this.description = this.$route.query.editDescription;
    }

},

    methods:{
        //userList
        getSubmission() {
                const url = 'http://localhost:8081/api/quiz/getSubmission';
                const queryParams = new URLSearchParams({
                    qnId: this.questionnaireId
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
                    if (data.userList == null) {
                        alert("無填寫資料!!");
                        this.$router.push('Questionnaire')
                        return
                    } else {
                        console.log("UserList");
                        this.userList = data.userList;
                        // console.log(this.userList)
                    }
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    // Handle error, show alert, etc.
                });
        },

        //提交答案
        getAnswer() {
            //查看是否重複提交
            this.getSubmission();
            for(let i=0; i < this.userList.length; i++){
                if(this.name == this.userList[i].name && this.phone == this.userList[i].phoneNumber){
                    alert("不得重複提交")
                return 
                }
            }
            if(this.name == undefined){
                alert("姓名不得為空")
                return
            }else if(this.phone == undefined){
                alert("電話不得為空")
                return
            }else if(this.email == undefined){
                alert("email不得為空")
                return
            }else if(this.age == undefined){
                alert('年齡不得為空')
                return
            }
            const answers = this.quList.map(question => {
                let answer = null;

                if (question.optionType === '單選題') {
                    answer = question.selectedOption || null;
                } else if (question.optionType === '多選題') {
                    const selectedOptions = question.option.split(';').filter(option => {
                        return this.selectedOptions.includes(option);
                    });
                    answer = selectedOptions.length > 0 ? selectedOptions.join(';') : null;
                } else if (question.optionType === '短述題') {
                    answer = question.shortAnswer || null;
                }
                return {
                    quId: question.quId,
                    qnId: this.questionnaireId,
                    question:question.qTitle,
                    optionType: question.optionType,
                    answer: answer,
                };
                
                
            })
            console.log(answers)
            for(let i = 0; i < answers.length; i++){
                if(answers[i].answer == null){
                    alert("尚有問題未作答!!")
                    return
                }
            }

            this.$router.push({
            name: 'QuestionnaireFrontMakeSurePage',
            query: {
                name: this.name,
                phone: this.phone,
                email: this.email,
                age: this.age,
                qnId: this.questionnaireId,
                title: this.title,
                description: this.description,
                answers: JSON.stringify(answers)
            }
            })
        },
        
        //api獲取quList
        getQuestion() {
            const url = 'http://localhost:8081/api/quiz/searchQuestionList';
            const queryParams = new URLSearchParams({
                qnId: this.questionnaireId
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
                // 將 data 添加到 quList
                this.quList = data.questionList;
                console.log("quLsit")
                console.log(this.quList);
            })
            .catch(error => console.error('Error:', error));
        },

        //router.push傳送答案陣列
        send(){
            this.$router.push({
                name: 'QuestionnaireFrontMakeSurePage',
                query: {
                qnId:this.questionnaireId,
                title:this.title,
                description:this.description,
                quList:this.quList,
                name:this.name,
                phone: this.phone,
                email: this.email,
                age: this.age,
                answers:JSON.stringify(this.answers),
            }
            })
        },

        //上一頁
        goback(){
            this.$router.push({
                name: 'QuestionnaireFront',
            })
        },
    }
}
</script>
<template>
<div class="body">
    <div class="mainArea">
        <h1 class="flicker">{{ this.title }}</h1>
        <h1 class="textArea">{{ this.description }}</h1>
        <div>
            <label>姓名 : </label>
            <input type="text" v-model="name">
        </div>
        <div>
            <label>年齡 : </label>
            <input type="number" v-model="age">
        </div>
        <div>
            <label>信箱 : </label>
            <input type="text" v-model="email">
        </div>
        <div>
            <label>電話 : </label>
            <input type="text" v-model="phone">
        </div>

        <div v-for="question in quList" :key="question.quId">
            <label>{{ question.quId }}. </label>
            <label>{{ question.qTitle }}</label>
            <label>({{ question.optionType }})</label>
            <div v-for="(option, index) in question.option.split(';')" :key="index">
                <div v-if="question.optionType == '單選題'">
                    <input type="radio" :value="option" :name="question.quId" v-model="question.selectedOption" />
                    <label id="option">{{ option }}</label>
                </div>
                <div v-if="question.optionType == '多選題'" >
                    <input type="checkbox" :value="option"  v-model="selectedOptions"/>
                    <label id="option">{{ option }}</label>
                </div>
                <div v-if="question.optionType == '短述題'">
                    <input type="text" v-model="question.shortAnswer" id="shortAns" />
                </div>
            </div>
        </div>
        <div id="btnBox">
            <button @click="goback">取消</button>
            <button @click="getAnswer">提交</button>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>

#shortAns{
    margin: 1% 0 0 3%;
    height: 50px;
    width: 600px;

}
#option{
    margin: 1% 0 0 1%;
}

label{
    margin-top: 3% ;
    font-size: 16pt;
    font-weight: bold;
    color: white;
}


.questiontitle{
    display: flex;
    margin: 10px;
}

input{
    margin: 0 10px;
    // width: 100%;
}

.inputbox{
    display: flex;
}

.option{
    width: 100%;
    display: flex;
    margin: 0 10px;
}

#btnBox{
    width: 40%;
    margin: 2% 30%;
}

button{
    font-size: 16pt;
    font-weight: bold;
    width: 100px;
    margin: 0 1%;
    background-color: rgb(210, 123, 16);
    border-radius: 10px;
    box-shadow: 1px 1px 0px 1px;
    
}

//隱藏type=nunber的箭頭
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.body{
    width: 60vw;
    margin: 0 20%;
    min-height: 100vh;
    overflow-y: auto;
    border: 1px solid black;
    background-color: rgb(0, 68, 0);
    display: flex;
    padding: 2%;

    .textArea{
        background-color: rgb(210, 123, 16);
        border-radius: 10px;
        box-shadow: 3px 2px 0px 2px;
        padding: 0 1%;
        font-weight: bold;
    }
    .buttonArea{
        display: flex;
        justify-content: center;
    }
    .questionArr{
        display: flex;
    }
}
.d-flex{
    width: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    margin: 1%;
    
}

.mainArea{
    width: 100%;
    // margin:0 15%;
    height: 100%;
}
.d-flex input {
    vertical-align: middle;
    border-radius: 10px;
    padding: 0 1%;
    box-shadow: 3px 4px 0px 1px;
}
////////////////////////////////////////////////////////////////////////////title特效
.flicker{
		color:#e3d6f1; /*設定文字顏色*/
		font-size:50px; /*設定字型大小*/
		font-weight:bolder; /*設定字型粗細*/
		-webkit-animation: flicker 2s infinite;    /*設定動畫*/
}
@-webkit-keyframes flicker{                    /*建立動畫*/
        0%{
            opacity: 1;
        }
        50%{
            opacity: 0.5;
        }
        100%{
            opacity: 1;
        }
}
</style>