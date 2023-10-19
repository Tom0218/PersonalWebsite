<script>

</script>


<template>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<div class="body">
    <div class="header">
        <div><img src="" alt="logo"></div>
        <a href="" class="homelink">首頁</a>
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle Build" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            建立
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
        </div>
        <div class="Search">
            <i class="fa-solid fa-magnifying-glass searchIcon"></i>
            <input type="text" class="searchBox">
        </div>
        <a href=#>通知</a>
        <a href=#>訊息</a>
    </div>
    <div class="Content"></div>

</div>
</template>


<style lang="scss" scoped>
    .body{
        height: 100vh;
        background-color: rgb(31, 31, 31);
    }
    p{
        color: white;
        font-size: 14pt;
        
    }
    img{
        color: white;
    }
    a{
        text-decoration: none;
        color: white;
        margin: 0 10px;
    }
    .header{
        display: flex;
        background-color: black;
        padding: 0 20px;
        align-items: center;
        .homelink{
            margin: 0 10px;
        }
        .Build{
            background-color: black;
            border: none;
        }
        .Search{
            display: flex;
            align-items: center;
            position: relative;
            .searchIcon{
                position: absolute;
                left:8px;
                

            }
            .searchBox{
                padding-left: 30px;
                border-radius: 20px;
            }

        }
    
    }
    .Content{
        
    }
</style>