<script></script>

<template>
    <div class="body">
            <div class="area1 "></div>
            <div class="area2"></div>
            <div class="area3">
                <div class="leftBox"></div> 
                <div class="rightBox">
                    <div class="rTopBox">
                        <div class="rtbTitle"><h2>Title</h2></div>
                        <div class="rtbText">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo cumque animi pariatur nihil est quis. Illo distinctio non eligendi ipsa!</div>
                    </div>
                    <div class="rBottomBox">
                        <div class ="nineBox1" v-for="x in 9">
                            <div class="Box"></div>
                            <p>Lorem, ipsum.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="area4"></div>
    </div>

</template>

<style lang="scss" scoped>
    .body{
        height: auto;
        width: 100vw;
        background-color: #F5F7F8;
        .area1{
            height: 10vh;
            width: 70%;
            margin: 0 15%;
            background-color: rgb(69, 71, 75);
        }
        .area2{
            height: 25vh;
            width: 70%;
            margin: 0 15%;
            background-color: rgb(73, 94, 87);
        }
        .area3{
            display: flex;
            height: 90vh;
            width: 70%;
            margin: 0 15%;
            background-color: rgb(244, 206, 20);
            .leftBox{
                height: 100%;
                width: 30%;
                background-color: #ffab02;
            }
            .rightBox{
                height: 100%;
                width: 70%;
                padding: 2%;
                .rTopBox{
                    height: 20%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    .rtbText{
                        padding: 0 2%;
                    }
                }
                .rBottomBox{
                    height: 80%;
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    .nineBox1{
                        width: 30%;
                        height: 30%;
                        position: relative;
                        padding-bottom: 4%;

                        p{
                            position: absolute;
                            bottom: 0;
                            right: 20%;
                            margin-bottom: 0;
                        }
                        .Box{
                            width: 100%;
                            height: 100%;
                            background-color: rgb(73, 94, 87);
                            padding-bottom: 2%;
                        }
                    }
                }
            }
        }
        .area4{
            height: 20vh;
            width: 70%;
            margin: 0 15%;
            background-color: rgb(69, 71, 75);
        }

        
    
    }


</style>