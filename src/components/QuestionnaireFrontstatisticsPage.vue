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
            };
        },

        methods:{

            // 生成随机颜色数组
            generateRandomColors() {
            const numColors = 6; // 定义颜色数量
            const colors = [];

            for (let i = 0; i < numColors; i++) {
                const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`;
                colors.push(randomColor);
            }

            return colors;
            },

            // 統計
            // questionType() {
            // // 篩選問題類型
            //     for (let i = 0; i < this.quList.length; i++) {
            //         if (this.quList[i].optionType == '單選題' || this.quList[i].optionType == '多選題') {
            //         this.optionArr.push(this.quList[i].option.split(';'));
            //         }
            //     }
            //     console.log("optionArr")
            //     console.log(this.optionArr)
            //     this.long()
            // },

            questionType() {
            // 篩選問題類型
                // for (let i = 0; i < this.quList.length; i++) {
                //     if (this.quList[i].optionType == '單選題' || this.quList[i].optionType == '多選題') {
                //         this.optionArr.push(
                //             this.quList[i].option.split(';'),
                //         );
                //     } else {
                //         this.optionArr.push(
                //             this.userList.answer
                //         );
                //     } 
                // }
                // console.log("optionArr", this.optionArr);
                // this.createCharts();

            
                var yy="" 
                for(let i= 0; i < this.quList.length; i++){
                    yy += this.userList[i].answer + ';'
                }
                  //所有使用者回答
                console.log(yy) 

                for(let i = 0; i < this.quList.length; i++){
                    this.optionArr.push( this.quList[i].option.split(";"))
                }
                //所有選項之陣列
                console.log(this.optionArr) 

                var chartY = [];
                chartY = yy.split(';')
                //user的回答
                console.log(chartY)
                console.log(this.optionArr[1])
                for(let i = 0; i < this.optionArr.length; i++){
                    let Y = 0;
                    for(let k = 0; k < this.optionArr[i].length; k++){
                        console.log(this.optionArr[i][k])
                        // for(let j = 0; j < chartY.length; ++j){
                            if(chartY[j] != "" && this.optionArr[i][k] == chartY[j]){
                                Y+=1
                            }
                        // }
                    }
                //     this.y.push(Y)
                }
                console.log("y")
                console.log(this.y)
            },


            //圖形
            //     long(){
            //         const ctx = document.getElementById('myChart');
            //         new Chart(ctx, {
            //         type: 'bar',
            //         data: {
            //             labels: this.optionArr,
            //             datasets: [{
            //                 label: '# of Votes',
            //                 data: [12, 19, 3, 5, 2, 3],
            //                 borderWidth: 1
            //             }]
            //         },
            //         options: {
            //             scales: {
            //                 y: {
            //                     beginAtZero: true
            //                 }
            //             }
            //         }
            //     });
            // },
            createCharts() {
                // this.optionArr.forEach((questionData, index) => {
                //     const canvasId = `myChart${index}`;
                //     const ctx = document.getElementById(canvasId);

                this.optionArr.forEach((questionData, index) => {
                const canvasId = `myChart${index}`;
                const ctx = document.getElementById(canvasId);

                if (ctx) {
                    // 在創建新 Chart 之前檢查並銷毀舊的 Chart 實例
                    if (ctx.chart) {
                    ctx.chart.destroy();
                    }

                    new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: questionData,
                        datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
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
                    }
                    })
                    .catch(error => {
                    console.error("Error fetching data:", error);
                // Handle error, show alert, etc.
                });
            },



            // getQuestion() {
            //         const url = 'http://localhost:8081/api/quiz/searchQuestionList';
            //         const queryParams = new URLSearchParams({
            //             qnId: this.qnId
            //         });
            //         const urlWithParams = `${url}?${queryParams}`;
        
            //         fetch(urlWithParams, {
            //             method: 'GET',
            //             headers: {
            //                 "Accept": "application/json", // 指定接受的回應類型
            //             },
            //         })
            //         .then(response => response.json())
            //         .then(data => {
            //             //將 data 添加到 quList
            //             // console.log(data)
            //             this.quList = data.questionList;
            //             console.log("questionList")
            //             console.log( this.quList)
            //             //  this.questionType(index);
            //             this.questionType();
            //         })
            //         .catch(error => console.error('Error:', error));
                
            // },
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
            this.questionType();
        })
        .catch(error => console.error('Error:', error));
    },


        },


        mounted(){
            this.qnId = this.$route.query.qnId;
            this.getQuestion();
            this.getSubmission();

            console.log('Option Array:', this.optionArr);
            this.createCharts();
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