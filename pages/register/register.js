// pages/register/register.js
var btn=true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio:true,
    phone_num:'',
      countDownNum: '60',//倒计时初始值,
      code: true,
    verification_code:'',
    password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
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
  radio:function(){
    this.setData({
      radio:!this.data.radio
    })
  },
  gaincode:function(){
    if (btn == true) {
      btn = false
      setTimeout(function () {
        btn = true
        
      }, 1000)
    var that = this
    if(this.data.phone_num.length==11){
    wx.request({
      //请求接口的地址
      url: 'https://jd.100dp.com/api/foundation/captcha/send-sms-captcha',
      method:'post',
      data: {
        scene: 'register',
        phone: that.data.phone_num
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
     
       
        if (res.data.code==0){
          var myDate = Date.parse(new Date())
          myDate = myDate / 1000 + 60
          that.countDown();
          wx.setStorage({//存储到本地
            key: "time1",
            data: myDate
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000,
          });
        }
      },
      fail: function (err) {

      },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  register:function(){
    var that=this
    if(this.data.phone_num.length==11){
      if (this.data.verification_code.length>0){
        if (this.data.password.length > 5 && this.data.password.length <21){
          if (this.data.radio==true){
            wx.request({
              //请求接口的地址
              url: 'https://jd.100dp.com/api/foundation/website/verify-captcha-and-register',
              method: 'post',
              data: {
                phone: that.data.phone_num,
                password:that.data.password,
                code: that.data.verification_code,
                scene: 'register',
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded',
              },
              success: function (res) {
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 2000,

                });
                if(res.data.status==200){
               
                if (res.data.code == 0) {
                  setTimeout(function () {
                    wx.navigateTo({
                      url: '../login/login'
                    })
                  }, 2000)
                } else {

                }
                }
              },
              fail: function (err) {

              },//请求失败
              complete: function () { }//请求完成后执行的函数
            })
          }else{
            wx.showToast({
              title: '请阅读并同意《用户注册协议》',
              icon: 'none',
              duration: 2000,
            });
          }
        } else {
          wx.showToast({
            title: '请输入6-20位密码',
            icon: 'none',
            duration: 2000,
          });
        }
      } else {
        wx.showToast({
          title: '请输入验证码',
          icon: 'none',
          duration: 2000,
        });
      }
    }else{
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000,
      });
    }
  },
  bindKeyInput1: function (e) {
    this.setData({
      phone_num: e.detail.value
    })
  },
  bindKeyInput2: function (e) {
    this.setData({
      verification_code: e.detail.value
    })
  },
  bindKeyInput3: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  webview: function (e) {
    
    var url = 'https://jd.100dp.com/mobile/register-contract'
    wx.navigateTo({
      url: '../webview/webview?url=' + url,
    })
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