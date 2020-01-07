// pages/newsinfo/newsinfo.js
var call = require("../../utils/request.js");
var wxParse = require('../../wxParse/wxParse.js');
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
    
    call.requestServerData("/api/foundation/image-text/list", "POST",
      { page: 1, page_size: 9999}
    ).then(function (data) {
      for(var i=0;i<data.data.data.length;i++){
        if(data.data.data[i].id == options.id){
          that.setData({
            url: data.data.data[i].html_url,
            id: options.id
          })
        }
      }
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
    return {
      path: '/pages/index/index?pages=newsinfo&name=id&value='+this.data.id // 路径，传递参数到指定页面。
    }
  }
})