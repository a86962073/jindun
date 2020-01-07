// pages/companyInfo/companyInfo.js
var call = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      active:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.id
    var company_id = options.company_id
    call.requestServerData("/api/job/recruitment/details", "POST",
      { id: id } // 请求参数
    ).then(function (data) {
      console.log(data)
      that.setData({
        indexdata: data.data.data
      })
    });
    call.requestServerData("/api/oa/company/details", "POST",
      { company_id: company_id } // 请求参数
    ).then(function (data) {
      console.log(data)
      that.setData({
        indexdata2: data.data.data
      })
    });
  },
  info: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../positionDetails/positionDetails?id=' + e.currentTarget.dataset.id,
    })
  },
  bindchange:function(e){
    var active = e.currentTarget.dataset.id
    this.setData({
      active: active
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