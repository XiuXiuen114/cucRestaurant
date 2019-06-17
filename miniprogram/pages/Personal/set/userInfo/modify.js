// miniprogram/pages/Personal/set/userInfo/modify.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    headPhoto:null,
    userInfo: null,
    user_name:null,
    shop_name: null,
    shop_photo: null,
    status: null
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this;
    this.setData({
      headPhoto:app.globalData.headPhoto,
      user_name: app.globalData.user_name,
      shop_name: app.globalData.shop_name,
      shop_photo: app.globalData.shop_photo,
      status: app.globalData.status
    })
  },

  set_Name:function(){
    wx.navigateTo({
      url: '../setName',
    })
  },

  changePsd: function(){
    wx.navigateTo({
      url: '../../../Login/setPsd',
    })
  },

  loadPic:function(){
    var that = this;
      wx.chooseImage({
        count:1,
        sizeType:['compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
          console.log(res.tempFilePaths[0])
          wx.setStorageSync('headPhoto', res.tempFilePaths[0])
          app.globalData.headPhoto = res.tempFilePaths[0]
          that.setData({
            headPhoto: res.tempFilePaths[0]
          })
          getCurrentPages()[getCurrentPages().length - 3].onLoad()

          const db = wx.cloud.database({
            env: 'minidev-ko6dk'
          })
       // db.collection
          db.collection('users').doc(app.globalData.userId).update({
            data: {
              user_picture: res.tempFilePaths[0],
            },
            success:function(res1){
              console.log(res1)
              wx.showToast({
                title: '更换成功！',
              })
            },fail:function(err){
              console.log(err);
            }
          })
        }
      })
  },
 
})