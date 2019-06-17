// miniprogram/pages/ShopManager/dishUpdate.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishlist: [],
    price : null,
    name: null,
    hiddenmodalput: true,
    dish_picture: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdishList();
  },

  getName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  getPrice: function (e) {
    this.setData({
      price: e.detail.value
    })
  },

  changePhoto: function (e) {
    var that = this;
    console.log(e)
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.setStorageSync('shop_photo', res.tempFilePaths[0])
        that.setData({
          dish_picture: res.tempFilePaths[0]
        })

        const db = wx.cloud.database({
          env: 'minidev-ko6dk'
        });
        db.collection('dishes').doc(e.currentTarget.id).update({
          data: {
            dish_picture: that.data.dish_picture
          },
          success: function (res) {
            wx.showToast({
              title: '修改成功！'
            })
            that.getdishList()
          }, fail: function (err) {
            console.log(err);
          }
        })
      }
    })
  },

  //取消按钮  
  cancel: function (e) {
    this.setData({
      hiddenmodalput: true
    })
  },

  //确认按钮  
  confirm: function (e) {
    this.setData({
      hiddenmodalput: true
    })
    if(this.data.name != null){
      console.log('change name')
      this.changeName(e.currentTarget.id)
    }
    if(this.data.price != null){
      console.log('change price')
      this.changePrice(e.currentTarget.id)
    }
  },

  //点击hiddenmodalput弹出框  
  modalinput: function () {
    this.setData({
      hiddenmodalput: false
    })
  },

  getdishList: function () {  //获取商家菜品
    var that = this
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })
    db.collection('dishes').where({
      shop_id: Number(app.globalData.userId)
    }).get({
      success: function (res) {
        console.log(res)
        that.setData({
          dishlist: res.data
        })
      },
      fail: function (err) {
        console.error('获取广告数据失败：', err)
      }
    })
  },

  add: function (e) {
    // console.log(e)
    // var that = this;
    // that.setData({
    //   id: e.currentTarget.id
    // })
    // const db = wx.cloud.database({
    //   env: 'minidev-ko6dk'
    // });
    // db.collection('orders').doc(that.data.id).update({
    //   data: {
    //     status: 1
    //   },
    //   success: function (res) {
    //     wx.showToast({
    //       title: '接单成功！'
    //     })
    //     that.getorderList(that.data.status)
    //   }, fail: function (err) {
    //     console.log(err);
    //   }
    // })
    wx.navigateTo({
      url: './addDish',
    })
  },

  remove: function (e) {
    var that = this;
    console.log(e)
    wx.showModal({
      title: '温馨提示',
      content: '您确定移除该菜品吗？',
      success: function (res) {
        if (res.confirm) {
          var id = e.currentTarget.id
          const db = wx.cloud.database({
            env: 'minidev-ko6dk'
          });

          db.collection('dishes').doc(id).remove({
            success: function (res0) {
              console.log(res0)
              wx.showToast({
                title: '移除成功！'
              })
              that.getdishList()
            }, fail: function (err) {
              console.log(err);
            }
          })
        }
      }
    })
  },

  changePrice: function(id){
    var that = this;
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    db.collection('dishes').doc(id).update({
      data: {
        dish_price: Number(that.data.price)
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '修改成功！'
        })
        that.getdishList()
      }, fail: function (err) {
        console.log(err);
      }
    })
  },

  changeName: function(id){
    var that = this;
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    db.collection('dishes').doc(id).update({
      data: {
        dish_name: that.data.name
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '修改成功！'
        })
        that.getdishList()
      }, fail: function (err) {
        console.log(err);
      }
    })
  }
})