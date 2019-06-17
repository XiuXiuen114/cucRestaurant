// miniprogram/pages/Personal/comment/commenr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dish_info:null,
    shop_name:null,
    shop_picture:null,
    shop_address:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      dish_info:JSON.parse(unescape(options.dish_Info))
    })
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })
    db.collection('restaurants').where({
      _id:String(that.data.dish_info[0].shop_id)
    }).get({
      success:function(res){
        that.setData({
          shop_address:res.data[0].res_address,
          shop_name:res.data[0].res_name,
          shop_picture:res.data[0].res_picture
        })
      }
    })
    console.log(that.data.dish_info)
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