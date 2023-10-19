<script>
export default{
        props:[
            "person"
        ]
    
}
</script>

<template>
    <div class="textshow">
        <p>您的名子是{{ this.person.Name }}</p>
        <p>您的電話是{{ this.person.Phone }}</p>
        <p>您的信箱是{{ this.person.Eamil }}</p>
        <p>您的地址是{{ this.person.Address }}</p>
        <p>您的畢業學校是{{ this.person.GraduatedSchool }}</p>
        <p>您的性別是{{ this.person.sex }}</p>
        <p>您的興趣是{{ this.person.Interest }}</p>
        
    </div>
</template>

<style lang="scss" scoped>
.textshow{
    width: 400px;
    height: 400px;
    border: 1px solid black;   
}
</style>