<script>
    import { RouterLink} from 'vue-router';

    export default{

        components:{
        RouterLink
    }
}
function toggle() {
    document.getElementById('nav-container').classList.toggle('is-active');
    document.getElementById('btn-menu').classList.toggle('is-active');
}
</script>

<template>
    <div class="headerpage">
        <RouterLink to="/" class="Home Btn">Home</RouterLink>
        <RouterLink to="/VtextAndVmodel" class=" Btn shape-ex1" onclick="toggle()">Vtext&Vmodel</RouterLink>
        <RouterLink to="/Practice01" class=" Btn shape-ex1" onclick="toggle()">V-for Practice01</RouterLink>
        <RouterLink to="/Practice02" class=" Btn shape-ex1" onclick="toggle()">V-for Practice02</RouterLink>
        <RouterLink to="/GuessNumber" class=" Btn shape-ex1" onclick="toggle()">GuessNumber</RouterLink>
        <RouterLink to="/Snack" class=" Btn shape-ex1" onclick="toggle()">Snack</RouterLink>
        </div>
</template>

<style lang="scss" scoped>
    .headerpage{
        background-color: #1b1818;
        height: 100%;
        display: flex;
        align-items: center;
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