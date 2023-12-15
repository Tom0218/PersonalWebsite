<script>
export default{

    data(){
        return{
            userName:"",
            phone:"",
            email:"",
            age:"",
            qnId : 0,
            question:this.quList,
            qulength:this.quList.length,
            deleteQus:this.deleQuIds
        }
    },
    props:[
        'questionnaire',
        'quList',
        'deleQuIds'
    ],

    mounted(){
        console.log("qnId:"+this.questionnaire[0].qnId)
        this.qnId = this.questionnaire[0].qnId
        console.log("title:"+this.questionnaire[0].title)
        console.log("description:"+this.questionnaire[0].description)
        console.log("startDate:"+this.questionnaire[0].startDate)
        console.log("endDate:"+this.questionnaire[0].endDate)
        console.log("pusblished:"+this.questionnaire[0].published)
        console.log("deleQuIds:"+this.deleQuIds)
        console.log(this.quList)
        console.log(this.questionnaire)
        
    },

    methods:{

        goHome(){
            this.$router.push('/Questionnaire')
        },

        //存DB不發佈
        save(){
            var questionList = this.quList;
            
            //update not publish
            if(this.questionnaire[0].qnId > -1){
                var url = "http://localhost:8081/api/quiz/update";
                var Qn = {
                "questionnaire": {
                    "id":parseInt(this.questionnaire[0].qnId),
                    "title": this.questionnaire[0].title,
                    "description":this.questionnaire[0].description,
                    "published":false,
                    "startDate": this.questionnaire[0].startDate,
                    "endDate": this.questionnaire[0].endDate
                },
                "question_list": [],
                "deleteQuestionList":[],

                };
                for (let i = 0; i < questionList.length; i++) {
                Qn.question_list.push({
                    "quId": questionList[i].quId,
                    "qnId":parseInt(this.questionnaire[0].qnId),
                    "qTitle": questionList[i].qTitle,
                    "optionType": questionList[i].optionType,
                    "isnecessary": questionList[i].necessary,
                    "option": questionList[i].option
                })
                };

                for(let i = 0; i < this.deleteQus.length; i++){
                    Qn.deleteQuestionList.push({
                        "qnId":parseInt(this.qnId),
                        "quId":this.deleQuIds[i],
                    })
                };
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
                    this.$router.push('Questionnaire')
                })
                .catch((error) => console.error("Error:", error));
                return;
            };

            //create not publish
            var url = "http://localhost:8081/api/quiz/create";
            
            var Qn = {
            "questionnaire": {
                "title": this.questionnaire[0].title,
                "description":this.questionnaire[0].description,
                "published":false,
                "startDate": this.questionnaire[0].startDate,
                "endDate": this.questionnaire[0].endDate
            },

            "question_list": []
            };   
                    
            for (let i = 0; i < this.quList.length; i++) {
                Qn.question_list.push({
                "quId": questionList[i].quId,
                "qTitle": questionList[i].qTitle,
                "optionType": questionList[i].optionType,
                "necessary": questionList[i].necessary,
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
                this.$router.push('Questionnaire')
            })
            .catch((error) => console.error("Error:", error));
            
        },

        //存DB且發佈
        saveAndpub(){
            var questionList = this.quList;
            //編輯模式存DB且發佈
            if(this.questionnaire[0].qnId > -1){
                var url = "http://localhost:8081/api/quiz/update";
                var Qn = {
                    "questionnaire": {
                        "id":this.questionnaire[0].qnId,
                        "title": this.questionnaire[0].title,
                        "description":this.questionnaire[0].description,
                        "published":true,
                        "startDate": this.questionnaire[0].startDate,
                        "endDate": this.questionnaire[0].endDate
                    },
                    "question_list": []
                }
                for (let i = 0; i < this.quList.length; i++) {
                    Qn.question_list.push({
                        "quId": questionList[i].quId,
                        "qnId":this.questionnaire[0].qnId,
                        "qTitle": questionList[i].qTitle,
                        "optionType": questionList[i].optionType,
                        "necessary": questionList[i].necessary,
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
                this.$router.push('Questionnaire')
            })
            .catch((error) => console.error("Error:", error));
                return;
            }
            var url = "http://localhost:8081/api/quiz/create";
            var Qn = {
                "questionnaire": {
                "title": this.questionnaire[0].title,
                "description":this.questionnaire[0].description,
                "published":true,
                "startDate": this.questionnaire[0].startDate,
                "endDate": this.questionnaire[0].endDate
            },
            "question_list": []
            };   
                    
            for (let i = 0; i < this.quList.length; i++) {
                Qn.question_list.push({
                "quId": questionList[i].quId,
                "qTitle": questionList[i].qTitle,
                "optionType": questionList[i].optionType,
                "necessary": questionList[i].necessary,
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
                this.$router.push('Questionnaire')
            })
            .catch((error) => console.error("Error:", error));
            return
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
                <p>姓名 : </p>
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
                    <p> {{ item.qTitle }}</p>
                    <p>({{ item.optionType }})</p>
                </div>
                <div class="optionArea">
                    <div  class="option" v-for="question in item.option.split(';')" v-if="item.optionType==='單選題'">
                            <input type="radio" value="answer">
                            <p>{{ question }}</p>           
                    </div> 
                    <div  class="option" v-for="question in item.option.split(';')" v-else-if="item.optionType==='多選題'">
                            <input type="checkbox" value="answer">
                            <p>{{ question }}</p>           
                    </div> 
                    <div v-else-if="item.optionType ==='短述題'">
                        <input type="text">
                    </div>
                </div>
            </div>
            <div id="btnBox">
                <button type="button" @click="save">儲存</button>
                <button type="button" @click="saveAndpub">儲存並發布</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#btnBox{
    width: 50%;
    margin: 2% 25%;
}
input{
    height: 30px;
    margin: 0 1%;
}

.option{
    display: flex;
    width: 50%;
}

h1{
    color: white;
}

button{
    height: auto;
    font-size: 16pt;
    font-weight: bold;
    width: 150px;
    margin: 0 1%;
    background-color: rgb(210, 123, 16);
    border-radius: 10px;
    box-shadow: 1px 1px 0px 1px;
}
p{
    font-weight: bold;
    font-size: 16pt;
    color: white;
    margin: 0 5px;
}
.body{
    min-height: 100vh;
    overflow-y: auto;
    width: 60%;
    margin: 0 20%;
    padding: 5%;
    background-color: rgb(0, 68, 0);
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