// miniprogram/pages/Start/startPage.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(this.data.userInfo)
    wx.getSetting({
      success: res => {
        // 先判断用户是否授权获取用户信息
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            userInfo: res.authSetting
          })
          //console.log(this.data.userInfo);
          this.goToMain();
        }
      }
    })
  },

  goToMain: function (e) {
    wx.switchTab({
      url: '../Home/personal',
    })
  },

  onGotUserInfo: function () {
    wx.getSetting({
      success: res => {
        console.log(res.authSetting)
        // 先判断用户是否授权获取用户信息，如未授权，则会弹出授权框
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              // console.log("获取用户信息：")
              // console.log(res)
              this.setData({
                userInfo: res.userInfo
              });
              app.globalData.userType = 1;
              app.globalData.userInfo = res.userInfo;
              wx.switchTab({
                url: '../Home/personal',
              })
            }
          })
        }
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