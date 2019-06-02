// miniprogram/pages/Personal/set/setInfo.js
Page({
  modalcnt: function () {
    wx.showModal({
      title: '注意',
      content: '账户被系统销毁后您账户的所有数据都会清空，您确定销毁账户吗？',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '账户已销毁',
          //  duration:1000,
          })
          // wx.navigateBack({
          //   duration:2000,
          //   url: '../../Home/personal',
          // })
          setTimeout(function () {
            wx.reLaunch({
              url: '../../Home/personal',
            })
          }, 500)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  data: {
    menuitems: [
      { text: '个性设置', url: "../personalSet/setpsn", icon: '../../../icon/person.png', tips: '', id: 1, arrows: '../../../icon/youjiantou.png' },
       { text: '安全设置', url: "../personalSet/setpsn", icon: '../../../icon/index_icon.png', tips: '', id: 1, arrows: '../../../icon/youjiantou.png' }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})