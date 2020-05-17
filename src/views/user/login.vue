<template>
  <div id="login">
    <el-button :type="nav==1?'success':''" @click="boo(1)">会员</el-button>
    <el-button :type="nav==2?'success':''" @click="boo(2)">商家</el-button>
    <el-form :model="userMsg" status-icon :rules="rules" ref="ruleForm" class="form">
      <el-form-item prop="username">
        <el-input placeholder="账号" v-model="userMsg.username">
          <template slot="prepend">
            <i class="el-icon-s-custom" style="font-size:25px"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" class="pass">
        <el-input placeholder="密码" type="password" v-model="userMsg.password">
          <template slot="prepend">
            <i class="el-icon-lock" style="font-size:25px"></i>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="tip">
      还没有账户？去
      <router-link :to="{name:'register'}">注册</router-link>
    </div>
    <button class="loginBtn" @click="goIndex('ruleForm')">登录</button>
  </div>
</template>
<script>
import { get } from "../../js/http";
export default {
  name: "",
  data() {
    return {
      nav: 1,
      uppath: "",
      pageArray: "",
      userMsg: {
        username: "",
        password: ""
      },
      rules: {
        username: {
          required: true,
          message: "请输入账号",
          trigger: "blur"
        },
        password: { required: true, message: "请输入密码", trigger: "blur" }
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.uppath = from.path;
    });
  },
  methods: {
    goIndex(val) {
      this.$refs[val].validate(valid => {
        if (valid) {
          if (this.nav == 1) {
            get("/customer/logins", {
              params: {
                username: this.userMsg.username,
                password: this.userMsg.password
              }
            }).then(res => {
              if (res.result == "success") {
                    this.pageArray = res.data;
                this.$message.success("登录成功");
                this.$store.commit("setToken", this.pageArray.token);
                this.$store.commit("isLogin", this.pageArray.user);
                this.$store.commit("isUser", 1);
                 this.$store.dispatch('getCartList')
                // if(this.uppath=="seller"||this.uppath=="register"){
                //   this.$router.go(-1)
                // }else {
                //   this.$router.push("/")
                // }
                // console.log(this.uppath)
                // console.log(this.uppath.indexOf("seller") == -1||this.uppath=='/user/register')
                if (this.uppath.indexOf("seller") == -1&&this.uppath!='/user/register') {
                  this.$router.go(-1);
                } else {
                  this.$router.push("/");
                }
              } else {
                this.$message.error(res.message);
              }
            });
          } else {
            get("/seller/sellerlogins", {
              params: {
                username: this.userMsg.username,
                password: this.userMsg.password
              }
            }).then(res => {
              if (res.result == "success") {
                this.pageArray = res.data;
                this.$message.success("登录成功");
                this.$store.commit("setToken", this.pageArray.token);
                this.$store.commit("sellMsg", this.pageArray.user);
                this.$store.commit("isUser", 2);
                this.$router.push("/seller");
              } else {
                this.$message.error(res.message);
              }
            });
          }

        }
      });

    },
    boo(i) {
      this.nav = i;
    }
  }
};
</script>
<style lang="less" >
.form {
  margin-top: 20px;
}
#login {
  margin-top: 20px;
  padding: 0 30px;
  .el-input {
    margin-bottom: 20px;
  }
  .el-input__inner {
    height: 50px;
  }
  .pass {
    margin-bottom: 0;
  }
  .tip {
    text-align: right;
    margin-bottom: 10px;
    a {
      color: #1890ff;
    }
  }
  .loginBtn {
    width: 100%;
    height: 50px;
    background: #1ac78f;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 20px;
  }
}
</style>



