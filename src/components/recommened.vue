<template>
  <div class="recom">
    <h2>同类热销图书</h2>
    <div class="recommended-table" :style="{ flexDirection: direction }">
      <div class="item" v-for="item in lists" :key="item.id">
        <div @click="toBooks(item.id)">
          <img :src="item.image" alt width="120px" />
        </div>
        <div class="info">
          <p style="color:#1890ff" class="bookname">
            {{item.name
            }}
          </p>
          <p class="author">{{ item.bookAuthor }}</p>
          <p>
            <span
              style="color:red;font-size:18px;display:inline-block;margin-right:5px;"
            >￥{{item.discountprice}}</span>
            <del style="font-size:14px">￥{{item.originalprice}}</del>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getGoodsPage } from "../js/api";
export default {
  name: "recommended",
  props: ["count", "categoryId", "direction"],
  data() {
    return {
      lists: []
    };
  },
  watch: {},
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getGoodsPage(this.categoryId, 1, this.count).then(res => {
        this.lists = res.output.data.filter(item => {
          return item.id != this.$route.query.id;
        });
      });
    },
    toBooks(id) {
      this.$router.push({ path: "/details", query: { id } });
      this.$router.go(0)
      // this.$parent.getBooksDetails();
    }
  }
};
</script>
<style lang="less" scoped>
.recom {
  border: 1px solid #ccc;
  padding: 15px;
  box-sizing: border-box;
  background: #fff;
 
  .recommended-table {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-between;
    .item {
      height: 200px;
    
      display: flex;
      text-align: center;
      align-items: center;
      img {
        display: block;
        height: 160px;
      }
      .info {
        text-align: center;
        margin-left: 10px;
        p {
          margin: 5px 0;
          text-align: left;
          width: 130px
        }
       
      }
    }
  }
}
</style>
