<template>
  <div id="Header">
    <el-row>
      <el-col :md="6" :sm="0" :xs="0">
        <!-- logo -->
        <div class="logo">
          <img src="@/assets/img/logo.jpg" alt width="60" height="60" />
          <h2>欢迎来到书城！</h2>
        </div>
      </el-col>
      <el-col :md="10" :sm="12" :xs="12">
        <!-- 头部导航 -->
        <div class="headNav">
          <div class="index nav" :class="nowPage=='index'?'active':''" @click="goIndex">首页</div>
          <!-- 搜索栏 -->
          <searchBox />
        </div>
      </el-col>
      <el-col :md="8" :sm="12" :xs="12">
        <!-- 右边操作栏 -->
        <div class="opeations">
          <div class="cart nav" @click="goCart()" ref="cart" :class="nowPage=='cart'?'active':''">
           <p>
             <el-badge :value="cartNum" :max="99" class="item">
            <i class="el-icon-shopping-cart-full" id="cartIcon"></i>
            购物车
               </el-badge>
               </p>
          </div>
       
          <div
            class="store nav"
            @click="goStore()"
            ref="store"
            :class="nowPage=='collection'?'active':''"
          >
            <i class="el-icon-star-on" id="storeIcon"></i>
            收藏
          </div>
          <customerInfo v-if="loginState" :parent="this" />
          <div class="login" @click="tologin()" v-else>登录/注册</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import customerInfo from "./customerInfo";
import searchBox from "./searchBox";
import { getList } from "../../js/api";
export default {
  name: "Header",
  data() {
    return {
      isIndex: true,
      loginState: "",
      nowPage: "",
     
    };
  },
  created() {
    // this.$router.go(0)
    var path1 = this.$route.name;
    this.nowPage = path1;
    if (this.$store.state.userMsg) {
      this.loginState = true;
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.token && this.$store.state.userMsg;
    },
    cartNum(){
      return this.$store.state.cartNum
    }
  },
  components: { customerInfo, searchBox },
  methods: {
    // 前往首页
    goIndex() {
      this.nowPage = "index";
      this.$router.push("/");
    },
    // 前往购物车
    goCart() {
      if (this.isLogin) {
        this.nowPage = "cart";
        this.$router.push("/cart");
      } else {
        this.$message.error("请先登录");
        this.$router.push({ name: "login" });
      }
    },
    // 前往购收藏
    goStore() {
      if (this.isLogin) {
        this.nowPage = "collection";
        this.$router.push("/collection");
      } else {
        this.$message.error("请先登录");
        this.$router.push({ name: "login" });
      }
    },
    // 登录/注册
    tologin() {
      this.$router.push({ name: "user" });
    }
  }
};
</script>
<style lang="less" scoped>
#Header {
  height: 80px;
  background: #fff;
  div{
    height: 100%;
    display: flex;

    align-items: center;
    justify-content: center;
  }
  .headNav {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    .index {
      height: 100%;
      padding: 0 30px;
      margin-right: 20px;
      font-size: 20px;
      font-weight: bold;
      color: #969696;
      cursor: pointer;
    }
  }

  .opeations {
    div {
      font-size: 18px;
      padding: 0 15px;
      color: #969696;
      font-weight: bold;
      cursor: pointer;
      i {
        margin-right: 3px;
      }
    }
    .login {
      height: 40px;
      border: 2px solid #ea6f5a;
      border-radius: 20px;
      margin-left: 10px;
    }
  }
  .logo {
    h2 {
      margin-left: 10px;
      font-weight: bold;
      color: #1890ff;
    }
  }
}
.active {
  color: #1890ff !important;
}
.nav{
  position: relative;
 
  p {
 height:50px ;
  div{
    padding: 0 !important
  }
  };
}
.nav:hover::after{
  position: absolute;
  height: 5px;
  background: #1890ff;
  
  bottom: 0;
  left: 0;
  content: '';
   width: 100%;
}

</style>
<style>

</style>
