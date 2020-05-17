<template>
  <div>
    <!-- 选择收货地址 -->
    <div class="selcetAddress">
      <h3 class="title">
        确认收货地址
        <router-link to="/userinfo/address" style="float:right;font-size:14px;color:#3366cc">管理收货地址</router-link>
      </h3>
      <hr style="margin:10px 0"/>
      <div class="address-list" v-if="addressList.length">
        <div class="address-item" v-for="(item,index) in addressList" :key="index" 
        >
           <span v-if="index==radio" style="position:absolute;left:20px;color:#f40">寄送至</span>
          <el-radio v-model="radio" :label="index" id="radiobox">{{item.detail}}</el-radio>
        </div>
      </div>
      <div v-else style="width:100%;height:350px;text-align:center">
        <img src="../../assets/img/null.jpg" alt="" height="100%" width="500">
        <el-button style="margin-left:20px;" type="success" @click="addAddress">添加收货地址</el-button>
      </div>
    </div>
    <!-- 确定订单信息 -->
    <div class="order-msg">
      <h3 style="margin-bottom:10px;" class="title">确认订单信息</h3>
      <!-- <order-table v-if="addressList.length" :address="addressList[radio]" :reciver="addressList[radio].realname"/> -->
      <order-table :address="addressList[radio]"/>
    </div>
  </div>
</template>
<script>
import orderTable from './order_table'
import {getAddress} from '../../js/api'
export default {
  data() {
    return {
     
      radio: 0,
      addressList:[]  //收货地址
    };
  }, 
  components:{orderTable},
  created(){
    this.getAddressList()
  },
  methods: {
   
    getAddressList(){
      getAddress().then(res=>{
        this.addressList=res.data
      })
    },
    addAddress(){
      this.$router.push('/userinfo/address')
    }
  }
};
</script>
  
<style lang="less" scoped>
#steps {
  width: 600px;
  float: right;
}
.title{
  font-size: 20px;
  font-weight: 700
}
.selcetAddress {
  margin-top: 30px;
  background: #fff;
  padding: 20px;
  .address-item{
      margin: 5px;
      line-height: 30px;
      padding-left: 80px;
      position: relative;
    //   #radiobox{
    //     //   margin-left: 50px;
    //   }
  }
}
.order-msg{
  margin-top: 30px;
}
</style>
