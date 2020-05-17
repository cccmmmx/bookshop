import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate"; //Vuex持久化存储配置
import axios from "axios";
import { getCart } from "../js/api";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: "",
        userMsg: "", //用户信息
        sellMsg: "",
        cartList: "",
        cartNum:'',
        orderList: [], //订单
        isUser: "",
        sumprice: 0, //购物车结算总额
    },
    mutations: {
        //  存储token
        setToken(state, val) {
            state.token = val;
        },
        getBooksList(state, val) {
            state.booksTags = val;
        },
        getTitle(state, val) {
            state.title = val;
        },
        BooksList(state, val) {
            state.BooksList = val;
        },
        // 用户是否登陆
        isLogin(state, val) {
            console.log(val);
            state.userMsg = val; //保存用户信息
        },
        sellMsg(state, val) {
            console.log(val);
            state.sellMsg = val; //保存商家信息
        },
        isUser(state, val) {
            state.isUser = val;
        },
        // 存储购物车信息
        setCart(state, val) {
            if (!val.length ) {
                state.cartNum = ''
                state.cartList = '';
            } else {
                state.cartNum = val.length
                state.cartList = val;
            }
        },
        // 购物车每项商品的数量
        cartItemCount(state, obj) {
            state.cartList.forEach((item) => {
                if (obj.id == item.id) {
                    // var count = parseInt(item.count)
                    item.count = parseInt(item.count) + obj.value;
                }
            });
        },
        setSumPrice(state, val) {
            state.sumprice = val;
        },

        // 存储订单信息
        addorder(state, val) {
            state.orderList = val
        },
    },
    actions: {
      getCartList({ commit ,state}) {
            getCart().then(res => {
                if (state.token) {
                 // console.log(res.data)
                 commit("setCart", res.data);
            }

            });
        }
    },
    modules: {},
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
            reducer: (state) => ({
                token: state.token,
                userMsg: state.userMsg,
                sellMsg:state.sellMsg
            }),
        }),
    ],
});
