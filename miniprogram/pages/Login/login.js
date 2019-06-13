// miniprogram/pages/Login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: null,
    passwd: null,
    isShowPassword: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userType == '3'){
      wx.switchTab({
        url: '../Home/personal',
      })
    }
  },

  toggleShowPassword: function () {
    var isShowPassword = !this.data.isShowPassword;
    this.setData({
      isShowPassword: isShowPassword
    });
  },

  getTelNumber: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  getPsd: function (e) {
    this.setData({
      passwd: e.detail.value
    })
  },

  login: function(){
    if(app.globalData.passwd = this.data.passwd && app.globalData.phone == this.data.phone){
      console.log("登录成功！")
      wx.setStorageSync('userType', "3");
      app.globalData.userType = "3";
      console.log(app.globalData.userType)
      wx.switchTab({
        url: '../Home/personal',
        success(res){
          getCurrentPages().pop().onLoad();
        }
      })
    }else{
      wx.showToast({
        title: '用户名或密码错误!',
        duration: 2000,
        icon: 'none'
      });
    }
  },

  forgetPsd: function(){
    app.globalData.resetPsd = true;
    app.globalData.passwd = null;
    wx.navigateTo({
      url: 'register',
    })
  }
})