<script >
</script>

<template>
<div class="body">
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
</template>

<style lang="scss" coped>
    .body{
        height: auto;
        width: 70%;
        margin: 0 15%;
        background-color:rgb(245, 247, 248);

    }
    .headerShow{
        background-color: #F4CE14;
        width: 100%;
        height: 20vh;
    }
    .box{
        height: 40vh;
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-bottom: 0;
        margin-top: 10%;

        .box1{
            width: 30%;
            height: 100%;
            display: flex;
            img{
            width:100%;
            background-position: 50% 50%;
        
            }

        }
    }
    .content{
        height: 60vh;
        width: 100%;
        display: flex;
        margin-top: 10%;
        .pic{
            height: 100%;
            width: 50%;
            margin-top: 0;
            background-size: contain;
            img{
                height: 300px;
                width: 100%;
            }
        }
        .txt{
            width: 50%;
            height: 100%;
            margin-left: 50px;
            }
    }
    .bottom{
        width: 100%;
        height: 20vh;
        background-color: #495E57;

    }
    
</style>