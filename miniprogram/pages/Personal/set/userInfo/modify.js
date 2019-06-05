// miniprogram/pages/Personal/set/userInfo/modify.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    headPhoto:null,
    userInfo: null,
    user_name:null
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this;
    this.setData({
      headPhoto:app.globalData.headPhoto
    })
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })
    db.collection('users').where({
      _id: app.globalData.userId
    }).get({
      success: function (res) {
        that.setData({
          user_name: res.data[0].user_name
        })
      }, fail: function (err) {
        console.log(err)
      }
    })
  },
  set_Name:function(){
    wx.redirectTo({
      url: '../setName',
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