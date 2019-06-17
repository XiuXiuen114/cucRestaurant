// pages/Home/comment/comment.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getcomment();
  },
  getcomment: function(e)
  {
    var dishID = app.globalData.dishID
    const db = wx.cloud.database()
    var that = this
    db.collection('comments').where
      ({
        dish_id: dishID
      }).get
      ({
        success: function (res) {
          //res.data为满足条件的json数组
          that.setData({
            commentlist: [],      
          })
         for (var i = 0; i < res.data.length; i++) 
         {
           that.data.commentlist.push({ '_id': res.data[i]._id, 'comment_content': res.data[i].comment_content, 'comment_time': JSON.stringify(res.data[i].comment_time), 'user_id': res.data[i].user_id, 'user_pic': res.data[i].user_pic, 'user_name': res.data[i].user_name});
         }
          console.log('commentlist', that.data.commentlist );
          that.setData({
           comment: that.data.commentlist
          });
         // console.log('comment', comment);
        }
      }, {
        fail: console.error
      })
  },
})