<script>

export default{

data(){
    return{
        questionnaireId:0,
        qnTitle:"",
        qnDescription:"",
        quList:[],
        name:"",
        phone:"",
        email:"",
        age:"",
        selectedAnswers: {}, // 存放单选题答案的对象
        selectedOptions: [], // 存放多选题选项的对象
        shortAnswers: {}, // 存放短述题答案的对象
        ansObj:{},  
    }
},

mounted() {
    this.questionnaireId = this.$route.query.qnId; //qnId
    this.qnTitle = this.$route.query.qnTitle; //qntitle
    this.qnDescription = this.$route.query.qnDescription;//qndescription
    this.getQuestion(); // 內頁資料更新
    this.name = this.$route.query.name;
    this.email = this.$route.queryemail;
    this.age = this.$route.queryage;
    this.phone = this.$route.queryphone;
    this.ansObj = this.$route.queryansObj;
    this.questionnaireId = this.$route.queryqnId
    },


methods:{

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
        this.ansObj = this.quList.reduce((result, question, index) => {
        const answer = this.getAnswer(question, index);
        result[question.quId] = {
        qTitle: question.qTitle,
        optionType: question.optionType,
        quId: question.quId,
        answer: answer,
        };
            return result;
        }, {});
        console.log(this.ansObj)

      // 打印问题与答案字符串
        this.$router.push({
            name: 'QuestionnaireFrontMakeSurePage',
            query: {
            qnId:this.questionnaireId,
            qnTitle:this.qnTitle,
            qnDescription:this.qnDescription,
            quList:this.quList,
            name:this.name,
            phone: this.phone,
            email: this.email,
            age: this.age,
            ansObj:JSON.stringify(this.ansObj),
        }
        })
    },

    //上一頁
    goback(){
        this.$router.push({
            name: 'QuestionnaireFront',
        })
    },

    //答案物件測試
    displayResults() {
    const resultsObject = this.quList.reduce((result, question, index) => {
        const answer = this.getAnswer(question, index);
        result[question.quId] = {
        qTitle: question.qTitle,
        optionType: question.optionType,
        quId: question.quId,
        answer: answer,
        };
        return result;
    }, {});

    // 输出结果对象
    console.log(resultsObject);
    },

    //答案物件測試
    getAnswer(question, index) {
    switch (question.optionType) {
        case '單選題':
        return this.selectedAnswers[question.quId] || '';
        case '多選題':
        return this.selectedOptions
        case '短述題':
        return this.shortAnswers[question.quId] || '';
        default:
        return '';
    }
    },
},
    


}

</script>

<template>
<div class="body">
    <div class="mainArea">
        <h3 class="flicker">{{this.qnTitle}}</h3>
        <div>
            <div class="textArea">
                <p> {{ this.qnDescription }}</p>
            </div>
            <div>
                <div class="d-flex">
                    <div class="d-flex align-middle">
                        <p>姓名</p>
                        <input type="text " v-model="name">
                    </div>
                    <div class="d-flex align-middle">
                        <p>手機</p>
                        <input type="text" v-model="phone">
                    </div>
                    <div class="d-flex align-middle">
                        <p>信箱</p>
                        <input type="text" v-model="email">
                    </div>
                    <div class="d-flex align-middle">
                        <p>年齡</p>
                        <input type="number" v-model="age">
                    </div>
                </div>
            
                <div class="questionArea">
    <div class="questiontitle" v-for="(question, index) in quList" :key="index">
        <p>{{ question.quId }}</p>
        <p>{{ question.qTitle }}</p>
        <p>({{ question.optionType }})</p>
        <div class="inputbox" v-if="question.optionType === '單選題'">
            <div v-for="(option, index) in question.option.split(';')" :key="index">
            <div class="option">
                <input type="radio" :name="'answer_' + question.quId" v-model="selectedAnswers[question.quId]" :value="option">
                <p>{{ option }}</p>
            </div>
            </div>
        </div>
        <div class="inputbox" v-if="question.optionType === '多選題'">
    <div v-for="option in question.option.split(';')" :key="option">
        <div class="option">
        <input type="checkbox" v-model="selectedOptions" :value="option">
        <p>{{ option }}</p>
        </div>
    </div>
    </div>
        <div class="inputbox" v-if="question.optionType === '短述題'">
            <input id="shortans" type="text" v-model="shortAnswers[question.quId]">
        </div>
        </div>
        <!-- 显示问题与答案字符串 -->
        <!-- <button @click="displayResults">显示问题与答案字符串</button> -->
    </div>
            </div> 
            <div>             
            <button @click="goback">cancel</button>
            <button @click="send">send</button> 
            </div>
        </div>
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
    width: 70vw;
    margin: 0 15%;
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