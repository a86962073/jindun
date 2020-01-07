// pages/Traininfo/Traininfo.js
var call = require("../../utils/request.js");
var wxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agree: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.id
    call.requestServerData("/api/enroll/detail", "POST",
      { id: id }// 请求参数
    ).then(function (data) {
      that.setData({
        indexdata: data.data.data,
      })
      wxParse.wxParse('article', 'html', data.data.data.content, that, 5);
      wxParse.wxParse('article2', 'html', data.data.data.note, that, 5);
    });
  },
  agree: function () {
    if (this.data.agree) {
      this.setData({
        agree: false
      })
    } else {
      this.setData({
        agree: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  submit: function () {
    if (this.data.agree) {
      wx.navigateTo({
        url: '../Submission/Submission?id=' + this.data.indexdata.id,
      })//跳转
    } else {
      wx.showToast({
        title: '请阅读并同意报名须知',
        icon: 'none',
        duration: 2000,
      });
    }
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