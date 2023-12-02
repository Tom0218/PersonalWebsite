<script>
export default{
    data(){
        return{
            selectedQuIds: [],// 用於存儲選定 quId 的陣列
            quList:[],
            qnId:0,
            qnTitle:"",
            quTitle:"",
            qnDescription:"",
            startDate:"",
            endDate:"",
            option:"",
            necessary:false,
        }
    },

    mounted(){
        this.qnId = this.$route.query.qnId;
        this.qnTitle = this.$route.query.qnTitle;
        this.startDate = this.$route.query.startDate;
        this.endDate = this.$route.query.endDate;
        this.qnDescription=this.$route.query.qnDescription;
        this.getQuestion();
    },

    methods:{
        dele(){
            const apiUrl = 'http://localhost:8081/api/quiz/deleteQuestion';

            // 請求參數
            const requestData = {
            qnId: this.qnId,
            quIdList: this.selectedQuIds // 你的 quId 列表
            };

            // 使用 fetch 調用 API
            fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 如果有需要的話，還可以添加其他標頭
            },
            body: JSON.stringify(requestData)
            })
            .then(response => response.json())
            .then(data => {
                // 在這裡處理返回的數據
                console.log(data);
                if(data.rtncode=='SUCCESSFUL'){
                    alert(data.rtncode)
                    this.getQuestion()
                }
            })
            .catch(error => {
                // 在這裡處理錯誤
                console.error('Error:', error);
            });
        },

        handleCheckboxChange(index) {
            const quId = this.quList[index].quId;

            // 檢查 quId 是否已經存在於陣列中
            const indexOfQuId = this.selectedQuIds.indexOf(quId);

            if (indexOfQuId === -1) {
                // 如果不存在，將其添加到陣列中
                this.selectedQuIds.push(quId);
            } else {
                // 如果已經存在，則從陣列中刪除
                this.selectedQuIds.splice(indexOfQuId, 1);
            }

            // 現在你可以使用 this.selectedQuIds 作為包含選定 quId 的陣列
            console.log("選定的 QuId：", this.selectedQuIds);
    },

         //api獲取quList
        getQuestion() {
            console.log("fetch裡的qnId是:"+this.qnId)
            const url = 'http://localhost:8081/api/quiz/searchQuestionList';
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
                // 將 data 添加到 quList
                this.quList = data.questionList;
                console.log("下面是fetch的question")
                console.log(this.quList);
            })
            .catch(error => console.error('Error:', error));
        },
    }
}
</script>

<template>
<div class="body">
    <div>
        <div>
            <div class="info">
                <p>問卷名稱:</p>
                <input type="text" v-model="qnTitle">
            </div>
            <div class="info">
            <p>問卷說明:</p>
            <input type="text" v-model="qnDescription">
            </div>
            <div class="info">
                <p>開始日期:</p>
                <input type="date" v-model="startDate">
            </div>
            <div class="info">
                <p>結束日期:</p>
                <input type="date" v-model="endDate">
            </div>
            <p>*選項以" ; "做分隔</p>
        </div>
        <div  v-for="item,index in quList" :key="index">
            <div class="perbox">
            <div class="info">
                    <input type="checkbox" class ="checkbox"  :key="index" @change="handleCheckboxChange(index)">
                <p>{{ item.quId }}.</p>.
                <div class="question">
                    <p>原題目:{{ item.qTitle }}</p>
                    <input type="text" v-model=" item.qTitle ">
                </div>
                <select v-model="item.optionType">
                    <option value="單選題">單選題</option>
                    <option value="多選題">多選題</option>
                    <option value="短述題">短述題</option>
                </select>
                <td>{{ item.qOptionType }}</td>        
                <p>必填</p>
                    <input type="checkbox"  class ="checkbox" v-model="item.necessary  ">
            </div>
            <div class="info">
                <p>{{ item.optionType=='短述題'?'答案 : ':'選項 : ' }}</p>
                <input type="text" class="optionInputBox" v-model="item.option">
            </div>
        </div>
        <td>
            <button @click="dele()">刪除已勾選問題</button>
            <button @click="save()">儲存並修改</button>
        </td>
    </div>
    </div>

</div>
</template>

<style lang="scss" scoped>

.perbox{
    border: 1px white solid;
}
.question{
    flex-direction: column;
}
.checkbox{
    width: 30px;
}

select{
    height: 30px;
}

input{
    height: 30px;
    width: 60%;
    margin: 0;
}
.info{
    display: flex;
    align-items: center;
}

td{
    color: white;
}
p{
    font-size: 16pt;
    color: white;
    margin: 0;
    align-items: center;
}
.body{
    min-height: 100vh;
    overflow-y: auto;
    width: 70vw;
    margin: 0 15%;
    padding-top: 5%;
}
</style>

