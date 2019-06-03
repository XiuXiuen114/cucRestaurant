// miniprogram/pages/Personal/set/setInfo.js
var app=getApp()
Page({
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
  onRemove: function () {
    var id=[];
    if (app.globalData.userType == '3') {
      console.log(app.globalData.phone, app.globalData.userType, app.globalData.passwd)
      const db = wx.cloud.database()
      db.collection('testing').doc('XPSFhqCEPC1o_GjC').remove({
        success(res){
          console.log(res)
        }
      })
      wx.showModal({
        title: '注意',
        content: '账户被系统销毁后您账户的所有数据都会清空，您确定销毁账户吗？',
        success: function (res) {
          if (res.confirm) {
            wx.showToast({
              title: '账户已销毁',
            })
            //本地缓存
            // wx.clearStorageSync()
            // //全局变量
            // app.globalData.userInfo=null
            // app.globalData.userType="1"
            // app.hasUserInfo=false
            // app.globalData.userId=null
            // app.globalData.phone=null
            // app.globalData.passwd=null
            // app.globalData.resetPsd=null
            //数据库记录
              const db=wx.cloud.database()
              db.collection('testing').doc('XPSFhqCEPC1o_GjC').remove()
            
            // db.collection('comments').where({
            //   user_id:app.globalData.userId
            //  }).get({
            //    success:function(res){
            //     for(var i=0;i<res.data.length;i++){
            //       id[i]=(res.data[i]._id);
            //       console.log(id[i]);
            //       db.collection('comments').doc('1').remove({
            //         success:function(res1){
            //           console.log(res);
            //           console.log("comments有关记录删除成功");
            //         },fail:function(err1){
            //           console.log("删除失败")
            //         }
            //       })
            //      }
                 
            //    },fail:function(err){
            //      console.log(err);
            //    }
            //  })
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
    } else {
      wx.showModal({
        title: '提示',
        content: '请您登录后再操作',
      })
    }
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