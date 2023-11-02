<script>

export default{
    data(){
        return{

        }
    },
    inject:[    //陣列
        "msg",
        "cool",
        "arr",
        "setupMSG"
    ]
}
</script>
<template>
    <div class="wrap">
        <h1>這是孫子</h1>
        <p>{{ msg }}</p>
        <p>{{ setupMSG }}</p>
        <p>{{ cool }}</p>
        <p>{{ arr }}</p>

        
</div>
</template>
<style lang="scss" scoped>
.wrap{
    width: 200px;
    height: 200px;
    border: 1px solid black;
}
</style>