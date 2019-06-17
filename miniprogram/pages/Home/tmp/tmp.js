const app = getApp();
Page({
  data: {
    addflag: true,  //判断是否显示搜索框右侧部分
    addimg: '/icon/skzxc.jpg',
    searchstr: '',
    re: []
  },
  onLoad() {



  },
  onShow() {

  },

  tap(e) {

  },

  // 搜索框右侧 事件
  addhandle() {
    console.log('触发搜索框右侧事件')
  },

  //搜索框输入时触发
  searchList(e) {
      const db = wx.cloud.database()
      var that = this
      var formData = e.detail.detail.value
      db.collection('dishes').where({
        //使用正则查询，实现对搜索的模糊查询
        dish_name: db.RegExp({
          //从搜索栏中获取的value作为规则进行匹配
          regexp: '.*' + formData,
          options: 'i',
          //大小写不区分
        })
      }).get({
        success: res => {
          console.log('搜索结果', res.data)
          that.setData({
           // re: JSON.stringify(res.data, null, 2)
           re: res.data
          })
          //wx.hideLoading();
        }
      }, {
          fail: function (err) {
            console.error(err);
          }
        })
    
  },
  //搜索回调
  endsearchList(e) {
    console.log('查询数据')
  },
  // 取消搜索
  cancelsearch() {
    this.setData({
      searchstr: ''
    })
  },
  //清空搜索框
  activity_clear(e) {

    this.setData({
      searchstr: ''
    })
  },
Clickdish: function(e)
{
  var option = e.currentTarget.dataset.dishid;
  app.globalData.dishID = option;
  console.log('Clickdish', app.globalData.dishID);
},
Clickyuding: function(e)
{
  var option = e.currentTarget.dataset.itm;
  app.globalData.cartDishes.push(option);
  console.log('Clickyuding',option)
}

})