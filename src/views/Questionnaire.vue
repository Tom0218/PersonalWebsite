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
            createStep:0,
            //新增問題or修改問題button
            EditAndSaveBtn:"新增",
            //建立問卷要素_new
            NewQuestionnareName:"",
            questionnaire:[],
            question:"",
            optionType:"",
            necessary:false,
            questionOption:"",
            questionList:[],

            //刪除問題用
            selectedIndexes:[],
            selectedQuIds:[],
            delQuList:[],

            //控制btnArea
            containerWidth: '100%', // 初始容器宽度  


        
        }
    },

    methods:{

         //新增問卷
        Addtransaction(){
            this.popup = 1 ;
            this.createStep = 1;
            console.log("step:", this.createStep)
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

        //下一步
        next(){
            console.log("step:", this.createStep)
            this.createStep +=1;
            //step 1 當按下next會驗證所以條件為2
            if(this.createStep == 2){
                //新增模式
                if(this.qnId == 0){
                    if(this.NewQuestionnareName ==""){
                        alert("問卷名稱不得為空!!")
                        this.createStep = 1;
                        return
                    } else if (this.qnDescription =="") {
                        alert("問卷描述不得為空!!")
                        this.createStep = 1;
                        return
                    } else if (this.startDate =="") {
                        alert("起始時間不得為空!!")
                        this.createStep = 1;
                        return
                    }  else if(this.endDate =="")   {
                        alert("結束時間不得為空!!")
                        this.createStep = 1;
                        return
                    }

                    this.questionnaire.push({
                        title: this.NewQuestionnareName,   
                        description: this.qnDescription,
                        published:this.published,
                        startDate: this.startDate,
                        endDate: this.endDate
                    })
                    console.log("New questionnaire :",this.questionnaire)
                }
                //編輯模式
                if(this.qnId > 0){        
                    this.questionnaire.push({
                        qnId:this.qnId,
                        title: this.NewQuestionnareName,   
                        description: this.qnDescription,
                        published:this.published,
                        endDate: this.endDate,
                        startDate: this.startDate,
                    })
                    console.log("Edited questionnaire",this.questionnaire);
                    this.getQuestion();
                }
            }

            //step 2 當按下next會驗證所以條件為3
            if(this.createStep == 3){
                //編輯模式若qnId大於0表示為編輯模式
                // if(this.qnId > 0){
                //     //獲取現有問題
                //     if(this.EditAndSaveBtn == "編輯"){
                //         this.questionList[this.key].quId = this.quId
                //         this.questionList[this.key].qnId = parseInt(this.questionnaire[0].qnId)
                //         this.questionList[this.key].qTitle = this.question;
                //         this.questionList[this.key].optionType = this.optionType;
                //         this.questionList[this.key].necessary = this.necessary;
                //         this.questionList[this.key].option = this.questionOption;
                //         this.EditAndSaveBtn = "新增";
                //         alert("編輯模式編輯成功!!");
                //         console.log(this.questionList)
                //         return
                //     } else if(this.EditAndSaveBtn == "新增"){
                //         this.quId=this.questionList.length+1;
                //         this.questionList.push({
                //             quId:this.quId,
                //             qnId:parseInt(this.questionnaire[0].qnId),
                //             qTitle:this.question,
                //             optionType:this.optionType,
                //             necessary:this.necessary,
                //             option:this.questionOption,
                //         });
                //         return
                //     }
                // }

                //新增模式
                // if(this.qnId == 0){
                //     //新增模式編輯
                //     if( this.EditAndSaveBtn == "編輯"){
                //         if(this.question == ""){
                //             alert("問題不能為空")
                //             return
                //         } else if(this.optionType ==""){
                //             alert("題行不得為空")
                //             return
                //         } else if(this.questionOption ==""){
                //             alert("選項不得為空")
                //             return
                //         }
    
                //         this.questionList[this.key].quId = this.quId
                //         this.questionList[this.key].qTitle = this.question;
                //         this.questionList[this.key].optionType = this.optionType;
                //         this.questionList[this.key].necessary = this.necessary;
                //         this.questionList[this.key].option = this.questionOption;
                //         this.EditAndSaveBtn = "新增";
                //     }
                // }
            }
        },

        cancel(){
            this.createStep = 0;
            this.popup = 0 ;
            this.NewQuestionnareName ="";   
            this.qnDescription = "";
            this.published = false;
            this.startDate = "";
            this.endDate = "";

            this.questionnaire = [];
            this.question = "";
            this.optionType = "";
            this.necessary = false;
            this.questionOption = "";
            this.questionList = [];
            this.selectedIndexes = [];
            this.selectedQuIds = [];
            this.delQuList = [];
        },

        //取得questionList
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

        //儲存問卷
        save(){
            console.log("questionnaire:",this.questionnaire)
            var questionList = this.questionList;
            console.log("qnId:",this.qnId)
            //update not publish
            if( this.qnId > 0){
                var url = "http://localhost:8081/api/quiz/update";
                var Qn = {
                "questionnaire": {
                    "id":parseInt(this.questionnaire[0].qnId),
                    "title": this.questionnaire[0].title,
                    "description":this.questionnaire[0].description,
                    "published":false,
                    "startDate": this.questionnaire[0].startDate,
                    "endDate": this.questionnaire[0].endDate
                },
                "question_list": [],
                "deleteQuestionList":[],

                };
                for (let i = 0; i < questionList.length; i++) {
                    Qn.question_list.push({
                        "quId": questionList[i].quId,
                        "qnId":parseInt(this.questionnaire[0].qnId),
                        "qTitle": questionList[i].qTitle,
                        "optionType": questionList[i].optionType,
                        "isnecessary": questionList[i].necessary,
                        "option": questionList[i].option
                    })
                };

                if(this.delQuList !=""){
                    for(let i = 0; i < this.delQuList.length; i++){
                        Qn.deleteQuestionList.push({
                            "qnId":parseInt(this.qnId),
                            "quId":this.deleQuIds[i],
                        })
                    };
                }
                console.log(Qn)

                fetch(url, {
                method: "POST",
                body: JSON.stringify(Qn),
                headers: new Headers({
                "Content-Type": "application/json",
                }),
                })
                .then((res) => res.json())
                .then((response) => {
                    console.log(response);
                    alert(response.rtncode)
                    this.popup = 0;
                    this.qnId = 0;
                })
                .catch((error) => console.error("Error:", error));
                return;
            };

            //create not publish
            var url = "http://localhost:8081/api/quiz/create";
            
            var Qn = {
            "questionnaire": {
                "title": this.questionnaire[0].title,
                "description":this.questionnaire[0].description,
                "published":false,
                "startDate": this.questionnaire[0].startDate,
                "endDate": this.questionnaire[0].endDate
            },

            "question_list": []
            };   
                
            for (let i = 0; i < this.questionList.length; i++) {
                Qn.question_list.push({
                "quId": questionList[i].quId,
                "qTitle": questionList[i].qTitle,
                "optionType": questionList[i].optionType,
                "necessary": questionList[i].necessary,
                "option": questionList[i].option
                });
            }
            console.log(Qn)
            fetch(url, {
                method: "POST",
                body: JSON.stringify(Qn),
                headers: new Headers({
                "Content-Type": "application/json",
                }),
            })
            .then((res) => res.json())
            .then((response) => {
                console.log(response);
                alert(response.rtncode)
                this.popup = 0;
                this.qnId = 0;
            })
            .catch((error) => console.error("Error:", error));
            },

        //新增或編輯問卷題目
        addOREditQuetion(){

            console.log("qnId :",this.qnId)
            //修改模式
            if(this.qnId > 0  ){
                //編輯
                if( this.EditAndSaveBtn == "編輯"){
                    if(this.question == ""){
                    alert("問題不能為空")
                    return
                    } else if(this.optionType ==""){
                        alert("題行不得為空")
                        return
                    } else if(this.questionOption ==""){
                        alert("選項不得為空")
                        return
                    }
                    console.log("問題索引值:"+this.key)
                    this.questionList[this.key].quId = this.quId
                    this.questionList[this.key].qnId = parseInt(this.questionnaire[0].qnId)
                    this.questionList[this.key].qTitle = this.question;
                    this.questionList[this.key].optionType = this.optionType;
                    this.questionList[this.key].necessary = this.necessary;
                    this.questionList[this.key].option = this.questionOption;
                    this.EditAndSaveBtn = "新增";
                    alert("修改模式編輯成功");
                    console.log("questionList:",this.questionList)
                    return
                }   
                //新增
                if(this.EditAndSaveBtn == "新增"){
                    this.quId = this.questionList.length+1;
                    this.questionList.push({
                        quId:this.quId,
                        qnId:parseInt(this.questionnaire[0].qnId),
                        qTitle:this.question,
                        optionType:this.optionType,
                        necessary:this.necessary,
                        option:this.questionOption,
                    });
                    this.question = "";
                    this.optionType = "";
                    this.necessary = false;
                    this.questionOption = "";
                    alert("修改模式新增成功!!");
                    console.log("updated quList:",this.questionList)
                    return
                }
            }

             //新增模式編輯
            if(this.qnId == 0){
                //編輯
                if( this.EditAndSaveBtn == "編輯"){
                    if(this.question == ""){
                        alert("問題不能為空!!")
                        return
                    } else if(this.optionType ==""){
                        alert("題型不得為空!!")
                        return
                    } else if(this.questionOption ==""){
                        alert("選項不得為空!!")
                        return
                    }
                    // console.log("問卷索引值:"+this.key)
                    this.questionList[this.key].quId = this.quId
                    this.questionList[this.key].qTitle = this.question;
                    this.questionList[this.key].optionType = this.optionType;
                    this.questionList[this.key].necessary = this.necessary;
                    this.questionList[this.key].option = this.questionOption;
                    this.EditAndSaveBtn = "新增";
                    alert("新增模式編輯成功!!");
                    this.question = "";
                    this.optionType = "";
                    this.necessary = false;
                    this.questionOption = "";
                    console.log(this.questionList)
                    return
                }
                //新增
                if(this.EditAndSaveBtn == "新增"){
                    if(this.question == ""){
                        alert("問題不能為空!!")
                        return
                    } else if(this.optionType ==""){
                        alert("題行不得為空!!")
                        return
                    } else if(this.questionOption ==""){
                        alert("選項不得為空!!")
                        return
                    }
                    this.quId=this.questionList.length+1;
                    this.questionList.push({
                        quId:this.quId,
                        qTitle:this.question,
                        optionType:this.optionType,
                        necessary:this.necessary,
                        option:this.questionOption,
                    });
                    this.question = "";
                    this.optionType = "";
                    this.necessary = false;
                    this.questionOption = "";
                    console.log(this.questionList)
                    alert("新增模式新增成功!!");
                }
            }
            },
        
        edit(index){
            //編輯模式下編輯
            if(this.qnId > -1){ 
                this.EditAndSaveBtn = "編輯"
                this.quId = this.questionList[index].quId;
                this.qnId = parseInt(this.questionnaire[0].qnId)
                this.question = this.questionList[index].qTitle;
                this.optionType = this.questionList[index].optionType;
                this.necessary = this.questionList[index].necessary;
                this.questionOption = this.questionList[index].option;
                this.key = index
                // console.log("問卷索引值:"+index)
            }
            //新增模式下編輯
            this.EditAndSaveBtn = "編輯"
                this.quId = this.questionList[index].quId;
                this.question = this.questionList[index].qTitle;
                this.optionType = this.questionList[index].optionType;
                this.necessary = this.questionList[index].necessary;
                this.questionOption = this.questionList[index].option;
                this.key = index
        },

        editQuestion(index){
            var pageIndex = ((this.currentPage-1)*this.perpage+index); 
            this.qnId = this.allQn[pageIndex].questionnaire.id;
            this.NewQuestionnareName =  this.allQn[pageIndex].questionnaire.title;
            this.qnDescription =  this.allQn[pageIndex].questionnaire.description;
            this.startDate =  this.allQn[pageIndex].questionnaire.startDate;
            this.endDate = this.allQn[pageIndex].questionnaire.endDate;
            this.published=this.allQn[pageIndex].questionnaire.published;
            console.log("qnId:"+this.qnId)
            this.popup = 1;
            this.next();
            
            /////old edition/////
            // this.$router.push({
            // name: 'QuestionnaireCreate',
            // query: {
            //     qnId:this.qnId,
            //     title:this.title,
            //     description:this.description,
            //     startDate:this.startDate,
            //     endDate:this.endDate,
            //     published:this.published
            // }
            // });
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

        //deleteQuestion
        delQu(){
             //新增模式下delQu
            this.selectedIndexes.forEach(item => {
                this.delQuList =  this.selectedQuIds
                this.questionList.splice(item,1);
            });

            this.questionList.forEach((item, index) => {
                item.quId = index + 1;
            });

            console.log("Updated QuestionList :", this.questionList)

            console.log("Deleteed QuList :", this.delQuList)
            },

        handleCheckboxChangeForStepTwo(index){
            const currentQuId = this.questionList[index].quId;
            if (this.questionList[index].checkbox) {
                // 如果复选框被选中，将 quId 存入数组
                this.selectedQuIds.push(currentQuId);
                this.selectedIndexes.push(index);
            } else {
                // 如果复选框取消选中，从数组中删除 quId
                const indexToDelete = this.selectedQuIds.indexOf(currentQuId);
                if (indexToDelete !== -1) {
                    this.selectedQuIds.splice(indexToDelete, 1);
                }
                // 从数组中删除索引
                this.selectedIndexes = this.selectedIndexes.filter(i => i !== index);
            }
            console.log("QuIds:", this.selectedQuIds);
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
            <div class="inputArea" >
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
                    <button type="button" class="numBtn"   @click="Addtransaction()"> 新增問卷</button>
                    <!-- <button><RouterLink to="/QuestionnaireCreate" id="addqn">新增問卷</RouterLink></button> -->
                    <button type="button" @click="showdele" v-show="controshowdel">刪除問卷</button>
                    <button type="button" @click="closedele" v-show="isdele">取消刪除</button>
                    <button type="button" @click=deleQn v-show="isdele">確認刪除</button>
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
                        <!--Question_title 是否可編輯判斷-->
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
                    <i class="fa-solid fa-circle-xmark" @click="cancel()"></i>
                    <!-- <h2>{{ title }}</h2> -->
                </div>

                <div class="popup-body">
                    <!-- 弹出窗口的内容放在这里 -->
                    <div class="Build-Qn" >
                        <div class="BuildQn-step-one"  v-if="this.createStep == 1">
                            <div class="qnTile Box">
                                <h2>問卷名稱 &nbsp;</h2>
                                <input type="text" class="qnTileInputBox" v-model="NewQuestionnareName">
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
                            <div class="Box">
                                <label>題目 &nbsp;</label>
                                <input type="text" v-model="question">
                            </div>
                            <div  class="Box">
                                <label>選項 &nbsp;</label>
                                <input type="text" placeholder="選項請以 ; (分號)做分隔" v-model="questionOption">
                            </div>
                            <div  class="Box">
                                <label>題型 &nbsp;</label>
                                <select v-model="optionType">
                                    <option value="單選題">單選題</option>
                                    <option value="多選題">多選題</option>
                                    <option value="短述題">短述題</option>
                                </select>
                            </div>
                            <div class="EditSaveArea">
                                <label>必填 &nbsp;</label>
                                <input type="checkbox" class="StepTwoCheckbox" v-model="necessary">
                                <div id="cancelAndSaveBtn">
                                    <button v-if="this.EditAndSaveBtn =='編輯'">取消</button>
                                    <button title="刪除以勾選問題" @click="delQu()">刪除</button>
                                    <button @click="addOREditQuetion">{{this.EditAndSaveBtn}}</button>
                                </div>
                            </div>
                            <table>
                                <tr>
                                    <td class="line1">#</td>
                                    <td class="line2">編號</td>
                                    <td class="line3">題目</td>
                                    <td class="line4">問題種類</td>
                                    <td class="line5">必填</td>
                                    <td class="line6">編輯</td>
                                </tr>
                                <tr v-for="(item,index) in questionList" :key="index">
                                    <th  class="line1">
                                        <input type="checkbox" v-model="item.checkbox" :key="index" @change="handleCheckboxChangeForStepTwo(index)">
                                    </th>
                                    <th class="line2">
                                    {{ index +1}}
                                    </th>
                                    <th class="line3">{{ item.qTitle }}</th>
                                    <th class="line4">{{ item.optionType }}</th>
                                    <th class="line5">
                                        <i class="fa-solid fa-check" v-if="item.necessary == true"></i>
                                    </th>
                                    <th class="line6">
                                        <button  @click="edit(index)" :key="index">編輯</button>
                                    </th>
                                </tr>
                            </table>
                        </div>
                        <div class="BuildQn-step-three" v-if="this.createStep == 3">
                            <div class="Question-head">
                                <div>
                                    <label for="">問卷名稱 : &nbsp;</label>
                                    <label for="">{{ this.NewQuestionnareName }}</label>
                                </div>
                                <div>
                                    <label for="">問卷描述 : &nbsp;</label>
                                    <label for="">{{ this.qnDescription }}</label>
                                </div>
                                <div>
                                    <label for="">開始日期 : &nbsp;</label>
                                    <label for="">{{ this.startDate }}</label>                             
                                </div>
                                <div>
                                    <label for="">結束日期 : &nbsp;</label>
                                    <label for="">{{ this.endDate }}</label>
                                    
                                </div>
                            </div>
                            <div v-for="question in questionList" class="Question">
                                <div class="Question-Title">
                                    <p>{{ question.quId }}.&nbsp;</p>
                                    <p> {{ question.qTitle }}</p>
                                    <p>({{ question.optionType }})</p>
                                </div>
                                <div class="Question-Option">
                                    <div class="option" v-for="item in question.option.split(';')" v-if="question.optionType =='單選題'">
                                        &nbsp;<input type="radio" valuev = "answer">
                                        <label>&nbsp;{{ item }}</label>           
                                    </div> 
                                    <div  class="option" v-for="item in question.option.split(';')" v-else-if="question.optionType =='多選題'">
                                            <input type="checkbox" value="answer">
                                            <label> &nbsp;{{ item }}</label>           
                                    </div> 
                                    <div v-else-if="question.optionType =='短述題'">
                                        <input type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="popup-bottom">
                    <button type="button" @click="cancel()">取消</button>
                    <button type="button" @click="this.createStep -=1" v-if="this.createStep > 1">上一步</button>
                    <button type="button" class="flicker" v-if="this.createStep !=3" @click="next">下一步</button>
                    <button v-if="this.createStep ==3" @click="save">儲存</button>
                    <button v-if="this.createStep ==3" @click="saveAndpub">儲存並發布</button>
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

.popup-body{
    padding: 3% 0;
    position: relative;
    background-color: rgb(0, 96, 34);
    .closeWindows{
        font-size: 26pt;
        position: absolute;
        right: 0;
        color: #4b85a0;
    }
}

.popup-content {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.popup-content .popup-header{
    background: #fff;
    display: flex;
    padding: 10px;
    position: relative;
}

/////關閉視窗 icon/////
.popup-content .popup-header i{
    position: absolute;
    right: 10px;
    cursor: pointer;
    margin-left: 76%;
    margin-top: 10px;
}

/////popup header/////
.popup-content .popup-header h3{
    margin: 0;
}

/////popup header/////
.popup-content .popup-header label{
    color: black;
    font-weight: bold;
}

/////popup bottom/////
.popup-content .popup-bottom{
    background: rgb(0, 96, 34);
    padding: 20px 0;   
    width: 100%;
    display: flex;
    justify-content: center;
}

/////popup bottom-button/////
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
    background-color: rgb(0, 96, 34);
}

.popup .Build-Qn  .BuildQn-step-three{
    height: 50vh;
    width: 50vw;
    padding:  2%;
    overflow-y: auto;
    

}

.popup .Build-Qn  .BuildQn-step-three .Question-head{
    border: 1px white solid;
    border-radius: 10px;
    padding: 2%;
    margin-bottom: 2%;
}

.popup .Build-Qn  .BuildQn-step-three .Question-Title{
    display: flex;

}

.popup .Build-Qn  .BuildQn-step-three .Question-Title p{
    margin: 0;
}

.popup .Build-Qn  .BuildQn-step-three .Question-Option {
    border: 1px white solid;
    border-radius: 10px;
    padding: 2%;
    margin-bottom: 2%;
}

.popup .Build-Qn  .BuildQn-step-three .Question-Option .option{
    display: flex;
    
}

.popup .Build-Qn  .BuildQn-step-three .Question-Option .option label{
    text-align: center;
}

/////Step two/////
.popup .Build-Qn  .BuildQn-step-two{
    width: 80vw;
    height: 25vw;
    padding: 0 4%;
}

.popup .Build-Qn  .BuildQn-step-two .EditSaveArea{
    display: flex;
    align-items: center;
    margin-bottom: 1%;
    position: relative;
    .StepTwoCheckbox{
        width: 3%;
        margin-left: 3%;
        height: 25px;
        justify-content: center;
    }

    #cancelAndSaveBtn{
        display: flex;
        position: absolute;
        right: 0;
    }
}

.popup .Build-Qn  .BuildQn-step-two label{
    color: white;
    font-size: 16pt;
    font-weight: bold;
}

.popup .Build-Qn  .BuildQn-step-two input{
    width: 91%;
    height: 100%;
    border-radius: 10px;
    padding:  1%;
}

.popup .Build-Qn  .BuildQn-step-two select{
    border-radius: 10px;
    padding: 0.5%;
}

.popup .Build-Qn  .BuildQn-step-two table{
    width: 100%;
    height: 25vh;
    border: 1px white solid;
    background-color: rgb(0, 96, 34);
    overflow-y: auto;

    td{
        border: 1px white solid;
    }

    th{
        height: 35px;
        font-size: 12pt;
        align-items: center;
    }

    button{
        height: 80%;
        font-size: 12pt;
    }

    input{
        height: 70%;
    }

    .line1{
        width: 10%;
        align-items: center;
    }
    .line2{
        width: 10%;
    }
    .line3{
        width: 40%;
    }
    .line4{
        width: 15%;
    }
    .line5{
        width: 10%;
    }
    .line6{
        width: 15%;
        align-items: center;
    }

    
}

.popup .Build-Qn  .BuildQn-step-two .Box{
    input{
        width: 92%;
    }

    label{
        width: 8%;
    }
}

/////Step one/////
.popup .Build-Qn  .BuildQn-step-one{
        width: 60vw;
        padding: 0 4%;
        display: flex;
        flex-direction: column;
        justify-content: center;
}

.popup .Build-Qn .BuildQn-step-one h2{
    text-align: center;
}

.popup .Build-Qn  .BuildQn-step-one input{
    width: 70%;
    border-radius: 10px;
    padding: 0 10px;
}

.popup .Build-Qn .Box{
    display: flex;
    margin: 5px 0;
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

.bottom table{
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
        .btnArea{
            display: flex;
            justify-content: center;
        }
        }
    }
}

//動畫
.flicker{
        color:#24e451; /*設定文字顏色*/
        // font-size:64px; /*設定字型大小*/
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