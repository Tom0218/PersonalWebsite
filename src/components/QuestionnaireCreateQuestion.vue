<script>
import makeSurePage from '../components/QuestionnaireCreateMakeSurePage.vue';

export default{

    components:{
        makeSurePage,
    },

    data(){
        return{
            page : 1,
            key : 0, //索引值
            qnId:-1, //若大於-1表示為編輯模式
            title:"",
            description:"",
            published:false,
            startDate:"",
            endDate:"",
            quId:0,
            question:"",
            optionType:"",
            necessary:false,
            questionOption:"",
            questionList:[],
            addbutton:"新增",// 加入問卷按鈕
            selectedIndexes:[],
        }
    },

    props:[
        'questionnaire'
    ],

    mounted(){
        //判定是否為編輯模式
        if(this.questionnaire[0].qnId > -1){
            this.getQuestion()
        }
        // console.log(this.questionnaire)
        // console.log(this.questionnaire[0].qnId)
        // console.log("title:"+this.title)
        // console.log("description:"+this.description)
        // console.log("startDate:"+this.startDate)
        // console.log("endDate:"+this.endDate)
        // console.log("pusblished"+this.published)
    },

    methods:{
        goMakesurePage(){
            this.page=2;
        },

         //api獲取quList
        getQuestion() {
                console.log("fetch裡的qnId是:"+this.questionnaire[0].qnId)
                const url = 'http://localhost:8081/api/quiz/searchQuestionList';
                const queryParams = new URLSearchParams({
                    qnId: this.questionnaire[0].qnId
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
                    // console.log(data)
                    this.questionList = data.questionList;
                    console.log("下面是fetch的question")
                    console.log( this.questionList);
                })
                .catch(error => console.error('Error:', error));
            
        },

        // add n edit
        addQuetion(){
            //修改模式編輯
            if( this.addbutton == "編輯" &&this.questionnaire[0].qnId > -1){
                console.log("問卷索引值:"+this.key)
                this.questionList[this.key].quId = this.quId
                this.questionList[this.key].qnId = parseInt(this.questionnaire[0].qnId)
                this.questionList[this.key].qTitle = this.question;
                this.questionList[this.key].optionType = this.optionType;
                this.questionList[this.key].necessary = this.necessary;
                this.questionList[this.key].option = this.questionOption;
                this.addbutton = "新增";
                alert("修改模式編輯成功");
                console.log(this.questionList)
                this.qnId = -1;
                return
            }   

            //修改模式新增
            if(this.addbutton == "新增"&& this.questionnaire[0].qnId > -1){
                this.quId=this.questionList.length+1;
                this.questionList.push({
                    quId:this.quId,
                    qnId:parseInt(this.questionnaire[0].qnId),
                    qTitle:this.question,
                    optionType:this.optionType,
                    necessary:this.necessary,
                    option:this.questionOption,
                });
                this.qnId = -1;
                this.question = "";
                this.optionType = "";
                this.necessary = false;
                this.questionOption = "";
                alert("修改模式新增成功");
                return
            }

             //新增模式編輯
            if( this.addbutton == "編輯"){
                console.log("問卷索引值:"+this.key)
                this.questionList[this.key].quId = this.quId
                this.questionList[this.key].qTitle = this.question;
                this.questionList[this.key].optionType = this.optionType;
                this.questionList[this.key].necessary = this.necessary;
                this.questionList[this.key].option = this.questionOption;
                this.addbutton = "新增";
                alert("新增模式編輯成功");
                this.qnId = -1;
                this.question = "";
                this.optionType = "";
                this.necessary = false;
                this.questionOption = "";
                console.log(this.questionList)
                return
            }
            //新增模式新增
            if(this.addbutton == "新增"){
                // this.quId=this.questionList.length+1;
                // this.questionList.push({
                //     quId:this.quId,
                //     qTitle:this.question,
                //     optionType:this.optionType,
                //     necessary:this.necessary,
                //     option:this.questionOption,

                this.quId=this.questionList.length+1;
                this.questionList.push({
                    quId:this.quId,
                    qTitle:this.question,
                    optionType:this.optionType,
                    necessary:this.necessary,
                    option:this.questionOption,
                });
                this.qnId = -1;
                this.question = "";
                this.optionType = "";
                this.necessary = false;
                this.questionOption = "";
                console.log(this.questionList)
                alert("新增模式新增成功");
            }
        },

        //Edit
        eidt(index){
            this.addbutton = "編輯"
            this.quId = this.questionList[index].quId;
            this.qnId = parseInt(this.questionnaire[0].qnId)
            this.question = this.questionList[index].qTitle;
            this.optionType = this.questionList[index].optionType;
            this.necessary = this.questionList[index].necessary;
            this.questionOption = this.questionList[index].option;
            this.key = index
            console.log("問卷索引值:"+index)
        },
        
        //delQn
        delQu(){
            this.selectedIndexes.forEach(item => {
                this.questionList.splice(item,1);
            });
            console.log(this.questionList)
        },

        //quindex
        handleCheckboxChange(index) {
            // checkbox 更動時的處理邏輯
                if (this.questionList[index].checkbox) {
                    // 如果 checkbox 被選中，將索引存入陣列
                    this.selectedIndexes.push(index);
                } else {
                    // 如果 checkbox 取消選中，從陣列中刪除索引
                    const indexToDelete = this.selectedIndexes.indexOf(index);
                    if (indexToDelete !== -1) {
                    this.selectedIndexes.splice(indexToDelete, 1);
                    }
                }
                // console.log(this.selectedIndexes)
            },
    }
}
</script>

<template>
    <div class="body" v-if="page==1">
    <div class="mainArea">
        <div class="setQuestion">
            <div class="question Box">
                <h2>問題</h2>
                <input type="text" v-model="question">
                <select v-model="optionType">
                <option value="單選題">單選題</option>
                <option value="多選題">多選題</option>
                <option value="短述題">短述題</option>
            </select>
            <input type="checkbox" name="" id="necessary" v-model="necessary"> 
            <h2>必填</h2>
            </div>

            <div class="option Box">
                <div>
                    <h2>選項 </h2>
                    <p>(多個答案請以";"分號做分隔)</p>
                    <button @click="delQu">刪除</button>
                </div>
                <input type="text" class="optionInputBox" v-model="questionOption">
                <button @click="addQuetion">{{this.addbutton}}</button>
            </div>
            <div class="questionList">
                <table>
                    <tr>
                        <td>#</td>
                        <td>編號</td>
                        <td>內容</td>
                        <td>問題種類</td>
                        <td>必填</td>
                        <td>編輯</td>
                    </tr>
                    <tr v-for="(item,index) in questionList" :key="index">
                        <td>
                        <input type="checkbox" v-model="item.checkbox" :key="index" @change="handleCheckboxChange(index)">
                        </td>
                        <td>{{ item.quId }}</td>
                        <td>{{ item.qTitle }}</td>
                        <td>{{ item.optionType }}</td>
                        <td>
                            <input type="checkbox" v-model="item.necessary  ">
                        </td>
                        <td>
                            <button @click="eidt(index)" :key="index">編輯</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="btnBox">
            <button @click="$emit('daines',1)">上一步</button>
            <button @click="goMakesurePage">送出</button>
        </div>
    </div>
    </div>
    <div v-else-if="page==2">
        <makeSurePage
            :quList="this.questionList"
            :questionnaire="this.questionnaire"
        />
    </div>
</template>
<style lang="scss" scoped>
#necessary{
    width: 40px;
    margin-left: 20px;
}

h2{
    margin: 0 2%;
    color: white;
}

button{
    margin: 0 1%;
    width: 100px;
}

p{
    margin: 0%;
    color: white;
}


tr{
    height: auto;
    justify-content: space-between;
    border: 1px white solid;
}

td{
    height: auto;
    color: white;
    text-align: center;

}

table{
    width: 100%;
    text-align: left;
}
.body{
    width: 100vw;
    min-height: 100vh;
    overflow-y: auto;
    background-color: green;
    .Box{
        display: flex;
        margin: 2% 0;
    }
    .setQuestion{
            width: 70%;
            height: 80%;
            border: 1px white solid;
            .optionInputBox{
                width: 60%;
                height: 100px;
                margin-left: 2%;
            }
            .questionList{
                width: 100%;
            }
        }
        .mainArea{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .btnBox{
            display: flex;
        }
}
</style>