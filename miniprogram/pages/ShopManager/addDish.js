// miniprogram/pages/ShopManager/addDish.js
var app = getApp();
var util = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dish_picture: null,
    dish_price: null,
    dish_name: null,
    id: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.shop_name)
  },

  getPrice: function (e) {
    this.setData({
      dish_price: e.detail.value
    })
  },

  getName: function (e) {
    this.setData({
      dish_name: e.detail.value
    })
  },

  setPhoto: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.setStorageSync('shop_photo', res.tempFilePaths[0])
        that.setData({
          dish_picture: res.tempFilePaths[0]
        })
      }
    })
  },

  addDish: function () {
    var that = this;
    //连接数据库
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });

    db.collection('dishes').where({
    }).count({
      success: function (res) {
        console.log(res)
        db.collection('dishes').where({
        }).get({
          success: function (res0) {
            console.log(res0.data);  //获取dishes表最后一个记录的id
            if (res.total != 0) {
              that.setData({
                id: parseInt(res0.data[res.total - 1]._id) + 1
              })
            } else {
              that.setData({
                id: 1
              })
            }
            console.log(that.data.id)
            db.collection('dishes').add({
              data: {
                _id: that.data.id.toString(),
                update_time: util.formatTime(new Date()),
                dish_name: that.data.dish_name,
                shop_id: Number(app.globalData.userId),
                shop_name: app.globalData.shop_name,
                dish_price: Number(that.data.dish_price),
                dish_picture: that.data.dish_picture,
                thumbs_down: 0,
                thumbs_up: 0,
                reserved_number: 0
              },
              success: function (res0) {
                console.log(res0);
                wx.showToast({
                  title: '上传成功！',
                })
                wx.navigateBack({
                  success(res){
                    getCurrentPages()[getCurrentPages().length-1].onLoad()
                  }
                })
              }
            }, {
                fail: function (err) {
                  console.error(err);
                }
              })
          }
        })
      }
    })
  },
})