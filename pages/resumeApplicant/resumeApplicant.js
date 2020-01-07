// pages/resumeApplicant/resumeApplicant.js
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
    var company_id = options.company_id
    var type = options.type
    var that =this
    call.requestServerData("/api/job/resume/details", "POST",
      {resume_id :id}// 请求参数
    ).then(function (data) {
      that.setData({
        indexdata: data.data.data,
        company_id: company_id,
        id: id,
        type: type
      })
    });
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
  invite:function(){
    wx.navigateTo({
      url: '../invite/invite?id=' + this.data.id + '&company_id=' + this.data.company_id,
    })//跳转
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