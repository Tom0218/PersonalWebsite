<script>
export default{
    computed: {
        //分頁
          //Math.ceil()取最小整數
        totalPage() {
                return Math.ceil(this.userList.length / this.perpage)
            },

        //取得該頁第一個值的index
        pageStart() {
            return (this.currentPage - 1) * this.perpage      
        },

        //取得該頁最後一個值的index
        pageEnd() {
            return this.currentPage * this.perpage
        },


        //時間換算
        sortedUsers() {
        const sortedUsers = [...this.uniqueUsers];
        sortedUsers.sort((a, b) => {
            const dateA = new Date(a.dateTime);
            const dateB = new Date(b.dateTime);
            return dateB - dateA;
        });
        return sortedUsers;
        },

        //倒序
        uniqueUsers() {
            const uniqueUsers = [];
            const addedQnIds = [];

            this.userList.forEach((user) => {
                if (!addedQnIds.includes(user.name)) {
                uniqueUsers.push(user);
                addedQnIds.push(user.name);
                }
            });

            return uniqueUsers.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
            },
            
        },

    data(){
        return{
            qnId:0,
            title:"",
            description:"",
            userList:[],
            datas:this.userList,//要呈現的資料
            perpage: 10, //一頁的資料數
            currentPage: 1,
        }
    },

    mounted(){
        this.qnId =this.$route.query.qnId
        this.title = this.$route.query.title
        this.description = this.$route.query.description
        this.getSubmission()
    
    },
    
    methods:{
        //前往單一問卷回饋(id,name,phone,email,age)
        gofeedback(x,y,z,a,b){
            this.$router.push({
                name:'QuestionnaireStaticFeedbackPage',
                query:{
                    qnId:x,
                    userName:y,
                    phone:z,
                    email:a,
                    age:b,
                    title:this.title,
                    description:this.description,
                    userList : JSON.stringify(this.userList)
                }
            })
        },

        //分頁
        setPage(page) {
            if(page <= 0 || page > this.totalPage) {
                return
            }
            this.currentPage = page
        },
        
        //轉換填寫時間單位
        formatDate(dateTime) {
        const formattedDate = new Date(dateTime).toLocaleString('zh-TW', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
        return formattedDate;
        },
        //取得所有填寫資料
        getSubmission() {
            console.log("fetch裡的qnId是:"+this.qnId)
            const url = 'http://localhost:8081/api/quiz/getSubmission';
            const queryParams = new URLSearchParams({
                qnId: this.qnId
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
                if (data.userList == null) {
                    alert("User list is null");
                    return
                } else {
                    console.log("下面是fetch的UserList");
                    this.userList = data.userList;
                    console.log(this.userList);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                // Handle error, show alert, etc.
            });
        }
    },
    
    
}
</script>

<template>
<div class="body">
    <div>
        <h1>問卷回饋</h1>
        <table>
            <tr>
                <th>編號</th>
                <th>姓名</th>
                <th>填寫時間</th>
                <th>觀看回覆</th>
            </tr>
            <tr v-for="user,index in uniqueUsers" :key="user.qnId">
                <td>{{index + 1}}</td>
                <td>{{ user.name }}</td>
                <td>{{ formatDate(user.dateTime) }}</td>
                <td @click="gofeedback(user.qnId,user.name,user.phoneNumber,user.email,user.age)">前往</td>
            </tr>
        </table>
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
</div>
</template>

<style lang="scss" scoped>
ul{
    display: flex;
    justify-content: center;
}

table{
    // min-height: 50vh;
    height: 100%;
    width: 90%;
    margin: 0 5%;
    background-color: rgb(31, 30, 30);
}

tr{
   
}

td{
    font-weight: bold;
    color: white;
    width: 5%;
    
}

th{
    font-weight: bold;
    color: white;
    width: 5%;
    background-color: rgb(0, 96, 34);
    height: auto;
    
}

h1{
    font-weight: bold;
    color: white;
}
.body{
    min-height: 100vh;
    overflow-y: auto;
    width: 90vw;
    margin: 0 5%;
    padding-top: 5%;
}
</style>

