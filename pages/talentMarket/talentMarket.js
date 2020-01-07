// pages/talentMarket/talentMarket.js
var number=6
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
  onLoad: function (options){
    number = 6
    var company_id=options.id
    var that=this
    call.requestServerData("/api/job/resume/list", "POST",
      { page: 1, page_size:6} // 请求参数
    ).then(function (data) {
      that.setData({
        indexdata: data.data.data,
        company_id: company_id
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
    console.log(number)
    console.log(this.data.indexdata.length)
    if (number==this.data.indexdata.length){
    var that = this
    number += 6
    call.requestServerData("/api/job/resume/list", "POST",
      { page: 1, page_size: number } // 请求参数
    ).then(function (data) {
      that.setData({
        indexdata: data.data.data
      })
    }); //ajax
    }
  },
  info:function(e){
    wx.navigateTo({
      url: '../resumeApplicant/resumeApplicant?id=' + e.currentTarget.dataset.id + '&company_id=' + this.data.company_id,
    })//跳转
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})