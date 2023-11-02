<script>
export default{
    data(){
        return{
            newItem:{
                Name:"",
                Amount:"",
                
            }
            
        }
    },
    methods:{
        addItem(){
                this.$emit('dog1',this.newItem);
                
                let x = 0
                this.$emit("delpage",x)//點及新增後就關閉視窗
        },
    }
}

</script>

<template>
        <div class="showArea">
            <div class="inputArea">
                <p>Name</p>
                <input type="text" v-model="this.newItem.Name">
                <p>Amount</p>
                <input type="number" v-model="this.newItem.Amount">
                <div class="btn">
                <button type="button" @click= "addItem" >Add transaction</button>
                </div>    
            </div>
        </div>
</template>

<style lang="scss" scoped>
    p{
        color: #3C7FA5;
        margin: 0;
        font-size: 20pt;
    }
    input{
        margin: 0;
        width: 300px;
        height: 30px;
        font-size: 16pt;
        border-radius: 10px;
        border-color: #3C7FA5;
    }
    button{
        color: white;
        background-color: #3C7FA5;
        border-radius: 10px;
        height: 30px;
        font-weight: bold;
        border: none;
        
    }
    
    .showArea{
        height: 300px;
        width: 500px;
        display: flex;
        justify-content: center;

        .inputArea{
            height: 200px;
            width: 300px;
            margin-top: 10%;
            .btn{
                display: flex;
                justify-content: center;
                margin-top: 10%;
            }

    
        }
    }
    
</style>