// pages/Home/dishpage/dishpage.js
const app= getApp();
Page({
  /**

   * 页面的初始数据

   */
  data: {
    is_shoucang: 0,
   
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDishID();
    this.getcomment();
  },
  getDishID: function(e)
  {
    var dishID=app.globalData.dishID
    const db = wx.cloud.database()
    var that = this
    db.collection('dishes').where
      ({
        _id: dishID
      }).get
      ({
        success: function (res) {
          //res.data为满足条件的json数组
          console.log('getdishes', res.data);
          that.setData({
            dishes: res.data
          });
        }
      }, {
        fail: console.error
      })
  },
  getcomment: function (e) {
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
          console.log('getcomment', res.data);
          that.setData({
            comments: res.data
          });
        }
      }, {
        fail: console.error
      })
  },
})
