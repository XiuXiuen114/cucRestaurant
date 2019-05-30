// miniprogram/pages/Login/register.js

var app = getApp();
var util = require('../../utils/util.js');  

Page({
  /**
   * 页面的初始数据
   */
  data: {
    verificationCode: null,
    telNumber: null,
    passwd: null,
    codeInputDisable: false,
    currentTime: 600,  //验证码有效时间为10分钟
    sendCodeBtnText: "获取验证码",  
    headImg: null,
    nickname: null,
    address: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      headImg: app.globalData.userInfo.avatarUrl,
      nickname: app.globalData.userInfo.nickName,
      address: app.globalData.userInfo.country + ' ' + app.globalData.userInfo.province
       + ' ' + app.globalData.userInfo.city
    })
  },

  getVerificationCode: function (e) {
    this.setData({
      verificationCode: e.detail.value
    })
  },

  getTelNumber: function (e) {
    this.setData({
      telNumber: e.detail.value
    })
  },

  getPsd: function (e) {
    this.setData({
      passwd: e.detail.value
    })
  },

  getCode: function(){
    var that = this;
    if(that.data.telNumber){
      /*第一步：验证手机号码*/
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; // 判断手机号码的正则表达式
      if (that.data.telNumber.length < 11) {
          wx.showToast({
            title: '手机号码长度有误!',
            duration: 2000,
            icon: 'none'
          });
          return;
        } else if (!myreg.test(that.data.telNumber)) {
          wx.showToast({
            title: '手机号码无效!',
            duration: 2000,
            icon: 'none'
          });
          return;
        }
        /*第二步：设置计时器*/
        // 先禁止获取验证码按钮的点击
        that.setData({
          codeInputDisable: true,
        })
        // 60s倒计时 setInterval功能用于循环，常常用于播放动画，或者时间显示
        var currentTime = that.data.currentTime;
        var interval = setInterval(function () {
          currentTime--;
          that.setData({
            sendCodeBtnText: currentTime + '秒后重新获取'
          })
          if (currentTime <= 0) {
            clearInterval(interval)
            that.setData({
              sendCodeBtnText: '获取验证码',
              currentTime: 60,
              codeInputDisable: false
            })
          }
        }, 1000);

        /*第三步：请求验证码*/
        that.sendMess();

    }else{
      wx.showToast({
        title: '手机号码不能为空!',
        duration: 2000,
        icon: 'none'
      });
    }
  },

  sendMess: function(){
    var smsvercode = requirePlugin("smsvercode");  //引用短信校验码插件
    smsvercode.getvercode(this.data.telNumber, function (res) {  
      if (res.errno == "0") {
      }
      else {
        wx.showToast({
          title: '发送失败',
        })
      }
    });
  },

  addUser: function(){
    var that = this;
    //连接数据库
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    });
    var bizContent = {
      "register_time": util.formatTime(new Date()) ,
      "user_address": that.data.address,
      "user_name": that.data.nickname,
      "user_password": that.data.passwd,
      "user_phone": that.data.telNumber,
      "user_picture": that.data.headImg
    }
    db.collection('users').add({
      data: {
        bizContent
      },
      success: function (res) {
        console.log(res);
        app.globalData.userId = res._id;
        app.globalData.userType = 1;
        wx.setStorageSync('userId', res._id)
        wx.setStorageSync('userType', 1)
      }
    }, {
        fail: function (err) {
          console.error(err);
        }
      })
  },

  applySubmit: function(){
    var that = this;
    var smsvercode = requirePlugin("smsvercode");  //引用短信校验码插件
    //手机与验证码进行匹配
    smsvercode.checkvercode(that.data.telNumber, that.data.verificationCode, function (res) {
      if (res.errno == "0") {
        // wx.showToast({
        //   title: '校验成功',
        // })

        //匹配成功再进行用户添加
        that.addUser();
      }
      else {
        wx.showToast({
          title: '校验失败',
        })
      }
    });
  }
})