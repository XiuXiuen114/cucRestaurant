var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    menuitems: [
      { text: '待取餐', url: "../Personal/waiting_for_meals/wait", icon: '../../icon/shijian.png', tips: '', arrows: '../../icon/youjiantou.png' },
      { text: '历史订单', url: "../Personal/orderList/order", icon: '../../icon/consumeList.png', tips: '', arrows: '../../icon/youjiantou.png' },
      { text: '帮助说明', url: "../Personal/help/help", icon: '../../icon/fuwudianpu.png', tips: '', arrows: '../../icon/youjiantou.png' },
      { text: '关于我们', url: "../Personal/about_us/about", icon: '../../icon/person.png', tips: '', arrows: '../../icon/youjiantou.png' },
      { text: '设置', url: "../Personal/set/setInfo", icon: '../../icon/shezhi.png', tips: '', arrows: '../../icon/youjiantou.png' },
    ],
    userInfo: null,
    userFlag: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      userFlag:app.globalData.userType
    })
    console.log(this.data.userFlag)
  },

  register: function(){
    wx.navigateTo({
      url: '../Login/register',
    })
  },

  login: function(){
    wx.navigateTo({
      url: '../Login/login',
    })
  },

  exitLogin: function(){
    wx.setStorageSync('userType', "2");
    app.globalData.userType = "2";
    this.setData({
      userInfo: app.globalData.userInfo,
      userFlag: "2"
    })
  }
})
