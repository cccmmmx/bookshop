<template>
  <div class="table">
    <el-table
      ref="multipleTable"
      :data="cartList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="商品信息" width="300">
        <template slot-scope="scope">
          <img
            :src="scope.row.image"
            alt
            width="80"
            class="book-image"
            style="vertical-align:middle;
            margin-right:8px"
            @click="toDetails(scope.row.goodsID)"
          />
          <el-link type="success" @click="toDetails(scope.row.goodsID)" style="width:100px">{{scope.row.name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="单价(元)" width="180">
        <template slot-scope="scope">
          <span>￥</span>
          <strong>{{scope.row.price}}</strong>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="数量" width="180">
        <template slot-scope="scope">
          <div class="count_sum">
            <el-button
              class="minute"
              @click="btn_minute(scope.row)"
              :disabled="scope.row.count==1?true:false"
            >-</el-button>
            <input class="input" v-model="scope.row.count" disabled>
            <el-button class="add" @click="btn_add(scope.row,$event)" :disabled="isAble">+</el-button>
          </div>
          <p class="stock">剩余库存:{{scope.row.stock}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="金额" width="180">
        <template slot-scope="scope">
          <span>￥</span>
          <strong>{{(scope.row.price*scope.row.count).toFixed(2)}}</strong>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" class="opt">
        <template slot-scope="scope">
          <el-link
            type="success"
            class="br"
            @click="addCollection(scope.row.goodsID)"
          >移入收藏夹</el-link>
          <el-link type="danger" @click="removeItem(scope.row.id)" class="br">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="settlement">
      <div class="left">
        <el-checkbox v-model="ischeck" class="all" @change="all">全选</el-checkbox>
        <el-link type="danger" @click="removeSel" class="remove">删除</el-link>
      </div>

      <div class="right">
        <!-- 已选商品 -->
        <div class="sel-count">
          <span>已选商品</span>
          <strong style="font-size:20px;color:#f40;margin:0 5px;">{{selectedItem.length}}</strong>
          <span>件</span>
        </div>
        <!-- 合计 -->
        <div class="sum-price">
          <span style="display:inline-block;margin-right:10px;">合计(不含运费):</span>
          <strong style="font-size:24px;color:#f40">
            <span style="font-size:14px">￥</span>
            {{sumprice}}
          </strong>
        </div>
        <!-- 结算按钮 -->
        <el-button type="primary" id="sum-btn" @click="toOrder()">结算</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { removeCart } from "../../js/api";
import { getCollection,toGoodCollection } from "../../js/api";
import { post } from "../../js/http";
export default {
  name: "",
  data() {
    return {
      selectedItem: [],
      isAble: false
    };
  },
  created() {
   
  },

  computed: {
    ...mapState(["cartList", "sumprice"]),
    ischeck: {
      get() {
        if (this.cartList.length)
          return this.selectedItem.length == this.cartList.length;
      },
      set(val) {
        if (val) this.selectedItem.length = this.cartList.length;
      }
    }
  },
  methods: {
    toDetails(goodsID) {
      this.$router.push({ path: "/details", query: { id: goodsID } });
    },
    handleSelectionChange(val) {
      // console.log(val);
      if (val.length == 0) {
        this.$store.commit("setSumPrice", 0);
      }
      this.selectedItem = val;
      var price = 0;
      val.forEach(item => {
        this.cartList.forEach((item1, i) => {
          if (item.id == item1.id) {
            price += this.cartList[i].count * item1.price;
          }
        });
      });
      this.$store.commit("setSumPrice", price);
    },
   
    // 减
    btn_minute(item) {
      this.$store.commit("cartItemCount", { id: item.id, value: -1 });
      post("/cart/reduceCount", { goodsID: item.goodsID }).then(res => {
        //  console.log(res)
      });
      this.selectedItem.forEach(selItem => {
        if (selItem.id == item.id) {
          this.$store.commit("setSumPrice", this.sumprice - item.price);
        }
      });
    },
    // 加
    btn_add(item, event) {
      var count = Number(item.count) + 1;
      if (count > item.stock) {
        this.$message.error("已超出库存！");
        this.isAble = true;
      } else {
        this.$store.commit("cartItemCount", { id: item.id, value: 1 });
        post("/cart/addCount", { goodsID: item.goodsID }).then(res => {});
        this.selectedItem.forEach(selItem => {
          if (selItem.id == item.id) {
            this.$store.commit("setSumPrice", this.sumprice + item.price);
          }
        });
      }
    },

    // 全选
    all() {
      this.$refs.multipleTable.toggleAllSelection();
    },
    // 删除某一项
    removeItem(id) {
      this.$confirm("确认删除？")
        .then(res => {
          removeCart({ arrayId: id }).then(res => {
             this.$store.dispatch('getCartList')
          });
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 移入收藏夹
    addCollection(goodsID) {
      this.$confirm("确认移入收藏夹？").then(res => {
      toGoodCollection({goodsID}).then(res=>{
        if(res.result=='success'){
          this.$message.success('已成功移入收藏夹!')
           this.$store.dispatch('getCartList')
        }
      })
    })
    },
    // 删除选中项
    removeSel() {
      var arrayId = this.selectedItem.map(item => item.id);
      // console.log(arrayId);
      removeCart({ arrayId: arrayId.join(",") }).then(res => {
        this.$confirm("确认删除？").then(res => {
          this.$store.dispatch('getCartList')
          this.$message.success("删除成功");
        })
      })
    },
    toOrder(){
      if(this.selectedItem.length){
this.$store.commit('addorder',this.selectedItem)
      this.$router.push('/orderDetails')
      }else{
          this.$alert('请至少选择一件商品',  {
          confirmButtonText: '确定',
        });
     
      }
      
    }
  }
};
</script>
<style lang="less" scoped>
#number {
  width: 140px;
}
.br {
  margin-right: 10px;
  display: block;
}
.el-link {
 
  text-align: left;
}
// 结算
.settlement {
  width: 100%;
  height: 50px;
  background: #fff;
  margin-top: 10px;
  display: flex;
  align-items: center;
  font-size: 15px;
  justify-content: space-between;
  .left {
    width: 20%;
    display: flex;
    justify-content: space-around;
  }
  .right {
    width: 40%;
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sum-price {
      margin-right: 10px;
    }
    #sum-btn {
      height: 50px;
      width: 100px;
      font-size: 18px;
    }
  }
}
.book-image {
  border: 1px solid orangered;
}
.count_sum {
  display: flex;

  flex-direction: row;
  height: 40px;
  width: 120px;
  box-sizing: border-box;
  // .stock {
  //   position: absolute;
  //   left: 0;
  //   bottom: -10px;
  // }
  input {
    width: 45px;
    text-align: center;
  }
  button {
    width: 40px;
    background: #f5f7fa;
    font-size: 18px;
    color: #606266;
    cursor: pointer;
  }
  // button:hover{
  //   color: #409eff
  // }
}
.stock {
  position: absolute;
  top: 100px;
}
.el-table_1_column_1 /deep/ {
  margin-right: 50px;
}
</style>
<style >
</style>