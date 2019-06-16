//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: "minidev-ko6dk"
      })
    }

    this.globalData.userInfo = wx.getStorageSync('userInfo')
    this.globalData.userType = wx.getStorageSync('userType')
    this.globalData.headPhoto = wx.getStorageSync('headPhoto')
    this.globalData.userType = wx.getStorageSync('userType') ? wx.getStorageSync('userType'):1
    this.globalData.shop_photo = wx.getStorageSync('shop_photo')
    this.globalData.shop_name= wx.getStorageSync('shop_name')
    this.globalData.user_name = wx.getStorageSync('userName')
    this.globalData.userId = wx.getStorageSync('userId')
    this.globalData.phone = wx.getStorageSync('phone')
    this.globalData.headPhoto = wx.getStorageSync('headPhoto')
    this.globalData.status = wx.getStorageSync('status') ? wx.getStorageSync('status'):1
    this.getUserInfoIfAuthed();
     const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });

    if (this.globalData.phone && this.globalData.status == '1'){
      //连接数据库
      db.collection('users').where({
        user_phone: this.globalData.phone,
      }).get({
        success: function (res) {
          console.log(res);
          wx.setStorageSync('userId',res.data[0]._id)
          wx.setStorageSync('headPhoto', res.data[0].user_picture)
          wx.setStorageSync('userName', res.data[0].user_name)
          getCurrentPages().pop().onLoad();
        }
      })
    } else if (this.globalData.phone && this.globalData.status == '2'){
        db.collection('restaurants').where({
          res_phone: this.globalData.phone,
        }).get({
          success: function (res) {
            console.log(res);
            wx.setStorageSync('userId', res.data[0]._id)
            wx.setStorageSync('shop_photo', res.data[0].res_picture)
            wx.setStorageSync('shop_name', res.data[0].res_name)
            getCurrentPages().pop().onLoad();
          }
        })
    }
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
           //   console.log(res1.userInfo)
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
    headPhoto: null,
    shop_photo: null,
    shop_name: null,
    user_name: null,
    resetPsd: false,  //忘记密码相关参数
    appid: 'wxafa0fcf8440c7289',
    openid:'',
    status: '1', //1表示是师生用户，2表示是商家，从而显示不同的主页
    resID:null,//店家首页
    dishID:null,//菜品首页
    rankID: null,//0表示上新、1表示最热、2表示推荐
    cartDishes:[],//购物车中的菜品列表
  }
})

