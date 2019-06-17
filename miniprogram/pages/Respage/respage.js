// pages/Respage/respage.js
const app = getApp();
Page({

  data: {
    res_id: '',//所跳转的餐厅id=全局变量的dishID
    res_info:{},
    res_dishes: [],
    icons: { 'CART': '/icon/dishicon/CART.png'}
  },

  onLoad: function (options) {
    this.res_id = app.globalData.resID.toString();
    console.log(this.res_id);
    this.getBasicInfo();
    this.getAllDishes();
  },

  onShow: function () {

  },
  getAllDishes: function () {
    //从dishes表中查找出属于该餐厅的所有商品
    let that = this;
    const db = wx.cloud.database()
    db.collection('dishes')
      .where({
        shop_id: that.res_id,
      })
      .get()
      .then(res => {
        that.setData({
          res_dishes: res.data
        })
      })
  },
  getBasicInfo: function () {
    //从restaurants表中获取该餐厅的基本信息
    let that=this;
    const db = wx.cloud.database()
    db.collection('restaurants')
      .where({
        _id: that.res_id, 
      })
      .get()
      .then(res => {
        that.setData({
          res_info: res.data[0]
        })
  })
  },// end getBasicInfo
  clickDish: function (e) {
    //从餐厅页面选择的菜品的id赋值给全局变量，并跳转至菜品页面
    app.globalData.dishID=e.currentTarget.dataset.link_id;
    console.log('clickDish id', app.globalData.dishID);
  },
   Clickdish: function (e) {
    var option = e.currentTarget.dataset.dishid;
    app.globalData.dishID = option;
    console.log('Clickdish', app.globalData.dishID);
  },
  addToCart: function (e) {
    let dish = e.currentTarget.dataset.dish;
    console.log('cartDishes', app.globalData.cartDishes);
    //判断该菜品是否在购物车里面，已经在购物车里面则不push
    // console.log(JSON.stringify(app.globalData.cartDishes).indexOf(JSON.stringify(dish)));
    if (JSON.stringify(app.globalData.cartDishes).indexOf(JSON.stringify(dish)) == -1) {
      app.globalData.cartDishes.push(dish);
      console.log('cartDishes', app.globalData.cartDishes);
    } else {
      console.log("已经存在");
    }
  },


})