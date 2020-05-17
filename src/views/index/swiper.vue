<template>
  <div>
    <!-- 轮播图 -->
    <div class="swiper">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in swiperImg">
          <img :src="item" alt width="100%" height="300" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      swiperImg: [
        "http://image31.bookschina.com/uploadfiles/images/13164_ad990.jpg",
        "http://image31.bookschina.com/uploadfiles/images/13147_ad990.jpg",
        "http://image31.bookschina.com/uploadfiles/images/11684_ad990.jpg",
        "http://image31.bookschina.com/pro-images/200424dsy/990360.jpg?id=2",
        "http://image31.bookschina.com/uploadfiles/images/13148_ad990.jpg"
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.swiper {
  width: 100%;
  margin: 0 auto;
}
// 轮播图样式
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>