// pages/resume/resume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      { value: '1', checked: "true" },
      { value: '2' }
    ],
    gender:1
  },
  change:function(e){
    if(e.currentTarget.dataset.sex=='man'){
      this.setData({
        items: [
          { value: '1', checked: "true" },
          { value: '2' }
        ],
        gender:1
      })
    }else{
      this.setData({
        items: [
          { value: '1' },
          { value: '2', checked: "true"}
        ],
        gender: 2
      })
    }
  },
  radioChange: function (e) {
    this.setData({
      items: [
        { value: '1' },
        { value: '2', checked: "true" }
      ],
      gender: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  uploader:function(){
    var that = this;
    let imagesList = [];
    let maxSize = 1024 * 1024;
    let maxLength = 3;
    let flag = true;
    wx.chooseImage({
      count: 1, //最多可以选择的图片总数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 500
        })
        for (let i = 0; i < res.tempFiles.length; i++) {
          if (res.tempFiles[i].size > maxSize) {
            flag = false;
            console.log(111)
            wx.showModal({
              content: '图片太大，不允许上传',
              showCancel: false,

              success: function (res) {

                if (res.confirm) {

                  console.log('用户点击确定')

                }

              }

            });

          }
        }
        if (res.tempFiles.length > maxLength) {
          console.log('222');
          wx.showModal({
            content: '最多能上传' + maxLength + '张图片',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {

                console.log('确定');

              }

            }

          })
        }
        if (flag == true && res.tempFiles.length <= maxLength) {
          that.setData({
            imagesList: res.tempFilePaths
          })
        }
        console.log(res.tempFilePaths[0])
        wx.uploadFile({
          url: 'https://jd.100dp.com/api/foundation/upload/image',
          filePath: res.tempFilePaths[0],
          name: 'path',
          header: {
            "Content-Type": "multipart/form-data",
            'token': 'MTgzMzQ1MDE2MjB8N0U1QjJGNEJBRUZDNDcwM0FBODgwNjcyRDBENzMzOTR8MTU0NzkyMDU1NHwyN3ww'
          },
          formData: {
            scene: 'resume'
          },
          success: function (res) {
            if (res.statusCode != 200) {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
              return;
            } else {
              console.log(res)
              var obj = JSON.parse(res.data)
              console.log(obj)
              that.setData({
                image: obj.data.path
              })
            }

          }
        })
       

      }
    })
  },
  next:function(){
    var that=this

    wx.setStorage({//存储到本地
      key: "data",
      data: that.data
    })
    if (that.data.image){
      wx.setStorage({//存储到本地
        key: "image",
        data: that.data.image
      })
      wx.navigateTo({
        url: '../information/information',
      })
    }else{
      wx.setStorage({//存储到本地
        key: "image",
        data: that.data.image
      })
      wx.navigateTo({
        url: '../information/information',
      })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})