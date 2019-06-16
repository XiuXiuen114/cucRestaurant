// pages/Cartpage/cartpage.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ],
    cart_dishes:[],//购物车全部的菜品列表，两个字段【dish_name,dish_count】，从globaldata取出dish_name字段
    selected_dishes:[],//选择结算的菜品列表
    total_price:null,//所选菜品的总共价格
    total_dishes_count:null,//一共选了几个菜【菜*个数 累加和】
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData();
  },
  submitCart:function(){

  },
  getDbDish:function(dish_id){
    // const db = wx.cloud.database();
    // db.collection('dishes').where({
    //   _id: dish_id // 填入当前用户 openid
    // }).get({
    //   success: function (res) {
    //     console.log('getDishName res',res);      
    //   }
    // })
  },
  setData:function(){//cart_dishes的两个字段
    // let that=this;
    // for (dish in app.globalData.cart_dishes){//dish只是一个id
    //   let dbdish=that.getDbDish(dish);
    //   this.cart_dishes.push({'name':dbdish,'price':});
    // }
    // this.setData({
    //   dishes_list:app.globalData.cartDishes
    // })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    this.setData({
      selected_dishes: e.detail.value
    })
  }
})