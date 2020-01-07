// pages/enroll/enroll.js
var call = require("../../utils/request.js");
var number=5
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    number = 5
    call.requestServerData("/api/enroll/category-list", "POST",
      { page:1,page_size:9999,pid:0}// 请求参数
    ).then(function (data) {
        if(data.data.data.length!=0){
        that.setData({
          indexdata:data.data.data,
          active: data.data.data[0].id
        })
      call.requestServerData("/api/enroll/category-list", "POST",
        { page: 1, page_size: 5, pid: data.data.data[0].id }// 请求参数
      ).then(function (data) {
        that.setData({
          indexdata2: data.data.data,
        })
      });
      }
    }); //ajax
  },
  tab:function(e){
    var that=this
    number=5
    var id = e.currentTarget.dataset.active
    this.setData({
      search:''
    })
    call.requestServerData("/api/enroll/category-list", "POST",
      { page: 1, page_size: 5, pid: id}// 请求参数
    ).then(function (data) {
      that.setData({
        indexdata2: data.data.data,
        active: id
      })
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toTrain:function(e){
    var id = e.currentTarget.dataset.id
     wx.navigateTo({
       url: "../Train/Train?id="+id,   
      })//跳转
  },
  bindChange:function(e){
    this.setData({
      search: e.detail.value
    })
  },
  search:function(){
    number=5
    var that = this
    if (that.data.search==''){
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none',
        duration: 2000,
      });
    }else{

    call.requestServerData("/api/enroll/category-list", "POST",
      { page: 1, page_size: 5, pid: that.data.active, name: that.data.search}// 请求参数
    ).then(function (data) {
      that.setData({
        indexdata2: data.data.data,
      })
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
    if (number == this.data.indexdata2.length){
    number+=5
    call.requestServerData("/api/enroll/category-list", "POST",
      { page: 1, page_size: number, pid: that.data.active, name: that.data.search }// 请求参数
    ).then(function (data) {
      that.setData({
        indexdata2: data.data.data,
      })
    });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})