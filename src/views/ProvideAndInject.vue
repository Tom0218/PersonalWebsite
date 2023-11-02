<script>
import ProvideChil1 from '../components/ProvideChil1.vue';
import {ref, provide} from 'vue';//////////////composition api要加這行

export default{
    data(){
        return{
            dataMsg: "message",
            dataArr: ['str','arr','ass'],//若是物件或陣列即可做成響應式
        }
    },
    components:{
        ProvideChil1
    },
    methods:{
        addItem() {
            this.dataArr.push('xxx')
        }
    },
    provide() {         /////響應式只能物件或陣列
        return{
            msg: this.dataMsg,
            cool:"cool",
            arr:this.dataArr,
        }
    },
    setup(){//////////////composition api要加
        let setupMsg = ref('setupMsg')
        provide('setupMSG',setupMsg)
        return {
            setupMsg
        }
    }
}
</script>
<template>
    <div class="wrap">
<h1>this's grandpa</h1>
<p>這是grandpa的變數 msg :{{ this.dataMsg }}</p>
<p>無conversationAPi的input</p>
<input type="text" v-model="this.dataMsg">
<div>
<p>有compsitionAPi的input</p>
<input type="text " v-model="this.setupMsg">
</div>
<p>{{ this.dataArr }}</p>
<button type="button" @click="addItem()">addItem</button>

<ProvideChil1/>
    </div>

</template>
<style lang="scss" scoped>
.wrap{
    width: 600px;
    height: 600px;
    border: 1px black solid;
}
</style>