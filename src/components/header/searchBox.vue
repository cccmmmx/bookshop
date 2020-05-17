<template>
  <div class="container">
    <div class="searchbox">
      <input
        type="text"
        placeholder="书名"
        @focus="isfocus=true"
        :class="isfocus?'active':''"
        v-model="iptkey"
      />
      <img
        src="@/assets/img/search.png"
        alt
        width="30"
        height="30"
        class="searchBtn"
        @click="find()"
      />
    </div>
    <div class="books-wrapper">
      <div class="item" v-for="item in lists" :key="item.id" @click="goDetails(item.id)">
        <img :src="item.image" alt width="60" />
        <div class="info">
          <p class="title">{{item.name}}</p>
          <p class="author">{{item.author}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBookName } from "../../js/api";
export default {
  name: "searchBox",
  data() {
    return {
      isfocus: false,
      iptkey: "", //输入框关键字
      lists: [],
      fun: null
    };
  },
  watch: {
    iptkey(str) {
      if (typeof str === "string") {
        if (str.trim().length !== 0) {
          this.debounce(this.changeStr, 1000);
        } else {
        }
      }
    },
    $route(to) {
      this.iptkey = "";
      clearTimeout(this.fun);
    }
  },
  mounted() {
    document.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) this.isfocus = false;
      this.lists = [];
    });
  },

  computed: {},
  methods: {
    //   防抖函数·
    debounce: function(fn, wait) {
      if (this.fun !== null) {
        clearTimeout(this.fun);
      }
      this.fun = setTimeout(fn, wait);
    },
    changeStr: function() {
      this.getkey();
    },
    getkey() {
      getBookName(this.iptkey, 1, 5).then(res => {
        this.lists = res.output.data;
      });
    },
    goDetails(id) {
      this.$router.push({ path: "/details", query: { id } });
      this.iptkey = "";
    },

    find() {
      this.$router.push({ path: "/tag", query: { name: this.iptkey } });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  position: relative;
}
.searchbox {
  input {
    background: #eee;
    height: 40px;
    width: 200px;
    border-radius: 20px;
    outline: none;
    padding: 0 40px 0 15px;
    transition: width 0.5s;
    position: relative;
    font-size: 18px;
  }
  input.active {
    width: 250px;
    transition: width 0.5s;
  }
  .searchBtn {
    position: absolute;
    right: 10px;
    top: 25px;
    cursor: pointer;
  }
}
.books-wrapper {
  position: absolute;
  top: 65px;
  left: 0;
  width: 100%;

  z-index: 999;
  .item {
    padding: 5px;
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #eee;
    background: #fff;
    .info {
      margin-left: 5px;
      .title {
        margin-bottom: 5px;
        color: #1890ff;
      }
    }
  }
}
</style>