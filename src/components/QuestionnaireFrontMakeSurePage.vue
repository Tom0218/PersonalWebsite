<script>

export default{
    data(){
        return{
            name:"",
            phone:0,
            email:"",
            age:0,
            qnId:0,
            qnTitle:"",
            qnDescription:"",
            quList:[],
            ansObj:{},

        }
    },

    mounted(){
        this.name = this.$route.query.name;
        this.phone = this.$route.query.phone;
        this.email = this.$route.query.email;
        this.age = this.$route.query.age;
        this.qnId=this.$route.query.qnId;
        this.qnTitle = this.$route.query.qnTitle;
        this.qnDescription = this.$route.query.qnDescription;
        this.quList = this.$route.query.quList;
        this.ansObj = JSON.parse(this.$route.query.ansObj);
        console.log("下面是答案物件")
        console.log( this.ansObj)
        // console.log(this.qnId=this.$route.query.qnId)
    },

    methods:{
        Back(){
            this.$router.push({
                name:'QuestionnaireInsidePage',
                query: {
                    name: this.name,
                    phone: this.phone,
                    email: this.email,
                    age: this.age,
                    ansObj: this.ansObj,
                    qnId: this.qnId
                }
            })
        }
    }
}

</script>

<template>
    <div class="body">
        <div>
            <h1>{{this.qnTitle}}</h1>
            <h3>簡介:{{this.qnDescription}}</h3>
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
            <div v-for="item in ansObj">
                <div class="box">
                    <p>{{ item.quId }}.</p>
                    <p>{{ item.qTitle }}</p>
                </div>
                
                <div v-if="item.optionType == '單選題'">
                    <p>{{ item.answer }}</p>
                </div>

                <div v-for="answer in item.answer" v-if="item.optionType == '多選題'">
                    <div class="box">
                        <p>{{ answer }}</p>
                    </div>
                </div>
                <div v-if="item.optionType =='短述題'">
                    <p>{{ item.answer }}</p>
                </div>
            </div>
            <button type="button"  @click="Back"><p>修改</p></button>
            <button type="button"><p>送出</p></button>
        
        </div>
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

}
.body{
    min-height: 100vh;
    overflow-y: auto;
    width: 70vw;
    margin: 0 15%;
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