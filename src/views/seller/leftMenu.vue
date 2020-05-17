<template>
    <el-col :span="4">
    <el-menu
     background-color="#545c64"
      default-active="1"
      class="el-menu-vertical-demo"
      text-color="#fff"
      active-text-color="#1890ff"
     >
     <el-menu-item v-for="(item,i) in list" :key="item.index" :class="{active:i+1==current?'true':''}" @click="handlethis(item)">
           <i :class="item.icon" aria-hidden="true" style="color:#fff;margin-right:5px"></i>
           <span slot="title">{{item.title}}</span>
     </el-menu-item>
    </el-menu>
  </el-col>

</template>
<script>
  export default {
    name: '',
    data(){
        return{
            list:[
                {title:'商品信息',icon:'fa fa-book',index:1,href:'bookMessage'},
                {title:'商品上架',icon:'fa fa-upload',index:2,href:'uploadBook'},
                {title:'订单管理',icon:'fa fa-first-order',index:3,href:'orderManage'},
                {title:'个人信息',icon:'fa  fa-user',index:4,href:'sellMsg'}
            ],
            current:this.$route.meta.i
        }
    },
      watch:{
          $route(to,from){
              this.current=to.meta.i
          }},
    methods:{
        handlethis(item){
            this.current=item.index;
            this.$router.push({name:item.href})
        }
    }
  }
</script>
<style lang="less" scoped>

</style>
<style>
    .el-menu{
        height:calc(100vh - 70px)
    }
   .el-menu-item{
        font-size: 18px;
        text-align: center;
        position: relative;
    }
   .el-menu-item.active{
   background: #1890ff !important
 }
 .el-menu-item:hover{
     background: rgb(67,74,80)!important
 }
 .el-menu-item:hover::after{
     content: '';
     position: absolute;
     width: 5px;
     top: 0;
     left: 0;
     height: 100%;
     background: #1890ff
 }
</style>
