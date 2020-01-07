// pages/experienceadd/experienceadd.js
var call = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexdata:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    if (options.type=='edit'){
      this.setData({
        id: options.id,
        type: options.type
      })
      call.requestServerData("/api/job/resume/work-experience-info", "POST",
        { id: options.id}// 请求参数
      ).then(function (res) {
        that.setData({
          indexdata:res.data.data,
          time: res.data.data.start_time_format,
          time2: res.data.data.end_time_format
        })
      })
    }else{
    this.setData({
      id: options.id
    })
    }
  },
  bindChange:function(e){
    this.data.indexdata.company = e.detail.value
    this.setData({
      indexdata: this.data.indexdata
    })
  },
  bindChange2: function (e) {
  
  },
  bindChange3: function (e) {
    this.data.indexdata.position = e.detail.value
    this.setData({
      indexdata: this.data.indexdata
    })
  },
  bindChange4: function (e) {
    this.data.indexdata.department = e.detail.value
    this.setData({
      indexdata: this.data.indexdata
    })
  },
  bindChange5: function (e) {
    this.data.indexdata.description = e.detail.value
    this.setData({
      indexdata: this.data.indexdata
    })
  },
  bindTimeChange: function (e) {
    //设置事件
    let d = new Date(e.detail.value)
    let start_time = d.getTime(d)/1000
    this.data.indexdata.start_time = start_time
    this.setData({
      //给当前time进行赋值
      indexdata: this.data.indexdata,
      time: e.detail.value
    })
  },
  bindTimeChange2: function (e) {
    //设置事件
    let d = new Date(e.detail.value)
    let end_time = d.getTime(d) / 1000
    this.data.indexdata.end_time = end_time 
    this.setData({
      //给当前time进行赋值
      indexdata: this.data.indexdata,
      time2: e.detail.value
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
  save:function(){
    var that=this
    if (that.data.type=='edit'){
      this.data.indexdata.work_experience_id = this.data.id
      this.setData({
        indexdata: this.data.indexdata
      })
    }else{
      this.data.indexdata.resume_id = this.data.id
      this.setData({
        indexdata: this.data.indexdata
      })
    }
    if(this.data.indexdata.company){
      if (this.data.indexdata.start_time){
        if (this.data.indexdata.end_time){
          if (this.data.indexdata.position) {
            if (this.data.indexdata.department){
              if (this.data.indexdata.description) {
                if (this.data.type=='edit'){
                  call.requestServerData("/api/job/resume/work-experience-update", "POST",
                    that.data.indexdata // 请求参数
                  ).then(function (data) {
                    if (data.data.code == 0) {
                      wx.navigateBack({ changed: true })
                    } else {
                      wx.showToast({
                        title: data.data.message,
                        icon: 'none',
                        duration: 2000,
                      });
                    }
                  })
                }else{
                call.requestServerData("/api/job/resume/work-experience-add", "POST",
                  that.data.indexdata // 请求参数
                ).then(function (data) {
                  if (data.data.code==0){
                    wx.navigateBack({ changed: true })
                  }else{
                    wx.showToast({
                      title: data.data.message,
                      icon: 'none',
                      duration: 2000,
                    });
                  }
                })
                }
              }else{
                wx.showToast({
                  title: '请填写工作内容',
                  icon: 'none',
                  duration: 2000,
                });
              }
            }else{
              wx.showToast({
                title: '请填写所属部门',
                icon: 'none',
                duration: 2000,
              });
            }
          }else{
            wx.showToast({
              title: '请填写职位名称',
              icon: 'none',
              duration: 2000,
            });
          }
        }else{
          wx.showToast({
            title: '请填写结束时间',
            icon: 'none',
            duration: 2000,
          });
        }
      }else{
        wx.showToast({
          title: '请填写开始时间',
          icon: 'none',
          duration: 2000,
        });
      }
    }else{
      wx.showToast({
        title: '请填写公司名称',
        icon: 'none',
        duration: 2000,
      });
    }
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