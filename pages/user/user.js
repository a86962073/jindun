// pages/user/user.js
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
  },

  apply_num:function(data){

    wx.navigateTo({
      url: '../completeJob/completeJob',
    })//跳转
  },
  interview_num: function (data) {

    wx.navigateTo({
      url: '../Interview/Interview',
    })//跳转
  },
  Myresume:function(){
    if (this.data.indexdata.job_resume_id==0){

    }else{
    wx.navigateTo({
      url: '../Myresume/Myresume?id=' + this.data.indexdata.job_resume_id,
    })//跳转
    }
  },
  apply_num2: function (data) {

    wx.navigateTo({
      url: '../completeJob2/completeJob2',
    })//跳转
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
    call.requestServerData("/api/job/demand/my-applied-info", "POST",
      // 请求参数
    ).then(function (data) {
      that.setData({
        indexdata: data.data.data
      })
    }); //ajax
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