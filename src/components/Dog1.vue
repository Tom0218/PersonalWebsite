<script>

export default{
    data(){
        return{
            infoBox :{
            name:"",
            age:"",
            page :0,
            },

            

        }
    },
    methods:{
        GoFather(){
            this.infoBox.page+=1
            let page = 1
            this.$emit('userinfo',this.infoBox,page);
            
        }
    }
}
</script>
<template>
    <div class="showArea">
        <div class="main">
                <h1>註冊</h1>
                <p>name</p>
                <input type="text" v-model="infoBox.name">
                <p>age</p>
                <input type="number" v-model="infoBox.age" >
                <div class="gofatherbtn">
                    <button type="button" @click="GoFather">Register</button>
                </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .showArea{
        height: 300px;
        width: 300px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        input{
            border-radius: 5px;
            width: 100%;
            padding: 1% 2%;
            }
        }
        .gofatherbtn{
            margin-top: 4%;
            
        }
        p{
            margin: 0;
        }

</style>