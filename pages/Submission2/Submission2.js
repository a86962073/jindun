// pages/Submission2/Submission2.js

var call = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var id = options.id
    call.requestServerData("/api/enroll/detail", "POST",
      { id: id }// 请求参数
    ).then(function (data) {
      that.setData({
        indexdata: data.data.data,
        id:id
      })
    });
    wx.getStorage(
      {
        key: 'traindata',
        success: function (res) {
         that.setData({
           indexdata2:res.data
         })
        },
      })
  },
  btn_submit:function(){
    var that=this
    wx.getStorage(
      {
        key: 'source',
        complete: function (res) {
          var source = res.data
          wx.login({
            success: function (res) {
              var data = that.data.indexdata2
              //发送请求
              data.id = that.data.id
              data.code = res.code
              if (source==undefined){

              }else{
                data.source = source
              }
              call.requestServerData("/api/enroll/submit-user-info", "post",
                data
              ).then(function (data) {
                console.log(data.data.data.pay_data.timeStamp)
                wx.requestPayment({
                  timeStamp: data.data.data.pay_data.timeStamp.toString(),
                  nonceStr: data.data.data.pay_data.nonceStr,
                  package: data.data.data.pay_data.package,
                  signType: 'MD5',
                  paySign: data.data.data.pay_data.sign,
                  success: function (res) {
                    wx.navigateTo({
                      url: '../paysuccess/paysuccess',
                    })//跳转
                  },
                  fail: function (res) {
                    console.log(res)
                    wx.showToast({
                      title: res.data.message,
                      icon: 'none',
                      duration: 2000,
                    });
                  },
                  complete: function (res) {

                  }
                })
              }
              )
            }
          })
        },
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