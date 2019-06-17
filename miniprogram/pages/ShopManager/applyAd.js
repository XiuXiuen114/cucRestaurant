// miniprogram/pages/ShopManager/applyAd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  submit: function(){
    var that = this
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })

    db.collection('ads').add({
      data: {
        _id: app.globalData.userId.toString(),
        apply_time: util.formatTime(new Date()),
        user_address: that.data.address,
        user_name: that.data.nickname,
        user_password: null,
        status: '1',
        user_phone: that.data.telNumber,
        user_picture: that.data.headImg
      },
      success: function (res0) {
        console.log(res0);
        app.globalData.userId = res0._id;
        app.globalData.userType = "2";
        app.globalData.status = '1';
        app.globalData.phone = that.data.telNumber;
        app.globalData.headPhoto = that.data.headImg;
        console.log(app.globalData.userId)
        wx.setStorageSync('userId', app.globalData.userId)
        wx.setStorageSync('userType', "2")
        wx.setStorageSync('phone', that.data.telNumber)
        wx.setStorageSync('headPhoto', that.data.headImg)

        wx.navigateTo({
          url: 'setPsd',
        })
      }
    }, {
        fail: function (err) {
          console.error(err);
        }
      })
  },
  
})