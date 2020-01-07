// pages/recruit2/recruit2.js
var call = require("../../utils/request.js")
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
    this.setData({
      company: options.company
    })
  },
  bindChange1:function(e){
    this.setData({
      legal_person: e.detail.value
    })
  },
  bindChange2: function (e) {
    this.setData({
      credit_code: e.detail.value
    })
  },
  bindChange3: function (e) {
    this.setData({
      transactor: e.detail.value
    })
  },
  bindChange4: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  changeSwitch1:function(e){
    if(e.detail.value){
      this.setData({
        is_electronic_contract: 1
      })
    }else{
      this.setData({
        is_electronic_contract: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  register:function(){
    var that=this
    call.requestServerData("/api/oa/company/apply-register", "POST",
    that.data // 请求参数
    ).then(function (data) {
      
      wx.showToast({
        title: '公司申请已提交',
        icon: 'success',
        duration: 2000,
        success: function () { 
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }, 2000)
         
        },
      })
   
       
    });
   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  uploader:function(){
    var that = this;
    let imagesList = [];
    let maxSize = 1024 * 1024;
    let maxLength = 3;
    let flag = true;
    wx.chooseImage({
      count:1, //最多可以选择的图片总数
      success: function (res) {
        console.log(res.tempFilePaths[0])
        wx.uploadFile({
          url: 'https://jd.100dp.com/api/foundation/upload/image',
          filePath: res.tempFilePaths[0],
          name: 'path',
          header: {
            "Content-Type": "multipart/form-data",
            'token':'MTgzMzQ1MDE2MjB8N0U1QjJGNEJBRUZDNDcwM0FBODgwNjcyRDBENzMzOTR8MTU0NzkyMDU1NHwyN3ww'
          },
          formData: {
            scene:'resume'
          },
          success: function (data) {
            if (data.statusCode!=200){
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
              return;
            }else{
              
            }
           
          },

          fail: function (data) {

            console.log(data);

          }

        })
      
        console.log(res);

      },

      fail: function (res) {
        console.log(res);
      }

    })
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