<script>
    import Chart from 'chart.js/auto';
    export default{
        data(){
            return {
            qnId: 0,
            userList: [],
            quList: [],
            optionArr: [],
            y:[],
            sortedQuList: [], // 新增一個 sortedQuList 屬性
            };
        },

        methods:{

            
            aa() {
                const questionIds = Array.from(new Set(this.userList.map(user => user.quId)));

                questionIds.forEach(questionId => {
                    const answersForQuestion = this.userList.filter(user => user.quId === questionId);
                    const answerCounts = {};

                    answersForQuestion.forEach(answerObj => {
                        const answers = answerObj.answer.split(';');

                        answers.forEach(answer => {
                            if (answerCounts[answer]) {
                                answerCounts[answer]++;
                            } else {
                                answerCounts[answer] = 1;
                            }
                        });
                    });

                    console.log(`Question ${questionId} Answer Counts:`, answerCounts);
                });
            },

            questionType() {
    // 清空 optionArr
    this.optionArr = [];

    // 篩選問題類型
    for (let i = 0; i < this.quList.length; i++) {
        if (this.quList[i].optionType === '單選題' || this.quList[i].optionType === '多選題') {
            this.optionArr.push(this.quList[i].option.split(';'));
        } else {
            // 如果不是單選題或多選題，將所有用戶的答案合併為一個字串
            const allAnswers = this.userList.map(user => user.answer).join(';');
            this.optionArr.push(allAnswers.split(';'));
        }
    }

    console.log("optionArr", this.optionArr);

    // 檢查 optionArr 是否為 null
    if (this.optionArr.includes(null) || this.optionArr.includes(undefined)) {
        console.error("optionArr is null or undefined!");
    } else {
        console.log("optionArr is filled correctly!");
        this.createCharts();
    }

                    
            //     var Allanswer="" 
            //     for(let i= 0; i < this.userList.length; i++){
            //         Allanswer += this.userList[i].answer + ';'
            //     }
            //       //所有使用者回答
            //     console.log("Allanswer") 
            //     console.log(Allanswer) 

            //     for(let i = 0; i < this.quList.length; i++){
            //         this.optionArr.push( this.quList[i].option.split(";"))
            //     }
            //     //所有選項之陣列
            //     console.log("optionArr") 
            //     console.log(this.optionArr) 

            //     var chartY = [];
            //     chartY = Allanswer.split(';')
            //     //user的回答
            //     console.log(chartY)
            //     // console.log(this.optionArr[1])

            //     for (let i = 0; i < this.optionArr.length; i++) {
            //     let Y = 0;
            //     for (let k = 0; k < this.optionArr[i].length; k++) {
            //         for (let j = 0; j < chartY.length; j++) {
            //             if (chartY[j] !== "" && this.optionArr[i][k] === chartY[j]) {
            //                 Y += 1;
            //                 console.log("chartY[j]:", chartY[j]);
            //                 console.log("optionArr[i][k]:", this.optionArr[i][k]);
            //             }
            //         }
            //         this.y.push(Y);
            //     }
            // }

            // console.log("y");
            // console.log(this.y);
            },

            createCharts() {
    this.optionArr.forEach((questionData, index) => {
        const canvasId = `myChart${index}`;
        const ctx = document.getElementById(canvasId);

        if (ctx) {
            // 在創建新 Chart 之前檢查並銷毀舊的 Chart 實例
            if (ctx.chart) {
                ctx.chart.destroy();
            }

            // 新增的部分：從 aa 方法中取得的統計結果
            const answerCounts = this.calculateAnswerCounts(questionData);

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(answerCounts),
                    datasets: [{
                        label: '# of Votes',
                        data: Object.values(answerCounts),
                        borderWidth: 1,
                    }],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        } else {
            console.error(`找不到 ID 為 ${canvasId} 的元素。`);
        }
    });
},

calculateAnswerCounts(questionData) {
    const answerCounts = {};

    // 在 aa 方法中的統計邏輯，這裡僅供參考
    for (let i = 0; i < this.userList.length; i++) {
        const answers = this.userList[i].answer.split(';');

        answers.forEach(answer => {
            if (answerCounts[answer]) {
                answerCounts[answer]++;
            } else {
                answerCounts[answer] = 1;
            }
        });
    }

    return answerCounts;
},

            // 獲取所有該 qnId 提交資訊
            // getSubmission() {
            //     const url = 'http://localhost:8081/api/quiz/getSubmission';
            //     const queryParams = new URLSearchParams({
            //         qnId: this.qnId
            //     });
            //     const urlWithParams = `${url}?${queryParams}`;
            //     fetch(urlWithParams, {
            //         method: 'GET',
            //         headers: {
            //             "Accept": "application/json", // 指定接受的回應類型
            //         },
            //     })
            //     .then(response => response.json())
            //     .then(data => {    
            //         if (data.userList == null) {
            //             alert("User list is null");
            //             return
            //         } else {
            //             console.log("UserList");
            //             this.userList = data.userList;
            //             console.log(this.userList);
            //             this.questionType() 
            //         }
            //     })
            //     .catch(error => {
            //         console.error("Error fetching data:", error);
            //         // Handle error, show alert, etc.
            //     });
            // },

            getSubmission() {
                const url = 'http://localhost:8081/api/quiz/getSubmission';
                const queryParams = new URLSearchParams({
                    qnId: this.qnId,
                });
                const urlWithParams = `${url}?${queryParams}`;
                fetch(urlWithParams, {
                    method: 'GET',
                    headers: {
                    "Accept": "application/json",
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                    if (data.userList == null) {
                        alert("User list is null");
                        return;
                    } else {
                        console.log("UserList");
                        this.userList = data.userList;
                        console.log(this.userList);
                        this.questionType();
                        this.aa();
                    }
                    })
                    .catch(error => {
                    console.error("Error fetching data:", error);
                // Handle error, show alert, etc.
                });
            },

            getQuestion() {
        const url = 'http://localhost:8081/api/quiz/searchQuestionList';
        const queryParams = new URLSearchParams({
            qnId: this.qnId,
        });
        const urlWithParams = `${url}?${queryParams}`;

        fetch(urlWithParams, {
            method: 'GET',
            headers: {
            "Accept": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
            this.quList = data.questionList;
            console.log("questionList", this.quList);
        })
        .catch(error => console.error('Error:', error));
            },

        },

        mounted(){
            this.qnId = this.$route.query.qnId;
            this.getQuestion();
            this.getSubmission();
            // this.createCharts();
        
        }

    }
    </script>
    <template>
    <div class="body">
        <div v-for="(questionData, index) in this.quList" :key="index" class="chart">
            <p>{{ questionData.qTitle }}</p>
            <canvas :id="'myChart' + index"></canvas>
        </div>
        <button>test</button>
    </div>
    </template>

<style lang="scss" scoped>
.chart{
    height: 80vh;
}


p{
    color: white;
}
.chart{
    width: 30%;
    height: 20%;
}
.body{
    min-height: 100vh;
    overflow-y: auto;
    background-color: #232D3F;
    
}
</style>