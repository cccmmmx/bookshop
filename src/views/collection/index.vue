<template>
  <div class="collection">
    <h2 class="title" style="font-size:24px;font-weight:bold">收藏夹</h2>
    <div class="list" v-if="list.length">
      <div class="item" v-for="(item) in list" :key="item.id">
        <div class="image" @click="toDetail(item.goodsID)">
          <img :src="item.image" alt width="120" height="180" />
          <i class="el-icon-delete" @click.stop="dele(item.goodsID)"></i>
        </div>
        <div class="info">
          <div>{{item.name}}</div>
          <p class="author">{{item.author}}</p>
        </div>
      </div>
      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagenumber"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <div class="nocollection" v-else>
      <img src="@/assets/img/nocollection.png" alt />
      <div>
        <p>您还没有收藏的图书哦！</p>
      </div>
    </div>
    <recommended :count="4" style="margin-top:50px"/>
  </div>
</template>
<script>
import recommended from "../../components/recommened";
import { getCollection } from "../../js/api";
import { deleBook } from "../../js/api";
import { Loading } from "element-ui";
export default {
  name: "collection",
  data() {
    return {
      total: 0,
      pagenumber: 1,
      list: []
    };
  },
  computed: {},
  created() {
    this.getCollect();
  },
  components: { recommended },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getCollect();
    },
    dele(id) {
      this.$confirm("确认删除该宝贝？").then(res => {
        deleBook({ goodsID: id }).then(res=>{
          if(res.result=="success"){
          this.$message.success("删除成功");
            this.getCollect();
          }
        });
       
      });
    },
    getCollect() {
      let loadings = Loading.service({
        lock: true,
        text: "拼命加载中...",
        background: "rgba(0,0,0,.5)"
      });
      getCollection(this.pagenumber, 10).then(res => {
        loadings.close();
        this.list = res.output.data;
        this.total = res.output.total;
      });
    },
    toDetail(id) {
      this.$router.push({ path: "/details", query: { id: id } });
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  margin-bottom: 20px;
}
.nocollection {
  height: 200px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pages {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.list {
  display: flex;
  flex-direction: row;
  background: #fff;
  padding: 20px 10px 40px 10px;
  position: relative;
  flex-wrap: wrap;

  .item {
    width: 20%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
    div {
      text-align: center;
    }
    .image {
      width: 120px;

      display: flex;
      align-items: center;
      position: relative;
    }
    .author {
    }
  }
}
</style>
<style >
.el-icon-delete {
  position: absolute;
  right: 0;
  top: 0;
  display: inline-block;
  font-size: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 5px;
  display: none;
}
.item:hover .el-icon-delete {
  display: block;
}
</style>