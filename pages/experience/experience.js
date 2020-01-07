// pages/experience/experience.js
// pages/experienceadd/experienceadd.js
var call = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var id = options.id
    wx.getStorage({//获取本地缓存
      key: "image",
      success: function (res) {
        that.setData({
          image: res.data,
          id:id
        });
      },
    })
    this.setData({
      id:options.id
    })
  },
  add_btn:function(){
    wx.navigateTo({
      url: '../experienceadd/experienceadd?id=' + this.data.id,
    })
  },
  register: function () {
    wx.switchTab({
      url: '../index/index'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  edit:function(e){
    wx.navigateTo({
      url: '../experienceadd/experienceadd?type=edit&id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var that=this
    console.log(this.data.id)
    call.requestServerData("/api/job/resume/work-experience-list", "POST",
      { resume_id: this.data.id } // 请求参数
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})