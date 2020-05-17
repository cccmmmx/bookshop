<template>
  <div class="userBox">
    <el-popover placement="bottom-start" width="200" trigger="hover">
      <div class="user-popover">
        <div class="top">
          <img :src="userMsg.image" width="50" height="50" style="border-radius:50%" />
          <span class="username">{{userMsg.realname}}</span>
        </div>
        <div class="bottom">
          <p  @click="handle()">账号管理</p>
          <p @click="toMyOrder()">我的订单</p>
        </div>
        <hr />
        <div class="logout" @click="logout()">退出登录</div>
      </div>
      <template slot="reference">
        <img
          :src="userMsg.image"
          alt
          width="70"
          height="70"
          style="border-radius:50%;vertical-align:middle"
          class="avatar"
        />
        <span class="name">{{userMsg.realname}}</span>
      </template>
    </el-popover>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "",
  props: ["parent"],
  computed: {
    ...mapState(["userMsg"])
  },
  methods: {
    handle() {
      console.log(this.parent.nowPage);
      this.parent.nowPage = "";
      this.$router.push("/userinfo");
    },
    // 我的订单
    toMyOrder(){
    this.$router.push('/myOrder')
    },
    // 退出登陆
    logout() {
      this.parent.loginState = false;
      this.$store.commit("setToken", "");
      this.$store.commit("isLogin", "");
      this.$store.commit('setCart',[])
      sessionStorage.removeItem("vuex");
      this.$message('注销成功')
      this.parent.nowPage = "index";
      // if (this.$route.meta.requireAuth) {
        this.$router.push('/');
      // }
    }
  }
};
</script>
<style lang="less" scoped>
.top {
  display: flex;
  align-items: center;
  .username {
    font-size: 18px;
    display: inline-block;
    margin-left: 10px;
  }
}

.bottom {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  p {
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    color: #999;
    cursor: pointer;
  }
  p:hover {
    color: #1890ff;
  }
}
.logout {
  display: block;
  height: 40px;
  line-height: 50px;
  font-size: 20px;
  color: #000;
  text-align: center;
  cursor: pointer;
}
.logout:hover {
  color: #1890ff;
}
.avatar {
  margin-right: 10px;
}
.name {
  display: inline-block;
  font-size: 20px;
  color: cadetblue;
}
</style>
