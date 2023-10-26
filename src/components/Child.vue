<script>
export default{
    props:[
        "person"
    ],
    methods:{
        Back(){
            let x = 0
            this.$emit('PageControl',x)
        }
    }
}
</script>

<template>
<div class="d-flex">
<pre>
<code>
&lt;script>
import  Child  from "../components/Child.vue"; //導入子層
export default{
-----------------------|
        props:[        |
            "person"   |    接收變數person
        ],             |
-----------------------|
}
&lt;/script>   
&lt;template>
&lt;div class="textshow">
    &lt;p>您的名子是{ { this.person.Name } }&lt;/p>
    &lt;p>您的電話是{ { this.person.Phone } }&lt;/p>
    &lt;p>您的信箱是{ { this.person.Eamil } }&lt;/p>
    &lt;p>您的地址是{ { this.person.Address } }&lt;/p>
    &lt;p>您的畢業學校是{ { this.person.GraduatedSchool } }&lt;/p>
    &lt;p>您的性別是{ { this.person.sex } }&lt;/p>
    &lt;p>您的興趣是{ { this.person.Interest } }&lt;/p>
&lt;div>
&lt;/template>
</code>
</pre>
        <div class="textshow">
            <p>您的名子是{{ this.person.Name }}</p>
            <p>您的電話是{{ this.person.Phone }}</p>
            <p>您的信箱是{{ this.person.Eamil }}</p>
            <p>您的地址是{{ this.person.Address }}</p>
            <p>您的畢業學校是{{ this.person.GraduatedSchool }}</p>
            <p>您的性別是{{ this.person.sex }}</p>
            <p>您的興趣是{{ this.person.Interest }}</p>
            <div>
                <button type="button" @click="Back()">Back</button>
            </div>
        </div>
</div>
</template>

<style lang="scss" scoped>
.textshow{
    width: 400px;
    height: 400px;
    margin-left: 10px;
    padding: 0 5%;
}
pre{
    background-color: whitesmoke;
}
p{
    font-weight: bold;
}
</style>