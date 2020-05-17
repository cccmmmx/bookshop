<template>
  <div class="login">
    <!-- <canvas id="canvas" ></canvas>  -->
    <div class="bg">
      <img src="@/assets/img/login.jpg" alt width="100%" height="100%" />
    </div>
    <div class="login_box animated bounceInDown">
      <div style="height:80px;width:100%;display:flex;align-items:center;">
        <router-link to="/" style="display:inline-block;height:80px">
          <img src="@/assets/img/logo.jpg" alt width="80" height="80" />
        </router-link>
        <h1 style="margin:0 auto">欢迎来到书城！</h1>
      </div>
      <div class="login_content">
        <div class="title">
          <router-link :to="{name:'login'}">登录</router-link>
          <router-link :to="{name:'register'}">注册</router-link>
        </div>
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import canva from './bgc'
export default {
  name: "Login",
  mounted() {
    //  canva()
  },
  
  // watch: {
  //   $route(to, from) {
  //     console.log(from);
  //   },
  //   deep: true
  // }
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  top:0;
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .login_box {
    position: relative;
    z-index: 100;
    width: 400px;
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
    padding: 5px;
    border: 2px solid #1890ff;
    .login_content {
      margin: 0 auto;
      width: 400px;
      .title {
        height: 40px;
        padding: 0 80px;
        display: flex;
        justify-content: space-around;
        a {
          color: #999;
          font-size: 22px;
        }
        a:hover {
          color: #1890ff;
        }
        .router-link-active {
          color: #1890ff;
          border-bottom: 2px solid #1890ff;
        }
      }
    }
  }
}
</style>