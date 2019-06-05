// miniprogram/pages/Personal/waiting_for_meals/wait.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dish:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })
    db.collection('orders').where({
      user_id:2
    }).get({

      success:function(res){
        console.log(res)
          that.setData({
            dish:res.data[0].dish_id
          })
        console.log(that.data.dish)
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