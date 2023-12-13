th<script>

export default{
    
    data(){
        return{
            name:"",
            phone:0,
            email:"",
            age:0,
            qnId:0,
            title:"",
            description:"",
            answers:[],
            nowDate: new Date(),
        }
    },

    mounted(){
        this.name = this.$route.query.name;
        this.phone = this.$route.query.phone;
        this.email = this.$route.query.email;
        this.age = this.$route.query.age;
        this.qnId=this.$route.query.qnId;
        this.title = this.$route.query.title;
        this.description = this.$route.query.description;
        const answerString = this.$route.query.answers;
        this.answers = JSON.parse(answerString);

    },

    methods:{
        Back(){
            this.$router.push({
                name:'QuestionnaireInsidePage',
                query: {
                    
                    editName: this.name,
                    editPhone: this.phone,
                    editEmail: this.email,
                    editAge: this.age,
                    qnId: this.qnId,
                    editTitle:this.title,
                    editDescription:this.description,
                    editAnswer:this.answers
                }
            })
        },
        
        finish(){
            var currentDate = new Date();

        // 获取日期和时间的字符串表示
        var currentDateTimeString = currentDate.toLocaleString();
            var url="http://localhost:8081/api/quiz/Submission";
            var submi ={
                "Submission_List":[]
            };
            for(let i =0; i < this.answers.length;i++){
                submi.Submission_List.push({
                    "name":this.name,    
                    "phoneNumber":this.phone,
                    "email" : this.email,
                    "age":parseInt(this.age),
                    "qnId":parseInt(this.answers[i].qnId),
                    "quId":this.answers[i].quId,
                    "answer":this.answers[i].answer,
                    "dateTime":this.nowDate
                })
        
            }
            console.log(submi.Submission_List)

            fetch(url, {
                method: "POST",
                body: JSON.stringify(submi),
                headers: new Headers({
                "Content-Type": "application/json",
                }),
                })
                .then((res) => res.json())
                .then((response) => {
                    console.log(response);
                    alert(response.rtncode)
                    if(response.rtncode =="SUCCESSFUL"){
                        alert(response.rtncode)
                        this.$router.push('Questionnaire')
                    }
                })
                .catch((error) => console.error("Error:", error));
                this.$router.push("QuestionnaireFront")

                return;


        }
    }
}

</script>

<template>
    <div class="body">
        <div>
            <h1>{{this.title}}</h1>
            <h3>簡介:{{this.description}}</h3>
            <div class="personinfo">
                <div class="info">
                    <p>姓名 :{{ this.name }}</p>
                    
                </div>
                <div class="info">
                    <p>手機 : {{ this.phone }}</p>
                </div>
                <div class="info">
                    <p>信箱 : {{ this.email }}</p>
                </div>
                <div class="info">
                    <p>年齡 : {{ this.age }}</p> 
                </div>
            </div>
            <div class="box" v-for="item in answers">

                <div class="box">
                    <p>{{ item.quId }}.</p>
                    <p>{{ item.question }} : </p>
                </div>
                
                <div class="box" v-if="item.optionType == '單選題' || item.optionType == '短述題'">
                    <p>{{ item.answer }}</p>
                </div> 
                <div class="box" v-else-if="item.optionType == '多選題'">
                    <div v-if="item.answer.length >= 2" v-for="ans in item.answer.split(';')">
                        <p>{{ ans }}</p>
                    </div>
                    <div v-else-if="item.answer.length = 1">
                        <p>{{ item.answer }}</p>
                    </div>
                </div> 

            </div>
        </div>
            <button type="button"  @click="Back"><p>修改</p></button>
            <button type="button" @click="finish"><p>送出</p></button>
        
        </div>

</template>

<style lang="scss" scoped>
.questionarea{
    display: flex;
}
.box{
    display: flex;
}
.personinfo{
    display: flex;
    justify-content: space-between;
}

h1,h3{
    color: white;
}


button{
    margin: 0 1%;
    background-color: rgb(228, 24, 228);
    border-radius: 10px;
    box-shadow: 1px 1px 0px 1px;
}
p{
    font-size: 16pt;
    font-weight: bold;
    color: white;
    margin: 20px;

}
.body{
    min-height: 100vh;
    overflow-y: auto;
    padding: 5%;
    background-color: green;
    
}

.question{
    display: flex;
}
.info{
    display: flex;
}
</style>