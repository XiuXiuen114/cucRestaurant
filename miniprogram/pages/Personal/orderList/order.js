var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    res_: [],
    order_id: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var res_inf = { 'order_id': null, 'name': null, 'date': null, "address": null, "phone": null, "picture": null, "url": "../waiting_for_meals/wait" }
    var that = this
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })
    db.collection('orders').where({
      user_id: Number(app.globalData.userId)
      //加个状态码
    }).get({
      success: function (res) {
        console.log(res)
        console.log(res.data.length)
        for (var i = 0; i < res.data.length; i++) {
          db.collection('restaurants').where({
            _id: String(res.data[i].res_id)
          }).get({
            success: function (res1) {
              res_inf['order_id'] = res1.data[0]._id
              res_inf['name'] = res1.data[0].res_name
              res_inf['date'] = res.data[0].order_start_time.getFullYear() + '-' + res.data[0].order_start_time.getMonth() + '-' + res.data[0].order_start_time.getDate() + ' ' + res.data[0].order_start_time.getHours() + ":" + res.data[0].order_start_time.getMinutes()
              res_inf['address'] = res1.data[0].res_address
              res_inf['phone'] = res1.data[0].res_phone
              res_inf['picture'] = res1.data[0].res_picture
              that.data.res_.push(res_inf)
              res_inf = { 'name': null, 'date': null, "address": null, "phone": null, "picture": null, }//否则会覆盖原来的值
              console.log(that.data.res_)
              that.setData({
                res_: that.data.res_
              })
            }
          })
        }
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