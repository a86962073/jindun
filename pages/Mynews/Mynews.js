// pages/Mynews/Mynews.js
var call = require("../../utils/request.js")
var number=5
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:'system'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    number=5
    var that = this
    call.requestServerData("/api/foundation/message/list", "POST",
      { page: 1, page_size: 5, type:'system'}
    ).then(function (data) {
        that.setData({
          indexdata:data.data.data
        })
    }); //ajax
  },
  tabchage:function(e){
    this.setData({
      active: e.currentTarget.dataset.tab
    })
    var that = this
    call.requestServerData("/api/foundation/message/list", "POST",
      { page: 1, page_size: 5, type: e.currentTarget.dataset.tab }
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
    var that=this
    if(number=that.data.indexdata.length){
      number+=5
    call.requestServerData("/api/foundation/message/list", "POST",
      { page: 1, page_size:number, type: this.data.active }
    ).then(function (data) {
      that.setData({
        indexdata: data.data.data
      })
    }); //ajax
    }
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