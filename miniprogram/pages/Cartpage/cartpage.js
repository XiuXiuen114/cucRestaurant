// pages/Cartpage/cartpage.js
var util = require('../../utils/util.js');
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart_dishes:[],//购物车全部的菜品列表，两个字段【dish,number】，从globaldata取出dish字段
    total_price:0,//所选菜品的总共价格
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setCartData();
    this.calTotalPrice();
  },
  calTotalPrice:function(){
    // console.log("cart_dishes", this.data.cart_dishes);
    this.data.total_price=0;
    let that=this;
    this.data.cart_dishes.forEach(function(item){
      that.data.total_price+=item.number*item.dish.dish_price
    })
    this.setData({
      total_price:that.data.total_price
    });
    // console.log("totalprice", this.data.total_price);
  },
  addNumber:function(e){
    console.log('dish_index event', e);
    let index = e.currentTarget.dataset.dish_index;
    this.data.cart_dishes[index].number++;
    let that=this;
    this.setData({
      cart_dishes:that.data.cart_dishes
    });
    this.calTotalPrice();
    
  },
  minusNumber: function (e) {
    console.log('dish_index event', e);
    let index = e.currentTarget.dataset.dish_index;
    if (this.data.cart_dishes[index].number>=1){
      this.data.cart_dishes[index].number--;
      let that = this;
      this.setData({
        cart_dishes: that.data.cart_dishes
      });
    }
    this.calTotalPrice();
  },
  setCartData:function(){
    let that=this;
    app.globalData.cartDishes.forEach(function(item){
      that.data.cart_dishes.push({'dish':item,'number':1})
    });
    this.setData({
      cart_dishes:that.data.cart_dishes
    });
  },
  //将选择的菜品插入到orders表
  insertOrders:function(){
    let curDate=new Date();
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    let that=this;
    db.collection('orders').add({
      data:{
        dishes:that.data.cart_dishes,
        order_start_time:util.formatTime(curDate),
        order_end_time:null,
        status:0,//未接单
        time_sub:'中午12点',
        user_id:app.globalData.userID,
        user_name:app.globalData.userName,
        order_price:that.data.total_price,

      },
      success:function(res){
        console.log(res);
      },
      fail:console.error
    })
  },
  submitCart:function(){
    //提示订单支付成功

    //向数据库中插入数据
    this.insertOrders();
    //跳转至订单状态页面

  },

 
})