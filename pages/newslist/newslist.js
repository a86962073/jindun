// pages/newslist/newslist.js
var call = require("../../utils/request.js");
var number=10
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
    number=10
    var that=this
    call.requestServerData("/api/foundation/image-text/list", "POST",
      { page: 1, page_size: 10 }
    ).then(function (data) {
      that.setData({
        home_list: data.data.data
      })
    });
  },
  info2:function(e){
    wx.navigateTo({
      url: '../newsinfo/newsinfo?id=' + e.currentTarget.dataset.id,
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

    var that = this
    if (this.data.home_list==number){
      number+=10
    call.requestServerData("/api/oa/news-policy/list", "POST",
      { page: 1, page_size: number }
    ).then(function (data) {
      that.setData({
        home_list: data.data.data
      })
    });
    }
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