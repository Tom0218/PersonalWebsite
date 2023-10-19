<script>
export default{
    props:[
        "userData"
    ],
}
</script>
<template>
    <div class="showArea">
        <h1>Dog2</h1>

        <p>Your name is {{ this.userData.name }}</p>
        <p>Your age is {{ this.userData.age }}</p>
    </div>
</template>
<style lang="scss" scoped>
    .showArea{
        height: 300px;
        width: 300px;
        border: 1px black solid;
    }
</style>