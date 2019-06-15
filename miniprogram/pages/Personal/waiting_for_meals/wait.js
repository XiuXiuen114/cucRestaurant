// miniprogram/pages/Personal/waiting_for_meals/wait.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:0,
    resId:null,
    dish:[],
    dish_imf:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
      var that = this
      console.log(options.order_Id)
      that.setData({
        resId: options.order_Id
      })
      console.log(that.data.orderId)
      const db = wx.cloud.database({
        env: 'minidev-ko6dk'
      })
      db.collection('orders').where({
        user_id: Number(app.globalData.userId),
        res_id: Number(that.data.resId)
      }).get({
        success: function (res) {
          console.log(res)
          that.setData({
            dish_imf: res.data,
            order_time: res.data[0].order_start_time ,
            count: res.data.length
          })
          for (var i = 0; i < that.data.count; i++) {
            that.data.dish_imf[i].order_start_time = that.data.dish_imf[i].order_start_time.getFullYear() + '-' + that.data.dish_imf[i].order_start_time.getMonth() + '-' + that.data.dish_imf[i].order_start_time.getDate() + ' ' + that.data.dish_imf[i].order_start_time.getHours() + ":" + that.data.dish_imf[i].order_start_time.getMinutes()
          }
          console.log(that.data.dish_imf)//一次预定 
          console.log(that.data.order_time)
        }
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