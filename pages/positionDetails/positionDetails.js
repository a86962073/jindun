// pages/positionDetails/positionDetails.js
var call = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    false: false
  },

  look:function(){
    var that=this
    wx.navigateTo({
      url: '../companyInfo/companyInfo?id=' + that.data.indexdata.id + '&company_id=' + that.data.indexdata.belong_id,
    })
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
    // if (id == '') { id = 17 }
    call.requestServerData("/api/job/recruitment/details", "POST",
      { id:id } // 请求参数
    ).then(function (data) {
      console.log(data)
      var markers=[{
        id: "1",
        latitude: data.data.data.latitude,
        longitude: data.data.data.longitude,
        width: 40,
        height: 40
      }]
      that.setData({
        indexdata: data.data.data,
        markers: markers,
        icon: data.data.data.is_collect
      })
    });
  },
  phone:function(){
    var that=this
    wx.makePhoneCall({
      phoneNumber: that.data.indexdata.service_tel,
    })
  },
  switch1:function(){
    var that = this
    call.requestServerData("/api/job/collection/switch", "POST",
      { work_type: 1, work_id :that.data.id}
    ).then(function (data) {
      that.setData({
        icon:data.data.data.is_collection
      })
      if (data.data.data.is_collection==0){
        wx.showToast({
          title: '岗位取消收藏',
          icon: 'none',
          duration: 2000,
        });
      }else{
        wx.showToast({
          title: '岗位收藏成功',
          icon: 'success',
          duration: 2000,
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  deliver:function(){
    var that = this
    call.requestServerData("/api/job/demand/my-applied-info", "POST",
      // 请求参数
    ).then(function (data) {
      if(data.data.data.perfect_degree==100){
        call.requestServerData("/api/job/resume/deliver", "POST",
          { recruitment_id: that.data.id }
        ).then(function (data) {
          wx.showToast({
            title: '简历投递成功',
            icon: 'success',
            duration: 2000,
          });
        });
      }else{
        wx.showModal({
          title: '提示',
          content: '请完善您的简历',
          cancelText: '完善简历',
          confirmText: '取消',
          success(res) {
            if (res.confirm) {
            
            } else if (res.cancel) {
              wx.navigateTo({
                url: '../Myresume/Myresume?id=' + data.data.data.job_resume_id
              })
            }
          }
        })
      }

    })
   
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

    return {
      title: '金盾秒点招聘',
      path: '/pages/index/index?pages=positionDetails&name=id&value=' + this.data.id,
      success: function (res) {
        console.log('成功', res)
      }
    }
  }
})