
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_dishes: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getcanteenID();
  },
  getcanteenID: function () {
    console.log('getcanteen', app.globalData.canteenID)
    switch (app.globalData.canteenID) {
      case '1':
        this.getXG();
        break;
      case '2':
        this.getNY();
        break;
      case '3':
        this.getBY();
        break;
      case '4':
        this.getZL();
        break;
      case '5':
        this.getBZJ();
        break;
      case '6':
        this.getQZ();
        break;
    }
  },
  //星光餐厅的所有店家
  getXG: function (options) {
    const db = wx.cloud.database()
    var that = this
    db.collection('restaurants').where
     ({
        kind: '星光餐厅'
     }).get
      ({
        success: function (res) {
          //res.data为满足条件的json数组
          console.log('getXG', res.data);
          that.setData({
            all_dishes: res.data
          });
        }
      }, {
        fail: console.error
      })
  },// end getXG
  //南苑餐厅的所有店家
  getNY: function (options) {
    const db = wx.cloud.database()
    var that = this
    db.collection('restaurants').where
      ({
        kind: '南苑餐厅'
      }).get
      ({
        success: function (res) {
          //res.data为满足条件的json数组
          console.log('getNY', res.data);
          that.setData({
            all_dishes: res.data
          });
        }
      }, {
        fail: console.error
      })
  },// end getNY
  //北苑餐厅的所有店家
  getBY: function (options) {
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    let that = this;
    db.collection('restaurants').where
      ({
        kind: '北苑餐厅'
      }).get
      ({
        success: function (res) {
          //res.data为满足条件的json数组
          console.log('getBY', res.data);
          that.setData({
            all_dishes: res.data
          });
        }
      }, {
        fail: console.error
      })
  },// end getBY
  //中蓝餐厅的所有店家
  getZL: function (options) {
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    let that = this;
    db.collection('restaurants').where
      ({
        kind: '中蓝餐厅'
      }).get
      ({
        success: function (res) {
          //res.data为满足条件的json数组
          console.log('getZL', res.data);
          that.setData({
            all_dishes: res.data
          });
        }
      }, {
        fail: console.error
      })
  },// end getZL
  //梆子井餐厅的所有店家
  getBZJ: function (options) {
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    let that = this;
    db.collection('restaurants').where
      ({
        kind: '梆子井餐厅'
      }).get
      ({
        success: function (res) {
          //res.data为满足条件的json数组
          console.log('getBZJ', res.data);
          that.setData({
            all_dishes: res.data
          });
        }
      }, {
        fail: console.error
      })
  },// end getBZJ
  //清真餐厅的所有店家
  getQZ: function (options) {
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    let that = this;
    db.collection('restaurants').where
      ({
        kind: '清真餐厅'
      }).get
      ({
        success: function (res) {
          //res.data为满足条件的json数组
          console.log('getQZ', res.data);
          that.setData({
            all_dishes: res.data
          });
        }
      }, {
        fail: console.error
      })
  },// end getQZ
  Clickres: function(e)
  {
    var option = e.currentTarget.dataset.resid;
    app.globalData.resID = option;
    console.log('Clickres', app.globalData.resID);
  }
})