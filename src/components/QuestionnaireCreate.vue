<script>
import makeSurePage from '../components/QuestionnaireCreateMakeSurePage.vue';
import setQuestionPage from '../components/QuestionnaireCreateQuestion.vue';
import {RouterLink } from 'vue-router'

export default{
    components:{
        RouterLink,
        setQuestionPage,
        makeSurePage,
    },

    data(){
        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() + 2);
        const formattedStartDate = startDate.toISOString().split('T')[0];

        // 預設enddate
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 7);
        const formattedEndDate = endDate.toISOString().split('T')[0];


        return{
            published:false,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            page:1,
            Questionnaire:[],
            quList: [],
            qnId:-1,
            qnTitle:"",
            qnDescription:"",
        };
    },

    mounted(){
        this.qnId = this.$route.query.qnId;
        if(this.qnId >-1){
            this.qnTitle = this.$route.query.title;
            this.qnDescription = this.$route.query.description;
            this.startDate = this.$route.query.startDate;
            this.endDate = this.$route.query.endDate;
            this.published = this.$route.query.published;
        }
    },

    methods:{

        //問題設置的上一頁
        goBack(x){
            this.page = x;
        },

        next(){
            if(this.qnId > -1){        
                this.Questionnaire.push({
                    qnId:this.qnId,
                    title: this.qnTitle,   
                    description: this.qnDescription,
                    published:this.published,
                    endDate: this.endDate,
                    startDate: this.startDate,
                })
                console.log(this.Questionnaire);
                this.page = 2 ;
                return
            }
            if(this.qnTitle =="" ){
                alert("'問卷名稱'不得為空!!")
                return
            }else if(this.qnDescription == ""){
                alert("'問卷描述'不得為空!!")
                return
            }
            this.Questionnaire.push({
                    title: this.qnTitle,   
                    description: this.qnDescription,
                    published:this.published,
                    startDate: this.startDate,
                    endDate: this.endDate
                })
                this.page = 2 ;
                console.log(this.Questionnaire);
                return
        },

        getQuList(x,y){
            console.log("question_list");
            console.log(x);
            this.page = y;
            this.quList = x;
        },

        back(x){
            this.page = x;
        },

        goSetQuestion(x){
            this.page = x;
        }

    },
}
</script>

<template>
<div class="body" v-if="page==1">
    <div class="setQuestionnaire" >
        <div class="qnTile Box">
            <h2>問卷名稱</h2>
            <input type="text" class="qnTileInputBox" v-model="qnTitle">
        </div>

        <div class="qnDesp Box">
            <h2>問卷說明</h2>
            <input type="text" class="qnDesInputBox" v-model="qnDescription">
        </div>
        <div class="date Box" >
            <h2>開始日期/結束日期</h2>
            <input type="date" id="startDate" v-model="startDate">
            <input type="date" id="endDate"  v-model="endDate">
        </div>   
        <div class="btnBox">
            <button><RouterLink to="/Questionnaire">取消</RouterLink></button>
            <button @click="next">下一步</button>
        </div>
    </div>
</div>

<div v-else-if="page ==2">
    <setQuestionPage
        :questionnaire="this.Questionnaire"
        @daines="goBack"
    />
</div>

<div v-else="this.page ==3">
    <makeSurePage
    @goSetQuestion="goSetQuestion"
    />
</div>

</template>

<style lang="scss" scoped>

input{
    margin: 0 1%;
}

a{
    text-decoration: none;
}
h1{
    color: white;
    font-weight: bold;
}

h2{
    margin: 0 1%;
    color: white;
    font-weight: bold;
}

.btnBox{
    width: 20%;
    margin: 0 40%;
}

button{
    margin: 0 2%;
    font-size: 16pt;
    font-weight: bold;
}
.body{
    padding: 2%;
    width: 100vw;
    min-height: 100vh;
    overflow-y: auto;
    justify-content: center;
    display: flex;

    .Box{
        display: flex;
        margin: 2% 0;
    }

    .setQuestionnaire{
        width: 60%;
        height: 60%;
        .qnDesInputBox{
            height: 40px;
            width: 80%;
        }
        .qnTileInputBox{
            width: 80%;
        }
    }
}
</style>