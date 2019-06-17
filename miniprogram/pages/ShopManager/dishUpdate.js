// miniprogram/pages/ShopManager/dishUpdate.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdishList();
  },

  getdishList: function () {  //获取商家菜品
    var that = this
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })
    db.collection('dishes').where({
      shop_id: Number(app.globalData.userId)
    }).get({
      success: function (res) {
        console.log(res)
        that.setData({
          dishlist: res.data
        })
      },
      fail: function (err) {
        console.error('获取广告数据失败：', err)
      }
    })
  },

  add: function (e) {
    // console.log(e)
    // var that = this;
    // that.setData({
    //   id: e.currentTarget.id
    // })
    // const db = wx.cloud.database({
    //   env: 'minidev-ko6dk'
    // });
    // db.collection('orders').doc(that.data.id).update({
    //   data: {
    //     status: 1
    //   },
    //   success: function (res) {
    //     wx.showToast({
    //       title: '接单成功！'
    //     })
    //     that.getorderList(that.data.status)
    //   }, fail: function (err) {
    //     console.log(err);
    //   }
    // })
    wx.navigateTo({
      url: './addDish',
    })
  },

  remove: function (e) {
    var that = this;
    console.log(e)
    wx.showModal({
      title: '温馨提示',
      content: '您确定移除该菜品吗？',
      success: function (res) {
        if (res.confirm) {
          var id = e.currentTarget.id
          const db = wx.cloud.database({
            env: 'minidev-ko6dk'
          });

          db.collection('dishes').doc(id).remove({
            success: function (res0) {
              console.log(res0)
              wx.showToast({
                title: '移除成功！'
              })
              that.getdishList()
            }, fail: function (err) {
              console.log(err);
            }
          })
        }
      }
    })
  }
})