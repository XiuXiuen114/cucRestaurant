// miniprogram/pages/Personal/comment/commenr.js
var util = require('../../../utils/util.js')
var app = getApp()
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    comment_flag:null,
    order_id:null,
    dish_info:null,
    noteMaxLen: 50,
    noteNowLen: 0,
    info: '',
    flag: 0,
    shop_name:null,
    shop_picture:null,
    shop_address:null
  },
  bindTextAreaChange: function (e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({ info: value, noteNowLen: len })

  },
  bindSubmit: function () {
    var time = util.formatTime(new Date())
    var that = this;
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })
    db.collection('comments').add({
      data:{
        comment_content:that.data.info,
        comment_time:time,
        dish_id:that.data.dish_info[0].dishes[0]._id,
        user_id: that.data.dish_info[0].user_id,
        user_name:app.globalData.user_name,
        user_pic: app.globalData.headPhoto
      },success:function(res){
        console.log(res)
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1500,
          mask: false,
          success: function () {
            that.setData({
              info: '',
              noteNowLen: 0,
              flag: 0
            })
          }
        })
      }//success
    })
    console.log(that.data.dish_info[0]._id)
    db.collection('orders').doc(
      that.data.dish_info[0]._id
    ).update({
      data: {
        if_comment: 1
      }, success:function(res){
        that.setData({
          comment_flag:1
        })
        wx.navigateTo({
          url: '../waiting_for_meals/wait?order_Id=' + that.data.order_id
        })
        getCurrentPages()[getCurrentPages().length].onLoad
        getCurrentPages()[getCurrentPages().length-1].onLoad
        console.log(res)
      },
      fail: console.log
    })
    console.log(that.data.info)
    console.log(that.data.flag)
    // wx.navigateTo({
    //   url: '../waiting_for_meals/wait?order_Id=' + that.data.order_id
    // })


  },
  changeColor1: function () {
    var that = this;
    that.setData({
      flag: 1
    });
  },
  changeColor2: function () {
    var that = this;
    that.setData({
      flag: 2
    });
  },
  changeColor3: function () {
    var that = this;
    that.setData({
      flag: 3
    });
  },
  changeColor4: function () {
    var that = this;
    that.setData({
      flag: 4
    });
  },
  changeColor5: function () {
    var that = this;
    that.setData({
      flag: 5
    });
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
          shop_phone:res.data[0].res_phone,
          shop_picture:res.data[0].res_picture
        })
      }
    })
    console.log(that.data.dish_info)
    that.setData({
      order_id:that.data.dish_info[0]._id
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