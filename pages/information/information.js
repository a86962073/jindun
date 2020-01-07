// pages/resume/resume.js
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
    var ssls
    wx.getStorage({//获取本地缓存
      key: "data",
      success: function (res) {
        that.setData({
          image: res.data.image
        });
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindKeyInput(e){
    this.setData({
      name: e.detail.value
    })  
  },
  next:function(){
    var that=this
    if(that.data.name){
      if(that.data.time){
        if (that.data.time2) {
          wx.setStorage({//存储到本地
            key: "data2",
            data: that.data
          })
          wx.navigateTo({
            url: '../information2/information2',
          })
        }else{
          wx.showToast({
            title: "请填写参加工作时间",
            icon: 'none',
            duration: 2000,
          });
        }
      }else{
        wx.showToast({
          title: "请填写出生年月",
          icon: 'none',
          duration: 2000,
        });
      }
    }else{
      wx.showToast({
        title: "请填写姓名",
        icon: 'none',
        duration: 2000,
      });
    }
  
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
  bindTimeChange: function (e) {
    //设置事件
    this.setData({
      //给当前time进行赋值
      time: e.detail.value
    })
  },
  bindTimeChange2: function (e) {
    //设置事件
    this.setData({
      //给当前time进行赋值
      time2: e.detail.value
    })
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