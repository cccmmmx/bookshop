<template>
  <div class="box">
    <div class="catalog">
      <p class="title">
        目录
        <i class="el-icon-loading"></i>
      </p>
      <p v-for="(item,index) in bookCatalog" :key="index" class="catalogItem">{{item}}</p>
    </div>
    <div class="bookOutline">
      <p class="title">
        内容简介
        <i class="el-icon-loading"></i>
      </p>
      <p>{{detail.bookOutline}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["detail"],
  computed: {
    bookCatalog() {
      return this.detail.bookCatalog.split("\\n");
    }
  },
  created() {
  }
};
</script>
<style lang="less">

.catalog {
  width: 60%;
 
}
.title {
  color: #007722;
  font-size: 24px;
  margin-bottom: 20px;
}

.catalogItem {
  margin: 5px 0;
}
.bookOutline {
  margin-top: 50px;
  width: 80%;
  line-height: 24px;
}
</style>