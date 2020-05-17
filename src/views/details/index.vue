<template>
  <div class="container">
    <div v-if="details" class="left">
      <div class="top">
        <h2>{{ details.name }}</h2>
        <div class="bookInfo">
          <img :src="details.image" alt width="180" height="280"/>
          <div class="detail">
            <p class="author">
              作者:
              <span class="color">{{ details.bookAuthor }}</span>
            </p>
            <p class="bookTanslor" v-if="details.bookTanslor">
              译者:
              <span class="color">{{ details.bookTanslor }}</span>
            </p>
            <p class="bookPress">
              出版社:
              <span>{{ details.bookPress }}</span>
            </p>
            <p class="bookPubDate">
              出版日期:
              <span>{{ details.bookPubDate }}</span>
            </p>
            <p class="bookPages">
              页数:
              <span>{{ details.bookPages }}</span>
            </p>
            <p class="bookVersion">
              版次:
              <span>{{ details.bookVersion }}</span>
            </p>
            <p class="originalprice">
              原价:
              <span>{{ details.originalprice }}</span>
            </p>
            <p class="discountprice">
              现价:
              <span style="color:#f40;font-size:24px;font-weight:700">￥{{
                details.discountprice
              }}</span>
            </p>
            <p class="booklabel">
              标签:
              <span>{{ details.booklabel }}</span>
            </p>
            <p class="bookisbn">
              ISBN:
              <span>{{ details.bookisbn }}</span>
            </p>
            <div @click="collect(details.isCollection, details.id)">
              <i
                class="fa fa-heart-o"
                aria-hidden="true"
                v-if="details.isCollection == 0"
              ></i>
              <i
                class="fa fa-heart"
                aria-hidden="true"
                v-else
                style="color:red;"
              ></i>
            </div>
          </div>
          <div class="options">
            <p>
              <el-button type="primary" @click="toBuy()">立即购买</el-button>
              <el-button type="success" @click="addToCart()"
                >加入购物车</el-button
              >
            </p>
          </div>
        </div>
        <div class="tip">
          <el-card class="box-card">
            <p class="bookDealmount">
              购买数量:
              <span>{{ details.bookDealmount }}</span>
            </p>
            <p class="stock">
              库存:
              <span>{{ details.stock }}</span>
            </p>
            <p class="look" style="color:#666">
              浏览数量:
              <i class="fa fa-eye" aria-hidden="true" ></i>
              <span>{{ details.bookLookmount }}</span>
            </p>
          </el-card>
        </div>
      </div>
      <Article v-if="details" :detail="details"></Article>
    </div>
    <Recommened
      :count="5"
      :categoryId="details.category.id"
      direction="column"
      class="recom"
      v-if="details"
    ></Recommened>
  </div>
</template>
<script>
import { Loading } from "element-ui";
import { mapState } from "vuex";
import Article from "./article";
import { getBooksDetails, addCart } from "../../js/api";
import { post } from "../../js/http";
import Recommened from "@/components/recommened";
import QS from "qs";
export default {
  name: "Details",
  data() {
    return {
      details: "",
      num: 1,
    };
  },
  created() {
    this.getBooksDetails();
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  components: { Article, Recommened },
  methods: {
    // 商品数量
    handleChange(value) {},
    getBooksDetails() {
      let loadings = Loading.service({
        lock: true,
        text: "拼命加载中...",
        background: "rgba(0,0,0,.5)",
      });
      getBooksDetails(this.$route.query.id).then((res) => {
        if (res.result == "success") {
          loadings.close();
          this.details = res.data;
        } else {
          this.$message("系统繁忙");
        }
      });
    },
    // 收藏
    collect(i, id) {
      if (i == 1) {
        this.details.isCollection = 0;
        post("collection/CancelFavorite", { goodsID: id }).then((res) => {
          this.$message.error(res.message);
        });
      } else {
        this.details.isCollection = 1;
        post("collection/collectionBook", { goodsID: id }).then((res) => {
          this.$message.success(res.message);
        });
      }
    },
    // 添加购物车
    addToCart() {
      this.$confirm('确认加入购物车?').then(res=>{
             addCart({goodsID:this.details.id}).then(res=>{
               if(res.result=="success"){
                 this.$store.dispatch('getCartList')
                 this.$message.success('加入购物车成功')
               }
             })

      }).catch(err=>{return err})

    },
    toBuy(){
      var arr=[]
      this.details.count=1;
      this.details.goodsID=this.details.id
      this.details.price=this.details.discountprice
   arr.push(this.details)
this.$store.commit('addorder',arr)
this.$store.commit('setSumPrice',this.details.discountprice)
      this.$router.push('/orderDetails')
    }
  },
};
</script>
<style lang="less" scoped>
.left {
  float: left;
  width: 65%;
}
.container {
  position: relative;
  background: #fff;
  padding: 20px;
  overflow: hidden;
}
.recom {
  float: left;
  margin-left: 50px;
}
.top {
  border: 1px solid rosybrown;
  padding: 20px;
  margin-bottom: 50px;
}
.bookInfo {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  .detail {
    margin-left: 30px;
    width: 220px;
    p {
      margin-top: 5px;
    }
  }
  .options {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 350px;
    margin-left: 50px;
    p {
      margin-top: 20px;
    }
  }
}
.tip {
  width: 150px;
  position: absolute;
  top: 30px;
  left: 500px;
}
.color {
  color: #1890ff;
}
.fa{
  font-size: 20px
}
</style>
<style></style>
