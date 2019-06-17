// pages/Home/comment/comment.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getcomment();
  },
  getcomment: function(e)
  {
    var dishID = app.globalData.dishID
    const db = wx.cloud.database()
    var that = this
    db.collection('comments').where
      ({
        dish_id: dishID
      }).get
      ({
        success: function (res) {
          //res.data为满足条件的json数组
          console.log('comment', res.data);
          that.setData({
            comments: res.data
          });
        }
      }, {
        fail: console.error
      })
  },
})