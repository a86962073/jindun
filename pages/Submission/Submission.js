// pages/Submission/Submission.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:true,
    agree: true, 
    indexdata: { is_self:1}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },
  agree:function(){
    if (this.data.agree){
    this.setData({
      agree: false
    })
    }else{
      this.setData({
        agree: true
      })
    }
  },
  signup:function(e){
    if(e.currentTarget.dataset.active==2){
      this.data.indexdata.is_self=0
      this.setData({
        active: false
      })
    }else{
      this.data.indexdata.is_self=1
      this.setData({
        active: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindChange:function(e){
    this.data.indexdata.name = e.detail.value
    this.setData({
      indexdata: this.data.indexdata
    })
  },
  bindChange2: function (e) {
    this.data.indexdata.credential_number= e.detail.value
    this.setData({
      indexdata: this.data.indexdata
    })
  },
  bindChange3: function (e) {
    this.data.indexdata.phone = e.detail.value
    this.setData({
      indexdata: this.data.indexdata
    })
  },
  bindChange4: function (e) {
    this.data.indexdata.agent_name= e.detail.value
    this.setData({
      indexdata: this.data.indexdata
    })
  },
  bindChange5: function (e) {
    this.data.indexdata.agent_phone = e.detail.value
    this.setData({
      indexdata: this.data.indexdata
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
  btn_submit:function(){
    var that=this
    if (this.data.indexdata.name){
      if (this.data.indexdata.credential_number && this.data.indexdata.credential_number.length == 18){
        if (this.data.indexdata.phone && this.data.indexdata.phone.length==11){
          if (this.data.agree){
            if (this.data.active){
              wx.setStorage({
                key: "traindata",
                data: that.data.indexdata,
                success: function (res) {
                  wx.navigateTo({
                    url: '../Submission2/Submission2?id='+that.data.id,
                  })//跳转
                },
              })
            }else{
                wx.setStorage({
                    key: "traindata",
                    data: that.data.indexdata,
                    success: function (res) { 
                      wx.navigateTo({
                        url: '../Submission2/Submission2?id=' + that.data.id,
                      })//跳转
                     },
                  })             
            }
          }else{
            wx.showToast({
              title: '请勾选本人承诺',
              icon: 'none',
              duration: 2000,
            });
          }
        }else{
          wx.showToast({
            title: '请填写正确的手机号',
            icon: 'none',
            duration: 2000,
          });
        }
      }else{
        wx.showToast({
          title: '请填写正确的身份证号',
          icon: 'none',
          duration: 2000,
        });
      }
    }else{
      wx.showToast({
        title: '请填写学员的真实姓名',
        icon: 'none',
        duration: 2000,
      });
    }
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