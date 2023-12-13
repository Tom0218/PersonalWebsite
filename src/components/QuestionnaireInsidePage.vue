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

    getAnswer() {
    // 处理获取答案逻辑
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
    }).then(() => {
        // 此代码块将在导航完成后执行
        console.log("导航完成");
    })

},
    
    test(){
    },

    test2(){
        var radioArr=[];
        var checkboxArr=[];
        var textArr=[];

        //尋找type為單選的答案
        const form=document.getElementById('createQuestionPlace');


        /////將所有單選的資料抓出來
        const radioAnswers={};
        const radioInputs = form.querySelectorAll('input[type = "radio"]:checked');

        radioInputs.forEach(input =>{
            const quName = input.getAttribute('name');
            const answer = input.value;
            radioAnswers[quName] = answer;  //??
            radioArr.push(answer) 
        });
        console.log('單選作答:',radioAnswers)
        
        console.log("資料型態:",typeof radioAnswers);

        //多選
        const checkboxAnswers = {};
        const checkboxInputs = form.querySelectorAll('input[type = "checkbox"]:checked');
        const checkboxInputsArray = [...checkboxInputs]; //擴展運算符... ， 將List轉換為數組
        console.log(typeof checkboxInputsArray);

        checkboxInputs.forEach(input =>{
            const quName = input.getAttribute("name");
            const answer = input.value;

            //檢查quName是否已存在，若不存在則新建一個屬性
            if(!checkboxAnswers[quName]){
                checkboxAnswers[quName] = [answer];
            } else {
                checkboxAnswers[quName].push(answer);//若已存在則將答案推進陣列
            }
           // ??
            checkboxArr.push(checkboxAnswers.null)
        });
        console.log('多選答案:',checkboxAnswers.null);
        console.log(typeof checkboxAnswers);

        //問答題
        const textAnswers = {};
        const textInputs = form.querySelectorAll('input[type="textarea"]');

        textInputs.forEach(input => {
                const questionName = input.getAttribute('name');
                const answer = input.value;
                textAnswers[questionName] = answer;
                textArr.push(answer)
            });
            console.log('文字輸入框作答答案：', textArr);
            console.log(typeof textArr);

            var AllanswerArrIndex = 0;
        // 遍歷問題列表
        this.questionArr.forEach(question => {

                //設定一個空字串來裝答案
                var answer = "";
                // 創建問題的容器 div
                const questionDiv = document.createElement('div');
                if(question.optionType=="單選"){
                    answer =radioArr[0]
                    if(answer!=null){
                        this.AllanswerArr[AllanswerArrIndex]=answer
                    }
                    if(question.necessary==true&&answer==null){
                        this.MustBeAnswerNum++
                    }
                    if(answer==null){
                        this.AllanswerArr[AllanswerArrIndex]="該使用者未作答"
                        answer="該使用者未作答"
                    }
                }
                if(question.optionType=="多選"){
                    let answerArr = checkboxArr[0]
                    if(answerArr!=null){
                        answerArr.forEach(input => {
                            answer=answer+input+";"
                        });
                        this.AllanswerArr[AllanswerArrIndex]=answer
                    }
                    if(question.necessary==true&&answerArr==null){
                        this.MustBeAnswerNum++
                    }
                    if(answerArr==null){
                        this.AllanswerArr[AllanswerArrIndex]="該使用者未作答"
                        answer="該使用者未作答"
                    }
                }
                if(question.optionType=="文字回答"){
                    answer =textArr[0]
                    if(answer!=""){
                        this.AllanswerArr[AllanswerArrIndex]=answer
                    }
                    if(question.necessary==true&&answer==""){
                        this.MustBeAnswerNum++
                    }
                    if(answer==""){
                        this.AllanswerArr[AllanswerArrIndex]="該使用者未作答"
                        answer="該使用者未作答"
                    }
                }

                // 添加問題標題
                const questionTitle = document.createElement('p');
                questionTitle.textContent =question.quid+"."+ question.qtitle;
                const questionAnswer = document.createElement('p');

                questionAnswer.textContent = answer
                questionTitle.setAttribute('style', 'font-size: 16pt;font-weight: bold;'); //小問題設定字型大小
                questionDiv.appendChild(questionTitle);
                questionDiv.appendChild(questionAnswer);

                // 將問題容器添加到整體容器中
                checkQuestionPlace.appendChild(questionDiv);

                //判斷問題狀態是什麼把相對應陣列裡面得數字刪掉
                if(question.optionType=="單選"){
                    radioArr.splice(0,1)
                }
                if(question.optionType=="多選"){
                    checkboxArr.splice(0,1)
                }
                if(question.optionType=="文字回答"){
                    textArr.splice(0,1)
                }

                AllanswerArrIndex++
            });


    },

    //api獲取quList
    getQuestion() {
        console.log("fetch裡的qnId是:"+this.questionnaireId)
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
            console.log("下面是fetch的question")
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
        <h1>{{ this.title }}</h1>
        <h1>{{ this.description }}</h1>
        <label>姓名:</label>
        <input type="text" v-model="name">
        <label>年齡:</label>
        <input type="number" v-model="age">
        <label>email:</label>
        <input type="text" v-model="email">
        <label>phone:</label>
        <input type="text" v-model="phone">
        <div v-for="question in quList" :key="question.quId">
            <label>{{ question.quId }}</label>
            <label>{{ question.qTitle }}</label>
            <label>{{ question.optionType }}</label>
    <div v-for="(option, index) in question.option.split(';')" :key="index">
        <div v-if="question.optionType == '單選題'">
            <input type="radio" :value="option" :name="question.quId" v-model="question.selectedOption" />
            {{ option }}
        </div>
        <div v-if="question.optionType == '多選題'" >
            <input type="checkbox" :value="option"  v-model="selectedOptions"/>
            <label>{{ option }}</label>
        
        </div>
        <div v-if="question.optionType == '短述題'">
            <input type="text" v-model="question.shortAnswer" />
        </div>
    </div>
</div>
<button @click="goback">取消</button>
<button @click="getAnswer">提交</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>

#shortans{
    width: 200px;
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

p{
    font-size: 16pt;
    margin: 0;
    margin-right: 1%;
    font-weight: bold;
    color: white;
}


button{
    margin: 0 1%;
    background-color: rgb(228, 24, 228);
    border-radius: 10px;
    box-shadow: 1px 1px 0px 1px;
    
}


/////////////////////////////////////////////////////////////隱藏type=nunber的箭頭
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
////////////////////////////////////////////////////////////
.body{
    width: 100vw;

    min-height: 100vh;
    overflow-y: auto;
    border: 1px solid black;
    background-color: green;
    display: flex;
    padding: 2%;

    .textArea{
        background-color: rgb(199, 0, 199);
        border-radius: 10px;
        box-shadow: 3px 2px 0px 2px;
        padding: 0 1%;
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
////////////////////////////////////////////////////////////////////////////title特效
</style>