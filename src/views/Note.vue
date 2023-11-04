<script>

</script>
<template>
<div class="body">
    <div class="mainArea">
<!-- ---------------------------------------------------------------- -----------------------------------------------手風琴-->
    <div class="accordion" id="accordionPanelsStayOpenExample">
    <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
            splice
        </button>
        </h2>
        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
        <div class="accordion-body">
            <p>從索引 3 的位置開始，刪除 1 個元素</p>
            <p>var removed = myFish.splice(3, 1);</p>
            <p>從索引 2 的位置開始，刪除 0 個元素並插入「drum」</p>
            <p>var removed = myFish.splice(2, 0, "drum");</p>
        </div>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
        <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
            Accordion Item #2
        </button>
        </h2>
        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse collapsed" aria-labelledby="panelsStayOpen-headingTwo">
        <div class="accordion-body">
            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
            Accordion Item #3
        </button>
        </h2>
        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
        <div class="accordion-body">
        </div>
        </div>
    </div>
</div>
</div>
<!-- ---------------------------------------------------------------- -----------------------------------------------手風琴-->
</div>
</template>
<style lang="scss" scoped>

p{
    color: #ccf407;
}
.body{
    height: 100vh;
    width: 100%;;
    background-color: #232D3F;
    margin: 0%;
    padding: 2% 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .mainArea{
        height: auto;
        width: 70%;
        height: 100%;
    }
}

.collapsed{
    background-color: #232D3F;
    color: #ccf407;

}
.accordion{
    background-color: #232D3F;
 
}
.accordion-button{
    background-color: #232D3F;
    color: #ccf407;

}
.accordion-body{
    background-color: #232D3F;
}



</style>
