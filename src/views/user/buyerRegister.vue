<template>
  <div id="register">
    <el-form ref="form" :model="form" label-width="90px" :rules="rules">
      <el-form-item label="用户名" prop="realname">
        <el-input v-model="form.realname"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password"  v-model="form.checkPass" show-password></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">注册</el-button>
        <el-button @click="fanhui()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { customerReg } from "../../js/api";
export default {
  name: "",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        realname: "",
        username: "",
        password: "",
        checkPass: "",
        phone: "",
        email: ""
      },
      rules: {
        realname: { required: true, message: "请输入用户名", trigger: "blur" },
        username: { required: true, message: "请输入账号", trigger: "blur" },
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          customerReg(this.form)
            .then(res => {
              if (res.result == "success") {
                this.$message.success(res.message);
                this.$router.push({ name: "login" });
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    // 返回上一级
    fanhui() {
      this.$parent.isShow = true;
      this.$parent.buyerCpm = false;
    }
  }
};
</script>
<style lang="less" >
#register {
  margin-top: 20px;
  padding: 0 20px;
  .el-input {
    margin-bottom: 10px;
  }
  .el-input__inner {
    height: 40px;
  }
}
</style>
<style>
.el-form-item {
  margin-bottom: 10px;
}
.el-form-item__error {
  top: 80%;
}
</style>