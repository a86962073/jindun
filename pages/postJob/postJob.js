// pages/postJob/postJob.js
var number=5
var call = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    text1:'发布全职岗位'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    number=5
    var that = this
    that.setData({
      company_id: options.id
    })
    call.requestServerData("/api/job/recruitment/my-publish-job", "POST",
      // 请求参数
      { display:1,
        company_id: options.id,
        page:1,
        page_size:5
      }
    ).then(function (data) {
      that.setData({
        indexdata: data.data.data
      })
    }); //ajax
  }, 
  tochange: function (e) {
    var active = e.currentTarget.dataset.id
    var that=this
    var text1=''
    number=5

    if (active==1){
      call.requestServerData("/api/job/recruitment/my-publish-job", "POST",
        // 请求参数
        {
          display: 1,
          company_id: that.data.company_id,
          page: 1,
          page_size: 5
        }
      ).then(function (data) {
        that.setData({
          indexdata: data.data.data,
          active: active
        })
      }); //ajax
    }else{
      call.requestServerData("/api/job/recruitment/my-publish-job", "POST",
        // 请求参数
        {
          display: 0,
          company_id: that.data.company_id,
          page: 1,
          page_size: 5
        }
      ).then(function (data) {
        that.setData({
          indexdata: data.data.data,
          active: active
        })
      }); //ajax
    }
    
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

    var that=this
    if (this.data.indexdata.length == number){
      number += 5
    call.requestServerData("/api/job/recruitment/my-publish-job", "POST",
      // 请求参数
      {
        display: that.data.active,
        company_id: that.data.company_id ,
        page: 1,
        page_size: number
      }
    ).then(function (data) {
      that.setData({
        indexdata: data.data.data
      })
    }); //ajax
    }
  },
  release:function(){
    wx.navigateTo({
      url: '../release/release?id=' + this.data.company_id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})