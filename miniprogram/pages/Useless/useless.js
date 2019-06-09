// pages/Useless/useless.js
var util = require('../../utils/util.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit_start_date: null,//获取当前时间
    limit_end_date: null,
    set_start_date: null,
    set_end_date: null,

    duration_array:[1,2,3,4,5,6,7],
    duration:0,
    unit_price:100, //100每天

    //dish attributes
    dish_data: {
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
    //
    res_data: {
      _id: "4",
      res_name: "麻辣香锅",
      res_picture: null,
      res_address: "星光餐厅",
      res_status: 1,
      res_phone: "12365",
      res_rank: null
    },
    //
    comment_data: {
      _id: "4",
      comment_content: "有点太咸了！",
      comment_time: null,
      dish_id: "2",
      user_id: "1"
    },
    //
    ad_data: {
      ad_content: null,
      ad_picture: null,
      ad_price: null,
      start_time:null, //时间戳类型
      end_time:null,
      res_id: 3
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.insertDishData();
    // this.insertResData();
    // this.insertCommentData();
    // this.insertAdsData();

    // this.getUpdateDishes();
    // this.getAds();
    // this.getHottestDishes();
    // console.log('useless onload');
  },
  updateAds:function(){
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    db.collection('ads').doc('todo-identifiant-aleatoire').update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        done: true
      },
      success: console.log,
      fail: console.error
    })
  },
  bindContent:function(e){

    this.setData({
      'ad_data.ad_content':e.detail.value
    });
    console.log("value,content", e.detail.value,this.data.ad_data.ad_content);
  },
  //计算广告时间和收费，按照unit_price
  bindDuration:function(e){
    var value = this.data.duration_array[e.detail.value];
    this.setData({
      duration: value,
      'ad_data.ad_price': this.data.unit_price * value,
    });
    console.log('duration,unit_price,ad_Data', this.data.duration,this.data.unit_price,this.data.ad_data.ad_price);
  },
  setDate: function () {
    this.limit_start_date = new Date();
    this.limit_end_date = new Date();
    var limit_start_date_stamp = this.limit_start_date.getTime(this.limit_start_date);
    var limit_end_date_stamp = limit_start_date_stamp + 30 * 24 * 60 * 60 * 1000;
    this.limit_end_date.setTime(limit_end_date_stamp);

    this.limit_start_date = util.convertDate(this.limit_start_date);
    this.limit_end_date = util.convertDate(this.limit_end_date);
    console.log("current_time,end_time", this.limit_start_date, this.limit_end_date);
  },
  bindStartDate: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      set_start_date: e.detail.value
    })
  },
  bindEndDate: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      set_end_date: e.detail.value
    })
  },
  //获取广告数据
  getAds: function () {
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
  getUpdateDishes: function () {
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
  getHottestDishes: function () {
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
      data: this.data.dish_data
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
      data: this.data.comment_data,
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
      data: this.data.res_data
    })
      .then(res => {
        console.log(res);
      })// end add function

  }, // end insertResData
  // 向数据库ads中插入数据
  insertAdsData: function () {
    //连接数据库
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    console.log('insertAdsData',this.data.ad_data);
    //将菜品数据存储到数据库中
    db.collection('ads').add({
      data: this.data.ad_data
    })
      .then(res => {
        console.log(res);
      })// end add function

  }, // end insertAdsData
  //选择上传一张图片，并将图片路径返回
  uploadImage: function () {
    let that=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          'ad_data.ad_picture': res.tempFilePaths[0]
        });
        console.log(res.tempFilePaths[0]);
      },
    }) // end wx
  }, // end uploadImg
  submitAd:function(){
    var start = new Date().getTime();//当前时间的时间戳
    var end = start + this.data.duration * 24 * 60 * 60 * 1000;
    this.setData({
      'ad_data.start_time': start,
      'ad_data.end_time': end,
    });
    this.insertAdsData();
  }
})