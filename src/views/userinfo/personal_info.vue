<template>
  <div>
    <h3>亲爱的{{name}},请填写真实的资料哦！</h3>
    <div class="main-profile">
      <p>
        <span class="avatar">头像</span>
        <el-upload
          class="avatar-uploader"
          action="http://120.25.232.119/Cms/Upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-change="onchange"
          :before-upload="beforeAvatarUpload"
        >
          <el-tooltip
            class="item"
            effect="dark"
            content="点击更换头像"
            placement="right"
            :open-delay="200"
          >
            <img :src="imageUrl" class="avatar" />
          </el-tooltip>
        </el-upload>
      </p>
      <p>
        <span>真实姓名</span>
        <input type="text" v-model="userMsg.realname" />
      </p>
      <p>
        <span>手机号码</span>
        <input type="text" v-model="userMsg.phone" />
        <span ref="phoneTip" class="tip"></span>
      </p>
      <p>
        <span>电子邮箱</span>
        <input type="text" v-model="userMsg.email" />
        <span ref="emailTip" class="tip"></span>
      </p>
      <p>
        <span>* 性别</span>
        <label for="male">
          <input type="radio" id="male" v-model="userMsg.gender" value="1" />男
        </label>
        <label for="female">
          <input type="radio" id="female" v-model="userMsg.gender" value="0" />女
        </label>
      </p>
      <p>
        <span>居住地</span>
        <v-distpicker
          @province="onChangeProvince"
          @city="onChangeCity"
          @area="onChangeArea"
          :province="province"
          :area="area"
          :city="city"
        ></v-distpicker>
      </p>
      <hr />
      <!-- 保存按钮 -->
      <div class="saveBtn">
        <el-button type="success" @click="saveMsg">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import VDistpicker from "v-distpicker"; //地区选择器组件
import { Form } from "element-ui";
import { updateMsg, getUserMsg } from "../../js/api";
export default {
  name: "",
  data() {
    return {
      show: false,
      name: "用户",
      province: "",
      city: "",
      area: "",
      imageUrl: ""
    };
  },
  created() {
    this.imageUrl = this.$store.state.userMsg.image;
    if(this.$store.state.userMsg.address){
        this.province = this.$store.state.userMsg.address.split("-")[0];
    this.city = this.$store.state.userMsg.address.split("-")[1];
    this.area = this.$store.state.userMsg.address.split("-")[2];
    }

  },
  computed: {
    userMsg() {
      return this.$store.state.userMsg;
    }
    // ...mapState(['userMsg'])
  },
  components: { VDistpicker },
  methods: {
    onChangeProvince(data) {
      this.province = data.value;
    },
    onChangeCity(data) {
      this.city = data.value;
    },
    onChangeArea(data) {
      this.area = data.value;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data.url;
    },
    beforeAvatarUpload(file) {

      const isLt2M = file.size / 1024 / 1024 < 2;


      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    //当上传图片后，调用onchange方法，获取图片本地路径
    onchange(file, fileList) {

    },

    //  保存信息
    saveMsg() {
      if (!/^1[34578]\d{9}$/.test(this.userMsg.phone)) {
        this.$refs.phoneTip.innerHTML = "请输入合法的手机号码";
      } else if (
        !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
          this.userMsg.email
        )
      ) {
        this.$refs.phoneTip.innerHTML = "";
        this.$refs.emailTip.innerHTML = "请输入合法的邮箱地址";
      } else {
        this.$refs.emailTip.innerHTML = "";
        this.$refs.phoneTip.innerHTML = "";
        let obj = {
          image: this.imageUrl,
          realname: this.userMsg.realname,
          phone: this.userMsg.phone,
          email: this.userMsg.email,
          gender: this.userMsg.gender,
          address: this.province + "-" + this.city + "-" + this.area
        };
        console.log(obj);
        updateMsg(obj).then(res => {
          console.log(res);
          if (res.result == "success") {
            this.$message.success('修改成功')
            getUserMsg().then(res => {
              console.log(res);
              // this.province = res.user.address.split("-")[0];
              // this.city = res.user.address.split("-")[1];
              // this.area = res.user.address.split("-")[2];
              this.$store.commit("isLogin", res.user);
            });
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.main-profile {
  margin-top: 20px;
  width: 600px;
}
p {
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  position: relative;
  .edit {
    position: absolute;
    bottom: 0;
    left: 180px;
  }
}
span {
  width: 90px;
  display: inline-block;
  line-height: 34px;
}
input[type="text"] {
  border-radius: 5px;
  height: 30px;
  width: 250px;
  padding-left: 10px;
}
label {
  margin-right: 20px;
}
.saveBtn {
  text-align: center;
  margin-top: 20px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50%;
}
.tip {
  display: inline-block;
  width: 180px;
  color: red;
  margin-left: 10px;
}
</style>
