// pages/Myresume/Myresume.js
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
    var that=this
    call.requestServerData("/api/job/resume/details", "POST",
      { resume_id: options.id} // 请求参数
    ).then(function (res) {
      console.log(res)
      that.setData({
        indexdata: res.data.data,
        id: options.id
      })
    });
  },
  add_btn: function () {
    wx.navigateTo({
      url: '../experienceadd/experienceadd?id=' + this.data.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  resumeApplicant:function(){
    wx.navigateTo({
      url: '../resumeApplicant/resumeApplicant?id=' + this.data.id+'&type=1',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var that = this
    if (that.data.id){
    call.requestServerData("/api/job/resume/details", "POST",
      { resume_id: that.data.id } // 请求参数
    ).then(function (res) {
      console.log(res)
      that.setData({
        indexdata: res.data.data
      })
    });
    }
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
  edit: function (e) {
    wx.navigateTo({
      url: '../experienceadd/experienceadd?type=edit&id=' + e.currentTarget.dataset.id,
    })
  },
  edit1:function(){
    wx.navigateTo({
      url: '../editresume/editresume?id='+this.data.id,
    })//跳转
  },
  edit2: function () {
    wx.navigateTo({
      url: '../editresume2/editresume2?id=' + this.data.id,
    })//跳转
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