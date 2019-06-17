// pages/Rankpage/rankpage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rank_dishes:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRankID();
  },
  addToCart: function (e) {
    let dish=e.currentTarget.dataset.dish;
    console.log('cartDishes', app.globalData.cartDishes);
    //判断该菜品是否在购物车里面，已经在购物车里面则不push
    // console.log(JSON.stringify(app.globalData.cartDishes).indexOf(JSON.stringify(dish)));
    if (JSON.stringify(app.globalData.cartDishes).indexOf(JSON.stringify(dish))==-1){
      app.globalData.cartDishes.push(dish);
      console.log('cartDishes', app.globalData.cartDishes);
    }else{
      console.log("已经存在");
    }
  },
  getRankID:function(){
    switch(app.globalData.rankID){
      case 0:
        this.getNew();
        break;
      case 1:
        this.getHot();
        break;
      case 2:
        this.getRec();
        break;
    }
  },
  //获取上新数据；dishes表中取updatetime前10名
  getNew: function (options) {
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    let that = this;
    console.log('getNew');
    db.collection('dishes').orderBy
      ('update_time', 'desc').limit(20).get
    ({
      success: function (res) {
        //res.data为满足条件的json数组
        console.log('getNew', res.data);
        that.setData({
          rank_dishes: res.data
        });
      }
    }, {
        fail: console.error
      })
  },// end getNew
  //获取榜单数据；dishes表中取thumbsup前10名
  getHot: function (options) {
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    let that = this;
    console.log('getHot');
    db.collection('dishes').orderBy
      ('thumbs_up', 'desc').limit(20).get
      ({
        success: function (res) {
          //res.data为满足条件的json数组
          console.log('getHot', res.data);
          that.setData({
            rank_dishes: res.data
          });
        }
      }, {
        fail: console.error
      })
  },//end getHot
  //获取推荐数据；orders表中userid为当前用户的dishid前10名
  getRec: function (options) {
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    let that = this;
    that.setData({
      dishlist:[]
    });
    console.log('userID', app.globalData.userId);
    db.collection('orders').where({
      user_id:app.globalData.userId,
      order_status:3
    }).get({
        success: function (res) {
          //res.data为满足条件的json数组
         // console.log('每一lie', res.data[0].dishes[0].dish_name);
          for(var i=0;i<res.data.length;i++)
          {
            for(var j=0;j<res.data[i].dishes.length;j++)
            {
                   console.log('每一条', res.data[i].dishes[j].dish_name);
                  that.data.dishlist.push(res.data[i].dishes[j]);
            }
          }
          console.log('getRec', that.data.dishlist);
          that.setData({
            rank_dishes: that.data.dishlist
          });
        }
      }, {
        fail: console.error
      })
  }, //end getRec
  Clickdish: function (e) {
    var option = e.currentTarget.dataset.dishid;
    app.globalData.dishID = option;
    console.log('Clickdish', app.globalData.dishID);
  },
  
})