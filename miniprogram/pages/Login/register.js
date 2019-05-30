// miniprogram/pages/Login/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verificationCode: null,
    telNumber: null,
    passwd: null,
    codeInputDisable: false,
    currentTime: 600,
    sendCodeBtnText: "获取验证码",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    /*第三步：请求验证码接口，并记录服务器返回的验证码用于判断*/
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

  applySubmit: function(){
    var that = this;
    var smsvercode = requirePlugin("smsvercode");  //引用短信校验码插件
    smsvercode.checkvercode(that.data.telNumber, that.data.verificationCode, function (res) {
      if (res.errno == "0") {
        wx.showToast({
          title: '校验成功',
        })
      }
      else {
        wx.showToast({
          title: '校验失败',
        })
      }
    });
  }
})