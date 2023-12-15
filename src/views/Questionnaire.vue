<script>

export default {
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
            controshowdel:true,
            isdele:false,   
        }
    },

    methods:{
        closedele(){
            this.isdele = false
            this.controshowdel = true;
        },

        showdele(){
            this.isdele = true
            this.controshowdel = false;
        },

        gofront(){
            this.$router.push('QuestionnaireFront')
        },

        //觀看結果
        goResult(index){
            var pageIndex = ((this.currentPage-1)*this.perpage+index); 
            this.qnId = this.allQn[pageIndex].questionnaire.id;
            this.title =  this.allQn[pageIndex].questionnaire.title;
            this.description =  this.allQn[pageIndex].questionnaire.description;
            console.log("qnId : ",this.qnId )
            this.$router.push({
                name:"QuestionnaireStaticPage",
                query:{
                    qnId:this.qnId,
                    title:this.title,
                    description: this.description,
                }
            })
        },

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
                    this.allQn = this.allQn.quizVoList.slice().reverse();
                    // console.log(this.allQn)
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
                this.isdele = false;
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
    <button @click="gofront" id="gofrontcss">前往前台</button>
    <div class="body" >
        <div class="aa">
        <div class="bb">
            <div class="top">
            <div>
                <div class="searchTitle">
                    <h2>問卷標題</h2>
                    <input type="text" v-model="qnTitle" id="titleSerach">
                </div>
                <div class="date" >
                    <h2>開始時間/結束時間</h2>
                    <input type="date" id="startDate" v-model="startDate">
                    <input type="date" id="endDate" v-model="endDate">
                </div> 
            </div>
        </div>
        <div class="btnArea">
            <button @click='fetchData()'>搜尋問卷</button>
            <button><RouterLink to="/QuestionnaireCreate" id="addqn">新增問卷</RouterLink></button>
            <button type="button" @click="showdele" v-show="controshowdel">刪除問卷</button>
            <button type="button" @click="closedele" v-show="isdele">取消刪除</button>
            <button type="button" @click=deleQn v-show="isdele">確認刪除</button>
        </div>
        <div class="bottom">
            <div class="notice">
                <div class="tips">
                    <label>*狀態 : 進行中與已結束無法編輯</label>
                    <label>*狀態 : 未發佈與尚未開始不可觀看結果</label>
                </div>
            </div>
            <table>
                <tr>
                    <th class="checkboxTd" v-show="isdele"></th>
                    <th>編號</th>
                    <th>問卷</th>
                    <th>狀態</th>
                    <th>開始時間</th>
                    <th>結束時間</th>
                    <th>結果</th>
                </tr>
                <tr v-for="(quiz,index) in allQn.slice(pageStart, pageEnd)" :key="index">
                    <td class="checkboxTd" v-show="isdele">
                        <input type="checkbox" v-model="quiz.checkbox" @change="handleCheckboxChange(quiz.questionnaire.id)" @click="catchIndex(index)" >
                    </td>
                    <td>{{ quiz.questionnaire.id }}</td>
                    <!--編輯判斷 -->
                    <td v-if="quiz.questionnaire.published == false ||quiz.questionnaire.published == true && nowDate <= quiz.questionnaire.startDate" @click='editQuestion(index)' :key="index" style="cursor: pointer;">{{ quiz.questionnaire.title }} </td>
                    <td v-else-if="quiz.questionnaire.published==true"  style="cursor: not-allowed;">{{ quiz.questionnaire.title }} </td>
                    <td v-if=" quiz.questionnaire.published == true && nowDate < quiz.questionnaire.startDate || quiz.questionnaire.published == false && nowDate < quiz.questionnaire.startDate">尚未開始</td>
                    <td v-if="quiz.questionnaire.endDate < nowDate ">已結束</td>
                    <td v-else-if="quiz.questionnaire.startDate <= nowDate && nowDate <= quiz.questionnaire.endDate ">進行中</td>
                    <td>{{ quiz.questionnaire.startDate }}</td>
                    <td>{{ quiz.questionnaire.endDate }}</td>
                    <!-- 進行中、已結束可以觀看結果 -->
                    <td style="cursor: pointer;" @click="goResult(index)" :key="index" v-if="quiz.questionnaire.startDate <= nowDate && nowDate <= quiz.questionnaire.endDate || this.nowDate > quiz.questionnaire.endDate">前往</td>
                    <td v-else  style="cursor: not-allowed;">尚未開始</td>
                </tr>
            </table>
        </div>
 
    <!--分頁 -->
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
    </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
#gofrontcss{
    margin: 0;
}


//左上狀態提示
.tips{
margin-left: 5%;
display: flex;
flex-direction: column;
}

.bb{
    width: 100%;
    height: 100%;
}
.notice{
    display: flex;
    flex-direction: column;
}
label{
    color: white;
}
.bottom{
    min-height: 60%;
    // overflow-y: auto;
}

a{
    text-decoration: none;
}

button{
    margin: 1%;
    font-weight: bold;
    font-size: 16pt;
}

h2{
    margin: 0%;
    color: white;
    font-weight: bold;
}

p{
    color: white;
    text-align: center;
    font-weight: bold;
}

table{
    min-height: 50vh;
    height: 100%;
    width: 90%;
    margin: 0 5%;
    background-color: rgb(31, 30, 30);
}

tr{
    height: auto;
    display: flex;
    justify-content: space-between;
    border-left: rgb(0, 0, 0) 1px solid;
}

th{
    width: 18%;
    height: auto;
    display: flex;
    justify-content: space-around;
    color: white;
    background-color: rgb(0, 96, 34);
}

.checkboxTd{
    width: 5%;
}

td{
    height: auto;
    width: 18%;
    color: white;
    text-align: center;
    font-size: 16pt;
    font-weight: bold;
}

tr:nth-of-type(even) td{
    background-color:rgb(0, 0, 0);
}

ul{
    height: auto;
    display: flex;
    justify-content: center;
    margin-top: 1%;
}

.body{
    width: 100%;
    min-height: 100vh;
    overflow-y: auto;
    padding-top: 2% 5%;
    .aa{
        width: 100%;
        display: flex;
    .top{
        display: flex;
        justify-content: center;
        .searchTitle{
            display: flex;
            margin-bottom: 2%;
            #titleSerach{
                width: 74.5%;
            }
            input,p{
                margin: 0 10px;
            }
        }
        .date{
            display: flex;
            input,p{
                margin: 0 10px;
            }
        }
    }

        .btnArea{
            display: flex;
            justify-content: center;
        }
    }
}
</style>