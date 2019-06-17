// pages/Home/dishpage/dishpage.js
const app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
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
          that.setData({
            commentlist: [],
          })
          for (var i = 0; i < res.data.length; i++) {
            that.data.commentlist.push({ '_id': res.data[i]._id, 'comment_content': res.data[i].comment_content, 'comment_time': JSON.stringify(res.data[i].comment_time), 'user_id': res.data[i].user_id ,'user_pic':res.data[i].user_pic,'user_name':res.data[i].user_name});
          }
          console.log('commentlist', that.data.commentlist);
          that.setData({
            comments: that.data.commentlist
          });
         // console.log('comment', comment);
        }
      }, {
        fail: console.error
      })
  },
  buy: function(e)
  {
    let option = e.currentTarget.dataset.buyid;
    app.globalData.cartDishes.push(option);
    console.log('Clickbuy', option)
  },
  addToCart: function (e) {
    let dish = e.currentTarget.dataset.dish;
    console.log('cartDishes', app.globalData.cartDishes);
    //判断该菜品是否在购物车里面，已经在购物车里面则不push
    // console.log(JSON.stringify(app.globalData.cartDishes).indexOf(JSON.stringify(dish)));
    if (JSON.stringify(app.globalData.cartDishes).indexOf(JSON.stringify(dish)) == -1) {
      app.globalData.cartDishes.push(dish);
      console.log('cartDishes', app.globalData.cartDishes);
    } else {
      console.log("已经存在");
    }
  },
})

