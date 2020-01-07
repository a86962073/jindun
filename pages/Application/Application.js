// pages/Application/Application.js
  var call = require("../../utils/request.js");
var number=5
Page({

  /**
   * 页面的初始数据
   */
  data: {
      active:1,
      salary:'',
      time:'',
      search:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    number=5
    var that = this
    if(options.type=='guangguang'){
      that.setData({
        type: 1
      })
    }
    
    var active
    if(options.active){
      active = options.active
    that.setData({
      active: options.active
    })
    }else{
      that.setData({
        active: 1
      })
      active=1
    }
    call.requestServerData("/api/job/recruitment/choice-job-list", "POST",
      {page:1, page_size:9999,type:1} // 请求参数
    ).then(function (data) {
      console.log(data)
      that.setData({
        indexData: data.data.data
      })
    });
    if (active == 2) {
      call.requestServerData("/api/job/demand/list", "POST",
        { type: 2, browse_num: 'desc', page: 1, page_size: 5 } // 请求参数
      ).then(function (data) {
        console.log(data)
        that.setData({
          list: data.data.data
        })
      });
    }
    if (active == 3) {
      call.requestServerData("/api/job/recruitment/choice-job-list", "POST",
        { browse_num: 'desc', page: 1, page_size: 5, type: 2}// 请求参数
      ).then(function (data) {
        that.setData({
          list: data.data.data
        })
      });
    }
    if (active == 1) {
      call.requestServerData("/api/job/recruitment/list", "POST",
        { page: 1, page_size: 5 } // 请求参数
      ).then(function (data) {
        console.log(data)
        that.setData({
          list: data.data.data
        })
      });
    }
  },
  time:function(e){
    var that = this
    var url
    console.log(this.data.active)
    if (this.data.active == '2') {
      url = '/api/job/demand/list'
    }else if(this.data.active=='1') {
      url = '/api/job/recruitment/list'
    }else{
      url ='/api/job/recruitment/choice-job-list'
    }
    if (e.currentTarget.dataset.time == '' || e.currentTarget.dataset.time == 'desc') {
      that.setData({
        time: 'asc',
        salary: ''
      })
    } else {
      that.setData({
        time: 'desc',
        salary: ''
      })
    }
    call.requestServerData(url, "POST",
      { page: 1, page_size: number, time_sort: that.data.time, type: 2} // 请求参数
    ).then(function (data) {
      console.log(data)
      that.setData({
        list: data.data.data
      })
    });
  },
  salary:function(e){
    var that=this
    var url
    if (this.data.active == '2') {
      url = '/api/job/demand/list'
    } else if (this.data.active == '1') {
      url = '/api/job/recruitment/list'
    } else {
      url = '/api/job/recruitment/choice-job-list'
    }
    if (e.currentTarget.dataset.salary == '' || e.currentTarget.dataset.salary == 'desc'){
      that.setData({
        salary: 'asc',time:''
      })
    }else{
      that.setData({
        salary: 'desc', time: ''
      })
    }
     call.requestServerData(url, "POST",
      { page: 1, page_size: number, salary_sort: that.data.salary,type:2} // 请求参数
    ).then(function (data) {
      console.log(data)
      that.setData({
        list: data.data.data
      })
    });
    
  },
  info:function(e){
    if(this.data.type==1){
      wx.navigateTo({
        url: '../positionDetails/positionDetails?type=1&id=' + e.currentTarget.dataset.id,
      })
    }else{
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../positionDetails/positionDetails?id='+e.currentTarget.dataset.id,
    })
    }
  },
  info2: function (e) {
    if (this.data.type == 1) {
      wx.navigateTo({
        url: '../resume/resume',
      })
    } else {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '../positionDetails2/positionDetails2?id=' + e.currentTarget.dataset.id,
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },
  search:function(){
    var that = this
    var search = this.data.search
    var active=this.data.active
    this.setData({
      salary: '',
      time: ''
    })
    if (active == 2) {
      call.requestServerData("/api/job/demand/list", "POST",
        { type: 2, browse_num: 'desc', page: 1, page_size: 5, title: search} // 请求参数
      ).then(function (data) {
        console.log(data)
        that.setData({
          list: data.data.data
        })
      });
    }
    if (active == 1) {
      call.requestServerData("/api/job/recruitment/list", "POST",
        { page: 1, page_size: 5, title: search} // 请求参数
      ).then(function (data) {
        console.log(data)
        that.setData({
          list: data.data.data
        })
      });
    }
    if (active == 3) {
      call.requestServerData("/api/job/recruitment/choice-job-list", "POST",
        { page: 1, page_size: 5, title: search,type:2 } // 请求参数
      ).then(function (data) {
        console.log(data)
        that.setData({
          list: data.data.data
        })
      });
    }
  },
  bindChange:function(e){
   this.setData({
     search:e.detail.value
   })
  },
  tochange:function(e){
    var active = e.currentTarget.dataset.id
    var that=this
    this.setData({
      active: active,
      salary:'',
      time: '',
      search: ''
    })

    number=5
    if (active == 2){
      call.requestServerData("/api/job/demand/list", "POST",
        { type: 2, browse_num: 'desc', page: 1, page_size: 5, time_sort: that.data.time, salary_sort: that.data.salary} // 请求参数
      ).then(function (data) {
        console.log(data)
        that.setData({
          list: data.data.data
        })
      });
    }
    if (active == 3) {
      call.requestServerData("/api/job/recruitment/choice-job-list", "POST",
        { page: 1, page_size: 5, type: 2}// 请求参数
      ).then(function (data) {
        that.setData({
          list: data.data.data
        })
      }); 
    }
    if (active == 1) {
      call.requestServerData("/api/job/recruitment/list", "POST",
        { page: 1, page_size: 5, time_sort: that.data.time} // 请求参数
      ).then(function (data) {
        console.log(data)
        that.setData({
          list: data.data.data
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
    console.log(number)
    var that=this;
    if(this.data.list.length==number){
    number+=5
    var data1
    var url
      var search = this.data.search
    if(this.data.active==2){
      url ='/api/job/demand/list'
    } else if (this.data.active==1){
      url ='/api/job/recruitment/list'
    }else{
      url = '/api/job/recruitment/choice-job-list'
      console.log(123)
    }
      if (that.data.salary == '' && that.data.time == ''){
        data1 = { page: 1, page_size: number}
        if(this.data.active ==3){
          data1 = { page: 1, page_size: number,type:2}
        }
      } else if (that.data.salary == ''){
        data1 = { page: 1, page_size: number, time_sort: that.data.time}
      }else{
        data1 = { page: 1, page_size: number, salary_sort: that.data.salary}
      }
      if (this.data.title==''){

      }else{
        data1.title = search
      }
      
    call.requestServerData(url, "POST",
      data1 // 请求参数
    ).then(function (data) {
      console.log(data)
      that.setData({
        list: data.data.data
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