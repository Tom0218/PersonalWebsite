<script>
import ProvideChild2 from './ProvideChil2.vue';

export default{
    data(){
        return{

        }
    },
    components:{
        ProvideChild2
    }
}
</script>
<template>
    <div class="wrap">
        <h1>這是父層</h1>
        <ProvideChild2/>

</div>
</template>
<style lang="scss" scoped>
.wrap{
    width: 300px;
    height: 300px;
    border: 1px solid black;
}
</style>