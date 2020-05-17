<template>
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
        <el-tooltip class="item" effect="dark" content="点击更换头像" placement="right" :open-delay="200">
          <img :src="logo" class="avatar" />
        </el-tooltip>
      </el-upload>
    </p>
    <p>
      <span>真实姓名</span>
      <input type="text" v-model="sellMsg.realname" />
    </p>
    <p>
      <span>手机号码</span>
      <input type="text" v-model="sellMsg.phone" />
      <span ref="phoneTip" class="tip"></span>
    </p>
    <p>
      <span>电子邮箱</span>
      <input type="text" v-model="sellMsg.email" />
      <span ref="emailTip" class="tip"></span>
    </p>
    <p>
      <span>邮编</span>
      <input type="text" v-model="sellMsg.postcode" />
    </p>
    <p>
      <span>地址</span>
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
</template>
<script>
import VDistpicker from "v-distpicker"; //地区选择器组件
import {updateSellerMsg,getSellMsg} from '../../js/api'
export default {
  name: "",
  data() {
    return {
      province: "",
      city: "",
      area: "",
      logo: this.$store.state.sellMsg.logo
    };
  },
  components: { VDistpicker },
  created() {
    this.province = this.$store.state.sellMsg.address.split("-")[0];
    this.city = this.$store.state.sellMsg.address.split("-")[1];
    this.area = this.$store.state.sellMsg.address.split("-")[2];
  },
  computed: {
    sellMsg() {
      var message=this.$store.state.sellMsg
      return message;
    }
  },
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
      this.logo = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
     onchange(file, fileList) {},
    saveMsg() {
         if (!/^1[34578]\d{9}$/.test(this.sellMsg.phone)) {
        this.$refs.phoneTip.innerHTML = "请输入合法的手机号码";
      } else if (
        !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
          this.sellMsg.email
        )
      ) {
        this.$refs.phoneTip.innerHTML = "";
        this.$refs.emailTip.innerHTML = "请输入合法的邮箱地址";
      } else {
        this.$refs.emailTip.innerHTML = "";
        this.$refs.phoneTip.innerHTML = "";
        let obj = {
          logo: this.logo,
          realname: this.sellMsg.realname,
          phone: this.sellMsg.phone,
          email: this.sellMsg.email,
          postcode:this.sellMsg.realname,
          address: this.province + "-" + this.city + "-" + this.area
        };
        updateSellerMsg(obj).then(res => {
          if (res.result == "success") {
            getSellMsg().then(res => {
              console.log(res);
              this.$store.commit("sellMsg", res.user);
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
