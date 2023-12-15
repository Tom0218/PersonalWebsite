<script>
    import Chart from 'chart.js/auto';
    export default{
        data(){
            return {
            qnId: 0,
            userList: [],
            quList: [],
            optionArr: [],
            answerCountsByQuestion: {},  // 新增答案计数数据
            charts: [], // 用于存储图表实例
            };
        },

        methods: {
        //userData
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
                    this.$router.push('QuestionnaireFront')
                    return;
                } else {
                    this.userList = data.userList;
                    console.log("userList")
                    console.log(this.userList)
                    this.col();
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
        },

        //quList
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
                console.log("quList", this.quList);
            })
            .catch(error => console.error('Error:', error));
        },

        col() {
            // quList
            let optionArr = [];
            for (let i = 0; i < this.quList.length; i++) {
                optionArr.push(this.quList[i].option.split(';'));
            }
            console.log(optionArr);

            // userList
            let ansArr = [];
            for (let i = 0; i < this.userList.length; i++) {
                ansArr.push({
                    quId: this.userList[i].quId,
                    answer: this.userList[i].answer.split(';'),
                });
            }

            // Initialize answerCountsByQuestion outside the loop
            this.answerCountsByQuestion = {};

            // Array to store short answer responses outside the loop
            let shortAnswers = [];

            for (let i = 0; i < this.quList.length; i++) {
                const quId = this.quList[i].quId;

                // 清空 shortAnswers 数组
                shortAnswers = [];

                if (this.quList[i].optionType === '短述題') {
                    // Gather short answer responses into the array
                    for (let j = 0; j < ansArr.length; j++) {
                        const ansQuId = ansArr[j].quId;
                        if (ansQuId === quId) {
                            const answers = ansArr[j].answer;
                            for (let k = 0; k < answers.length; k++) {
                                shortAnswers.push({
                                    quId: quId,
                                    answer: answers[k],
                                });
                            }
                        }
                    }
                    // Display short answers in the HTML for short answer questions
                    const shortAnswerDiv = document.getElementById(`shortAnswer${quId}`);
                    if (shortAnswerDiv) {
                        shortAnswerDiv.innerHTML = '';
                        for (let j = 0; j < shortAnswers.length; j++) {
                            const answerDiv = document.createElement('div');
                            answerDiv.textContent = ` ${shortAnswers[j].answer}`;
                            shortAnswerDiv.appendChild(answerDiv);
                        }
                    }
                } else {
                    // Initialize answerCountsByQuestion for other question types
                    this.answerCountsByQuestion[quId] = {};
                    for (let j = 0; j < optionArr[i].length; j++) {
                        this.answerCountsByQuestion[quId][optionArr[i][j]] = 0;
                    }

                    // Count the occurrences of each answer for non-short answer questions
                    for (let j = 0; j < ansArr.length; j++) {
                        const ansQuId = ansArr[j].quId;
                        if (ansQuId === quId) {
                            const answers = ansArr[j].answer;
                            for (let k = 0; k < answers.length; k++) {
                                this.answerCountsByQuestion[quId][answers[k]]++;
                            }
                        }
                    }

                    // Determine chart type based on question type
                    let chartType = 'pie'; // Default to pie chart
                    if (this.quList[i].optionType === '短述題') {
                        chartType = 'bar'; // Change to bar chart for short answer questions
                    }

                    // Display answers in the HTML for non-short answer questions
                    const canvasId = `myChart${quId}`;
                    const canvasElement = document.getElementById(canvasId);
                    if (canvasElement) {
                        const ctx = canvasElement?.getContext('2d');

                        if (ctx) {
                            if (ctx.chart) {
                                ctx.chart.destroy();
                            }

                            new Chart(ctx, {
                                type: chartType,
                                data: {
                                    labels: Object.keys(this.answerCountsByQuestion[quId]),
                                    datasets: [{
                                        data: Object.values(this.answerCountsByQuestion[quId]),
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.7)',
                                            'rgba(54, 162, 235, 0.7)',
                                            'rgba(255, 206, 86, 0.7)',
                                            'rgba(75, 192, 192, 0.7)',
                                            // 如果需要，可以添加更多颜色
                                        ],
                                    }],
                                },
                                options: {
                                    title: {
                                        display: true,
                                        text: `问题 ${quId} - 答案分布`,
                                        fontSize:'24',
                                        position: 'right',  // 標題位置
                                    },
                                    legend: {
                                    labels: {
                                        fontSize:'24',
                                        fontColor: 'red', // 設置標籤字體顏色
                                    },
                                },
                                    
                                },
                            });
                        } else {
                            console.error(`找不到 ID 为 ${canvasId} 的元素。`);
                        }
                    }
                }
            }
            console.log("Answer Counts by Question:", this.answerCountsByQuestion);
        },
    },

    mounted() {
    this.qnId = this.$route.query.qnId;
    this.getQuestion();
    this.getSubmission();
    
    // 在获取数据后调用 createCharts
    this.$nextTick(() => {
        this.col();
    });
},
};
</script>

<template>
    <div class="body">
        <!-- 循环渲染每个图表 -->
        <div class="chartArea">
            <div class="chart" v-for="(question, index) in quList" :key="index">
                <div>
                    <div v-if="question.optionType =='單選題' || question.optionType =='多選題'">
                        <h3>{{ question.qTitle }}</h3>
                        <canvas :id="'myChart' + question.quId" ref="myChart"  ></canvas>
                    </div>
                    <div v-else-if="question.optionType =='短述題'">
                        <h3>{{ question.qTitle }}</h3>
                        <div :id="'shortAnswer' + question.quId" class="shortAns"></div>
                    </div >
                </div>
    
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.chartArea{
    width: 60%;
    margin: 0 20%;
    display: flex;
    flex-wrap: wrap;
    background-color: rgb(0, 68, 0);

}
.shortAns{
    font-weight: bold;
    font-size: 16pt;
    color: white;
    border: 5px white solid;
}

h3{
    color: white;
    font-weight: bold;
}

p{
    font-size: 16pt;
    color: white;
}
.chart{
    width: 45%;
    height: 20%;
    margin: 2%;

}
.body{
    width: 98vw;
    min-height: 100vh;
    overflow-y: auto;
    background-color: #232D3F;
    display: flex;
    flex-wrap: wrap
    
}
</style>