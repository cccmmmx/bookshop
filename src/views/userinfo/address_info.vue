<template>
  <div>
  <el-button type="success" @click="addBtn('addressform')">新增地址 <i class="fa fa-plus" aria-hidden="true"></i></el-button>
  <!-- 收货地址编辑框 -->
  <div id="messagebox">
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
  <el-form :model="form" label-width="100px" :rules="rules" ref="addressform">
    <el-form-item label="收货人姓名" prop="realname">
      <el-input v-model="form.realname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="所在地区">
       <v-distpicker
          @province="onChangeProvince"
          @city="onChangeCity"
          @area="onChangeArea"
          :province="form.province"
          :area="form.area"
          :city="form.city"
        ></v-distpicker>
        <span ref="tip" class="tip"></span>
    </el-form-item>
     <el-form-item label="详细地址" prop="detail">
      <el-input v-model="form.detail" autocomplete="off" type="textarea"></el-input>
    </el-form-item>
     <el-form-item label="手机号码" prop="phone">
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmBtn">确 定</el-button>
  </div>
</el-dialog>
</div>
 <!-- layui表格显示地址栏 -->
    <table class="layui-hide" id="test" lay-filter="test"></table>
    <script type="text/html" id="barDemo">

  <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
  <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>
  </div>
</template>

<script>
import { getAddress,addAddress,editAddress,deleAddress,setDefault } from "../../js/api";
import VDistpicker from "v-distpicker"; //地区选择器组件
export default {
  name: "",
  data(){
   return{
     uppath:'',
       dialogFormVisible: false,
       state:'',   //0表示添加，1表示编辑
       form:{
         realname	:'',
         province	:'',
         city:'',
         area:'',
         detail	:'',
         phone:''
       },
        rules: {
          realname:{required: true, message: '请输入收货人姓名', trigger: 'blur'},
          phone:[{  pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"},
            {required: true, message: '请输入手机号码', trigger: 'blur'}],
            detail:{required: true, message: '请输入详细地址', trigger: 'blur'}
        }
   }
  },
  components:{VDistpicker},
  mounted() {
   this.showtable()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(from.path)
      if(from.path=='/orderDetails'){
         vm.uppath = from.path;
      }
    });
  },
  methods:{
    showtable(){
       let This=this
    layui.use("table", function() {
      var table = layui.table;
      table.render({
        elem: "#test",
        url: "http://120.25.232.119/Cms/getAddress",
        method: "get",
        headers: { token: JSON.parse(sessionStorage.getItem("vuex")).token },
        parseData: function(res) {
          // console.log(res.data);
          return {
            code: 0,
            data: res.data
          };
        },
        title: "用户数据表",
        cols: [
          [
            { field: "realname", title: "收货人", width: 80},
            {field:'location',title: '所在地区', width: 120,templet: function(res){
              return res.province+res.city+res.area
            }},
            { field: "detail", title: "详细地址", width: 220, edit: "text" },
            { field: "phone", title: "电话/手机", width: 150, edit: "text" },
            { fixed: "right", title: "操作", toolbar: "#barDemo", width: 120 },
            { fixed: "right", templet: function(res){
              if(res.isdefault=='1'){
                 return  '<a class="undefault" lay-event="setdefal">设为默认</a>'
              }else{
                 return  '<a class="layui-btn layui-btn-xs" >默认地址</a>'
              }
            },
              width: 100 }
          ]
        ]
      });
      //监听行工具事件
      table.on("tool(test)", function(obj) {
        var data = obj.data;
        // console.log(data)
        if (obj.event === "del") {
          if(data.isdefault=="2"){
              This.$message('该地址为默认地址，不可删除')
            }else{
 layer.confirm("真的删除行么", function(index) {

            deleAddress({id:data.id}).then(res=>{
              // console.log(res)
            })
            obj.del();
            layer.close(index);
          });
            }

        } else if (obj.event === "edit") {
           This.dialogFormVisible=true
           This.state=1
           This.form={
             id:data.id,
              realname:data.realname,
               province:data.province,
         city:data.city,
         area:data.area,
         detail	:data.detail,
         phone:data.phone
           }
        }else if(obj.event==="setdefal"){
          layer.confirm("确定设为默认地址?", function(index) {
             setDefault({id:data.id}).then(res=>{
            if(res.result=='success'){
              This.$message.success('设置成功')
              layer.close(index);
              This.showtable()
            }
          })
          });

        }
      });
    });
    },
    onChangeProvince(data) {
      this.form.province = data.value;
    },
    onChangeCity(data) {
      this.form.city = data.value;
    },
    onChangeArea(data) {
      this.form.area = data.value;
    },
    // 打开添加地址按钮
    addBtn(formName){
        this.dialogFormVisible=true
        this.state=0
         this.$nextTick(()=>{
                    this.$refs[formName].resetFields();
                    this.form.province=''
                    this.form.city=''
                    this.form.area=''
                })

    },
    // 添加或编辑收货地址
    confirmBtn(){
        this.$refs['addressform'].validate((valid) => {
          let {province,city,area}=this.form
          if(province&&city&&area){
            if(this.state==0){
               addAddress(this.form).then(res=>{
                 if(res.result=='success'){
          this.dialogFormVisible=false;
          if(this.uppath){
            this.$router.go(-1)
          }else{
     
           this.showtable()
          }
           this.$message.success('添加地址成功')
              }
    
        
        
         
      })
            }else{
              // this.form[id]=
              editAddress(this.form).then(res=>{
                 console.log(res)
        this.dialogFormVisible=false;
        this.$message.success('修改地址成功')
         this.showtable()
              })
            }

          }else{
             this.$refs.tip.innerHTML = "请选择所在地区";
          }
        })

    },

  }
};
</script>
<style lang="less" >
 .layui-table-cell{
   height:auto;
   overflow:visible;
  text-overflow:inherit;
 white-space:normal;

}
.undefault:hover{
  color: red;
  cursor: pointer;
}
.default{
  border: 1px solid #ff5000;
  border-radius: 3px;
  background: #ffd6cc;
    color: #f30;
    display: block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
}
.add{
  font-size: 16px;
  line-height: 16px;
}
#messagebox .el-input{
  width: 100%
}
#messagebox .el-textarea{
   width: 100%
}
.tip {
  display: inline-block;
  width: 180px;
  color: red;
  margin-left: 10px;
}
</style>
