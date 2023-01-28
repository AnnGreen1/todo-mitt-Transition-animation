<template>
    <div class="container" v-if="isvisual">
        <div class="dropdown">
            <div class="dropdown-item" @click="showAllOnclick">显示全部</div>
            <div class="dropdown-item" @click="showCompleteOnclick">显示已完成</div>
            <div class="dropdown-item" @click="hideCompleteOnclick">隐藏已完成</div>
            <div class="dropdown-item" @click="changeBgImgOnclick">更换随机背景</div>
        </div>    
    </div>        
</template>

<script>
export default {
    name:"DropDownMenu",
    props:{
        isvisual:Boolean
    },
    methods:{
        showAllOnclick(){
            this.$emit('close')
            this.$bus.$emit('showAllItems')
        },
        showCompleteOnclick(){
            this.$emit('close')
            this.$bus.$emit('showCompleteItems')
        },
        hideCompleteOnclick(){
            this.$emit('close')
            this.$bus.$emit('hideCompleteItems')
        },
        changeBgImgOnclick(){
            this.$emit('close')
            this.$bus.$emit('changeBg')
        },
    },
}
</script>

<style lang="scss" scoped>
$color:rgba(0,0,0,0.608);
    .container{
        box-shadow: 5px 5px 10px 1px gainsboro;
        border-radius: 5px;
        background-color: #fff;
        .dropdown{
            display: flex;
            flex-direction: column;
            align-content: center;
            .dropdown-item{
                padding: 0px 10px;
                line-height: 35px;
                height:35px;
                text-align: center;
                color:$color;
                user-select: none;
                &:hover{
                    cursor:pointer;
                    background: #62a2e9;
                    color:#fff
                }
                &:active{
                    background: #fff;
                    color:$color;
                }
            }
        }
    }
</style>