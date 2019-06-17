// miniprogram/pages/Personal/waiting_for_meals/wait.js
var app = getApp()
Page({
  /**
  * 页面的初始数据
  */
  data: {
    comment_status:null,
    ps:null,
    count: 0,
    time: null,
    total_price: 0,
    orderId: null,
    status:null,
    resId: null,
    dish: [],
    dish_imf: []
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this
    that.setData({
      orderId: options.order_Id
    })
    console.log("click Order_id:" + that.data.orderId)
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })
    db.collection('orders').where({
      user_id: app.globalData.userId,
      _id: that.data.orderId
    }).get({
      success: function (res) {
        that.setData({
          comment_status:res.data[0].if_comment,
          ps:res.data[0].ps,
          dish_imf: res.data,
          count: res.data.length,
          status:res.data[0].order_status
        })
       // console.log(that.data.dish_imf)
        for (var i = 0; i < that.data.count; i++) {
          that.setData({
            time: that.data.dish_imf[i].order_time
          })
          for (var j = 0; j < that.data.dish_imf[i].dishes.length; j++) {
            that.setData({
              total_price: that.data.dish_imf[i].order_price
            })
          }
        }
        console.log(that.data.dish_imf[0].dishes[0]._id)
       getApp().globalData.dishID = that.data.dish_imf[0].dishes[0]._id
        console.log(that.data.dish_imf)//一次预定
      }
    })
    console.log(app.globalData.dishID)
  },
  view_comment:function(){
    var that = this
    getApp().globalData.dishID = that.data.dish_imf[0].dishes[0]._id
    console.log(app.globalData.dishID)
    wx.navigateTo({
      url: '../../Home/comment/comment',
    })
  },
  submit:function(e){
    var that = this
    console.log(e.currentTarget.dataset.dish[0])
    wx.navigateTo({
      url: '../comment/comment?dish_Info=' + escape(JSON.stringify(e.currentTarget.dataset.dish))
    })
  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
  },
  /**
  * 生命周期函数--监听页面隐藏
  */
  onHide: function () {
  },
  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
  }
})