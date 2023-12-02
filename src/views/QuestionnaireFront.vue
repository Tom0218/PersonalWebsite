<script>

export default {

data(){
    return{
        allQn:[], //所有問卷
        qnTitle:"",
        qnDescription:"",
        qnId:0,
        startDate:"",
        endDate:"",
        datas:this.allQn,//要呈現的資料
        perpage: 10, //一頁的資料數
        page:1,
        currentPage: 1,          
    }
},

methods:{

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
                console.log(data)
                this.allQn = data.questionnaireList

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
    
    //點擊title抓取qnid
    getQnId(index){ 
        var pageIndex = ((this.currentPage-1)*this.perpage+index); 
        this.qnId = this.allQn[pageIndex].id;
        this.qnTitle =  this.allQn[pageIndex].title;
        this.qnDescription =  this.allQn[pageIndex].description;
        console.log("description:"+ this.qnDescription);
        console.log("title:"+ this.allQn[pageIndex].title);
        console.log("qnId:"+ this.qnId);
        this.$router.push({
        name: 'QuestionnaireInsidePage',
        query: {
            qnId:this.qnId,
            qnTitle:this.qnTitle,
            qnDescription:this.qnDescription,
        }
        });
        // 在当前组件中
    },

},

mounted() {
    this.fetchData(); // 将方法调用放在函数体内
},

computed: {

        //分頁
    totalPage() { 
        return Math.ceil(this.allQn.length / this.perpage)
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

<div class="body" v-if="page == 1">
    <div class="aa">
        <div class="top">
                <div class="searchTitle">
                    <h2>問卷標題</h2>
                    <input type="text" v-model="qnTitle" >
                </div>
                <div class="date" >
                    <h2>開始/結束</h2>
                    <input type="date" id="startDate" v-model="startDate">
                    <input type="date" id="endDate" v-model="endDate">
                </div> 
                <div class="btnArea">
                    <button @click='fetchData()'>search</button>
                </div>            
        </div>
        <div class="bottom">
            <table>
                <tr>
                    <!-- <td></td> -->
                    <td>編號</td>
                    <td>問卷</td>
                    <td>狀態</td>
                    <td>開始時間</td>
                    <td>結束時間</td>
                    <td>結果</td>
                </tr>

                <tr v-for="(quiz,index) in allQn.slice(pageStart,pageEnd)" :key="index" v-if="allQn.length">
                    <td >{{ quiz.id }}</td>
                    <td @click='getQnId(index)' :key="index"> 
                        {{ quiz.title }}
                    </td>

                    <td v-if="quiz.published ==true">已發布</td>
                    <td>{{ quiz.startDate }}</td>
                    <td>{{ quiz.endDate }}</td>
                    <td><link>前往</td>
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
    text-align: left;
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