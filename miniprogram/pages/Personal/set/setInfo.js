// miniprogram/pages/Personal/set/setInfo.js

var app = getApp()
Page({
  data: {
    menuitems: [
      { text: '修改个人信息', url: "userInfo/modify", icon: '../../../icon/person.png',  arrows: '../../../icon/youjiantou.png' },
       { text: '更换手机号 ', url: "account/changePhone", icon: '../../../icon/index_icon.png',arrows: '../../../icon/youjiantou.png' }
      ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('userid:' + app.globalData.userId)
  },

  exitLogin: function(){
    wx.setStorageSync('userType', "2");
    app.globalData.userType = "2";
   wx.switchTab({
     url: '../Home/personal'
   })
  },

  destroy: function () {
   // var id=[];
  var that = this;

    wx.showModal({
      title: '温馨提示',
      content: '注销账户会清除用户数据，您确定注销吗？',
      success: function (res) {
        if (res.confirm) {
         
          //连接数据库
          const db = wx.cloud.database({
            env: 'minidev-ko6dk'
          });
          
          // db.collection('users').where({  
          //   _id: app.globalData.userId
          // }).get({
          //   success: function (res0) {
          //     console.log(res0);
          //   }
          // })

          // const name = db.collection('users').doc('1'); //返回_id为1的记录引用
          // console.log(name)
          db.collection('users').doc('XPX82vdsX1oQes4A').remove({
            success: function (res) {
              console.log(res)
              wx.showToast({
                title: '账号注销成功',
              })
            },
            fail: function (err) {
              wx.showToast({
                icon: 'none',
                title: '注销失败',
              })
              console.error('删除账户失败：', err)
            }
          })
        }else{
           wx.showToast({
            title: '本次操作取消！',
          })
        }
      }
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
              // const db=wx.cloud.database()
              // db.collection('testing').doc('XPSFhqCEPC1o_GjC').remove()
            
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
  },
})