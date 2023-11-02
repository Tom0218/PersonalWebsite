<script>
export default{
    data(){
        return{
            Text:["お気に入り物件","お気に入りタッグ","ユーザー設定","XXXXXX","OOOOOO","お問い合わせ履歴"]
        }
    }
}
</script>

<template>
    <div class="body">
        <div class="MainArea" >
            <div class="box" v-for="x in Text">
                <p>{{ x }}</p>
                
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.body{
    height: 90vh;
    width: 100%;
    background-color: #BEC0CD;
    padding-top: 100px;
    .MainArea{
        width: 70%;
        margin: 0 15%;
        height: 70%;
        display: flex;
        flex-wrap: wrap;
        .box{
            width: 30%;
            height: 50%;
            border: 1px black solid;
            margin: 1%;
            border-radius: 20px;
            background-color: #475467;
            display: flex;
            justify-content: center;
            align-items: center;
            p{
                color: white;
                font-weight: bold;
                text-align: center;
            }
        }
        

    }
}
</style>