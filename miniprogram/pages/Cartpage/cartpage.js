// pages/Cartpage/cartpage.js
var util = require('../../utils/util.js');
// import Toast from '../../dist/toast/toast';
const app=getApp();
// Toast.success('订单提交成功！');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart_dishes:[],//购物车全部的菜品列表，两个字段【dish,number】，从globaldata取出dish字段
    total_price:0,//所选菜品的总共价格
    cart_ps:null,//取餐备注
    cart_sub:null,//取餐时间
    showToast:false,
    dish_length:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(){

  },
  onShow: function (options) {
    this.setCartData();
    this.calTotalPrice();
  },
  onChangesub:function(e){  
    this.data.cart_sub=e.detail.value;
    // console.log("cart_sub",this.data.cart_sub);
  },
  onChangeps:function(e){
    this.data.cart_ps=e.detail.value;
    // console.log("cart_ps",this.data.cart_ps);
  },
  calTotalPrice:function(){
    // console.log("cart_dishes", this.data.cart_dishes);
    this.data.total_price=0;
    let that=this;
    this.data.cart_dishes.forEach(function(item){
      that.data.total_price+=item.number*item.dish_price
    })
    this.setData({
      total_price:that.data.total_price
    });
    // console.log("totalprice", this.data.total_price);
  },
  calOrderPrice:function(param_dishes){
    let price=0;
    param_dishes.forEach(function(item){
      price+=item.number*item.dish_price
    });
    return price;
  },
  addNumber:function(e){
    // console.log('dish_index event', e);
    let index = e.currentTarget.dataset.dish_index;
    this.data.cart_dishes[index].number++;
    this.data.dish_length++;
    let that=this;
    this.setData({
      cart_dishes:that.data.cart_dishes,
      dish_length:that.data.dish_length
    });
    console.log("dish_length",this.data.dish_length);
    this.calTotalPrice();
    
  },
  minusNumber: function (e) {
    // console.log('dish_index event', e);
    let index = e.currentTarget.dataset.dish_index;
    if (this.data.cart_dishes[index].number>=1){
      this.data.cart_dishes[index].number--;
      this.data.dish_length--;
      let that = this;
      this.setData({
        cart_dishes: that.data.cart_dishes,
        dish_length:that.data.dish_length
      });
      console.log('dish_length',this.data.dish_length);
      // if(this.data.cart_dishes.length==0){
      //   this.setData({
      //     dish_length:0
      //   })
      // }
    } 
    this.calTotalPrice();
  },
  setCartData:function(){
    let that=this;
    that.data.cart_dishes=[];
    app.globalData.cartDishes.forEach(function(item){
      // that.data.cart_dishes.push({'dish':item,'number':1})
      item['number'] = 1;
      that.data.dish_length+=item.number;
      that.data.cart_dishes.push(item)
    });
    this.setData({
      cart_dishes:that.data.cart_dishes,
      dish_length:that.data.dish_length
    });
    console.log("dish_length",this.data.dish_length);

    console.log("setData dishes",this.data.cart_dishes);
  },
  insertOrders:function(param_dishes){
    let that=this;
    let curDate=new Date();
    const db=wx.cloud.database({
      env:'minidev-ko6dk'
    })
    console.log("sub,ps",this.data.cart_sub,this.data.cart_ps);
    db.collection('orders').add({
      data:{
        user_id: app.globalData.userId,
        dishes: param_dishes,
        user_name: app.globalData.user_name,
        order_time:util.formatTime(curDate),
        shop_id:param_dishes[0].shop_id,
        order_sub:that.data.cart_sub,
        ps:that.data.cart_ps,
        order_grade:null,
        if_comment:0,
        order_price: that.calOrderPrice(param_dishes),
        order_status:0,//未接单
      },
      success:function(res){
        console.log('insertOrders res',res);
        that.data.showToast=true;
      },
      fail:console.error
    })
  },
  //将选择的菜品插入到orders表
  sortOrders:function(){
    
    //遍历整个cart_dishes,找到number==0的删除
    for(let i=0;i<this.data.cart_dishes.length;i++){
      let temp_dish=this.data.cart_dishes[i];
      if(temp_dish.number==0){
        this.data.cart_dishes.splice(i,1);
      }
    }
    this.data.cart_dishes.sort(function(a,b){
      return parseInt(a.shop_id)-parseInt(b.shop_id)
    });
    
    let temp_order_dishes=new Array();
    temp_order_dishes.push(this.data.cart_dishes[0]);
    let temp_shop_id =temp_order_dishes[0].shop_id;
    for(let i=1;i<this.data.cart_dishes.length;i++){
      let temp=this.data.cart_dishes[i];
      console.log();
      if(parseInt(temp.shop_id)!=parseInt(temp_shop_id)){//跟前面的shop_id不一致
        // console.log('not consitent',temp);
        // console.log('not consitent',temp_shop_id,temp.shop_id);
        this.insertOrders(temp_order_dishes);
        temp_order_dishes=new Array();
        temp_order_dishes.push(temp);
        temp_shop_id=temp.shop_id;
      }else{//跟前面的shop_id一致
        temp_order_dishes.push(temp);
      }
    }
    this.insertOrders(temp_order_dishes);
   
  },
  submitCart:function(){
    //提示订单支付成功

    //向数据库中插入数据
    // this.insertOrders();
    // console.log("cart_sub,cart_ps",this.data.cart_sub,this.data.cart_ps);
    this.sortOrders();
    
    //跳转至订单状态页面

  },

 
})