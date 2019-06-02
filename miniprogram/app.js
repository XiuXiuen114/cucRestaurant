//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    this.globalData.userId = wx.getStorageSync('userId')
    this.globalData.userType = wx.getStorageSync('userType')
    this.globalData.passwd = wx.getStorageSync('passwd')
    this.globalData.phone = wx.getStorageSync('phone')
    this.getUserInfoIfAuthed();
   // console.log(this.globalData.userId)
  },

  getUserInfoIfAuthed: function () {
    var that = this;
    // 获取用户信息  
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框  
          wx.getUserInfo({
            success: res1 => {
              console.log("用户信息:");
              console.log(res1.userInfo)
              that.globalData.userInfo = res1.userInfo;
              wx.setStorageSync('userInfo', res1.userInfo)
             // wx.setStorageSync('userType', 1)
            }
          })
        }
      }
    });
  },

  // 全局变量
  globalData: {
    userInfo: null,
    userType: "1", //标记注册和登录状态，1为未注册，2为已注册未登录，3为登录
    hasUserInfo: false,
    userId: null,
    phone: null,
    passwd: null,
    resetPsd: false,  //忘记密码相关参数
    appid: 'wxafa0fcf8440c7289'
  }
})
