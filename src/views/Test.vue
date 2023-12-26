<script>
import { ref } from 'vue';
import { ElForm, ElFormItem } from 'element-plus';
import { ElButton } from 'element-plus';
export default{
    
    data(){
        return{
              //綁定新增餐廳的變數
            nameRest: "testRestautantName",
            descRest: "testRestautantDesc",
            regionRest: "testRestautantregion",
            date1Rest:new Date(),      //startDate
            date2Rest: new Date(),      //endDate
            publishedRest: false,
            photoSRest: "",     // S是String，Base64[]
        
        }
    },
    components: {
        ElForm,
        ElFormItem,
        ElButton,
    // 其他组件
    },

    methods:{
        onSubmitRestaurant() {
            //確定有沒有填資料
            // if (this.nameRest == "" || this.descRest == "" || this.regionRest == "" || this.date1Rest == "" || this.date2Rest == "" || this.photoSRest == "") {
            //     this.showBlockFail();
            //     return
            // }

            //判斷你是不是超級管理員
            // if (this.loginInfo.adminuser.account != "superadmin") {
            //     //確定你有沒有權利
            //     if (this.loginInfo.adminuser.managePlace != this.region || this.loginInfo.adminuser.manageNum < 20) {
            //         this.showAuthorizeFail();
            //         return
            //     }
            // }

            var url = "http://localhost:8080/api/park/createRest";
            var data = {
                    "name": this.nameRest,
                    "description": this.descRest,
                    "region": this.regionRest,
                    "published": this.publishedRest,
                    "photoBase64": this.photoS,
                    "photo": null,
                    "startDate": this.date1Rest,      //startDate
                    "endDate":  this.date2Rest,
            };

            console.log(data)

            fetch(url, {
                method: "POST", // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            })
                .then((res) => res.json())
                .catch((error) => console.error("Error:", error))
                .then((response) => console.log("Success:", response));

            //成功視窗並清空欄位
            // this.showBlockSucess()
            this.nameRest = '';
            this.descRest = '';
            this.regionRest = '';
            this.date1Rest = '';
            this.date2Rest = '';
            this.publishedRest = false,
                this.photoSRest = '';
            this.$refs.preview.src = '';

        },
        goAddRestaurant() {
            this.nameRest = ""
            this.descRest = ""
            this.regionRest = ""
            this.date1Rest = ""
            this.date2Rest = ""
            this.publishedRest = false

            //設定照片
            const img = document.getElementById('addRestImg')
            img.src = ""

            this.changePageNum = 8
        },
        goEditRestaurant(index) {
            this.nameRest = this.allRestaurant[index].name
            this.descRest = this.allRestaurant[index].description
            this.regionRest = this.allRestaurant[index].place
            this.date1Rest = this.allRestaurant[index].startDate
            this.date2Rest = this.allRestaurant[index].endDate
            this.publishedRest = this.allRestaurant[index].published
            this.photoSRest = this.allRestaurant[index].photo;
            //設定照片
            const img = document.getElementById('edditimgShow')
            img.src = this.allRestaurant[index].photo;
            img.style.display = 'block';    // 顯示圖片

            //設定舊姓名
            this.editOldNameRest = this.allRestaurant[index].name

            //頁面跳轉
            this.changePageNum = 9
            this.openFullScreen2()
        },
        handleFileRestChange(event) {
            // 獲取文件資料
            //flie变量设置为用户选择的第一个文件
            const file = event.target.files[0];
            console.log(file)

            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    // 將讀取到的照片賦予值給預覽img的src
                    //在FileReader对象的上下文中，e.target.result 是一个包含文件读取结果的属性。对于readAsDataURL方法，这个属性包含一个 Data URL 字符串，其中包括文件的 base64 编码表示。
                    //将 FileReader 读取到的文件内容（Data URL 字符串）赋值给一个 Vue 组件中通过 ref 标记的预览图片元素的 src 属性
                    //ref="preview"
                    //e：这是一个事件对象，其中包含有关事件的信息。在这个上下文中，这是FileReader的load事件对象。
                    //e.target：这是触发事件的对象，即FileReader。
                    //e.target.result：这是一个属性，它包含了FileReader读取文件后的结果。对于readAsDataURL，这个属性包含文件的 Data URL。
                    this.$refs.preview.src = e.target.result;
                    // 顯示預覽img
                    this.$refs.preview.style.display = 'block';
                    this.photoS = e.target.result
                    console.log(this.photoS)
                    // const img = document.getElementById('edditimgRestShow')
                    // img.src = e.target.result
                    // console.log(e.target.result)
                    // console.log(typeof e.target.result) //String
                };
                // 讀取文件內容
                //reader: 这是你之前创建的 FileReader 对象，用于读取文件内容。
                //readAsDataURL(file): 这是 FileReader 对象的方法，它会读取指定的文件，然后在文件读取完成后触发 onload 事件。在这里，file 是你通过文件输入框获得的用户选择的文件对象。
                reader.readAsDataURL(file);
            }
        },
         //新增設施---提交並傳送到後端
        onSubmit() {
            //確定有沒有填資料
            if (this.name == "" || this.desc == "" || this.region == "" || this.age == "" || this.date1 == "" || this.date2 == "" || this.photoS == "") {
                this.showBlockFail();
                return
            }

            //判斷你是不是超級管理員
            // if (this.loginInfo.adminuser.account != "superadmin") {
            //     //確定你有沒有權利
            //     if (this.loginInfo.adminuser.managePlace != this.region || this.loginInfo.adminuser.manageNum < 20) {
            //         this.showAuthorizeFail();
            //         return
            //     }
            // }
        }
    }
}
</script>
<template>

    <div class="body">
        <el-form-item label="選擇照片">
            <div class="photoPlace">
                <label for="fileRest-upload" class="custom-file-upload">選擇照片</label>
                <input id="fileRest-upload" type="file" @change="handleFileRestChange">
                <img id="addRestImg" src="" ref="preview"
                    style="display: none; max-width: 200px; max-height: 200px;">
            </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmitRestaurant">Create</el-button>
        </el-form-item>
    </div>

</template>
<style lang="scss" scoped>
.body{
    height: 90vh;
    width: 100vw;
    background-color: green;
}
</style>