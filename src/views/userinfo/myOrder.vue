<template>
  <div class="orderBox">
     <div class="tabs">
         <div v-for="(item,index) in tags" :key="index" @click="selTag(index)" :class="select==index?'active':''">
             {{item}}
         </div>
     </div>
     <div class="list">
         <div class="orderItem" v-for="item in list" :key="item.id">
             <div class="title1">
                 <p>订单号: {{item.id}}</p>
                 <p class="status">{{status(item.status)}}</p>
             </div>
             <div class="info">
                 <img :src="item.image" alt="" width="100">
                 <div class="detail">
                    <p style="font-weight:700">{{item.name}}</p>
                    <p>商家: {{item.goodsID.seller.realname}}</p>
                    <p>配送方式: {{item.orderID.remark}}</p>
                    <p class="address">配送地址: {{item.orderID.address}}</p>
                 </div>
                 <div class="price" >
                     <p >￥{{item.price}}</p>
                     <p style="text-align:right">x{{item.count}}</p>
                 </div>

             </div>
             <div class="footer">
                 <div>
                 <div v-if="item.status==0">
                 <el-button @click="submitOrder(item)" style="margin-right:10px">去付款</el-button>
                 <el-dialog title="收银台" :visible.sync="dialogFormVisible" class="dialog">
      <div>
          <h3 style="font-weight:700;">该二维码有效时间十分钟，请立即支付!</h3>
          <img src="../../assets/img/code.jpg" alt="" width="200">
          <p style="color:#f40;font-weight:700;font-size:20px;">支付金额:￥{{totalprice}}</p>
      </div>
  <div slot="footer" class="dialog-footer" >
    <el-button @click="dialogFormVisible = false" >取 消</el-button>
    <el-button type="primary" @click="confirmBuy" plain>确 定</el-button>
  </div>
</el-dialog>
                 <el-button @click="remove(item.id)">删除订单</el-button>
                 </div>
                 </div>
                 <div class="sum">实付款: ￥<strong>{{item.price*item.count}}</strong></div>
             </div>
         </div>
     </div>
      <div class="footer">
    <div class="gotop" v-show="gotop" @click="toTop">Top</div>
</div>
  </div>
</template>
<script>
import {getMyOrder,sonOrder,removeOrder} from '../../js/api'
  export default {
    name: '',
    data(){
        return{
            tags:['全部订单','待支付','待发货','待收货']  ,
            select:0,
            nav:0,
            list:'',
             dialogFormVisible:false,
             totalprice:0,
            orderID:'',
            gotop:false
        }
    },
    created(){
     this.getOrder()
    },
    computed:{
     status(){
         return function(status){
             if(status==0){
                 return '未支付'
             }else if(status==1){
                 return '交易成功'
             }else {
                 return '等待收货'
             }
         }
     },

    },
    mounted(){
  window.addEventListener("scroll", this.handleScroll, true);
  },
    methods:{
          handleScroll() {
       let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false);
    },
    toTop() {

      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    },
        getOrder(){
            if(this.select==0){
            this.nav=3
            }else{
               this.nav=this.select-1
            }
            getMyOrder(this.nav).then(res=>{
                this.list=res.data
            })
        },
        selTag(i){
         this.select=i
         this.getOrder()
        },
         submitOrder(item){
             this.totalprice=item.price*item.count
        this.dialogFormVisible=true
        this.orderID=item.id
      },
      confirmBuy(){
        sonOrder({id:this.orderID}).then(res=>{
            if(res.result=='success'){
               this.dialogFormVisible=false
                 this.getOrder()
                  this.$notify({
          title: '成功',
          message: '支付成功',
          type: 'success'
        });
            }
        })
      },
      remove(id){
          this.orderID=id
        this.$confirm('确认删除该订单?').then(res=>{
            removeOrder({id:this.orderID}).then(res=>{
                 if(res.result=='success'){
                         this.getOrder()
                  this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        })
        }
            })
        })
      }
    }
  }
</script>
<style lang="less" scoped>
.footer .gotop {
  text-align: center;
  position: fixed;
  right: 50px;
  bottom: 30px;
  cursor: pointer;
  padding: 10px;
  font-size: 20px;
  border-radius: 50%;
  background: white;
  color: #1890ff;
}
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

     background: #fff;
     padding: 20px ;
     box-sizing: border-box;
     border-radius: 8px;
    }
}
.title1{
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
.dialog{
  text-align: center;
}
</style>
