<script>

</script>

<template>
<div class="body">
    <div class="backdrop-blur">
    <div class="img"></div>
    </div>

</div>
</template>

<style lang="scss" scoped>
.body{
    width: 100%;
    height: 100%;
    background-color: #BEC0CD;
    display: flex;
    justify-content: center;
    .img{
        background-image: url(../../public/4037098.jpg);
        height: 1000px;
        width: 600px;
        background-size: contain;
        background-repeat: no-repeat;
        margin-top: 5%;
        filter: blur(5px);
    }
    .backdrop-blur {
        backdrop-filter: blur(5px);
    }
}

</style>