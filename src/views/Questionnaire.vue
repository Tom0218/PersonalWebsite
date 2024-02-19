<script>

export default {
    data(){
        return{
            //所有問卷
            allQn:[], 
            qnId:0,
            qnTitle:"",
            qnDescription:"",
            startDate:"",
            endDate:"",
            published:false,
            //index
            key:"", 
            //要呈現的資料
            datas:this.allQn,
             //一頁的資料數
            perpage: 10,
            currentPage: 1,
            selectedqnIds:[],
            selectQnIndexArr:[],  
            nowDate:"",  
            controshowdel:true,
            isdele:false,  
            //彈出視窗
            popup:0,
            //建立問卷步驟
            createStep:1,
        
        }
    },

    methods:{

         //新增物件
        Addtransaction(){
            this.popup = 1 
            },

        AddObj(){
            this.popup = 0
            },

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
                    "Access-Control-Allow-Origin":"*"

                })
                })
                .then((res) =>res.json())
                .catch((error) =>console.error("Error:",error))
                .then((data)=>{
                    if(data!= null){
                        this.allQn = data;
                        this.allQn = this.allQn.quizVoList.slice().reverse();
                    }
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
                if (this.allQn !== null && this.allQn !== undefined) {
                    return Math.ceil(this.allQn.length / this.perpage);
                }
            },

             //取得該頁第一個值的index
            pageStart() {
                if(this.currentPage < 0 ){
                    this.currentPage = 1;
                    return (this.currentPage - 1) * this.perpage 
                }
                return (this.currentPage - 1) * this.perpage      
            },

            //取得該頁最後一個值的index
            pageEnd() {
                if(this.currentPage < 0 ){
                    this.currentPage = 1;
                    return (this.currentPage - 1) * this.perpage 
                }
                return this.currentPage * this.perpage
            },

        }
}

</script>
<template>
    <div class="body" >
        <div class="mainArea">
            <div class="inputArea">
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
                <div class="btnArea">
                    <button @click='fetchData()'>搜尋問卷</button>
                    <button><RouterLink to="/QuestionnaireCreate" id="addqn">新增問卷</RouterLink></button>
                    <button type="button" @click="showdele" v-show="controshowdel">刪除問卷</button>
                    <button type="button" @click="closedele" v-show="isdele">取消刪除</button>
                    <button type="button" @click=deleQn v-show="isdele">確認刪除</button>
                    <button type="button" class="numBtn"   @click="Addtransaction()">Add transaction</button>
                </div>
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
                    <tr v-for="(quiz,index) in allQn && allQn.slice(pageStart, pageEnd)" :key="index">
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

        
        <!-- 新增物件 -->
        <div class="popup"  v-if ="popup == 1">
            <div class="popup-content">
                <div class="popup-header">
                    <h3>建立問卷(步驟{{this.createStep}})</h3>
                    <i class="fa-solid fa-circle-xmark" @click="this.popup = 0"></i>
                    <!-- <h2>{{ title }}</h2> -->
                </div>

                <div class="popup-body">
                    <!-- 弹出窗口的内容放在这里 -->
                    <div class="Build-Qn" >
                        <div class="BuildQn-step-one"  v-if="this.createStep == 1">
                            <div class="qnTile Box">
                                <h2>問卷名稱 &nbsp;</h2>
                                <input type="text" class="qnTileInputBox" v-model="qnTitle">
                            </div>
                            <div class="qnDesp Box">
                                <h2>問卷說明 &nbsp;</h2>
                                <input type="text" class="qnDesInputBox" v-model="qnDescription">
                            </div>
                            <div class="date Box" >
                                <h2>開始日期 &nbsp;</h2>
                                <input type="date" id="startDate" v-model="startDate">
                            </div> 
                            <div class="date Box">
                                <h2>結束日期  &nbsp;</h2>
                                <input type="date" id="endDate"  v-model="endDate">
                            </div> 
                            
                        </div>
                        <div class="BuildQn-step-two" v-if="this.createStep == 2">
                            as
                        </div>
                    </div>
                </div>
                <div class="popup-bottom">
                    <button type="button" @click="this.popup = 0">取消</button>
                    <button type="button" @click="this.createStep -=1" v-if="this.createStep > 1">上一步</button>
                    <button type="button" @click="this.createStep +=1">下一步</button>
                </div>
            </div>
        </div>
        <button @click="gofront" id="gofrontcss">前往前台</button>

    </div>
</div>
    <!-- /////CDN///// -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
            integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
            crossorigin="anonymous" referrerpolicy="no-referrer" />
</template>

<style lang="scss" scoped>
/////彈出視窗/////
.popup{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    }

.popup-content {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.popup-content .popup-header{
    display: flex;
    padding: 10px;
}

.popup-content .popup-header i{
    cursor: pointer;
    margin-left: 460px;
    margin-top: 10px;
}

.popup-content .popup-header h3{
    margin: 0;
}

.popup-content .popup-bottom{
    background: rgb(0, 96, 34);
    padding: 30px 0;   
    width: 100%;
    display: flex;
    justify-content: center;
}

.popup-conten .popup-bottom button{
    color: white;
    margin: 0 10px;
    border: 1px white solid;
    padding: 10px;
    font-size: 16pt;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
}

.popup .Build-Qn{
    height: 400px;
    width: 700px;
    background-color: rgb(0, 96, 34);
}

.popup .Build-Qn  .BuildQn-step-one{
        height: 100%;
        width: 70%;
        margin: 0 15%;
        display: flex;
        flex-direction: column;
        justify-content: center;
}

.popup .Build-Qn .BuildQn-step-one h2{
    text-align: center;
}

.popup .Build-Qn  .BuildQn-step-one input{
    width: 70%;
    height: 100%;
    border-radius: 10px;
    padding: 0 10px;
}

.popup .Build-Qn .Box{
    display: flex;
    margin: 10px 0;
}


.popup label{
    color: black;
    font-weight: bold;
    }

.popup-body{
    position: relative;
    .closeWindows{
        font-size: 26pt;
        position: absolute;
        right: 0;
        color: #4b85a0;
    }
}

#gofrontcss{
    margin: 0;
}

//左上狀態提示
.tips{
    margin-left: 5%;
    display: flex;
    flex-direction: column;
}

.notice{
    display: flex;
    flex-direction: column;
}

label{
    color: white;
}

.bottom{
    width: 100%;
    min-height: 60%;
    border-radius: 10px;
}

a{
    text-decoration: none;
}

button{
    font-weight: bold;
    font-size: 16pt;
    margin: 0 2px;
    border-radius: 10px;
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
    width: 100%;
    background-color: rgb(31, 30, 30);  
}

tr{
    height: auto;
    display: flex;
    justify-content: space-between;
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
    padding: 2% 5%;
    width:100%;

    .mainArea{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    .inputArea{
        display: flex;
        // margin: 2% 0;
        width: 100%;
        padding: 2% ;
        margin: 1% 0;
        background: rgb(31, 30, 30);
        border-radius: 10px;
        .searchTitle{
            display: flex;
            margin-bottom: 2%;
            #titleSerach{
                width: 74.5%;
            }
            input,p{
                margin: 0 10px;
                padding: 0 10px;
                border-radius: 10px;
            }
        }
        .date{
            display: flex;
            input,p{
                margin: 0 10px;
                border-radius: 10px;
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