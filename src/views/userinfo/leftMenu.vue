<template>
   <el-col :span="4">
    <el-menu
      :default-active="index"
      class="el-menu-vertical-demo"
      text-color="#000"
      active-text-color="#ffd04b" >
      <el-menu-item index="1"  @click="goinfo()">
        <i class="el-icon-menu"></i>
        <span slot="title">个人资料</span>
      </el-menu-item>
      <el-menu-item index="2" @click="goaddress()">
        <i class="el-icon-setting"></i>
        <span slot="title">地址管理</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  
</template>
<script>
  export default {
    name: '',
    daya(){
      return{
        index:''
      }
    },
    created(){
      this.index= this.$route.name=='personal_info'?'1':'2'
    },
    methods:{
        goinfo(){
            this.$router.push('/userinfo')
        },
        goaddress(){
             this.$router.push('/userinfo/address')
        }
    }
  }
</script>
<style lang="less" scoped>

</style>
<style>
  .el-menu{
   height: 600px;
  }
</style>