// pages/recruit/recruit.js
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
    var that = this
    call.requestServerData("/api/oa/contacts/get-user-company-list", "POST",
      // 请求参数
    ).then(function (data) {
        that.setData({
          indexdata: data.data.data
        })
    }); //ajax
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  new_btn:function(){
    wx.navigateTo({
      url: '../recruit2/recruit2'
    })//跳转
  },
  company:function(e){
    var id = e.currentTarget.dataset.id
    call.requestServerData("/api/oa/company/check-authorize-user", "POST",
      { company_id: id, type:'recruit'}
    ).then(function (data) {
      if (data.data.data.is_authorize==1){
      wx.navigateTo({
        url: '../wantrecruit/wantrecruit?id=' + id,
      })
      }else{
        wx.showToast({
          title: '您没有招聘权限',
          icon: 'none',
          duration: 2000,
        });
      }
    }); //ajax
    //跳转
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