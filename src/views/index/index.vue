<template>
  <div id="Index" v-if="hotList.length && recomLists.length">
    <sidebar class="side"/>
    <!-- 轮播图 -->
    <Swiper />
    <div class="mainContent">
      <div class="left">
        <!-- 新书速递 -->
        <newBookslist title="热卖专区" :hotList="hotList" v-if="hotList.length" />
        <!-- 热门推荐 -->
        <recom title="推荐专区" :recom="recomLists" v-if="recomLists.length" />
      </div>
      <div class="right">
        <!-- 热门标签 -->
        <hotTags />
      </div>
    </div>
    <!-- 回到顶部 -->
  <div class="footer">
    <div class="gotop" v-show="gotop" @click="toTop">Top</div>
</div>
  </div>
</template>
<script>
import newBookslist from "./newBookslist.vue";
import sidebar from '../../components/sidebar'
import recom from "./recom.vue";
import Swiper from "./swiper.vue";
import hotTags from "./hotTags.vue";
import { getGoodsState } from "../../js/api";
export default {
  name: "Index",
  data() {
    return {
      hotList: [],
      recomLists: [],
      gotop: false
    };
  },
  created() {
    this.getHot();
    this.recomList();
  },
  mounted(){
  window.addEventListener("scroll", this.handleScroll, true);
  },
  components: { newBookslist, Swiper, hotTags, recom,sidebar },
  methods: {
    getHot() {
      getGoodsState(2, 1, 32).then(res => {
        this.hotList = res.output.data;
      });
    },
    recomList() {
      getGoodsState(1, 1, 32).then(res => {
        this.recomLists = res.output.data;
      });
    },
    handleScroll() {
       let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
      scrolltop > 800 ? (this.gotop = true) : (this.gotop = false);
    },
    toTop() {
      
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果 
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    }
  }
};
</script>
<style lang="less" scoped>
#Index{
  margin-right: 80px;
  margin-bottom: 50px;
  position: relative;
}
.side{
  position: absolute;
  top: 0;
  left: -300px;
}
.mainContent {
  display: flex;
  flex-direction: row;
  .left {
    width: 70%;
  }
  .right {
    width: 30%;
    padding: 20px 20px 0 50px;
  }
}
.footer .gotop {
  text-align: center;
  position: fixed;
  right: 50px;
  bottom: 30px;
  cursor: pointer;
  padding: 10px;
  font-size: 20px;
  border-radius: 50%;
  background: white;
  color: #1890ff;
}
</style>
