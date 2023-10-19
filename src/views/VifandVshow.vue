<script>
export default{
    data(){
        return{
            name:false,
            name2:false,
            house:0,
            man:0,
        }
    },
    methods:{

    }
}
</script>
<template>
    <div>
        <h1>v-if</h1>
        <p>v-if條件成立才會建立標籤</p>
    </div>
        <label for="">我是</label>
        <input type="checkbox" value="true" v-model="name">
        <p v-if="name">tom</p>

        <h1>v-if & v-else</h1>
        <p>我有</p>
        <select name="" id="" v-model="house">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
        <p>間房</p>
        <p v-if="house ==1">好可憐喔</p>
        <p v-if="house ==2">還行吧</p>
        <p v-if="house ==3">條件不錯喔</p>
        <p v-else>??</p>

        <h1>v-if &v-else-if & v-else</h1>
        <label for="">我有</label>
        <select name="" id=""  v-model="man">
            <option value="0">1</option>
            <option value="1">2</option>
            <option value="2">3</option>
        </select>
        <p>個小弟</p>
        <p v-if="man==0">可憐</p>
        <p v-else-if="man==1">有點東西</p>
        <p v-else>挖操塊逃</p>



        <h1>v-show</h1>
        <p>v-show則是會display:none</p>
        <label for="">我是</label>
        <input type="checkbox" value="true" v-model="name2">
        <p v-show="name2">jenny</p>
    


</template>
<style lang="scss" scoped></style>