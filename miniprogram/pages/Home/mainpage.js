// pages/Home/mainpage.js
var util = require('../../utils/util.js');
// var hoticon = require('../../icon/mainpageicon/HOT.png');  
// var newicon = require('../../icon/mainpageicon/NEW.png');  
const app = getApp();
//var base64 = require("../images/base64");
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
    duration: 500,
    ads_list: [],

    icons: [{ 'picture': '/icon/mainpageicon/NEW.png', 'name': '上新' },
    { 'picture': '/icon/mainpageicon/HOT.png', 'name': '榜单' },
    { 'picture': '/icon/mainpageicon/REC.png', 'name': '推荐' }],
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  },
  //执行点击事件
  formSubmit: function (e) {
    wx.navigateTo({
      url: '/pages/Home/tmp/tmp',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dishList();
    // this.getAds();//广告轮播初始化,获取ads表内在当天范围内的广告，并赋值给ads_list
    // this.getIcons();
  },
  onShow: function (options) {
    this.getAds();//广告轮播初始化,获取ads表内在当天范围内的广告，并赋值给ads_list
    // console.log('adslist', this.data.ads_list);
  },
  getIcons: function () {
    this.data.icons.push({ 'picture': '/icon/mainpageicon/NEW.png', 'name': '上新' });
    this.data.icons.push({ 'picture': '/icon/mainpageicon/HOT.png', 'name': '最热' });
    console.log('icons', this.data.icons);
  },
  //选择上新、榜单、推荐
  clickOption: function (e) {
    let option = e.currentTarget.dataset.option;
    switch (option) {
      case '上新':
        app.globalData.rankID = 0;
        break;
      case '榜单':
        app.globalData.rankID = 1;
        break;
      case '推荐':
        app.globalData.rankID = 2;
        break;
    }
    console.log('clickOption', option);
  },
  //获取广告数据
  getAds: function () {
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    const _ = db.command
    var cur = new Date().getTime();//当前时间的时间戳
    // console.log('cur_time', cur);
    let that = this;
    db.collection('ads').where({
      flag: true
    }).get({

      success: function (res) {
        //res.data为满足条件的json数组
        that.setData({
          ads_list: res.data
        });
        console.log(that.data.ads_list)
      }
    }, {
        fail: console.error
      })
  },// end getAds
  //轮播自动切换
  swiperChange: function (e) {

  },
  //轮播选择一张图片
  swiperClick: function (e) {
    //跳转至该res-id的首页
    app.globalData.resID = e.target.dataset.link_id;
    console.log('target link id', e.target.dataset.link_id);
    this.goRespage();
  },
  goUseless: function () {
    wx.navigateTo({
      url: '/pages/Useless/useless',
    })
  },
  //跳转至店家首页
  goRespage: function () {
    wx.navigateTo({
      url: '/pages/Respage/respage',
    })
  },

  //列表相关函数

  //各个餐厅信息
  dishList: function () {
    const db = wx.cloud.database()

    var that = this
    db.collection('canteen').get({
      success(res) {
        console.log('canteen', res.data)
        that.setData({
          list: res.data
        })

      }
    }, {
        fail: function (err) {
          console.error(err);
        }
      })

  },
  //餐厅点击事件
  viewitem: function (e) {
    var option = e.currentTarget.dataset.resturants_id;
    app.globalData.canteenID = option;
    console.log('viewitem', app.globalData.canteenID);
  }

}) // end pages
