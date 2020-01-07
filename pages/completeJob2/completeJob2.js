// pages/postJob/postJob.js
var call = require("../../utils/request.js");
var number=5
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    number=5
    var that= this
    call.requestServerData("/api/job/collection/list", "POST",
      { page: 1, page_size: 5, scene: 'full_time' } // 请求参数
    ).then(function (data) {
      console.log(data)
      that.setData({
        indexData: data.data.data
      })
    });
  },
  info: function (e) {
   
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '../positionDetails/positionDetails?id=' + e.currentTarget.dataset.id,
      })
    
  },
  info2: function (e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '../positionDetails2/positionDetails2?id=' + e.currentTarget.dataset.id,
      })   
  },
  tochange: function (e) {
    var active = e.currentTarget.dataset.id
    number = 5
    var text1 = ''
    if (active == 1) {
      text1 = 'full_time'
    } else {
      text1 = 'part_time'
    }
    var that = this
    call.requestServerData("/api/job/collection/list", "POST",
      { page: 1, page_size: 5, scene: text1} // 请求参数
    ).then(function (data) {
      console.log(data)
      that.setData({
        indexData: data.data.data
      })
    });

    this.setData({
      active: active,
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
   if (number == this.data.indexData.length) {
      number += 5
      var that = this
      var text1
      if (this.data.active == 1) {
        text1 = 'full_time'
      } else {
        text1 = 'part_time'
      }
      call.requestServerData("/api/job/collection/list", "POST",
        { page: 1, page_size: number, scene: text1 } // 请求参数
      ).then(function (data) {
        console.log(data)
        that.setData({
          indexData: data.data.data
        })
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})