// pages/Interviewinfo/Interviewinfo.js
var call = require("../../utils/request.js")
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
    var id = options.id
    var that = this
    call.requestServerData("/api/job/interview/invite-details", "POST",
      { id: id}
    ).then(function (data) {
        that.setData({
          indexdata: data.data.data,
        })
    }); //ajax
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
  btn_submit: function (e){
    var that = this
    console.log(this.data.id)
    call.requestServerData("/api/job/interview/invite-receipt", "POST",
      { id: that.data.indexdata.id, action: e.currentTarget.dataset.action,reply: that.data.reply}
    ).then(function (data) {
      wx.navigateBack({
        delta: 1,
      })
    }); //ajax
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  bindWordLimit2:function(e){
    this.setData({
      reply:e.detail.value
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})