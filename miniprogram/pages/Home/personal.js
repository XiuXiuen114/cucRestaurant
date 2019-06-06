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
    userName:null,
    userFlag: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.setData({
      userInfo: app.globalData.userInfo,
      head:app.globalData.headPhoto,
      userFlag:app.globalData.userType
    })
    const db = wx.cloud.database({
      env: 'minidev-ko6dk'
    })
    db.collection('users').where({
      _id:app.globalData.userId
    }).get({
      success:function(res){
        console.log(res)
        that.setData({
          userName:res.data[0].user_name
        })
        console(userName)
      },fail: function (err) {
        console.log(err)
      }
    })
    console.log(app.globalData.userType)
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

  // exitLogin: function(){
  //   wx.setStorageSync('userType', "2");
  //   app.globalData.userType = "2";
  //   this.setData({
  //     userInfo: app.globalData.userInfo,
  //     userFlag: "2"
  //   })
  // }
})
