// miniprogram/pages/ShopManager/order.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderlist: [],
    order_id: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userId)
    var res_inf = { 'dish_id': null, 'name': null, 'date': null, "address": null, "phone": null, "picture": null, "url": "../waiting_for_meals/wait" }
   this.getorderList()
  },

  getorderList: function(){
    var that = this
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })

    db.collection('orders').where({
      res_id: Number(app.globalData.userId)
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
  }
})