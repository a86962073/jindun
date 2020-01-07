// pages/login/login.js
var call = require("../../utils/request.js");
var btn = true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:'',
    countDownNum: '60',//倒计时初始值,
    code: true,
  },
  countDown: function () {
    let that = this;
    that.setData({
      code: false
    })
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
          that.setData({
            countDownNum: 60,
            code: true
          })
        }
      }, 1000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toRegister:function(){
    wx.navigateTo({
      url: '../register/register'
    })
  },
  toFind:function(){
    wx.switchTab({
      url: '../index/index'
    })
  },
  code:function(){
    var that = this
    console.log(that.data.mobile.length)
    if(btn==true){
      btn=false
      setTimeout(function () {
        btn=true
      }, 1000)
    if (that.data.mobile.length==11){
      call.requestServerData("/api/foundation/user/check-exists", "POST",
        {mobile: that.data.mobile}
      ).then(function (data) {
        console.log(data.data.data)
        if (data.data.data.is_exists==1){
        call.requestServerData("/api/foundation/captcha/send-sms-captcha", "POST",
          { scene: 'bind', phone: that.data.mobile }
        ).then(function (data) {
          var myDate = Date.parse(new Date())
          myDate = myDate / 1000 + 60
          wx.setStorage({//存储到本地
            key: "time1",
            data: myDate
          })
          wx.navigateTo({
            url: '../code/code?phone=' + that.data.mobile,
          })//跳转
      }); //ajax
      }else{
          wx.showModal({
            title: '提示',
            content: '该手机号未注册金盾账号',
            cancelText:'随便逛逛',
            confirmText:'注册',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../register/register'
                })
              } else if (res.cancel) {
                wx.navigateTo({
                  url: '../Application/Application?type=guangguang'
                })
              }
            }
          })
      }
    }); //
    }else{
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000,
      });
    }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindKeyInput1:function(e){
    this.setData({
      mobile: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var myDate = Date.parse(new Date())
    myDate = myDate / 1000
    wx.getStorage({
      key: 'time1',
      complete: function (res) {
        console.log(res.data - myDate)
        if (res.data - myDate > 0) {
          that.setData({
            countDownNum: res.data - myDate
          })
          that.countDown();

        } else {
          wx.removeStorage({
            key: 'time1',
            success: function (res) { },
          })
        }
      }
    })
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