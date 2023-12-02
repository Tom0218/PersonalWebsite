<script>
export default{

    data(){
        return{
            title:"",
            userName:"",
            phone:"",
            email:"",
            age:"",
            question:"",
            qulength:this.charli.length,
        }
    },
    props:[
        "alpha",//qn
        "charli"//qu
    ],

    methods:{

        goHome(){
            this.$router.push('/Questionnaire')
        },

        save(){
            var qn = this.alpha;
            var questionList = this.charli;

            qn.forEach(item=>{
                if(item == null){
                    alert("內容不得為空");
                    return
                }
            });

            var url = "http://localhost:8081/api/quiz/create";

        var Qn = {
        "questionnaire": {
            "title": qn[0].title,
            "description":qn[0].description,
            "published": qn[0].published,
            "startDate":  qn[0].startDate,
            "endDate": qn[0].endDate
        },
        "question_list": []
        
        };
        for (let i = 0; i < this.charli.length; i++) {
            Qn.question_list.push({
            "quId": questionList[i].quId,
            "qTitle": questionList[i].qtitle,
            "optionType": questionList[i].qOptionType,
            "necessary": questionList[i].necessary,
            "option": questionList[i].qOption
            });
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify(Qn),
            headers: new Headers({
            "Content-Type": "application/json",
            }),
        })
        .then((res) => res.json())
        .then((response) => {
            console.log("Success:",response);
            // 在成功完成 API 請求後執行 fetchData()
        })
        .catch((error) => console.error("Error:", error));
                    
                
        },

        saveAndpub(){
            var qn = this.alpha;
            var questionList = this.charli;

            qn.forEach(item=>{
                if(item == null){
                    alert("內容不得為空");
                    return
                }
            });

            var url = "http://localhost:8081/api/quiz/create";

        var Qn = {
        "questionnaire": {
            "title": qn[0].title,
            "description":qn[0].description,
            "published": true,
            "startDate":  qn[0].startDate,
            "endDate": qn[0].endDate
        },
        "question_list": []   
        };

        for (let i = 0; i < this.charli.length; i++) {
            Qn.question_list.push({
            "quId": questionList[i].quId,
            "qTitle": questionList[i].qtitle,
            "optionType": questionList[i].qOptionType,
            "necessary": questionList[i].necessary,
            "option": questionList[i].qOption
            });
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify(Qn),
            headers: new Headers({
            "Content-Type": "application/json",
            }),
        })
        .then((res) => res.json())
        .then((response) => {
            console.log("Success:",response);
            // 在成功完成 API 請求後執行 fetchData()
        })
        .catch((error) => console.error("Error:", error));
        }

        

    }
}
</script>


<template>
    <div class="body">
        <div>
            <h1>問卷: {{this.alpha[0].title}}</h1>
            <h1>問卷描述: {{this.alpha[0].description}}</h1>
            <!-- {{ this.charli }} -->
            <!-- <div class="info">
                <p>姓名 :</p>
                <input type="text" v-model="userName">
            </div>
            <div class="info">
                <p>手機 : </p>
                <input type="text" v-model="phone">
            </div>
            <div class="info">
                <p>信箱 : </p>
                <input type="text" v-model="email">
            </div>
            <div class="info">
                <p>年齡 :</p> 
                <input type="text" v-model="age">
            </div> -->

            <div v-for="item in charli">
                <div class="question">
                    <p>{{ item.quId }}.</p>
                    <p>{{ item.qtitle }}</p>
                    <p>({{ item.qOptionType }})</p>
                </div>
                <div class="select" v-for="question in item.qOption.split(';')" v-if="item.qOptionType==='單選題'||'多選題'">
                    <input type="radio" value="answer">
                    <p>{{ question }}</p>
                </div>

                
                <div v-if="item.qOptionType ==='短述題'">
                    <input type="text">
                </div>
            </div>
            <!-- <button type="button" @click="$emit('goSetQuestion',1)">上一頁</button> -->
            <button @click="goHome">回首頁</button>
            <button type="button" @click="save">儲存</button>
            <button type="button" @click="saveAndpub">儲存並發布</button>
    </div>
    </div>


</template>



<style lang="scss" scoped>
h1{
    color: white;
}

button{
    width: 100px;
    margin: 0 1%;
    background-color: rgb(228, 24, 228);
    border-radius: 10px;
    box-shadow: 1px 1px 0px 1px;
}
p{
    font-weight: bold;
    font-size: 16pt;
    color: black;
}
.body{
    height: auto;
    width: 70vw;
    background-color: #495E57;
    
}

.question{
    display: flex;
}
.select{
    display: flex;
}
.info{
    display: flex;
}


</style>