<script>
import makeSurePage from '../components/QuestionnaireCreateMakeSurePage.vue';

export default{

    components:{
        makeSurePage,
    },

    data(){
        return{
            key : 0, //索引值
            qId:0,
            question:"",
            optionType:"",
            necessary:false,
            questionOption:"",
            questionList:[],
            addbutton:"新增",// 加入問卷按鈕
            selectedIndexes:[],
        }
    },
    methods:{
        // add n edit
        addQuetion(){
            if( this.addbutton == "編輯"){
                console.log("問卷索引值:"+this.key)
                this.questionList[this.key].quId = this.qId
                this.questionList[this.key].qtitle = this.question;
                this.questionList[this.key].qOptionType = this.optionType;
                this.questionList[this.key].necessary = this.necessary;
                this.questionList[this.key].qOption = this.questionOption;
                this.addbutton = "新增";
                alert("修改成功");
                console.log(this.questionList)
                return
            }
            this.addbutton = "新增";
            this.qId+=1;
            this.questionList.push({
                quId:this.qId,
                qtitle:this.question,
                qOptionType:this.optionType,
                necessary:this.necessary,
                qOption:this.questionOption,
            });
            this.question = "";
            this.optionType = "";
            this.necessary = false;
            this.questionOption = "";
            console.log(this.questionList)
        },

        //Edit
        eidt(index){
            this.addbutton = "編輯"
            this.qId = this.questionList[index].quId;
            this.question = this.questionList[index].qtitle;
            this.optionType = this.questionList[index].qOptionType;
            this.necessary = this.questionList[index].necessary;
            this.questionOption = this.questionList[index].qOption;
            this.key = index
            console.log("問卷索引值:"+index)
        },
        
        //delQn
        delQu(){
            this.selectedIndexes.forEach(item => {
                this.questionList.splice(item,1);
            });
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
    <div class="body">
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
                        <td>{{ item.qtitle }}</td>
                        <td>{{ item.qOptionType }}</td>
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
            <button @click="$emit('beta',this.questionList,3)">送出</button>
        </div>
    </div>
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
    height: 100vh;
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