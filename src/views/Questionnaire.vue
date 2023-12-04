<script>
import qnInsidePage from '../components/QuestionnaireInsidePage.vue';

export default {
    components:{
        qnInsidePage,
    },

    data(){
        return{
            allQn:[], //所有問卷
            qnId:0,
            qnTitle:"",
            qnDescription:"",
            startDate:"",
            endDate:"",
            published:false,
            key:"", //index
            datas:this.allQn,//要呈現的資料
            perpage: 10, //一頁的資料數
            currentPage: 1,
            selectedqnIds:[],
            selectQnIndexArr:[],  
            nowDate:"",     
        }
    },

    methods:{
        //search 
        fetchData() {
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
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"*"

                })
                })
                .then((res) =>res.json())
                .catch((error) =>console.error("Error:",error))
                .then((data)=>{
                    this.allQn = data;
                    this.allQn = this.allQn.quizVoList;
                    console.log(this.allQn)
                })
        },

        //分頁方法
        setPage(page) {
        if(page <= 0 || page > this.totalPage) {
            return
        }
        this.currentPage = page
        },
        
        //計算索引值
        catchIndex(index){
            var pageIndex = (this.currentPage-1)*10 + index;
            this.selectQnIndexArr.push({qnId:this.allQn[pageIndex].questionnaire.id, currentPage:this.currentPage, index:index}); 
            console.log(this.selectQnIndexArr);
        },

        //deleteQuestionnaire
        deleQn() {
            let stopDel = false; //終止方法的可愛變數          
            var qnIdList = [] ; // 後端需要的qnidList   
            var qnIdsIndex = [];   //前端要得索引值

            //判斷我要去刪掉陣列問卷的哪幾個
            for (let i = 0; i < this.selectQnIndexArr.length; i++) {
                let indexNum = 0;
                let countpage = this.selectQnIndexArr[i].currentPage
                let qnIndex =  this.selectQnIndexArr[i].index
                // console.log("第"+countpage+"頁");
                // console.log("qnIndex:"+qnIndex);

                
                indexNum = ((countpage-1)*this.perpage) + qnIndex
                qnIdsIndex.push(indexNum)
                qnIdList.push(this.allQn[indexNum].questionnaire.id)
            }
            console.log("被選中之問卷的索引值 :"+ qnIdsIndex);
            console.log("被選中之問卷的ids :"+ qnIdList);

            //判斷這幾個裡面有沒有已經出版在進行中的資料
            for (let i = 0; i < qnIdList.length; i++) {
                const qnStartDate =this.allQn[qnIdsIndex[i]].questionnaire.startDate;
                const qnIsPublished = this.allQn[qnIdsIndex[i]].questionnaire.published;
                const currentDate = new Date(); // 當下時間
                const jsonDateOnlyString = currentDate.toISOString().split('T')[0]; // 當下時間轉json格式並只取日期

                if (qnIsPublished ==true && qnStartDate <= jsonDateOnlyString) {
                    stopDel=true;
                    alert("你刪除的問卷當中有包含已開始的問卷所以禁止刪除");
                    location.reload(true);
                    return ;
                }
            };   
            var data = { 
                qnIdList: qnIdList,
            };
            var url = "http://localhost:8081/api/quiz/deleteQuestionnaire";

            fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            })
            .then((res) => res.json())
            .then((response) => {
                console.log("Success:", response);
                // 在成功完成 API 請求後執行 fetchData()
                this.fetchData();
            })
            .catch((error) => console.error("Error:", error));
        },

        //checkboxgeQnId fn
        handleCheckboxChange(questionnaireId) {
            const selectQnIds = this.selectedqnIds.indexOf(questionnaireId);
            if ( selectQnIds !== -1) {
                this.selectedqnIds.splice(selectQnIds, 1);
            } else { 
                this.selectedqnIds.push(questionnaireId);// 如果 ID 不存在于数组中，添加到数组
            }
            console.log('Selected Questionnaire Ids:',this.selectedqnIds); // 输出更新后的数组
            console.log(this.nowDate > 2023-12-3)
        },

        //獲取当前日期
        isPublished() {
            this.nowDate = new Date().toISOString().split('T')[0];   
        },

        //edit Question
        editQuestion(index){
            var pageIndex = ((this.currentPage-1)*this.perpage+index); 
            this.qnId = this.allQn[pageIndex].questionnaire.id;
            this.title =  this.allQn[pageIndex].questionnaire.title;
            this.description =  this.allQn[pageIndex].questionnaire.description;
            this.startDate =  this.allQn[pageIndex].questionnaire.startDate;
            this.endDate = this.allQn[pageIndex].questionnaire.endDate;
            this.published=this.allQn[pageIndex].questionnaire.published;
            console.log("qnId:"+this.qnId)
            // console.log("title:"+this.title)
            // console.log("description:"+this.description)
            // console.log("startDate:"+this.startDate)
            // console.log("endDate:"+this.endDate)
            // console.log("pusblished:"+this.published)
            this.$router.push({
            name: 'QuestionnaireCreate',
            query: {
                qnId:this.qnId,
                title:this.title,
                description:this.description,
                startDate:this.startDate,
                endDate:this.endDate,
                published:this.published
            }
            });
        }
},
        mounted() {
            this.fetchData(); // 将方法调用放在函数体内
            this.isPublished();
        },

        computed: {

            //Math.ceil()取最小整數
            totalPage() {
                return Math.ceil(this.allQn.length / this.perpage)
                
            },

             //取得該頁第一個值的index
            pageStart() {
                return (this.currentPage - 1) * this.perpage      
            },

            //取得該頁最後一個值的index
            pageEnd() {
                return this.currentPage * this.perpage
            },

        }
}

</script>

<template>
<div class="body" >
    <div class="aa">
        <div class="top">
                <h2>後台</h2>
                <div class="searchTitle">
                    <h2>問卷標題</h2>
                    <input type="text" v-model="qnTitle" >
                </div>
                <div class="date" >
                    <h2>開始/結束</h2>
                    <input type="date" id="startDate" v-model="startDate">
                    <input type="date" id="endDate" v-model="endDate">
                </div>             
        </div>
        <div class="btnArea">
            <button @click='fetchData()'>search</button>
            <button><RouterLink to="/QuestionnaireCreate" id="addqn">新增問卷</RouterLink></button>
            <button type="button" 
            @click=deleQn
            >刪除問卷</button>
        </div>
        <div class="bottom">
            <p>*已發布則無法編輯</p>
            <table>
                <tr>
                    <td></td>
                    <td>編號</td>
                    <td>問卷</td>
                    <td>狀態</td>
                    <td>開始時間</td>
                    <td>結束時間</td>
                    <td>觀看統計</td>
                </tr>
                <tr v-for="(quiz,index) in allQn.slice(pageStart, pageEnd)" :key="index">
                    <td>
                        <input type="checkbox" v-model="quiz.checkbox" @change="handleCheckboxChange(quiz.questionnaire.id)" @click="catchIndex(index)">
                    </td>
                    <td>{{ quiz.questionnaire.id }}</td>
                    <!--編輯判斷 -->
                    <td v-if="quiz.questionnaire.published==false" @click='editQuestion(index)' :key="index">{{ quiz.questionnaire.title }} </td>
                    <td v-else-if="quiz.questionnaire.published==true">{{ quiz.questionnaire.title }} </td>
                    <td>{{ quiz.questionnaire.published?'已發佈':'未發佈' }}</td>
                    <td>{{ quiz.questionnaire.startDate }}</td>
                    <td>{{ quiz.questionnaire.endDate }}</td>
                    <td>觀看</td>
                </tr>
            </table>
        </div>
    </div>
    <!-- ==========================================================================分頁 -->
        <ul class="pagination">
            <li class="page-item" @click.prevent="setPage(currentPage-1)">
                <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" :class="{'active': (currentPage === (n))}"
                v-for="(n, index) in totalPage" :key="index" @click.prevent="setPage(n)">
                <a class="page-link" href="#">{{ n }}</a>
            </li>
            <li class="page-item" @click.prevent="setPage(currentPage+1)">
                <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
        <!-- ==========================================================================分頁 -->
</div>
</template>

<style lang="scss" scoped>

a{
    text-decoration: none;
}

button{
    margin: 2%;
}

h2{
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
    height: 100%;
    width: 100%;
}

tr{
    height: auto;
    display: flex;
    justify-content: space-between;
    border: 1px white solid;
}

td{
    height: auto;
    width: 15%;
    color: white;
    text-align: center;
    font-size: 16pt;

}

ul{
    height: auto;
    display: flex;
    justify-content: center;
    margin-top: 1%;
}


.body{
    padding: 2%;
    width:90vw;
    margin: 0 5%;
    min-height: 100vh;
    overflow-y: auto;
    .aa{
        width: 80%;
        margin: 0 10%;
        height: 73%;
        
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
        .btnArea{
            display: flex;
            justify-content: center;
        }

        
    }
}
</style>