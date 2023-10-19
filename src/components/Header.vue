<script>
    import { RouterLink} from 'vue-router';

    export default{

        components:{
        RouterLink
    }
}

</script>

<template>
    <div class="headerpage">
        <RouterLink to="/" class="Home Btn Btn shape-ex1">Home</RouterLink>
        <RouterLink to="/VtextAndVmodel" class=" Btn shape-ex1" >Vtext&Vmodel</RouterLink>
        <RouterLink to="/Practice01" class=" Btn shape-ex1" >Practice01</RouterLink>
        <RouterLink to="/Practice02" class=" Btn shape-ex1" >Practice02</RouterLink>
        <RouterLink to="/GuessNumber" class=" Btn shape-ex1" >GuessNumber</RouterLink>
        <RouterLink to="/Snack" class=" Btn shape-ex1" >Snack</RouterLink>
        <RouterLink to="/Login" class=" Btn shape-ex1" >Login</RouterLink>
        <RouterLink to="/Register" class=" Btn shape-ex1" >Register</RouterLink>
        <RouterLink to="/WaterFall" class=" Btn shape-ex1" >WaterFall</RouterLink>
        <RouterLink to="/VifandVshow" class=" Btn shape-ex1" >VifandVshow</RouterLink>
        <RouterLink to="/Props" class=" Btn shape-ex1" >Props</RouterLink>
        </div>
</template>

<style lang="scss" scoped>
    .headerpage{
        background-color: #1b1818;
        height: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .Btn{
        color: white;
        font-size: 16pt;
        margin:  20px;
        text-decoration: none;
        text-align: center;
    }
    .shape-ex1{
    font-size: 18px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-left: 20px;
    }
    .shape-ex1:after{
        content: '';
        width: 0%;
        height: 1px;
        background-color:white;
        position: absolute;
        bottom: 0;
        left: 0;
        transition: all .3s linear;
    }
    .shape-ex1:hover::after{
        width: 100%;
    }

</style>