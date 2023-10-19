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
            this.$emit('userinfo',this.infoBox);
            
        }
    }
}
</script>
<template>
    <div class="showArea">
        <h1>Dog1</h1>
        <p>name</p>
        <input type="text" v-model="infoBox.name">
        <p>age</p>
        <input type="text" v-model="infoBox.age" >
        <button type="button" @click="GoFather">GoFather</button>
    </div>
</template>
<style lang="scss" scoped>
    .showArea{
        height: 300px;
        width: 300px;
        border: 1px black solid;
}
</style>