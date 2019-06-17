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
  onLoad: function (options)  {
    this.setCartData();
    this.calTotalPrice();
  },
  calTotalPrice:function(){
    // console.log("cart_dishes", this.data.cart_dishes);
    this.data.total_price=0;
    let that=this;
    this.data.cart_dishes.forEach(function(item){
      that.data.total_price+=item.number*item.dish_price
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
      // that.data.cart_dishes.push({'dish':item,'number':1})
      item['number'] = 1;
      that.data.cart_dishes.push(item)
    });
    this.setData({
      cart_dishes:that.data.cart_dishes
    });

    console.log("setData dishes",this.data.cart_dishes);
  },
  //将选择的菜品插入到orders表
  insertOrders:function(){
    let curDate=new Date();
    //遍历整个cart_dishes,找到number==0的删除
    for(let i=0;i<this.data.cart_dishes.length;i++){
      let temp_dish=this.data.cart_dishes[i];
      if(temp_dish.number==0){
        this.data.cart_dishes.splice(i,1);
      }else{

      }
    }
    console.log("insert cart_dishes",this.data.cart_dishes);
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    let that=this;
    db.collection('orders').add({
      data:{
        user_id: app.globalData.userID,
        dishes:that.data.cart_dishes,
        user_name: app.globalData.userName,
        order_time:util.formatTime(curDate),
        order_sub:'',
        ps:'',
        order_grade:null,
        order_price: that.data.total_price,
        order_status:0,//未接单
      },
      success:function(res){
        console.log('insertOrders res',res);
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