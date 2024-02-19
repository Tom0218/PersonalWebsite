<script>
import AddObject from "../components/ExpenseTrackerAddObject.vue"
import DeleteBox from "../components/ExpenseTrackerDeleteBox.vue"
export default {
data() {
    return {
    plusNum:0,
    neNum:0,
    netIncome:0,
    arr:[],
    page:0,
    key : 0,
    aa : 0,
    }
},


methods: {
    //計算總合
    addNItem(info){
         //推進主陣列
        this.arr.push(info)

        if(info.Amount > 0){ 
            this.plusNum = this.plusNum + info.Amount;
        }else{
            this.neNum = this.neNum +info.Amount;
        }
        this.netIncome = this.plusNum + this.neNum;
        },

     //跳出確認刪除視窗
    changePageDelete(index){
        this.key = index;
        this.page = 2
        },

    moneyDele(dele){
        //若被刪除的money > 0 plusNum -money
        if (dele >=0) { 
            this.plusNum = this.plusNum - dele
        } else {
            //將支出進行絕對值轉為正數
            this.aa = Math.abs(dele)
            this.neNum = this.neNum + this.aa //把要刪除的數加回去
            }
            this.netIncome = this.neNum + this.plusNum;
        },

    deletedArrfn(arr){ //刪除元素後的陣列取代主陣列
        this.arr = arr
        },

    closePage(x){   //刪除元素後帶出的關閉視窗值
        this.page = x
        },

    //新增物件
    Addtransaction(){
        this.page = 1 
        },

    AddObj(){
        this.page = 0
    }
},

components: {
    AddObject,
    DeleteBox,
},

}

</script>

<template>
<div class="bgArea">
    <div class="blueArea">
        <div class="mainArea">
            <h3 class="ExpenseTracker">Expense Tracker</h3>
            <h3 class="Kouhei">Tom</h3>
            <p class="Yourbalance">YOUR BALANCE</p>
            <h1 class="moneyyy">${{ netIncome}}</h1>
        </div>
    </div>


    <div class="whiteArea">
    <div class="top">
        <!-- 收益顯示 -->
        <div class="Income">
            <h2>INCOME</h2>
            <div>
            </div>
            <h1>{{ plusNum }}</h1>
        </div>
        <!-- 支出顯示 -->
        <div class="Expense">
            <h2>EXPENSE</h2>
            <h1>{{ neNum }}</h1>
        </div>

    </div>  
    <div class="btn">
        <button type="button" class="numBtn"   @click="Addtransaction()">Add transaction</button>
    </div>
    <!-- 陣列顯示 -->
    <div class="content">
        <div class="blockIncome" v-for="item, index in arr ">  
        <span>{{ item.Name }}</span>
        <span class="moneyText">{{ item.Amount }}</span>
        <!-- 跳出刪除視窗並綁定key變數=Index -->
        <button type="button" class="delBtn"
        :key="index" @click="changePageDelete(index)" >Delete</button>
        </div>
        </div>
    </div>
</div>

<!-- 新增物件 -->
    <div class="popup"  v-if ="page ==1">
    <div class="popup-content">
        <!-- <h2>{{ title }}</h2> -->
        <div class="popup-body">
            <!-- 弹出窗口的内容放在这里 -->
            <div class="dlepage">
                <i class="fa-solid fa-xmark closeWindows" @click="AddObj()"></i>
                <AddObject @dog1 = "addNItem" @delpage = "closePage"/>
            </div>
        </div>
    </div>
</div>


<!-- 刪除物件 -->
<div class="popup"  v-if="page ==2">
    <div class="popup-content">
        <div class="popup-body">
            <i class="fa-solid fa-xmark Closewindow" @click="AddObj()"></i>
        <!-- 弹出窗口的内容放在这里 -->
    <DeleteBox :DelIndex ="this.key" :delarr="this.arr" 

    @delemoney = "moneyDele" @deletedArr = "deletedArrfn" @closepage = "closePage"/>
<!-- </div> -->
        <slot></slot>
    </div>
    </div>
</div>



<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</template>

<style lang="scss" scoped>
.Closewindow{
    margin-left: 226px;
    cursor: pointer;
}
.bgArea {
    width: 100%;
    height: 100vh;
    display: flex;
    background: whitesmoke;

.blueArea {
    width: 40vw;
    height: 100vh;
    background-color: #4b85a0;
    display: flex;
    justify-content: center;
    .ExpenseTracker{
        margin-top: 10vh;
        font-size: 28px;
        color: white;
    }
    .Kouhei{
        margin-top: 20vh;
        color: white;
        text-align: center;
        font-weight: bold;
    }
    .Yourbalance{
        margin-top: 5vh;
        color: white;
        text-align: center;
        font-weight: bold;
    }
    .moneyyy{
        margin-top: 2vh;
        color: white;
        text-align: center;
    }
    
}

.whiteArea {
    width: 60vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    .content{
        width:60% ;
        height: 40vh;
    
        .blockIncome{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24pt;
        border: 3px #4b85a0 solid;
        border-radius: 10px;
        margin: 2% 0 ;
        position: relative;
        .moneyText{
            position: absolute;
            right: 18%;
        }
        .delBtn{
            width: 15%;
            height:25px;
            margin-right: 5px ;
            border: none;
            border-radius: 5px;
            background-color: #4b85a0;
            color: white;
            font-size: 14pt;
        }
        .itemName{
            margin-left: 10px;
            color: green;
        }
        
    }
    .blockExpense{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24pt;
        border: 3px #4b85a0 solid;
        border-radius: 10px;
        margin: 2% 0 ;
        position: relative;
        .moneyText{
            position: absolute;
            right: 18%;
            color:red;
        }
        .delBtn{
            width: 15%;
            height:25px;
            margin-right: 5px ;
            border: none;
            border-radius: 5px;
            background-color: #4b85a0;
            color: white;
        }
        .itemName{
            margin-left: 10px;
            color:red;
        }
        
    }
    }
    .top{
        width: 60%;
        margin: 0 20%;
        display: flex;
        justify-content: space-between;
    .Income{
        color: green;
        h1{
            text-align: center;
            color: green;
        }
    }
    .Expense{
        color: rgb(237, 52, 52);
        text-align: center;
    }
    

    }
    .numBtn{
        width: 200px;
        height: 30px;
        color: white;
        background-color: #4b85a0;
        border: none;
        border-radius: 5px;
    }
    .dlepage{
        width: auto;
    }

}

}
/* 样式可以根据需要进行自定义 */
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-content {
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.popup h2 {
    font-size: 1.5rem;
}

.popup button {
    background: none;
    border: none;
    cursor: pointer;
    color: #007BFF;
    font-size: 1rem;
    margin-left: auto;
}
.popup-body{
    position: relative;
.closeWindows{
    font-size: 26pt;
    position: absolute;
    right: 0;
    color: #4b85a0;
    cursor: pointer;
}
}

</style>
