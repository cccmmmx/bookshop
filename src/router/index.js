import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
        // mode: 'history',
        routes: [{
                path: '/',
                name: 'index',
                component: Index,
                meta: {
                    requireAuth: false,
                    index: true
                }
            },
            {
                path: '/tag',
                name: 'bookTag',
                component: () =>
                    import ('@/views/bookTag'),
                meta: {
                    requireAuth: false,
                    index: true
                }
            },
            {
                path: '/details',
                name: 'details',
                component: () =>
                    import ('@/views/details'),
                meta: {
                    requireAuth: false,
                    index: true
                }
            },
            // 模糊搜索页面
            {
                path: '/serachPage/key=:key',
                name: 'serachPage',
                component: () =>
                    import ('@/views/searchPage'),
                meta: {
                    index: true
                }
            },
            //登录注册页面路由
            {
                path: '/user',
                component: () =>
                    import ('@/views/user'),
                name: 'user',
                redirect: { name: 'login' },
                meta: {
                    index: false
                },
                children: [{
                        path: 'login',
                        name: 'login',
                        component: () =>
                            import ('@/views/user/login'),
                        meta: {
                            index: false
                        },
                    },
                    {
                        path: 'register',
                        name: 'register',
                        component: () =>
                            import ('@/views/user/register'),
                        meta: {
                            index: false
                        },
                    },
                ]
            },
            // 购物车路由
            {
                path: '/cart',
                name: 'cart',
                component: () =>
                    import ('@/views/cart'),
                meta: {
                    requireAuth: true,
                    index: true
                }
            },
            // 收藏夹
            {
                path: '/collection',
                name: 'collection',
                component: () =>
                    import ('@/views/collection'),
                meta: {
                    requireAuth: true,
                    index: true
                }
            },
            //订单详情页
            {
                path: '/orderDetails',
                name: 'orderDetails',
                component: () =>
                    import ('@/views/order/orderDetails'),
                meta: {
                    requireAuth: true,
                    index: true
                }
            },
            // 账号管理页面
            {
                path: '/userinfo',
                name: 'userinfo',
                component: () =>
                    import ('@/views/userinfo'),
                meta: {
                    index: true
                },
                children: [{
                        path: '',
                        name: 'personal_info',
                        component: () =>
                            import ('@/views/userinfo/personal_info'),
                        meta: {
                            index: true
                        }
                    },
                    {
                        path: 'address',
                        name: 'address_info',
                        component: () =>
                            import ('@/views/userinfo/address_info'),
                        meta: {
                            index: true
                        }
                    }
                ]
            },
            // 商家管理页面
            {
                path: '/seller',
                name: 'seller',
                component: () =>
                    import ('@/views/seller'),
                redirect: { name: 'bookMessage' },
                meta: {
                    index: false,

                },
                children: [{
                        path: '/seller/uploadBook',
                        name: 'uploadBook',
                        component: () =>
                            import ('@/views/seller/uploadBook'),
                        meta: {
                            index: false,
                            i:2
                        }
                    },
                    {
                        path: '/seller/bookMessage',
                        name: 'bookMessage',
                        component: () =>
                            import ('@/views/seller/bookMessage'),
                        meta: {
                            index: false,
                            i: 1
                        }
                    },
                    {
                        path: '/seller/orderManage',
                        name: 'orderManage',
                        component: () =>
                            import ('@/views/seller/orderManage'),
                        meta: {
                            index: false,
                            i: 3
                        }
                    },
                    {
                        path: '/seller/sellMsg',
                        name: 'sellMsg',
                        component: () =>
                            import('@/views/seller/sellMsg'),
                        meta: {
                            index: false,
                            i: 4
                        }
                    }
                ]
            },
            {
                path: '/myOrder',
                name: 'myOrder',
                component: () =>
                    import('@/views/userinfo/myOrder'),
                meta: {
                    index: true,
                    requireAuth: true,
                }
            }
        ],

    })
    // router.beforeEach((to, from, next) => {
    //     if (to.meta.requireAuth) {
    //        next({name:'login'})
    //     } else {
    //         next()
    //    }
    // })



export default router
