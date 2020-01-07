// pages/positionDetails/positionDetails.js
var call = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon:0
  },
  look:function(){
    var that=this
    wx.navigateTo({
      url: '../companyInfo/companyInfo?id=' + that.data.indexdata.id + '&company_id=' + that.data.indexdata.belong_id,
    })
  },
  phone: function () {
    console.log(123)
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.indexdata.service_tel,
    })
  },
  switch1: function () {
    var that = this
    call.requestServerData("/api/job/collection/switch", "POST",
      { work_type: 2, work_id: that.data.id }
    ).then(function (data) {
      if (data.data.data.is_collection == 0) {
        wx.showToast({
          title: '岗位取消收藏',
          icon: 'none',
          duration: 2000,
        });
      } else {
        wx.showToast({
          title: '岗位收藏成功',
          icon: 'success',
          duration: 2000,
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options)
    var id = options.id
    that.setData({
      id: options.id
    })
    if (id == '') { id = 17 }
    call.requestServerData("/api/job/demand/details", "POST",
      { id:id } // 请求参数
    ).then(function (data) {
      console.log(data)
      var markers = [{
        id: "1",
        latitude: data.data.data.latitude,
        longitude: data.data.data.longitude,
        width: 40,
        height: 40
      }]
      that.setData({
        markers: markers,
        indexdata: data.data.data
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  deliver:function(){
      wx.showToast({
          title: '请使用金盾APP申请任务',
          icon: 'none',
          duration: 2000,
       });
    wx.navigateTo({
      url: '../jumpApp/jumpApp',
    })
    // var that = this
    // call.requestServerData("/api/job/resume/deliver", "POST",
    //   { recruitment_id:that.data.id}
    // ).then(function (data) {
    //   wx.showToast({
    //     title: '简历投递成功',
    //     icon: 'success',
    //     duration: 2000,
    //   });
    // });
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
      if (res.from === 'button') {

      }
      return {
        title: '金盾秒点招聘',
        path: '/pages/index/index?pages=positionDetails2&name=id&value=' + this.data.id,
        success: function (res) {
          console.log('成功', res)
        }
      }
    
  }
})