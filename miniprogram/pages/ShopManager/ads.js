// miniprogram/pages/ShopManager/ads.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adlist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAds();
  },

  apply: function(){  //跳转到申请广告页面
    wx.navigateTo({
      url: './applyAd',
    })
  },

  getAds: function(){  //获取已有广告
    var that = this
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })
    db.collection('ads').where({
      res_id: Number(app.globalData.userId),
      flag: true
    }).get({
      success: function (res) {
         console.log(res)
         that.setData({
           adlist: res.data
         })
      },
       fail: function (err) {
        console.error('获取广告数据失败：', err)
      }
    })
  },

  cancel: function(e){
    console.log(e)
    var id = e.currentTarget.id
    var that = this
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })
    db.collection('ads').doc(id).remove({
      success: function (res) {
        wx.showToast({
          title: '取消成功！'
        })
        that.getAds()
      }, fail: function (err) {
        console.log(err);
      }
    })
  }
})