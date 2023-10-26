<script>
export default{
    props:[
        "userData",
        "age",
        "pageChan",
        "name"
    ],
}
</script>
<template>
    <div class="showArea">
        <h1>修改</h1>

        <p>修改後的name是 {{ this.userData.name }}</p>
        <p>修改後的age是{{ this.userData.age }}</p>
        <input type="text" name="" id="" :value="name" @input="$emit(`update:name`,$event.target.value)">
        <input type="text" name="" id="" :value="age" @input="$emit(`update:age`,$event.target.value)">
        <button type="button" @click="console.log($event)">顯示event資料</button>
        <!-- update:age 用於更新event中age的值 -->
        <!-- [ ` ]告知要更新這個屬性 -->
    </div>
</template>
<style lang="scss" scoped>
    .showArea{
        height: 300px;
        width: 300px;
        border: 1px black solid;
    }
</style>