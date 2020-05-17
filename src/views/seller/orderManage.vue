<template>
  <div>
      <h3>订单管理</h3>
       <div class="orderBox">
     <div class="tabs">
         <div v-for="(item,index) in tags" :key="index" @click="selTag(index)" :class="select==index?'active':''">
             {{item}}
         </div>
     </div>
     <div class="list">
         <div class="orderItem" v-for="item in list" :key="item.id">
             <div class="title">
                 <p>订单号: {{item.id}}</p>
                 <!-- <p class="status">{{status(item.status)}}</p> -->
             </div>
             <div class="info">
                 <img :src="item.image" alt="" width="100">
                 <div class="detail">
                    <p style="font-weight:700">{{item.name}}</p>
                    <p>购买客户: {{item.goodsID.seller.realname}}</p>
                    <p>下单时间: {{item.orderID.orderTime}}</p>
                    <p>手机号码: {{item.orderID.customerID.phone}}</p>
                    <p class="address">配送地址: {{item.orderID.address}}</p>
                 </div>
                 <div class="price" >
                     <p >￥{{item.price}}</p>
                     <p style="text-align:right">x{{item.count}}</p>
                 </div>
                 <div class="btn">
                   <el-button v-if="item.status==1" type="success" @click="deliver(item.id)">点击发货</el-button>
                   <p v-else style="color:#1890ff;font-size:18px;font-weight:700">已发货</p>
                 </div>
             </div>

         </div>
     </div>
  </div>
  </div>
</template>
<script>
import {getSellerOrder,deliverOrder} from '../../js/api'
  export default {
    name: '',
    data(){
      return{
        tags:['全部','未发货','已发货'],
         select:0,
          nav:0,
          list:''
      }
    },
    created(){
       this.getOrder()
    },
    methods:{
       selTag(i){
         this.select=i
         this.getOrder()
        },
        getOrder(){
           if(this.select==0){
            this.nav=3
            }else{
               this.nav=this.select
            }
          getSellerOrder(this.nav).then(res=>{
            this.list=res.data
          })
        },
        deliver(id){
          this.$confirm('确认发货?').then(res=>{
              deliverOrder({id}).then(res=>{
               if(res.result=='success'){
                 this.$message.success('发货成功')
                 this.getOrder()
               }
          })
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
.list{

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    .orderItem{
     width:48%;
    margin: 20px 0;
    border: 1px solid #ccc;
     background: #fff;
     padding: 20px ;
     box-sizing: border-box;
     border-radius: 8px;
    }
}
.title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    p{
        color: #1890ff;
        font-weight: bold
    }
}
.info{
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    position: relative;
    .detail{
          margin-left: 20px;
          p{
              margin:5px 0;
              font-size: 16px
          }
          .address{
              width: 250px;
          }

    }
     .price{
              position: absolute;
              right: 10px;
              top: 0px;
              p:first-child{
                  font-size: 18px;
                  color: #f40;
                  font-weight: 700;
              }
          }
}
.footer{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    position: relative;
    justify-content: space-between;
    .sum{

       strong{
            font-size: 20px;
            color: #f40;
       }

    }
}

.btn{
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
