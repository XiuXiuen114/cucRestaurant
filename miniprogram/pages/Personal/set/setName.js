// miniprogram/pages/Personal/set/setName.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:app.globalData.user_name
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getUsername: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  
  submit:function(){
    var that=this;
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })
    app.globalData.user_name = that.data.userName
    wx.setStorageSync('userName', that.data.userName)
    // db.collection
    db.collection('users').doc(app.globalData.userId).update({
      data: {
        user_name: that.data.userName
      },
      success: function (res) {
        console.log(that.data.userName)
        wx.showToast({
          title: '更改成功！'
        })
        getCurrentPages()[getCurrentPages().length - 4].onLoad()
        getCurrentPages().pop()
        // wx.navigateTo({
        //   url: 'userInfo/modify',
        // })
        wx.navigateBack({
        })
      }, fail: function (err) {
        console.log(err);
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