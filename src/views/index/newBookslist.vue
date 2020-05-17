<template>
  <div class="container">
    <!-- 顶部 -->
    <div class="top">
      <!-- 标题 -->
      <div class="title">
        <h2>{{ title }}</h2>

      </div>
      <!-- 分页 -->
      <div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="40"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
    <hr />
    <!-- 渲染列表 -->
    <div class="list" ref="bookList">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="imgLink" @click="toDetail(item.id)">
          <img :src="item.image" alt width="120" />
        </div>
        <router-link to="#" class="title01">{{ item.name }}</router-link>
        <div class="author">{{ item.bookAuthor }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: ["hotList", "title"],
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.list = this.hotList.slice(0, 8);
  },
  computed: {
    isLogin() {
      return this.$store.state.token && this.$store.state.userMsg;
    },
  },
  methods: {
    // this.axios

    toDetail(item) {
      if (this.isLogin) {
        this.$router.push({ path: "/details", query: { id: item } });
      } else {
        this.$message("请先登录");
        this.$router.push({ name: "login" });
      }
    },
    handleCurrentChange(val) {
      this.list = this.hotList.slice((val - 1) * 8, val * 8);
      this.$refs.bookList.classList.add("animated", "bounceInRight");
      this.$refs.bookList.addEventListener("animationend", () => {
        this.$refs.bookList.classList.remove("animated", "bounceInRight");
      });
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background: #fff;
  .top {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;
     margin-top: 10px;
    .title {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      padding-left:10px;

      h2 {
        margin-right: 10px;
        font-size: 20px;
        font-weight: 700
      }
    }
  }
  .list {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 20px;
    height: 500px;
    .item {
      flex: 25%;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      .imgLink {
        height: 172px;
        width: 120px;
        display: flex;
      }

      .title01 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 120px;
        text-align: center;
        color: #1890ff;
      }
      .title01:hover {
        background: #1890ff;
        color: #fff;
      }
      .author {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 120px;
        text-align: center;
      }
    }
  }
}
</style>
