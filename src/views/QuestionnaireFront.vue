<script>

export default {

data(){
    return{
        allQn:[], //所有問卷
        qnList:[],
        qnTitle:"",
        qnDescription:"",
        qnId:0,
        startDate:"",
        endDate:"",
        datas:this.qnList,//要呈現的資料
        perpage: 10, //一頁的資料數
        page:1,
        currentPage: 1,    
        nowDate: new Date().toISOString().split('T')[0],
    }
},

methods:{
    goback(){
        this.$router.push('Questionnaire')
    },
    
    // search 
    fetchData() {
        //將要查詢的字串附加到url
        const url = 'http://localhost:8081/api/quiz/searchPublished';
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
                this.qnList = data.questionnaireList.slice().reverse();
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
        this.selectQnIndexArr.push({qnId:this.qnList[pageIndex].questionnaire.id, currentPage:this.currentPage, index:index}); 
        console.log(this.selectQnIndexArr);
    },
    
    //點擊title抓取qnid
    getQnId(index){ 
        var pageIndex = ((this.currentPage-1)*this.perpage+index); 
        this.qnId = this.qnList[pageIndex].id;
        this.qnTitle =  this.qnList[pageIndex].title;
        this.qnDescription =  this.qnList[pageIndex].description;
        this.$router.push({
        name: 'QuestionnaireInsidePage',
        query: {
            qnId:this.qnId,
            title:this.qnTitle,
            description:this.qnDescription,
        }
        });
    },

    //前往統計
    goStatistics(index){
        var pageIndex = ((this.currentPage-1)*this.perpage+index); 
        this.qnId = this.qnList[pageIndex].id;
        this.$router.push({
            name: 'QuestionnaireFrontstatisticsPage',
            query:{
                qnId:this.qnId
            }
        })
    }

},

mounted() {
    this.fetchData(); // 将方法调用放在函数体内
},

computed: {

        //分頁
    totalPage() { 
        return Math.ceil(this.qnList.length / this.perpage)
        //Math.ceil()取最小整數
    },

    //分頁
    pageStart() {   
        return (this.currentPage - 1) * this.perpage
        //取得該頁第一個值的index
    },

    //分頁
    pageEnd() {     
        return this.currentPage * this.perpage
        //取得該頁最後一個值的index
    }
}
}

</script>
<template>

    <button @click="goback" id="gobackcss">前往後台</button>
<div class="body">
    <div class="aa">
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
        </div>            
        <div class="bottom">
            <table>
                <tr>
                    <th>編號</th>
                    <th>問卷</th>
                    <th>狀態</th>
                    <th>開始時間</th>
                    <th>結束時間</th>
                    <th>觀看統計</th>
                </tr>

                <tr v-for="(quiz,index) in qnList.slice(pageStart,pageEnd)" :key="index">
                    <td >{{ quiz.id }}</td>
                    <!-- 進行中 -->
                    <td style="cursor: pointer" @click='getQnId(index)' :key="index" v-if=" quiz.startDate <= this.nowDate && this.nowDate <= quiz.endDate"> 
                        {{ quiz.title }}
                    </td>
                    <!-- 已結束、尚未開始 -->
                    <td  style="cursor: not-allowed;" v-else> 
                        {{ quiz.title }}
                    </td>
                    <td v-if="quiz.published ==true && quiz.startDate < this.nowDate && this.nowDate < quiz.endDate">進行中</td>
                    <td v-else-if="quiz.published ==true && quiz.startDate > this.nowDate">尚未開始</td>
                    <td v-else>已結束</td>
                    <td>{{ quiz.startDate }}</td>
                    <td>{{ quiz.endDate }}</td>
                    <td @click="goStatistics(index)" :key="index" style="cursor: pointer;" v-if="quiz.published ==true && quiz.startDate < this.nowDate && this.nowDate < quiz.endDate || this.nowDate > quiz.endDate">前往</td>
                    <td v-else  style="cursor: not-allowed;">尚未開始</td>
                </tr>
            </table>
        </div>
    </div>

        <!-- 分頁 -->
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
        </ul>>
</div>

</template>


<style lang="scss" scoped>
#gobackcss{
    margin: 0%;
}

a{
    text-decoration: none;
}

button{
    margin: 2%;
    font-weight: bold;
    font-size: 16pt;
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
    font-weight: bold;
}

table{
    min-height: 50vh;
    height: 100%;
    width: 100%;
    background-color: rgb(31, 30, 30);
}

tr{
    height: auto;
    display: flex;
    justify-content: space-between;
    border: 2px black solid;
}

th{
    width: 18%;
    height: auto;
    display: flex;
    justify-content: space-around;
    color: white;
    background-color: rgb(0, 96, 34);
}

td{
    height: auto;
    width: 18%;
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 16pt;
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
    height: 100vh;
    overflow-y: auto;
    .aa{
        width: 100%;

        .top{
            display: flex;
            justify-content: center;
        }
        
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
        .btnArea{
            display: flex;
            justify-content: center;
        }
    }
}
</style>