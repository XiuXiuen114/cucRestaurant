// miniprogram/pages/Personal/waiting_for_meals/wait.js
var app = getApp()
Page({
  /**
  * 页面的初始数据
  */
  data: {
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
      user_id: Number(app.globalData.userId),
      _id: that.data.orderId
    }).get({
      success: function (res) {
        that.setData({
          dish_imf: res.data,
          count: res.data.length,
          status:res.data[0].status
        })
        for (var i = 0; i < that.data.count; i++) {
          that.setData({
            time: that.data.dish_imf[i].order_start_time.getFullYear() + '-' + that.data.dish_imf[i].order_start_time.getMonth() + '-' + that.data.dish_imf[i].order_start_time.getDate() + ' ' + that.data.dish_imf[i].order_start_time.getHours() + ":" + that.data.dish_imf[i].order_start_time.getMinutes()
          })
          for (var j = 0; j < that.data.dish_imf[i].dish_id.length; j++) {
            that.setData({
              total_price: that.data.total_price + that.data.dish_imf[i].dish_id[j].dish_price
            })
          }
        }
        console.log(that.data.dish_imf)//一次预定
      }
    })
  },
  submit:function(e){
    var that = this
    console.log(e.currentTarget.dataset.dish[0])
    wx.navigateTo({
      url: '../comment/comment?dish_Info=' + e.currentTarget.dataset.dish[0]
    })
    console.log("dishinfo:"+dishinfo)
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