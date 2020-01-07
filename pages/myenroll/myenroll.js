// pages/myenroll/myenroll.js
var call = require("../../utils/request.js");
var number=1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    change:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    number=1
    var that = this
    wx.login({
      success: function (res) {
        var code = res.code
        
        call.requestServerData("/api/enroll/my-enroll-list", "POST",
          { page: 1, page_size: 5, code: code }
        ).then(function (data) {
          var indexdata = data.data.data
          for (var n in indexdata) {
            indexdata[n].change=true
          }
            that.setData({
              indexdata: indexdata,
            })
        }); //ajax
      }
    })
  },
  toTraininfo2:function(e){
    

    wx.navigateTo({
      url: '../Traininfo2/Traininfo2?id=' + e.currentTarget.dataset.id,
    })//跳转
  },
  change:function(e){
    console.log(e.currentTarget.dataset.id)
    this.data.indexdata[e.currentTarget.dataset.id].change = !this.data.indexdata[e.currentTarget.dataset.id].change
    this.setData({
      indexdata:this.data.indexdata
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
    var that = this
    if (number*5 == that.data.indexdata.length){
    number+=1
    wx.login({
      success: function (res) {
        var code = res.code
        call.requestServerData("/api/enroll/my-enroll-list", "POST",
          { page: number, page_size: 5, code: code }
        ).then(function (data) {
          that.setData({
            indexdata: data.data.data,
          })
        }); //ajax
      }
    })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})