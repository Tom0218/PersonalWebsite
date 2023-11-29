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
        }
    },
    props:[
        "alpha",//qn
        "charli"//qu
    ],

    methods:{

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
        <h1>問卷: {{this.alpha[0].title}}</h1>
        <h2>問卷描述: {{this.alpha[0].description}}</h2>
        <div>
            <p>姓名 :</p>
            <input type="text" v-model="userName">
        </div>
        <div>
            <p>手機 : </p>
            <input type="text" v-model="phone">
        </div>
        <div>
            <p>信箱 : </p>
            <input type="text" v-model="email">
        </div>
        <div>
            <p>年齡 :</p> 
            <input type="text" v-model="age">
        </div>

        <div v-for="item in charli">
            <div class="question">
                <p>{{ item.quId }}.</p>
                <p>{{ item.qtitle }}</p>
            </div>
            <div class="select">
                <input type="radio" name="" id="" value={{item.qOption[0]}}>
                <p>{{ item.qOption[0] }}</p>
            </div>
            <div class="select">
                <input type="radio" name="" id="" value={{item.qOption[2]}}>
                <p>{{ item.qOption[2] }}</p>
            </div>
            <div class="select">
                <input type="radio" name="" id="" value={{item.qOption[4]}}>
                <p>{{ item.qOption[4] }}</p>
            </div>
        </div>
            <button type="button" @click="save">儲存ok</button>
            <button type="button" @click="saveAndpub">儲存並發布</button>
    </div>


</template>



<style lang="scss" scoped>
button{
    margin: 0 1%;
    background-color: rgb(228, 24, 228);
    border-radius: 10px;
    box-shadow: 1px 1px 0px 1px;
}
p{
    font-weight: bold;
    font-size: 16pt;
    color: white;
}
.body{
    height: auto;
    width: 500px;
    background-color: #495E57;
}

.question{
    display: flex;
}
.select{
    display: flex;
}


</style>