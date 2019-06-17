// miniprogram/pages/ShopManager/applyAd.js
var app = getApp();
var util = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ad_content: null,
    ad_picture: null,
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getContent: function (e) {
    this.setData({
      ad_content: e.detail.value
    })
  },

  setPhoto: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          ad_picture: res.tempFilePaths[0]
        })
      }
    })
  },

  addAd: function () {
    var that = this;
    //连接数据库
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });

    db.collection('ads').where({
    }).count({
      success: function (res) {
        console.log(res)
        db.collection('ads').where({
        }).get({
          success: function (res0) {
            console.log(res0);  //获取ads表最后一个记录的id
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
            db.collection('ads').add({
              data: {
                _id: that.data.id.toString(),
                res_id: parseInt(app.globalData.userId),
                apply_time: util.formatTime(new Date()),
                end_time: null,
                ad_price: 0,
                ad_picture: that.data.ad_picture,
                ad_content: that.data.ad_content,
                flag: false  //表明广告没有审核
              },
              success: function (res1) {
                console.log(res1);
                wx.showModal({
                  title: '温馨提示',
                  content: '您的申请已提交，请等待后台审核。',
                  success: function (res) {
                    wx.navigateBack({
                      
                    })
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
        that.setData({
          users_length: (res.total + 1).toString()
        })

      }
    })
  },
})