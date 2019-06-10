// miniprogram/pages/Personal/waiting_for_meals/wait.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_time:[],
    dish:[],
    dish_imf:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })
    db.collection('orders').where({
      user_id:Number(app.globalData.userId)
    }).get({
      success:function(res){
          that.setData({
            dish:res.data[0].dish_id
          })
        for(var i=0;i<that.data.dish.length;i++){
         db.collection('dishes').where({
          _id: String(res.data[0].dish_id[i])
        }).get({
          success: function (res1) {
            that.data.order_time.push(res.data[0].order_start_time)
            that.data.dish_imf.push(res1.data[0])
            that.setData({
              dish_imf:that.data.dish_imf,
              order_time:that.data.order_time
            })
           }//success
         })//get
        }
        console.log(that.data.dish_imf)
        console.log(that.data.order_time)
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