import axios from "axios";
import {get, post } from "./http";

// 获取所有分类信息
export const getCategoryAll = () => {
    return get("/category/getCategoryAll");
};

// 通过分类获取书籍商品
export const getGoodsPage = (categoryID, pageNumber, pageSize) => {
    return get(`/goods/getGoodsPage`, {
        params: { categoryID, pageNumber, pageSize },
    });
};

// 通过状态获取书籍商品
export const getGoodsState = (state, pageNumber, pageSize) => {
    return get(`/goods/getGoodsPage`, {
        params: { state, pageNumber, pageSize },
    });
};

// 通过id获取书籍信息
export const getBooksDetails = (bookId) => {
    return get("/goods/getGoodsDetail", { params: { id: bookId } });
};

// 获取收藏信息
export const getCollection = (pageNumber, pageSize) => {
    return get("/collection/userFavorite", { params: { pageNumber, pageSize } });
};
// 删除收藏
export const deleBook = (goodsID) => {
  return  post("/collection/CancelFavorite", goodsID);
};
// 根据书名获取书籍
export const getBookName = (name, pageNumber, pageSize) => {
    return get("/goods/getGoodsPage", { params: { name, pageNumber, pageSize } });
};

// 更新用户信息
export const updateMsg = (obj) => {
    return post("/customer/customerUpdate", obj);
};

// 更新商家信息
export const updateSellerMsg = (obj) => {
    return post("seller/sellerUpdate", obj);
};

// 获取商家信息
export const getSellMsg = () => {
    return get("seller/getSellerMember");
}
// 获取用户信息
export const getUserMsg = (obj) => {
    return get("customer/getMember");
};

// 商家注册
export const sellerReg = (form) => {
    return post("/seller/sellerRegister", form);
};

// 会员注册
export const customerReg = (form) => {
    return post("/customer/customerRegister", form);
};

// 添加购物车
export const addCart = (goodsID) => {
    return post("/cart/addCart", goodsID);
};

// 获取购物车信息
export const getCart = () => {
    return get("/cart/getCartItem");
};

// 删除购物车项
export const removeCart = (arrayId) => {
    return post("/cart/cartDelete", arrayId);
};


//购物车移入收藏夹
export const toGoodCollection = goodsID => {
    return post("/cart/toGoodCollection", goodsID);
};

// 获取收货地址
export const getAddress = () => {
    return get("Cms/getAddress");
}

// 添加收货地址
export const addAddress = form => {
    return post("/Cms/addAddress", form);
}

// 编辑收货地址
export const editAddress = form => {
    return post("/Cms/editAddress", form);
}

// 删除收货地址
export const deleAddress = id => {
    return post("/Cms/deleteAddress", id);
}

// 设为默认地址
export const setDefault = id => {
    return post('/Cms/setDefaultReceiver',id)
}

// 通过父类获取子类
export const getCategory = parent => {
    return get('/category/getCategoryText', { params: { parent}})
}

//上传书籍信息
export const uploadBook = goods => {
    return post('/Cms/uploadGoods',goods)
}

// 商家获取书籍信息
export const getSellerBook = (pageNumber, pageSize,grade) => {
    return get('/seller/getsSellerBook', { params: { pageNumber, pageSize,grade}})
}

// 商家商品上下架
export const setBookState = params => {
    return post('/seller/bookChangeState', params)
}

//商家商品删除
export const deleBooks = id => {
    return post('/seller/sellerBookDelete', id)
}
//商家商品修改
export const editBooks = form => {
    return post('/seller/sellerBookUpdate', form)
}


//获取数字字典
export const getMessage = () => {
    return get('/parameter/getParameter')
}

// 下单
export const setOrder = form => {
    return post('/orderitem/createOrder', form)
}

// 总订单支付
export const allOrder = id => {
    return post('/orderitem/pay',id)
}

// 子订单支付
export const sonOrder = id => {
    return post('/orderitem/orderPay', id)
}


// 获取个人订单
export const getMyOrder = status => {
    return get('/customer/getUserOrder', { params: { status}})
}


// 个人未支付订单的删除
export const removeOrder = id => {
    return post('/customer/deleteUserOrder', id)
}


// 商家获取个人订单
export const getSellerOrder = status => {
    return get('/seller/getSellerOrder', { params: { status } })
}

// 商家发货处理
export const deliverOrder = id => {
    return post('/seller/sellerDeliverOrder', id)
}
