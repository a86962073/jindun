var call = require("../../utils/request.js");
var number = 5
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    number=5
    var that = this
    call.requestServerData("/api/job/interview/invite-record", "POST",
      { page: 1, page_size: 5 } // 请求参数
    ).then(function (data) {
      console.log(data)
      that.setData({
        indexData: data.data.data
      })
    });
  },
  tochange: function (e) {
    var active = e.currentTarget.dataset.id
    var text1 = ''
    if (active == 1) {
      text1 = '发布全职岗位'
    } else {
      text1 = '发布兼职岗位'
    }
    this.setData({
      active: active,
      text1: text1
    })
  },
  info:function(e){
    wx.navigateTo({
      url: '../Interviewinfo/Interviewinfo?id=' + e.currentTarget.dataset.id,
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
    call.requestServerData("/api/job/interview/invite-record", "POST",
      { page: 1, page_size: 5 } // 请求参数
    ).then(function (data) {
      console.log(data)
      that.setData({
        indexData: data.data.data
      })
    });
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
    var that=this
    if (number == this.data.indexData.length){
      number+=5
    call.requestServerData("/api/job/interview/invite-record", "POST",
      { page: 1, page_size: number} // 请求参数
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