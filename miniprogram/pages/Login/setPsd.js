// miniprogram/pages/Login/setPsd.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    passwd1: null,
    passwd2: null,
    isShowPassword: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.passwd){
      wx.navigateTo({
        url: 'login',
      })
    }
  },

  toggleShowPassword: function(){
    var isShowPassword = !this.data.isShowPassword;
    this.setData({
      isShowPassword: isShowPassword
    });
  },

  getPsd1: function (e) {
    this.setData({
      passwd1: e.detail.value
    })
  },

  getPsd2: function (e) {
    this.setData({
      passwd2: e.detail.value
    })
  },

  confirm: function(){
    var that = this;
    //console.log(app.globalData.userId)
    if(that.data.passwd1 == that.data.passwd2){
      wx.setStorageSync('passwd', that.data.passwd1);
      app.globalData.passwd = that.data.passwd1;
      app.globalData.resetPsd = false;
      //连接数据库
      const db = wx.cloud.database({
        env: 'minidev-ko6dk'
      });

      db.collection('users').where({
        _id:app.globalData.userId
      }).get({
        success: function (res) {
          console.log(res);
          db.collection('users').doc(app.globalData.userId).update({
            data: {
              user_password: that.data.passwd1
            },
            success: function (res) {
              console.log(res);
              wx.navigateTo({
                url: 'login',
              })
           }
          }, {
            fail: function (err) {
              console.error(err);
            }
        })
        }
      }, {
          fail: function (err) {
            console.error(err);
          }
        })
    }else{
      wx.showToast({
        title: '密码不匹配!',
        duration: 2000,
        icon: 'none'
      });
    }
  }
})