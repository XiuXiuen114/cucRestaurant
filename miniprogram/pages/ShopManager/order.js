// miniprogram/pages/ShopManager/order.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dishlist: [],
    dishname: [],
    status: null,
    id: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData.userId)
    this.setData({
      status: options.status
    })
    this.getorderList(options.status)
  },

  getorderList: function(status){
    console.log(status)
    var that = this
    that.setData({
      dishlist: [],
      dishname: [],
    })
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })

    var flag 
    if(status == 1){
      flag = 1
    }else{
      flag = 0
    }
    db.collection('orders').where({
      res_id: Number(app.globalData.userId),
      status: flag
    }).get({
      success: function (res) {
      //  console.log(res)
        console.log(res.data.length)
        for (var i = 0; i < res.data.length; i++) {
          for(var j = 0; j < res.data[i].dish_id.length; j++){
            //console.log(res.data[i].dish_id[j])
            if (that.data.dishname.indexOf(res.data[i].dish_id[j].dish_name) > -1){
            //  console.log('yes')
              for (var t = 0; t < that.data.dishlist.length; t++){
                if (res.data[i].dish_id[j].dish_name == that.data.dishlist[t].dish_name){
                  that.data.dishlist[t].count++;
                  break;
                }
              }
            }
            else{
             // console.log('no')
              that.data.dishlist.push({ 'order_id': res.data[i]._id,'dish_picture': res.data[i].dish_id[j].dish_picture, 'dish_name': res.data[i].dish_id[j].dish_name, 'count': 1, 'time': JSON.stringify(res.data[i].order_end_time), 'grade': res.data[i].order_grade, 'user_name':res.data[i].user_name})
              that.data.dishname.push(res.data[i].dish_id[j].dish_name)
            }
          }
        }
        //console.log(that.data.dishname)
        console.log(that.data.dishlist)
        that.setData({
          dishlist: that.data.dishlist
        })
      }
    })
  },

  accept: function(e){
   // console.log(e)
    var that = this;
    that.setData({
      id: e.currentTarget.id
    })
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    db.collection('orders').doc(that.data.id).update({
      data: {
        status: 1
      },
      success: function (res) {
        wx.showToast({
          title: '接单成功！'
        })
       that.getorderList(that.data.status)
      }, fail: function (err) {
        console.log(err);
      }
    })
  },

  refuse: function(e){
   // console.log(e)
    var that = this;
    that.setData({
      id: e.currentTarget.id
    })
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });

    db.collection('orders').doc(that.data.id).update({
      data: {
        status: 2
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '取消接单！'
        })
      that.getorderList(that.data.status)
      }, fail: function (err) {
        console.log(err);
      }
    })
  }
})