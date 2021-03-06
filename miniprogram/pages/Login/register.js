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
   // passwd: null,
    codeInputDisable: false,
    currentTime: 60,  //验证码有效时间为1分钟
    sendCodeBtnText: "获取验证码",  
    headImg: null,
    nickname: null,
    address: null,
    id: null
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
    console.log(app.globalData.userId)
    if(app.globalData.userId && !app.globalData.resetPsd){
      wx.navigateTo({
        url: 'setPsd',
      })
    }
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

    db.collection('users').where({
    }).count({
      success: function (res) {
        console.log(res)
        db.collection('users').where({
         // _id: app.globalData.userId
        }).get({
          success: function (res0) {
           // console.log(res0.data[res.total-1]._id);  //获取users表最后一个记录的id
          // console.log(res0)
            if (res.total != 0){
              that.setData({
                id: parseInt(res0.data[res.total - 1]._id) + 1
              })
            }else{
              that.setData({
                id: 1
              })
            }
            console.log(that.data.id)
            db.collection('users').add({
              data: {
                _id: that.data.id.toString(),
                register_time: util.formatTime(new Date()),
                user_address: that.data.address,
                user_name: that.data.nickname,
                user_password: null,
                status: '1',
                user_phone: that.data.telNumber,
                user_picture: that.data.headImg
              },
              success: function (res0) {
                console.log(res0);
                app.globalData.userId = res0._id;
                app.globalData.userType = "2";
                app.globalData.status = '1';
                app.globalData.phone = that.data.telNumber;
                app.globalData.headPhoto = that.data.headImg;
                console.log(app.globalData.userId)
                wx.setStorageSync('userId', app.globalData.userId)
                wx.setStorageSync('userType', "2")
                wx.setStorageSync('phone', that.data.telNumber)
                wx.setStorageSync('headPhoto', that.data.headImg)

                wx.navigateTo({
                  url: 'setPsd',
                })
              }
            }, {
                fail: function (err) {
                  console.error(err);
                }
              })

          }
        })
        that.setData({
          users_length: (res.total + 1).toString()
        })
      
      }
    })
  },

  applySubmit: function(){
    var that = this;
    var smsvercode = requirePlugin("smsvercode");  //引用短信校验码插件
    //手机与验证码进行匹配
    smsvercode.checkvercode(that.data.telNumber, that.data.verificationCode, function (res) {
      if (res.errno == "0") {
        //匹配成功再进行用户添加
        if(!app.globalData.resetPsd){
          that.addUser();
        }else{
          //忘记密码入口
          wx.navigateTo({
            url: 'setPsd',
          })
        }
      }
      else {
        wx.showToast({
          title: '校验失败',
        })
      }
    });
  }
})