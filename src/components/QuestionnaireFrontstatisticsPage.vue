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
            };
        },

        methods: {
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
                    this.userList = data.userList;
                    this.col();
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
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
                console.log("quList", this.quList);
            })
            .catch(error => console.error('Error:', error));
        },

        col() {
            // quList
            let optionArr = []
            for (let i = 0; i < this.quList.length; i++) {
                optionArr.push(this.quList[i].option.split(';'))
            }
            console.log(optionArr)

            // userList
            let ansArr = [];
            for (let i = 0; i < this.userList.length; i++) {
                ansArr.push({
                    quId: this.userList[i].quId,
                    answer: this.userList[i].answer.split(';')
                })
            }
            console.log(ansArr)

            // 初始化答案计数数据
            this.answerCountsByQuestion = {};

            for (let i = 0; i < this.quList.length; i++) {
                const quId = this.quList[i].quId;
                this.answerCountsByQuestion[quId] = {};

                for (let j = 0; j < optionArr[i].length; j++) {
                    this.answerCountsByQuestion[quId][optionArr[i][j]] = 0;
                }
            }

            for (let i = 0; i < ansArr.length; i++) {
                const quId = ansArr[i].quId;
                const answers = ansArr[i].answer;

                for (let j = 0; j < answers.length; j++) {
                    this.answerCountsByQuestion[quId][answers[j]]++;
                }
            }

            console.log("Answer Counts by Question:", this.answerCountsByQuestion);

            // 创建图表
            this.createCharts();
        },

        createCharts() {
        this.$nextTick(() => {
            // 循環處理每個問題
            this.quList.forEach((questionData) => {
            const quId = questionData.quId;

            // 檢查 optionType 是否為短述題
            if (questionData.optionType !== 'short') {
            const labels = Object.keys(this.answerCountsByQuestion[quId]);
            const data = Object.values(this.answerCountsByQuestion[quId]);

            const canvasId = `myChart${quId}`;
            const canvasElement = document.getElementById(canvasId);
            const ctx = canvasElement?.getContext('2d');

            if (ctx) {
                if (ctx.chart) {
                    ctx.chart.destroy();
                }

                new Chart(ctx, {
                    type: 'pie',
                    data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        // 如果需要，可以添加更多顏色
                        ],
                    }],
                    },
                    options: {
                    title: {
                        display: true,
                        text: `Question ${quId} - Answer Distribution`,
                    },
                    },
                });
                } else {
                console.error(`找不到 ID 為 ${canvasId} 的元素。`);
                }
            }
            });
        });
    },
    },

    mounted() {
    this.qnId = this.$route.query.qnId;
    this.getQuestion();
    this.getSubmission();
    
    // 在获取数据后调用 createCharts
    this.$nextTick(() => {
        this.createCharts();
    });
},
};
</script>

<template>
     <div class="body">
        <!-- 循环渲染每个图表 -->
        <div class="chart" v-for="(question, index) in quList" :key="index">
            <canvas :id="'myChart' + question.quId" ref="myChart"  width="600" height="800"></canvas>
        </div>
    </div>
</template>

<style lang="scss" scoped>



p{
    color: white;
}
.chart{
    width: 30%;
    height: 30%;
}
.body{
    min-height: 100vh;
    overflow-y: auto;
    background-color: #232D3F;
    
}
</style>