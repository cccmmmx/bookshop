<template>
  <div class="sidebar">
     <div class="tip">
        <h3 style=" background: #ddd; color: #1890ff;">最新公告</h3>
        <div class="content">{{info.notice}}</div>
     </div>
     <div class="info">
        <div class="top">
          <div><i class="el-icon-phone"></i><span>{{info.tel}}</span></div>
          <div><i class="el-icon-monitor"></i><span>{{info.website}}</span></div>
          <div><i class="el-icon-location"></i><span>{{info.postcode}}</span></div>
          <div><i class="el-icon-user"></i><span>{{info.worktime}}</span></div>
        </div>
        <div class="bottom">
          <div class="step">
              <h3 class="title">购书流程</h3>
              <span>{{info.shopstream}}</span>
          </div>
          <div>
              <h3 class="title">送货方式</h3>
              <span>{{info.postmethod}}</span>
          </div>
          <div>
              <h3 class="title">售后服务</h3>
              <span>{{info.service}}</span>
          </div>
        </div>
     </div>
  </div>
</template>
<script>
import {getMessage} from '../js/api'
  export default {
    name: '',
    data(){
      return{
          info:''
      }
    },
    created(){
        getMessage().then(res=>{
            this.info=res.data
        })
    }
  }
</script>
<style lang="less" scoped>
.sidebar{
    width: 280px;
    position: relative;
    display: flex;
    flex-direction: column;
   
}
.tip{
    width: 100%;
    // height: 300px;
    background: #fff;
   
    h3{
        height: 60px;
        background: #f5f5f5;
        font-weight: bold;
        line-height: 60px;
        padding-left: 30px;
    }
    .content{
        padding: 20px;
        font-size: 16px;
        line-height: 30px;
    }
   
}
 .info{
     width: 100%;
    // height: 400px;
     background: #fff;
     margin-top: 40px;
        .top{
            height: 180px;
             background: #ddd;
           color: #1890ff;
             
           
              box-sizing: border-box;
             div{
               width: 100%;
                 height: 25%;
                 line-height: 50px;
                //  padding-left: 20px;
                 i{  
                     padding-left: 30px;
                     font-size: 24px;
                     margin-right: 5px;
                 }
                 span{
                     font-size:18px;
                 }
             }
        }
        .bottom{
            .title{
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 5px;
            }
             div{
       margin-bottom: 20px;
       span{
           line-height: 28px;
       }
    }
            padding: 15px;
        }
    }
</style>