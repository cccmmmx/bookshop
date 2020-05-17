<template>
  <!--分页-->
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pagenumber"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="10"
      layout="sizes, prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>

import { getGoodsPage } from "../js/api";
export default {
  props: ["id",'pagenumber','total'],
  data() {
    return {
      currentPage: 1
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      getGoodsPage(this.id, this.pagenumber, val).then(res => {
        console.log(res);
        this.$parent.list = res.output.data;
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
      getGoodsPage(this.id, val, this.pageSize).then(res => {
        console.log(res);
        this.$parent.list = res.output.data;
      });
    }
  },
  data() {
    return {
      currentPage: 1
    };
  }
};
</script>
<style lang="less" scope>
.block {
  display: flex;
  justify-content: center;
}
</style>
