<script>

import child2 from "../components/Child.2.vue"
export default{
    data(){
        return{
            ChildText:"",
        }
    },
    components:{
        child2
    },
    methods:{
        emitObj(params){
                console.log(params)
                this.ChildText = params
            
        }
    }
}
</script>

<template>
<div class="showArea">
    <div class="MainArea">
        <h1>Emit</h1>
    {{ this.ChildText.Text }}
    </div>
    <!-- 告知子元件想要父元件做什麼事就傳遞apple暗號 -->
    <child2 @apple="emitObj"/>
</div>


</template>

<style lang="scss" scoped>
.showArea{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .MainArea{
        height: 500px;
        width: 500px;
        border: 1px black solid;
    }

}
</style>