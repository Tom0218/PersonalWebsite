<script >
</script>

<template>
<div class="body">
    <div class="MainArea">
        <div class="headerShow">
        </div>
        <div class="box" >
            <div class="box1 one" >
                <img src="https://picsum.photos/360/440?random=1" alt="">
            </div>
            <div class="box1 two">
                <img src="https://picsum.photos/360/450?random=1" alt="">
            </div>
            <div class="box1 three">
                <img src="https://picsum.photos/360/460?random=1" alt="">
            </div>
        </div>
        <div class="content">
            <div class="pic">
                <img src="https://picsum.photos/500/440?random=1" alt="">
            </div>
            <div class="txt">
                <h1>Title</h1>
                <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde eius esse officiis tenetur veniam nam dignissimos temporibus nemo commodi possimus.</span>
            </div>
        </div>
        <div class="bottom">
        </div>
    </div>
</div>
</template>

<style lang="scss" coped>
    .body{
        height: auto;
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 5%;

    }
    .MainArea{
        margin: 0;
        height: 100%;
        width: 70%;
        
    }
    .headerShow{
        background-color: rgb(48, 48, 48);
        width: 100%;
        height: 25%;
    }
    .box{
        height: 60%;
        width: 100%;
        display: flex;
        margin-top: 10%;
        justify-content: space-between;
        margin-bottom: 0;
        .box1{
            width: 30%;
            height: 100%;
            background-color: rgb(48, 48, 48);
            display: flex;
            border: 10px black solid;
        }
    }
    .content{
        height: 60%;
        width: 100%;
        display: flex;
        margin-top: 5%;
        .pic{
            height: 100%;
            width: 55%;
            background-color:rgb(48, 48, 48);
            margin-top: 0;
        }
        .txt{
            width: 50%;
            height: 100%;
            margin-top: 130px;
            margin-left: 50px;
            }
    }
    .bottom{
        margin-top: 100px; 
        widows: 100%;
        height: 20%;
        background-color: rgb(48, 48, 48);
    }
    
</style>