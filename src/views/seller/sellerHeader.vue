<template>
  <div class="header">
    <div class="title">
      <img src="@/assets/img/logo.jpg" alt width="60" height="60" />
      <p>欢迎来到商家管理界面</p>
    </div>
    <div class="right">
      <div  @click="toShop()">返回商城</div>
      <div >
        <img :src="sellMsg.logo" alt="" class="avatar">
        <span>{{sellMsg.realname}}</span>
      </div>
      <div  class="logout" @click="logout()">
        注销
        <i class="fa fa-sign-out" aria-hidden="true"></i>
        </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "",
  computed:{
    ...mapState(['sellMsg'])
  },
  methods: {
    toShop() {
      let routeData = this.$router.resolve("/");
window.open(routeData.href, '_blank');
      // this.$router.push("/");
    },
    logout() {
       this.$router.push("/user/login");
       this.$store.commit('sellMsg','')
       this.$store.commit('setToken','')
        sessionStorage.removeItem("vuex");
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  height: 80px;
  background: slategrey;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    margin-left: 50px;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
      font-size: 24px;
      height: 100%;
      line-height: 80px;
      color: #fff;
      margin-left: 20px;
    }
  }
  .right {
    display: flex;
    justify-content: space-around;
    height: 100%;
    margin-right: 20px;
    div {
      color: #fff;
      text-decoration: none;
      height: 100%;
      line-height: 80px;
      position: relative;
      padding: 0 20px;
      font-size: 18px;
    }
    
    div:hover:after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 5px;
      width: 100%;
      background: #5FB878;
    }
     .avatar{
       width: 60px;
       height: 60px;
       border-radius: 50%;
       vertical-align: middle;
       margin-right: 10px;
     }
     .logout{
       background: #ed370a
     }
  }
}
</style>