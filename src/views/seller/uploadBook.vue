<template>
  <div class="container">
    <h3>商品上架</h3>
    <div class="main">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
  <el-col :span="12">  <el-form-item label="图书名称" id="bookname" >
          <el-input v-model="form.name" placeholder="图书名称" required></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            action="http://120.25.232.119/Cms/Upload"
              :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-change="onchange"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.image" :src="form.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="原价" >
          <el-input v-model="form.originalprice"></el-input>
        </el-form-item>
         <el-form-item label="折扣" >
          <el-input v-model="form.rate"></el-input>
        </el-form-item>
        <el-form-item label="折扣价" >
          <el-input v-model="form.discountprice"></el-input>
        </el-form-item>

        <el-form-item label="库存" >
          <el-input  v-model="form.stock"></el-input>
        </el-form-item>
         <el-form-item label="标签" >
          <el-input  v-model="form.booklabel"></el-input>
        </el-form-item>
         <el-form-item label="页码" >
          <el-input type="number" v-model="form.bookPages" placeholder="页码"></el-input>
        </el-form-item>
         <el-form-item label="出版社" id="bookPress">
     <el-input  v-model="form.bookPress" placeholder="出版社"></el-input>
        </el-form-item>
        </el-col>
  <el-col :span="12">
    <el-form-item label="类别" >
          <div class="form-group">
      <select class="form-control sel" @change="changeSel($event)" v-model="firstSel">
        <option value disabled selected>请选择一级级联</option>
        <option v-for="(item,i) in firstCategory" :key="i" :data-index='i' :value="item">{{item}}</option>
      </select>
      <select class="form-control sel" v-model="secondSel" @change="changeSels($event)">
        <option v-for="(item,index) in secondCategory" :key="index"  :selected="index==0?true:false" :value="item.id">{{item.text}}</option>
      </select>
          </div>
      </el-form-item>
       <el-form-item label="出版日期" id="publishDate" >
        <el-date-picker type="date" placeholder="选择日期" v-model="datetext" style="width: 100%;" @change="chdate"></el-date-picker>
        </el-form-item>
         <el-form-item label="版次" >
           <select class="form-control sel"  v-model="form.bookVersion">
        <option v-for="item in bookVersions" :value="item">{{item}}</option>
      </select>
        </el-form-item>
         <el-form-item label="作者" >
          <el-input  v-model="form.bookAuthor"></el-input>
        </el-form-item>
         <el-form-item label="图书译者" >
          <el-input  v-model="form.bookTanslor" placeholder="图书译者"></el-input>
        </el-form-item>
        <el-form-item label="图书ISBN" >
          <el-input  v-model="form.bookisbn" placeholder="图书ISBN"></el-input>
        </el-form-item>
         <el-form-item label="目录" >
          <el-input  type="textarea" v-model="form.bookCatalog" placeholder="目录" :autosize="{ minRows: 5, maxRows: 7}"></el-input>
        </el-form-item>
         <el-form-item label="图书简介" >
          <el-input  type="textarea" v-model="form.bookOutline" placeholder="图书简介" :autosize="{ minRows: 5, maxRows: 7}"></el-input>
        </el-form-item>
        </el-col>
  </el-col>
</el-row>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">上传</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'
import {getCategoryAll,getCategory,uploadBook} from '../../js/api'
import qs from 'qs'
export default {
  name: "",
  data() {
    return {
      form: {
        name: "",     //图书名称
        image: "",  //图片地址
        originalprice: "",    //原价
        rate:"",      //折扣
        discountprice:"",   //折扣价
        stock:'',      //库存
        booklabel:'',      //标签
        bookPages:'',    //页码
        bookPress:'',    //出版社
        categoryDate:'',
        bookPubDates:'',     //出版日期
        bookVersion:'第一版',   //版次
        bookAuthor:'',    //作者
        bookTanslor:'',   //译者
        bookisbn:'',    //isbn
        bookCatalog:'',   //图书目录
        bookOutline:''   //图书简介
      },
      datetext:'',
      firstCategory:['文学','流行','文化','生活','经管','科技'],
      bookVersions:['第一版','第二版','第三版'] ,
      secondCategory:[],
      CategoryAll:[],
       firstSel:'',
        secondSel:'',
    };
  },
  created(){
      getCategoryAll().then(res=>{
         this.CategoryAll=res.data
     })
  },
  computed:{

  },
  methods: {
    chdate(){
this.form.bookPubDates= this.getdate(this.datetext)
    },
     handleAvatarSuccess(res, file) {
      this.form.image = res.data.url;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    //当上传图片后，调用onchange方法，获取图片本地路径
    onchange(file, fileList) {

    },
   //上传图书

    onSubmit() {
    //  axios.post('/Cms/uploadGoods',this.form,{headers:{

    //  }}).then()
      uploadBook(this.form).then(res=>{
          if(res.result=="success"){
              this.$message.success('上传成功');
              this.$router.push("/seller/bookMessage");
          }
        console.log(res)
      })
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //当上传图片后，调用onchange方法，获取图片本地路径
    onchange(file, fileList) {

    },
    // 级联下拉框
    changeSel(e){
      var index=e.target.selectedIndex-1
      console.log(index)
      // this.secondeSel=this.CategoryAll.filter(item=> item.parent==index)
      getCategory(index).then(res=>{
        this.secondCategory=res.data
      })
    },
    changeSels(e){
    this.form.categoryDate=e.target.value
    },
    getdate(date){
        var d=new Date(date);
        console.log(d)
          var year=  d.getFullYear()
          var month=d.getMonth()+1<10?'0'+(d.getMonth()+1):d.getMonth()+1
          var day=d.getDate()<10?'0'+d.getDate():d.getDate()
          return year+'-'+month+'-'+day
    }
  }
};
</script>
<style lang="less" scoped>
.main {

 #category{

  width: 100%

 }

}
.sel{
  width: 35%;
  height: 40px;
}
select{
  display:inline-block;
}
#publishDate{
  width:50%
}
</style>
<style>
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
  width: 178px;
  height: 178px;
  display: block;
}


</style>
