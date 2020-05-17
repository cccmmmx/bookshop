<template>
  <div>
      <h3 style="font-size:24px;font-weight:bold">商品信息</h3>
      <div class="tabs">
          <div v-for="(item,index) in tags" :key="index" @click="selTag(index)" :class="grade==index?'active':''">
              {{item}}
          </div>
      </div>
      <div class="messageBox" >
        <div class="bookitem" v-for="(item,i) in list" :key="i">
          <div class="image">
            <img :src="item.image" alt="">
          </div>
          <div class="info">
            <span class="bookname limit">{{item.name}}</span>
            <span class="author limit">作者:{{item.bookAuthor}}</span>
            <span class="price">
              价格:<i style="color:#f40;font-size:24px;margin-right:10px;">￥{{item.discountprice}}</i>
             <del>{{item.originalprice}}</del>
            </span>

             <span class="author">出版日期:{{item.indate}}</span>
            <div class="state">
             <span v-if="item.state=='0'">状态: <i class="fa fa-rocket" aria-hidden="true" style="color: #00aced"></i>普通</span>
             <span v-if="item.state=='1'">状态: <i class="fa fa-paper-plane" aria-hidden="true" style="color: #eae612"></i>推荐</span>
             <span v-if="item.state=='2'">状态: <i class="fa fa-free-code-camp" aria-hidden="true" style="color: red"></i>热卖</span>

             <span v-if="item.grade=='0'" style="color:yellow" class="bold">审核中</span>
              <span v-if="item.grade=='1'" style="color:red" class="bold">未通过审核</span>
              <span v-if="item.grade=='2'" style="color:lightgreen" class="bold">已上架</span>
              <span v-if="item.grade=='3'" style="color:grey" class="bold">已下架</span>

           </div>
          </div>
          <div class="opt">
             <el-dialog title="编辑" :visible.sync="dialogFormVisible">
  <el-form :model="form" label-width="100px"  ref="addressform">
    <el-form-item label="书名" prop="realname">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="折扣价" prop="detail">
      <el-input v-model="form.discountprice" autocomplete="off" ></el-input>
    </el-form-item>
     <el-form-item label="库存" prop="phone" >
      <el-input v-model="form.stock" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="图书目录" prop="phone">
      <el-input type="textarea"  rows="5" v-model="form.bookCatalog" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="图书简介" prop="phone">
      <el-input type="textarea" rows="5" v-model="form.bookOutline" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmBtn">确 定</el-button>
  </div>
</el-dialog>
            <el-button class="edit" type="primary" @click="edit(item)"><i class="fa fa-pencil" aria-hidden="true"></i>编辑</el-button>
            <el-button type="danger"  @click="remove(item.id)"><i class="fa fa-trash-o" aria-hidden="true"></i>删除</el-button>
            <!--<el-button :type="item.grade=='2'?'info':'success'" @click="setState(item.grade,item.id)">{{item.grade=='2'?'下架':'上架'}}</el-button>-->
              <el-button v-if="item.grade=='2'" type="info" @click="setState(item.grade,item.id)">下架</el-button>
              <el-button v-if="item.grade=='3'" type="info" @click="setState(item.grade,item.id)">上架</el-button>
          </div>

        </div>
      </div>

      <div class="block" v-if="list.length">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageNumber"
        :page-size="10"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {getSellerBook,setBookState,deleBooks,editBooks} from '../../js/api'
  export default {
    name: '',
    data(){
    return{
       dialogFormVisible: false,
      list:[],
      total:0,
      pageNumber:1,
      form:{
      goodsID:'',
       name:'',
       discountprice:'',
       stock:'',
       booklabel:'',
       bookCatalog:'',
       bookOutline:''
      },
        tags:['未审核','不通过','上架','下架'],
        grade:0,
        nav:0,

    }
    },
    created(){
        this.getbook()
    },
    methods:{
        selTag(i){
            this.grade=i
            this.pageNumber=1
            this.list=[]
            this.getbook()
        },
      getbook(){
      getSellerBook(this.pageNumber,10,this.grade).then(res=>{
        this.total=res.output.total
        this.list=res.output.data
       })
      },
    handleCurrentChange(val) {
      this.getbook()
    },
    setState(grade,id){
       setBookState({grade:grade,goodsID:id}).then(res=>{
         this.$message.success('修改成功')
           this.getbook()
       })
    },
    // 删除商家商品
    remove(id){
     this.$confirm('确定删除商品?').then(res=>{
       deleBooks({goodsID:id}).then(res=>{
         this.getbook()
       })
     })
    },
    edit(item){
    this.dialogFormVisible=true
    this.form.goodsID=item.id
    this.form.name=item.name
    this.form.discountprice=item.discountprice
    this.form.stock=item.stock
    this.form.booklabel=item.booklabel
    this.form.bookCatalog=item.bookCatalog
    this.form.bookOutline=item.bookOutline
    },
    confirmBtn(){
      editBooks(this.form).then(res=>{
        this.dialogFormVisible=false;
        this.$message.success('更新成功')
        this.getbook()
      })
    }
    }
  }
</script>
<style lang="less" scoped>
    .tabs{
        height: 50px;
        display: flex;
        flex-direction: row;
        border-bottom: 2px solid #ccc;
        background: #fff;
        div{
            width: 100px;
            height: 100%;
            line-height: 50px;
            padding: 0 20px;
            text-align: center;
            cursor: pointer;
        }
        div:hover{
            border-bottom: 2px solid #1890ff;
            color: #1890ff;
        }
        div.active{
            border-bottom: 2px solid #1890ff;
            color: #1890ff;
            font-weight: bold;
        }
    }
.messageBox{
  margin-top: 30px;
  display: flex;
  flex-direction: row;
     flex-wrap: wrap;
  .bookitem{
    width: 50%;
    display: flex;
    flex-direction: row;
    height: 150px;
   margin-bottom: 50px;
    .image{
      height: 100%;
      width: 130px;
      img{
         height: 100%;
           width: 100%
      }
    }
    .info{
      display: flex;
      flex-direction: column;
      margin-left: 15px;
      width: 50%;
      span{
        font-size: 16px;
        display: block;
        margin-bottom: 5px;
      }
      .bookname{
        font-weight: bold;
        color: #1890ff;
      }

    }
    .state{
      display: flex;
      flex-direction: row;
      width: 90%;
      justify-content: space-between
    }
    .opt{
      display: flex;
      flex-direction: column;

      .el-button{
        margin-left: 0;
        margin-bottom: 10px;
      }
      i{
        margin-right: 5px;
      }
    }
  }
}
.bold{
  font-weight: bold
}
.block{
  margin: 20px auto;
  width: 300px;
}
.limit{
  display: inline-block;
  width: 200px;
  overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
</style>
