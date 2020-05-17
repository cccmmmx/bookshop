<template>
  <div class="table">
    <el-table :data="orderList" tooltip-effect="dark" style="width: 100%">
      <el-table-column label="商品信息" width="400">
        <template slot-scope="scope">
          <!-- <span style="width:120px;display:inline-block;text-align:left"> -->
          <img
            :src="scope.row.image"
            alt
            width="80"
            class="book-image"
            style="vertical-align:middle;
            margin-right:8px"
          />
            <!-- </span> -->

          <el-link type="success" style="width:100px">{{scope.row.name}}</el-link>
        </template>
      </el-table-column>

      <el-table-column label="单价(元)" width="200">
        <template slot-scope="scope">
          <span>￥</span>
          <strong>{{scope.row.price}}</strong>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="200">
        <template slot-scope="scope">
          <strong>{{scope.row.count}}</strong>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="金额" width="200">
        <template slot-scope="scope">
          <span>￥</span>
          <strong>{{scope.row.price*scope.row.count}}</strong>
        </template>
      </el-table-column>
    </el-table>
    <!-- 合计 -->
    <div class="sum-price">
      <div>
      <span style="display:inline-block;margin-right:10px;">实付款:</span>
      <strong style="font-size:26px;color:#f40">
        <span style="font-size:14px">￥</span>
        {{sumprice}}
      </strong>
      </div>
      <div class="address" v-if="address">
    <p>寄送至:{{address.detail}}</p>
        <p>收货人:{{address.realname}}</p> 
      </div>
      <!-- 结算按钮 -->
      <el-button type="primary" id="sum-btn" @click="submitOrder">立即下单</el-button>
      <el-dialog title="收银台" @close="close()" :visible.sync="dialogFormVisible" class="dialog" ref="dialog">
      <div>
          <h3 style="font-weight:700;">该二维码有效时间十分钟，请立即支付!</h3>
          <img src="../../assets/img/code.jpg" alt="" width="200">
          <p style="color:#f40;font-weight:700;font-size:20px;">支付金额:￥{{sumprice}}</p>
      </div>
  <div slot="footer" class="dialog-footer">
    <el-button  @click="close()">取 消</el-button>
    <el-button type="primary" @click="confirmBuy">确 定</el-button>
  </div>
</el-dialog>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {setOrder,allOrder} from '../../js/api'
export default {
  name: "",
  data() {
    return {
      dialogFormVisible:false,
      orderID:''
    };
  },
  props: ["address"],
  computed: {
    ...mapState(["orderList",'sumprice']),
     
  },
  methods: {
   submitOrder(){
     if(this.address){
    var ids=[]
   this.orderList.forEach(item=>{
     ids.push(item.goodsID)
    })
     let obj={
       goodsID:ids.join(','),
       addressID:this.address.id,
       remark:'顺丰',
       message:'',
       total:this.sumprice,
       goodsCount:this.orderList.length
     }
     setOrder(obj).then(res=>{
       if(res.result=='success'){
         this.$store.dispatch('getCartList')
           this.dialogFormVisible=true
           console.log(res)
           this.orderID=res.data.id
       }
     })
     }else{
        this.$alert('请先填写配送的地址信息', {
          confirmButtonText: '确定',
        });
     }
     
    
   },
 close(){
    this.dialogFormVisible=false;
    this.$router.replace('/myOrder')
 },
  //  下单按钮
  confirmBuy(){
    this.dialogFormVisible=false
    allOrder({orderid:this.orderID}).then(res=>{
      this.$router.push('/myOrder')
    })
  }
  }
};
</script>
<style lang="less" scoped>
.count_sum {
  display: flex;
  flex-direction: row;
  height: 40px;
  width: 120px;
  box-sizing: border-box;
  input {
    width: 50px;
    text-align: center;
  }
  button {
    width: 40px;
    background: #f5f7fa;
    font-size: 18px;
    color: #606266;
    cursor: pointer;
  }
  button:hover {
    color: #409eff;
  }
}
.sum-price {
  text-align: right;
  background: #fff;
  margin-top: 10px;
  padding: 10px;
}
.dialog{
  text-align: center;
}
.address{
  p{
    font-size: 16px;
    font-weight: 700
  }
}
</style>
<style>
.cell {
  text-align: center;
}
.el-dialog__title{
  font-size: 24px;
  font-weight: 700;
}
</style>