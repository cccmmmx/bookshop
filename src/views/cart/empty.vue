<template>
  <div class="emptyBox">
      <img src="@/assets/img/empty.jpg" alt="">
      <h3>您的购物车空空如也,赶紧行动吧!</h3>
      <div class="btns">
         <el-button type="primary" round @click="goindex">返回首页</el-button>
         <el-button type="success" round @click="gostore">我的收藏夹</el-button>
      </div>
      
  </div>
</template>
<script>
  export default {
    name: '',
    methods:{
        goindex(){
            this.$router.push({name:'index'})
        },
        gostore(){
             this.$router.push({name:'collection'})
        }
    }
  }
</script>
<style lang="less" scoped>
.emptyBox{
   height: 400px;
   background: #fff;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   .btns{
       margin-top: 20px;
   }
}
</style>