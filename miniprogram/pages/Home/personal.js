var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 师生功能列表
    menuitems: [
      { text: '待取餐', url: "../Personal/orderList/order", icon: '../../icon/shijian.png', tips: '', arrows: '../../icon/youjiantou.png' },
      { text: '历史订单', url: "../Personal/historyList/history_list", icon: '../../icon/consumeList.png', tips: '', arrows: '../../icon/youjiantou.png' },
      { text: '帮助说明', url: "../Personal/help/help", icon: '../../icon/fuwudianpu.png', tips: '', arrows: '../../icon/youjiantou.png' },
      { text: '关于我们', url: "../Personal/about_us/about", icon: '../../icon/person.png', tips: '', arrows: '../../icon/youjiantou.png' },
      { text: '设置', url: "../Personal/set/setInfo", icon: '../../icon/shezhi.png', tips: '', arrows: '../../icon/youjiantou.png' },
    ],
    // 商家功能列表
    menuitems2: [
      { text: '待处理订单', url: "../ShopManager/order?status=0", icon: '../../icon/shijian.png', tips: '', arrows: '../../icon/youjiantou.png' },
      { text: '订单统计', url: "../ShopManager/order?status=1", icon: '../../icon/shijian.png', tips: '', arrows: '../../icon/youjiantou.png' },
      { text: '菜品更新', url: "../ShopManager/dishUpdate", icon: '../../icon/consumeList.png', tips: '', arrows: '../../icon/youjiantou.png' },
      { text: '广告推广', url: "../ShopManager/ads", icon: '../../icon/fuwudianpu.png', tips: '', arrows: '../../icon/youjiantou.png' },
      { text: '设置', url: "../Personal/set/setInfo", icon: '../../icon/shezhi.png', tips: '', arrows: '../../icon/youjiantou.png' },
    ],
    userInfo: null,
    userName:null,
    userFlag: null,
    status: null,
    shop_name: null,
    shop_image: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(app.globalData.status)
    this.setData({
      userInfo: app.globalData.userInfo,
      head:app.globalData.headPhoto,
      userName:wx.getStorageSync('userName'),
      userFlag:app.globalData.userType,
      status: app.globalData.status,
      shop_name: app.globalData.shop_name ? app.globalData.shop_name : wx.getStorageSync('shop_name'),
      shop_image: app.globalData.shop_photo ? app.globalData.shop_photo : wx.getStorageSync('shop_photo'),
    })
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

  register_shop: function(){
    wx.navigateTo({
      url: './register_shop',
    })
  },

})
