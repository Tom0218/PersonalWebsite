<script>
export default{

    data(){
        return{
            userName:"",
            phone:"",
            email:"",
            age:"",
            question:this.quList,
            qulength:this.quList.length,
        }
    },
    props:[
        'questionnaire',
        'quList',
    ],

    mounted(){
        console.log("qnId:"+this.questionnaire[0].qnId)
        console.log("title:"+this.questionnaire[0].title)
        console.log("description:"+this.questionnaire[0].description)
        console.log("startDate:"+this.questionnaire[0].startDate)
        console.log("endDate:"+this.questionnaire[0].endDate)
        console.log("pusblished"+this.questionnaire[0].published)
        console.log(this.quList)
        
    },

    methods:{

        goHome(){
            this.$router.push('/Questionnaire')
        },
        //存DB不發佈
        save(){
            var questionList = this.quList;

            //update
            if(this.questionnaire[0].qnId > -1){
                var url = "http://localhost:8081/api/quiz/update";
                var Qn = {
                "questionnaire": {
                    "id":parseInt(this.questionnaire[0].qnId),
                    "title": this.questionnaire[0].title,
                    "description":this.questionnaire[0].description,
                    "published":Boolean(this.questionnaire[0].published),
                    "startDate": this.questionnaire[0].startDate,
                    "endDate": this.questionnaire[0].endDate
                },
                "question_list": []
                };
                for (let i = 0; i < questionList.length; i++) {
                Qn.question_list.push({
                "quId": questionList[i].quId,
                "qnId":parseInt(this.questionnaire[0].qnId),
                "qTitle": questionList[i].qTitle,
                "optionType": questionList[i].optionType,
                "isnecessary": questionList[i].necessary,
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
                    // 在成功完成 API 請求後執行 fetchData()
                })
                .catch((error) => console.error("Error:", error));

                return;
                };

            //create not publish
            if(this.questionnaire[0].qnId == -1){

                var url = "http://localhost:8081/api/quiz/create";
                var Qn = {
                "questionnaire": {
                    "id":this.qnId,
                    "title": this.title,
                    "description":this.description,
                    "published":this.published,
                    "startDate": this.startDate,
                    "endDate": this.endDate
                },
                "question_list": []
                };   
                        
                for (let i = 0; i < this.quList.length; i++) {
                    Qn.question_list.push({
                    "quId": questionList[i].quId,
                    "qTitle": questionList[i].qtitle,
                    "optionType": questionList[i].qOptionType,
                    "necessary": questionList[i].necessary,
                    "option": questionList[i].qOption
                    });
                }
                console.log(Qn)
                console.log(question_list)
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
             //create not publish    
                
        },

        saveAndpub(){
            var qn = this.questionnaire;
            var questionList = this.quList;

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

        for (let i = 0; i < this.quList.length; i++) {
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
            <h1>問卷: {{ this.questionnaire[0].title }}</h1>
            <h1>問卷描述:{{ this.questionnaire[0].description }}</h1>
            
            <div class="info">
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
            </div>

            <div v-for="item in quList">
                <div class="question">
                    <p>{{ item.quId }}.</p>
                    <p>{{ item.qTitle }}</p>
                    <p>({{ item.optionType }})</p>
                </div>
                <div class="optionArea">
                    <div  class="option" v-for="question in item.option.split(';')" v-if="item.qOptionType==='單選題'||'多選題'">
                            <input type="radio" value="answer">
                            <p>{{ question }}</p>           
                    </div> 
                    <div  class="option" v-for="question in item.option.split(';')" v-if="item.qOptionType==='多選題'">
                            <input type="checkbox" value="answer">
                            <p>{{ question }}</p>           
                    </div> 
                    <div v-if="item.qOptionType ==='短述題'">
                        <input type="text">
                    </div>
                </div>
            </div>

            <!-- <button type="button" @click="$emit('goSetQuestion',1)">上一頁</button> -->
            <!-- <button @click="goHome">回首頁</button> -->
            <button type="button" @click="save">儲存</button>
            <!-- <button type="button" @click="saveAndpub">儲存並發布</button> -->
    </div>
    </div>


</template>



<style lang="scss" scoped>
.option{
    display: flex;
    width: 50%;
}

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
    min-height: 100vh;
    overflow-y: auto;
    width: 100vw;
    padding: 5% 10%;
    background-color: #495E57;
    
}

.question{
    display: flex;
}
.optionArea{
    width: 100%;
    display: flex;
}
.info{
    display: flex;
}


</style>