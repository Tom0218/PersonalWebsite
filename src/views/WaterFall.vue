<script>
export default{
    data(){
        return{
            PicturerBox:[
                "../../public/waterfall/bike1.jpg",
                "../../public/waterfall/deewf.jpg",
                "../../public/waterfall/efwf.jpg",
                "../../public/waterfall/IMG_6242.jpg",
                "../../public/waterfall/qwd.jpg",
                "../../public/waterfall/qwdqd.jpg",
                "../../public/waterfall/qwe.jpg",
                "../../public/waterfall/qweqe.jpg",
                "../../public/waterfall/rth.jpg",
                "../../public/waterfall/wedwf.jpg",

            ],
        }
    },
}
</script>


<template>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<div class="body">
    <div class="imgContainer">
        <div class="masnory">
            <div class="item">
                <img src="https://picsum.photos/360/460?random=1" alt="">
            </div>
            <div class="item">
                <img src="https://picsum.photos/360/560?random=1" alt="">
            </div>
            <div class="item">
                <img src="https://picsum.photos/260/460?random=1" alt="">
            </div>
            <div class="item">
                <img src="https://picsum.photos/360/440?random=1" alt="">
            </div>
            <div class="item">
                <img src="https://picsum.photos/260/460?random=1" alt="">
            </div>
            <div class="item">
                <img src="https://picsum.photos/300/460?random=1" alt="">
            </div>
            <div class="item">
                <img src="https://picsum.photos/340/450?random=1" alt="">
            </div>
            <div class="item">
                <img src="https://picsum.photos/360/460?random=1" alt="">
            </div>
            <div class="item">
                <img src="https://picsum.photos/320/400?random=1" alt="">
            </div>
            <div class="item">
                <img src="https://picsum.photos/300/460?random=1" alt="">
            </div>
            <div class="item">
                <img src="https://picsum.photos/360/400?random=1" alt="">
            </div>
        </div>
    </div>
</div>
</template>


<style lang="scss" scoped>
    
p{
        color: white;
        font-size: 14pt;
        
}
a{
        text-decoration: none;
        color: white;
        margin: 0 10px;
}
.body{
        
        height: auto;
        margin: 0%;
}
.imgContainer{
    font-family: Helvetica;
}
//-----------------------------------------------------方法一
// .masnory{
//     column-count: 5; //行數
//     column-gap: 4;  //間隙
// }
// .item{
//     padding: 2px;
//     position: relative;
//     counter-increment: item-counter; //增加名為item-counter的計數器
// }
// .item img{
//     display: block;
//     width: 100%;
//     height: auto;
// }
// .item::after {
//     position: absolute;
//     display: block;
//     top: 2px;
//     left: 2px;
//     width: 24px;
//     height: 24px;
//     text-align: center;
//     line-height: 24px;
//     background-color: #000;
//     color: white;
//     content: counter(item-counter); //counter css計算數量的一種方式，用於同一個命名的計數器中獲取當前值並插入到生成內容中
// }
//---------------------------------------------------------方法一

.masnory{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 1800px;
}
.item{
    position: relative;
    width: 25%;
    padding: 5px;
    box-sizing: border-box; //告知border跟margin包含在寬度裡面
    counter-increment: item-counter;

}
.item img{
    height: auto;
    width: 100%;
    display: block;
    border-radius: 10px;
}
.item::after{
    content: "";
    position: absolute;
    display: block;
    top: 2px;
    left: 2px;
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    background-color: #000;
    color: white;
    content: counter(item-counter);
}
.item:nth-child(4n+1){   //可選擇子元素中的特定元素，預設視窗寬度顯示容納四列 第一個建立的
    order : 1;  //元素排列順訊，使5、9、16子元素排在第一列
}
.item:nth-child(4n+2){
    order:2;
}
.item:nth-child(4n+3){
    order:3;
}
.item:nth-child(4n){
    order:4;
}
</style>