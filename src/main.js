import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import animated from "animate.css"; //

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; //引入element组件库
import "@/assets/css/common.css"; //全局样式
// 引入封装的axios
import axios from "./js/http";
// import axios from 'axios'

import "bootstrap";

router.beforeEach((to, from, next) => {
    if (to.path == "/cart") {
        store.commit("setSumPrice", 0);
    }
    next();
});

Vue.use(ElementUI);
Vue.use(animated);
Vue.prototype.axios = axios;
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");