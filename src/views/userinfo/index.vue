<template>
  <div >
    <h2>账号管理</h2>
     <div class="container">
       <leftMenu/>
       <router-view style="padding:20px 40px"></router-view>
     </div>

  </div>
</template>
<script>
import leftMenu from './leftMenu'
  export default {
    name: '',
    components:{leftMenu}
  }
</script>
<style lang="less" scoped>
.container{
  height: 600px;
  margin: 0 auto;
  background: #fff;
  margin-top: 20px;
  display: flex;
  flex: row;
}
</style>
