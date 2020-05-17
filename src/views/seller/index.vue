<template>
  <div>
     <sellerHeader/>
     <div class="main">
          <leftMenu class="left"/>
          <router-view class="view"/>
     </div>
  </div>
</template>
<script>
import sellerHeader from './sellerHeader'
import leftMenu from './leftMenu'
  export default {
    name: '',
    components:{sellerHeader,leftMenu}
  }
</script>
<style lang="less" scoped>
.main{
    display: flex;
    position: relative;
    top: -20px;
    .left{
        background: #545c64
    }
    .view{
        flex: 1;
        padding:  20px;
        background: #fff;
       
        margin:0
    }
   
}
</style>