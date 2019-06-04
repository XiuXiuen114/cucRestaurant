// pages/Home/mainpage.js
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
    
    // this.getUpdateDishes();
    // this.getAds();
    // this.getHottestDishes();
    
    // this.insertDishData();
    // this.insertResData();
    // this.insertCommentData();
    // this.insertAdsData();
  },
  //获取广告数据
  getAds: function (){
    db.collection('dishes').where({
      _id: "1"
    }).get({
      success: function (res) {
        console.log(res);
      }
    }, {
        fail: function (err) {
          console.error(err);
        }
      })
  },// end getAds
  //获取今日上新的菜品数据
  getUpdateDishes: function (){
    db.collection('dishes').where({
      _id: "1"
    }).get({
      success: function (res) {
        console.log(res);
      }
    }, {
        fail: function (err) {
          console.error(err);
        }
      })
  },//end getUpdateDishes

  //获取最热菜品数据
  getHottestDishes: function (){
    db.collection('dishes').where({
      _id: "1"
    }).get({
      success: function (res) {
        console.log(res);
      }
    }, {
        fail: function (err) {
          console.error(err);
        }
      })
  },//end getHottestDishes

  // 向数据库dishes中插入数据
  insertDishData: function () {
    console.log('insertDishData function');
    //连接数据库
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });

    db.collection('dishes').add({
      data: {
        _id: "3",
        dish_name: "回锅肉盖饭",
        dish_picture: null,
        own_of_res_id: "",
        dish_price: 13,
        reserved_number: 102,
        thumbs_up: 99,
        thumbs_down: 1,
        update_time: null
      },
      }) 
      .then(res => {
        console.log(res);
      })// end add function

  }, // end insertDishData
  // 向数据库commentses中插入数据
  insertCommentData: function () {
    //连接数据库
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });

    db.collection('comments').add({
      data: {
        _id: "4",
        comment_content:"有点太咸了！",
        comment_time:null,
        dish_id:"2",
        user_id:"1"
      },
      success: function (res) {
        console.log(res);
      }
    }, {
        fail: function (err) {
          console.error(err);
        }
      })

  }, // end insertCommentData
  // 向数据库restaurants中插入数据
  insertResData: function () {
    console.log("insertResData function");
    //连接数据库
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });

     db.collection('restaurants').add({
      data: {
        _id: "4",
        res_name: "麻辣香锅",
        res_picture: null,
        res_address: "星光餐厅",
        res_status: 1,
        res_phone: "12365",
        res_rank: null
      },
      }) 
      .then(res => {
        console.log(res);
      })// end add function

  }, // end insertResData
  // 向数据库ads中插入数据
  insertAdsData: function () {
    console.log("insertAdsData function");
    //连接数据库
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });

    db.collection('ads').add({
      data: {
        _id: "3",
        ad_content:"上新牛肉面！",
        ad_picture:null,
        ad_price:500,
        end_time:null,
        res_id:3,
        start_time:null
      },
    })
      .then(res => {
        console.log(res);
      })// end add function

  }, // end insertAdsData
 
  
})