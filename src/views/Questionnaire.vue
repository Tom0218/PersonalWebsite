<script>
import qnInsidePage from '../components/QuestionnaireInsidePage.vue';

export default {
    components:{
        qnInsidePage
    },
    data(){
        return{
            qnId:"",
            qnTitle:"",
            published:"",
            startDate:"",
            endDate:"",
            qnList:[], 
        }
    },
    methods:{
        fetchData() {
            console.log(this.startDate)
            console.log(this.endDate)
            //將要查詢的字串附加到url
            const url = 'http://localhost:8081/api/quiz/search';
            //帶入值
            const queryParams = new URLSearchParams({
                title: this.qnTitle,
                start_date:this.startDate,
                end_date:this.endDate,
            });
            const urlWithParams = `${url}?${queryParams}`;
            fetch(urlWithParams,{
                method:"GET",
                headers:new Headers({
                    "Content-Type":"application/json",
                })
                })
                .then((res) =>res.json())
                .catch((error) =>console.error("Error:",error))
                .then((response)=>{
                    this.qnList = response.quizVoList;
                    console.log(this.qnList);
                    // this.qnList.forEach((quiz) => {
                    //     this.qnId = quiz.questionnaire.id;
                    //     this.qnTitle = quiz.questionnaire.title;
                    //     this.published = quiz.questionnaire.published;
                    //     this.startDate = quiz.questionnaire.startDate;
                    //     this.endDate = quiz.questionnaire.endDate;
                    // });
                })
        },

    },

        mounted() {
            this.fetchData(); // 将方法调用放在函数体内

        }
    }


</script>

<template>
<div class="body" >
    <div class="aa">
        <div class="top">
                <div class="searchTitle">
                    <h1>問卷標題</h1>
                    <input type="text" v-model="qnTitle" >
                </div>
        <!-- ------------------------------------------------date -->
                <div class="date" >
                    <h1>開始/結束</h1>
                    <input type="date" id="startDate" v-model="startDate">
                    <input type="date" id="endDate" v-model="endDate">
                </div>
                <button @click='fetchData()'>search</button>
        <!-- -----------------------------------------------date -->
        </div>

        <button type="button" >新增問卷</button>

        <div class="bottom">
            <table>
                <tr>
                    <td>#</td>
                    <td>問卷</td>
                    <td>狀態</td>
                    <td>開始時間</td>
                    <td>結束時間</td>
                    <td>觀看統計</td>
                </tr>
                <tr v-for="(quiz,index) in qnList" :key="index">
                    <td>{{ quiz.questionnaire.id }}</td>
                    <td @click='goQuestion()'>{{ quiz.questionnaire.title }}</td>
                    <td>{{ quiz.questionnaire.published }}</td>
                    <td>{{ quiz.questionnaire.startDate }}</td>
                    <td>{{ quiz.questionnaire.endDate }}</td>
                    <td>觀看</td>
                </tr>
            </table>
        </div>
    </div>
</div>
<div>
</div>
<!-- <qnInsidePage/> -->

</template>

<style lang="scss" scoped>
h1{
    margin: 0%;
    color: white;
    font-weight: bold;
}

span{
    border: 1px solid black;
    padding: 0 3%;
    margin: 0%;

}
p{
    color: white;
}

table{
    width: 100%;
    text-align: left;
}

tr{
    display: flex;
    justify-content: space-between;
    border: 1px white solid;
}

td{
    width: 170px;
    color: white;
    text-align: center;

}
.body{
    width:100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    .aa{
        width: 80%;
        height: 60%;
        margin-top: 10%;
        border: 1px solid white;
        display: flex;
        flex-direction: column;
        .searchTitle{
            display: flex;
            justify-content: center;
            align-items: center;
            input,p{
                margin: 0 10px;
            }
        
        }
        .date{
            display: flex;
            align-items: center;
            justify-content: center;
            input,p{
                margin: 0 10px;
            }
        }
    }
    
}
</style>