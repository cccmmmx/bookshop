<template>
  <div id="Cart">
    <h2 style="margin-bottom:20px;font-size:24px;font-weight:bold">购物车</h2>
    <!-- 购物车表单 -->
    <cart-table v-if="isempty" />

    <!-- 空购物车 -->
    <empty v-else />
    <!-- <recommended :count="5"/> -->
  </div>
</template>
<script>
import recommended from "../../components/recommened";
import empty from "./empty";
import cartTable from "./cart_table";
// import { getCart } from "../../js/api";
export default {
  name: "Cart",
  data() {
    return {
      cartList: []
    };
  },
  created() {
   
  },

  computed: {
    isempty() {
      return this.$store.state.cartList.length;
    }
  },
  components: { cartTable, empty, recommended }
};
</script>
<style lang="less" scoped>
</style>
<style lang="less" >
</style>