<template>
  <div id="register">
    <div class="tip" v-if="isShow">
      <span style="display:inline-block;margin-right:10px">您要注册为:</span>
       <el-button type="primary" @click="buyer()">买家</el-button>
       <el-button type="success" @click="seller()">卖家</el-button>
    </div>
    <buyerRegister v-if="buyerCpm"/>
    <sellerRegister v-if="sellerCpm"/>
  </div>
</template>
<script>
import buyerRegister from './buyerRegister'
import sellerRegister from './sellerRegister'
  export default {
    name: '',
    data(){
       return{
         isShow:true,
         buyerCpm:false,
         sellerCpm:false
       }
    },
    components:{buyerRegister,sellerRegister},
    methods:{
      buyer(){
         this.isShow=false,
         this.buyerCpm=true
      },
      seller(){
         this.isShow=false,
         this.sellerCpm=true
      }
    }
  }
</script>
<style lang="less" scoped>
#register{
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center
}
</style>