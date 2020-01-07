// pages/recruit2/recruit2.js
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

  },
  bindKeyInput1:function(e){
      this.setData({
        company: e.detail.value
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
  next:function(){
    var that=this
    if (this.data.company){
      call.requestServerData("/api/oa/company/check-exists", "POST",
        { company: this.data.company}// 请求参数
      ).then(function (data) {
        if (data.data.data.is_exists==0){
        wx.navigateTo({
          url: '../recruit3/recruit3?company=' + that.data.company,
        })
        }else{
          wx.showToast({
            title: '该公司名字已被注册',
            icon: 'none',
            duration: 2000,
          });
        }
      }); //ajax
  
    }else{
      wx.showToast({
        title: '请填写公司名称',
        icon: 'none',
        duration: 2000,
      });
    }
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