<template>
  <div class="container">
    <h1>搜索 {{this.$route.params.key}}</h1>
    <!-- 图书列表 -->
    <div class="bookList">
      <div class="item" v-for="item in lists" :key="item.id">
        <router-link :to="'/details/'+item.id">
          <img :src="item.image" alt width="80" />
        </router-link>
        <div class="info">
          <router-link :to="'/details/'+item.id">{{item.title}}</router-link>
          <p class="price">￥{{item.price}}</p>
          <span>{{item.author[0]}}</span> /
          <span>{{item.publisher}}</span> /
          <span>{{item.pubdate}}</span> /
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pageination-box">
     <el-pagination
    layout="prev, pager, next"
    :total="50"
    @current-change="pagechange">
  </el-pagination>
  </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      lists: [],
      key: this.$route.params.key
    };
  },
  created() {
    this.getbooks();
  },
  mounted(){
     
  },
  methods: {
    async getbooks() {
      let { data } = await this.axios(
        `https://douban.uieee.com/v2/book/search?q=${this.key}&count=10`
      );
      this.lists = data.books;
    },
  async  pagechange(page){
       let { data } = await this.axios(
        `https://douban.uieee.com/v2/book/search?q=${this.key}&count=${page*10}`
      );
   this.lists=data.books.slice(-10)
    }
  }
};
</script>
<style lang="less" scoped>
.container{
  background: #fff
}
.bookList {
  margin-top: 15px;
  padding: 0 20px;
  .item {
    height: 120px;
    padding: 20px ;
    display: flex;
    flex-direction: row;
    .info {
      padding: 10px 20px;
      .price {
        color: #f40;
        margin: 10px 0;
      }
    }
  }
}
.pageination-box{
  margin-top: 10px;
  text-align: center
}
</style>