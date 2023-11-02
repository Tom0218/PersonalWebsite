<script>

</script>


<template>

    <div class="VforPractice02TopArea"></div>
    <div class="VforPractice02SecondArea"></div>
    <div class="VforPractice02ContentArea">
            <div class="Colorblock"></div>
            <div class="Text">
                <div class="d-flex">
                    <h1>Title</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime voluptatum temporibus ea labore deserunt. Aut provident inventore, earum exercitationem eos totam, error iure architecto eum laborum quod rem consequuntur cum.</p>
                </div>
                <div class="Nineblock">
                    <div class="block1" v-for="x in 9">
                        <div class="blockkk"></div>
                        <p>Lorem, ipsum.</p>
                    </div>
                </div>
            </div>   
    </div>
<div class="footer">
</div>

</template>


<style lang="scss" scoped>
    .VforPractice02TopArea{
        width: 100%;
        height: 20%;
        background-color: black;
    }
    .VforPractice02SecondArea{
        width: 100vw;
        height: 30% ;
        background-color: gray;
    }

    .VforPractice02ContentArea{
        width: 100vw;
        height: 100vh;
        margin-top: 50px;
        display: flex;
        .Colorblock{
            width: 20%;
            height: 100%;
            background-color: gray;
        }
        .Text{
            width: 80%;
            height: 100%;
            padding: 80px;
            
            p{margin-left: 20px;
                font-weight: bold;}
        }
            .Nineblock{
                width: 100%;
                height: 100%;
                margin-bottom: 0;
                display: flex;
                flex-wrap: wrap;
                .block1{
                    width: 30%;
                    height: 28%;
                    margin: 0 10px;
                    .blockkk{
                    width: 100%;
                    height: 100%;
                    background-color: rgb(236, 130, 0);
                    margin: 0 10px;
                }
                }
                .block1{
                    p{
                        text-align: center;
                    }
                }
            }

    }
    .footer{
        height: 10vh;
        width: 100vw;
        background-color: black;
        margin-top: 50px;
    }


</style>