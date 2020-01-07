// pages/invite/invite.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
var call = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['前端','ui'],
    data1:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var id = options.id
    var company_id = options.company_id
    this.data.data1.company_id = company_id
    this.setData({
      data1: this.data.data1,
    })
    call.requestServerData("/api/job/recruitment/company-job-list", "POST",
      { company_id: company_id}
    ).then(function (data) {
      that.data.data1.resume_id = id
      that.setData({
        job:data.data.data,
        data1: that.data.data1
      })
    });
  },

  bindTimeChange:function(e){
    let d = new Date(e.detail.value)
    let start_time = d.getTime(d) / 1000
    this.data.data1.start_time = start_time
    this.setData({
      //给当前time进行赋值
      data1: this.data.data1,
      time: e.detail.value
    })
  },
  bindTimeChange2: function (e) {
    let d = new Date(e.detail.value)
    let end_time = d.getTime(d) / 1000
    this.data.data1.end_time = end_time
    this.setData({
      //给当前time进行赋值
      data1: this.data.data1,
      time2: e.detail.value
    })
  },
  bindWordLimit1:function(e){
    this.data.data1.address = e.detail.value
    this.setData({
      //给当前time进行赋值
      data1: this.data.data1,
    })
  },
  bindWordLimit2: function (e) {
    this.data.data1.content = e.detail.value
    this.setData({
      //给当前time进行赋值
      data1: this.data.data1,
    })
  },
  bindChange: function (e) {
    //设置事件
    this.data.data1.recruitment_id = this.data.job[e.detail.value].id
    this.setData({
      data1:this.data.data1,
      index: e.detail.value
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
  btn_submit:function(){
    call.requestServerData("/api/job/interview/invite", "POST",
      this.data.data1
    ).then(function (data) {
      wx.showToast({
        title: '面试邀约成功',
        icon: 'none',
        duration: 2000,
      });
      setTimeout(function () {
        wx.switchTab({
          url: '../index/index',   
        })
      }, 2000)
    }); 
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