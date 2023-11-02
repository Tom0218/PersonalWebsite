<script>

</script>
<template>
<div class="showArea">
    <div class="MainArea">
        <div class="ObjectA">
                <div class="ObjectABox"></div>
                <div class="ObjectAText">
                    <button type="button" @click="GoObj3()">都心区　A物件</button>
                    <hr>
                    <div></div>
                </div>
                <hr/>
        </div>
        <div class="WhiteArea"></div>
    </div>
</div>
</template>
<style lang="scss" scoped>

.showArea{
    height: 100%;
    width: 100%;
    background-color: #BEC0CD;
    .MainArea{
        height: 85vh;
        width: 70%;
        margin: 0 15%;
        padding-top: 2%;
        .ObjectA{
            height: 100px;
            width: 100%;
            border: 1px;
            display: flex;
            margin-bottom: 30px;
            .ObjectABox{
                height: 100px;
                width: 110px;
                background-color: #475467;
                border-radius: 15px;
            }
            .ObjectAText{
                width: 100%;
                padding: 0 30px;
            }
            
        }
        button{
            font-weight: bold;
            margin-left: 20px;
            margin-bottom: 0;
            height: 20px;
            border: none;
            background-color: #BEC0CD;
            color: #475467;

        }
        .WhiteArea{
            height: 70%;
            width: 100%;
            background-color: white;
        }
    }
   
}

</style>