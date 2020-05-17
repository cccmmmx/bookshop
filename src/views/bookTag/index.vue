<template>
  <div class="bookTag" v-if="list.length">
    <h1>图书标签:{{ category }}</h1>
    <div class="book-wraper">
      <div v-for="(item,i) in list" class="bookItem" :key="i">
        <div @click="toDetail(item.id)">
          <img :src="item.image" width="120" />
        </div>
        <div class="info">
          <h4 class="title">{{item.name}}</h4>
          <p>{{bookmessage(item)}}</p>
          <p>（有{{item.bookDealmount}}人购买）</p>
          <p class="bookOutline">{{item.bookOutline}}</p>
        </div>
      </div>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pagenumber"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { getGoodsPage,getBookName } from "../../js/api";
import Pagination from "@/components/Pagination ";
export default {
  name: "bookTag",
  data() {
    return {
      category: this.$route.params.name,
      list: [],
      pagenumber: 1,
      total: 0,
      val:'',
      pageSize:10
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  computed: {
    bookmessage() {
      return function(item) {
        return (
          item.bookAuthor +
          " / " +
          item.bookPress +
          " / " +
          item.bookPubDate +
          " / " +
          item.discountprice +
          "元"
        );
      };
    },
    isLogin() {
      return this.$store.state.token && this.$store.state.userMsg;
    }
  },
  components: { Pagination },
  methods: {
    getGoodsPageid() {
      getGoodsPage(this.val, this.pagenumber, this.pageSize).then(res => {
        this.list = res.output.data;
        this.pagenumber = res.output.pageNumber;
        this.total = res.output.total;
      });
    },
    getGoodsPageName(){
  getBookName(this.val, this.pagenumber, this.pageSize).then(res => {
          this.list = res.output.data;
          this.pagenumber = res.output.pageNumber;
          this.total = res.output.total;
        });
    },

    getList() {
      if (this.$route.query.id) {
        this.val = this.$route.query.id;
        this.getGoodsPageid()
      } else {
        this.val = this.$route.query.name;
      this.getGoodsPageName()
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getGoodsPageid();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getGoodsPageid();
    },
    toDetail(item) {
      if (this.isLogin) {
        this.$router.push({ path: "/details", query: { id: item } });
      } else {
        this.$message("请先登录");
        this.$router.push({ name: "login" });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.book-wraper {
  margin-top: 50px;
  .bookItem {
    padding: 20px 40px;
    margin-bottom: 30px;
    background: #fff;
    display: flex;
    .info {
      margin-left: 30px;
      .title {
        color: #1890ff;
      }
      p {
        margin-top: 5px;
      }
      .bookOutline {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        color: #999;
      }
    }
  }
}

.block {
  display: flex;
  justify-content: center;
}
</style>
