// pages/code/code.js
var call = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data1: '',
    data2: '',
    data3: '',
    data4: '',
    inputactive:'5',
    focus:true,
    phone:'',
    code:false,
    timer: '',//定时器名字
    countDownNum: '60'//倒计时初始值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindKeyInput1: function (e) {
    var that=this
    this.setData({
      data1: e.detail.value.charAt(0),
      data2: e.detail.value.charAt(1),
      data3: e.detail.value.charAt(2),
      data4: e.detail.value.charAt(3),
      inputactive: e.detail.value.length
    })
    if (e.detail.value.length==4){
      call.requestServerData("/api/foundation/captcha/verify-sms-captcha", "POST",
        { phone: that.data.phone, code: e.detail.value, scene: 'bind'}  
      ).then(function (data) {
        wx.login({
          success: function (res) {
            //发送请求
            call.requestServerData("/api/foundation/website/wx-auth", "post",
              { code: res.code, mobile: that.data.phone}
            ).then(function (data) {
              var obj1 = JSON.parse(data.data.data)
              console.log(obj1)
              wx.setStorage({//存储到本地
                key: "token",
                data: obj1.token
              })
              wx.showToast({
                title: '登录成功',
                icon: 'none',
                duration: 2000,
              });
              setTimeout(function () {
                wx.switchTab({
                  url: '../index/index'
                })
              }, 2000)
              
            })
          }
        })
      }); //ajax
    }
  },
  bindKeyInput2:function(e){
    this.setData({
      inputactive: '5'
    })
  },
  onLoad: function (options) {
    var that=this
    this.setData({
      phone: options.phone
    })
  
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
  onfocus:function(){
    this.setData({
      focus:true
    })
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
  code1: function () {
    var that = this
    console.log(that.data.phone.length)
      call.requestServerData("/api/foundation/captcha/send-sms-captcha", "POST",
        { scene: 'bind', phone: that.data.phone }
      ).then(function (data) {
        that.countDown();
        that.setData({
          code:false
        })
        var myDate = Date.parse(new Date())
        myDate = myDate / 1000 + 60
        that.countDown();
        wx.setStorage({//存储到本地
          key: "time2",
          data: myDate
        })
      }); //
  },
  countDown: function () {
    let that = this;
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
            code:true
          })
        }
      }, 1000)
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})