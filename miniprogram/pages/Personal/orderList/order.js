var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    res_: [],
    order_res: null,
    order_id: null,
    address_id: null,
    res_id: null
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var count = 0;
    var res_inf = { "res_id": null, 'name': null, 'date': null, "address": null, "phone": null, "picture": null, "url": "../waiting_for_meals/wait" }
    var that = this
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })
    db.collection('orders').where({
      user_id: Number(app.globalData.userId),
      status: 1
      //商家已接单
    }).get({
      success: function (res) {
        that.setData({
          order_res: res
        })
        for (var i = 0; i < res.data.length; i++) {
          db.collection('restaurants').where({
            _id: String(res.data[i].res_id)
          }).get({
            success: function (res1) {
              res_inf['order_id'] = that.data.order_res.data[count]._id;
              count++;
              res_inf['res_id'] = res1.data[0]._id
              res_inf['name'] = res1.data[0].res_name
              res_inf['date'] = res.data[0].order_start_time.getFullYear() + '-' + res.data[0].order_start_time.getMonth() + '-' + res.data[0].order_start_time.getDate() + ' ' + res.data[0].order_start_time.getHours() + ":" + res.data[0].order_start_time.getMinutes()
              res_inf['address'] = res1.data[0].res_address
              res_inf['phone'] = res1.data[0].res_phone
              res_inf['picture'] = res1.data[0].res_picture
              that.data.res_.push(res_inf)
              res_inf = { 'order_id': null, 'res_id': null, 'name': null, 'date': null, "address": null, "phone": null, "picture": null, }//否则会覆盖原来的值
              that.setData({
                res_: that.data.res_
              })
            }
          })
          console.log(that.data.res_)
        }
        // for(var n=0;n<that.data.res.length;n++){

        // }
      }
    })//get
  },
  view_dish: function (e) {
    var that = this
    that.setData({
      res_id: e.currentTarget.id
    })
    console.log(that.data.res_id)
    app.globalData.resID = that.data.res_id
    wx.navigateTo({
      url: '../../Respage/respage'
    })
  },
  view_shop: function (e) {
    var that = this
    // console.log(e.currentTarget.id)
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })
    db.collection('canteen').where({
      address: e.currentTarget.id
    }).get({
      success: function (res) {
        that.setData({
          address_id: res.data[0]._id
        })
        app.globalData.canteenID = String(that.data.address_id)
        wx.navigateTo({
          url: '../../Home/shoppage/shoppage'
        })
    }
    })
  },
  order_info: function (e) {
    var that = this
    console.log(e)
    that.setData({
      order_id: e.currentTarget.id
    })
    wx.navigateTo({
      url: '../waiting_for_meals/wait?order_Id=' + that.data.order_id
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