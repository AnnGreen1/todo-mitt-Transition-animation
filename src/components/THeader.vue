<template>
    <div class="container">
        <span class="title">任务</span>
        <span class="operation" @click="showOperation = !showOperation">
            <span class="operation-icon"></span>
        </span>
    </div>
    <DropDownMenu class="dropdown" 
    :isvisual="showOperation"
    @close="showOperation=false"
    ></DropDownMenu>
</template>

<script>
import DropDownMenu from './DropDownMenu.vue'
export default {
    name:'THeader',
    components:{
        DropDownMenu
    },
    data(){
        return{
            showOperation:false
        }
    },
    methods:
    {
        // operation(){
        //     console.log('操作被点击了')
        // }
    },
};
</script>

<style lang="scss" scoped>
    .container {
        padding: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .title{
            font: {
                size: 40px;
                weight: 600;
            }
            user-select: none;
        }
        .operation{
        width:12%;
        height:34px;
        border-radius: 3px;
        background: rgba(0,0,0,0.589);
        display: flex;
        justify-content: center;
        align-content: center;
        &:hover{
            cursor:pointer;
        }
        // 设计右侧操作中三个点
        .operation-icon {
            position: relative;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color:#ffffff;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            &::before,
            &::after{
                content: "";
                position: absolute;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background-color:#ffffff;
            }
            &::before{
                left:-8px;
            }
            &::after{
                left:8px;
            }
        }
        }
    }
    .dropdown{
        position: absolute;
        z-index:100;
        margin-top:70px;
        margin-left:330px;
    }
</style>