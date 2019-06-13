// pages/Home/searchpage/searchpage.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    re: [],
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  searchdish: function (e) {

    const db = wx.cloud.database()
    var that = this
    var formData = e.detail.value.keyword
    db.collection('dishes').where({
      //使用正则查询，实现对搜索的模糊查询
      dish_name: db.RegExp({
        //从搜索栏中获取的value作为规则进行匹配
        regexp: '.*' + formData,
        options: 'i',
        //大小写不区分
      })
    }).get({
      success: res => {
        console.log('搜索结果', res.data)
        that.setData({
          re: JSON.stringify(res.data, null, 2)
        })
        //wx.hideLoading();
      }
    }, {
        fail: function (err) {
          console.error(err);
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