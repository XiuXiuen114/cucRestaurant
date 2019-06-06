// pages/Home/mainpage.js
var util = require('../../utils/util.js');  
const app=getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {

    re: [],
     //轮播初始化参数
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    ads_list: [],
  },
  //执行点击事件
  formSubmit: function(e){
   // console.log(e.dish_name)
    console.log('nishi')
    const db = wx.cloud.database()
    var that = this
    var formData = e.detail.value.keyword
    db.collection('dishes').where({
      //使用正则查询，实现对搜索的模糊查询
      dish_name: db.RegExp({
        //从搜索栏中获取的value作为规则进行匹配
        regexp: '.*'+formData,
        options: 'i',
        //大小写不区分
      })
    }).get({
      success: res => {
        console.log(res.data)
        that.setData({
          re: JSON.stringify(res.data,null,2)
        })
        //wx.hideLoading();
      }
    }, {
        fail: function (err) {
          console.error(err);
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function (options) {
    this.getAds();//广告轮播初始化,获取ads表内在当天范围内的广告，并赋值给ads_list
    console.log('adslist', this.data.ads_list);
  },
  //获取广告数据
  getAds: function () {
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    const _=db.command
    var cur=new Date().getTime();//当前时间的时间戳
    // console.log('cur_time', cur);
    let that=this;
    db.collection('ads').where({
      end_time: _.gte(cur)
    }).get({

      success: function (res) {
        //res.data为满足条件的json数组
        that.setData({
          ads_list:res.data
        });
      }
    }, {
        fail: console.error
      })
  },// end getAds
  //轮播自动切换
  swiperChange: function(e){

  },
  //轮播选择一张图片
  swiperClick:function(e){
    //跳转至该res-id的首页
    app.globalData.resID = e.target.dataset.link_id;
    console.log('global resID',app.globalData.resID);
  },
  //跳转至useless网页
  goUseless:function(){
    wx.navigateTo({
      url: '/pages/Useless/useless',
    })
  },
  

}) // end pages