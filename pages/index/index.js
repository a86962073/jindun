// pages/login/login.js
var call = require("../../utils/request.js")
var url,url2
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
    var value = { page: 1, page_size: 5, type: 2 }
    var that = this
    if (options.pages==undefined){}else{
      wx.navigateTo({
        url: '../'+options.pages+'/'+options.pages +'?'+options.name+'=' + options.value
      })
    }
    if (options.source == undefined) { } else {
      wx.setStorage({
        key: "source",
        data: options.source,
        success: function (res) {
          
        },
      })
    }
    call.requestServerData("/api/foundation/image-text/list", "POST",
      { page: 1, page_size:5}
    ).then(function (data) {
      that.setData({
        home_list: data.data.data
      })
    }); //ajax
  
    call.requestServerData("/api/job/recruitment/choice-job-list", "POST",
      value // 请求参数
    ).then(function (data) {
      that.setData({
        indexData: data.data.data
      })
    });
    call.requestServerData("/api/foundation/slide/get-slide-list", "POST",
      value // 请求参数
    ).then(function (data) {
      that.setData({
        slide: data.data.data.wechat_index
      })
    });

 
    url2 = '../recruit/recruit'

  },
  info2: function (e) {

    wx.navigateTo({
      url: '../newsinfo/newsinfo?id=' + e.currentTarget.dataset.id,
    })
  },
  more2: function () {
    wx.navigateTo({
      url: '../newslist/newslist',
    })
  },
  guangguang:function(e){

    wx.navigateTo({
      url: '../Application/Application?type=guangguang'
    })
  },
  webview: function (e) {
    console.log(e)
    var url = e.currentTarget.dataset.id
    url = url.replace('?', 'tihuan1');
    url = url.replace('=', 'tihuan2');
    wx.navigateTo({
      url: '../webview/webview?url=' + url,
    })
  },
  info: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../positionDetails/positionDetails?id=' + e.currentTarget.dataset.id,
    })
  },
  more:function(e){
    wx.navigateTo({
      url: '../positionDetails/positionDetails?id=' + e.currentTarget.dataset.id,
    })
  },
  recruit:function(){
    wx.navigateTo({
      url: url2,
    })
  },
  more:function(){
    wx.navigateTo({
      url: '../Application/Application?active=3',
    })
  },
  Application:function(){
    call.requestServerData("/api/job/demand/my-applied-info", "POST",
      // 请求参数
    ).then(function (data) {
      if (data.data.data.job_resume_id == 0) {
        url = '../resume/resume'
      } else {
        url = '../Application/Application'
      }
      wx.navigateTo({
        url: url,
      })
    }); //ajax
    
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
    var value = { page: 1, page_size: 5, type: 2 }
    var that = this
    call.requestServerData("/api/job/recruitment/choice-job-list", "POST",
      value // 请求参数
    ).then(function (data) {
      that.setData({
        indexData: data.data.data
      })
    });
    call.requestServerData("/api/foundation/slide/get-slide-list", "POST",
      value // 请求参数
    ).then(function (data) {
      that.setData({
        slide: data.data.data.wechat_index
      })
    });

    url = '../resume/resume'
    url2 = '../recruit/recruit'

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