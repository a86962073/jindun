// pages/Train/Train.js
var call = require("../../utils/request.js");
var number=1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:'active',
    time: '',
    salary: '',
    category2:0,
    search:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    number=1
    var that = this
    call.requestServerData("/api/enroll/category-list", "POST",
      { page: 1, page_size: 999999, pid: 0 }// 请求参数
    ).then(function (data) {
      that.setData({
        indexdata: data.data.data,
        category: -1,
        category2: options.id,
      })
      call.requestServerData("/api/enroll/category-list", "POST",
        { page: 1, page_size: 999999, pid: data.data.data[0].id }// 请求参数
      ).then(function (data) {
        that.setData({
          
        })
      });
    }); //ajax
    call.requestServerData("/api/enroll/list", "POST",
      { page: 1, page_size: 5, category_id : options.id}// 请求参数
    ).then(function (data) {
      that.setData({
        indexdata3: data.data.data,
      })
    });
  },
  all:function(){
    if(this.data.active=='active'){
      this.setData({
        active:''
      })
    }else{
      this.setData({
        active: 'active'
      })
    }
  },
  category:function(e){
    var that = this
    var id = e.currentTarget.dataset.id
    this.setData({
      
    })
    if(id!=0){
    call.requestServerData("/api/enroll/category-list", "POST",
      { page: 1, page_size: 5, pid: id }// 请求参数
    ).then(function (data) {
      var category2=0
      if (data.data.data.length>0){
        category2 = data.data.data[0].id
      }
      that.setData({
        indexdata2: data.data.data,
        category2: category2,
        category: id,
      })
    });
    }else{
      this.setData({
        category2: -1,
        indexdata2:'',
        category: id,
      })
    }
  },
  category2: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    this.setData({
      category2:id
    })
  },
  reset:function(){
    number = 1
    var that = this
    that.setData({
      salary: '', time: '', search:''
    })
    call.requestServerData("/api/enroll/list", "POST",
      { page: 1, page_size: 5 }// 请求参数
    ).then(function (data) {
      that.setData({
        indexdata3: data.data.data,
        active: 'active'
      })
    });
  },
  sure:function(){
    number = 1
    var that = this
    that.setData({
      salary: '', time: '', search: ''
    })
    console.log(that.data.category == -1)
    if (that.data.category == -1){
      call.requestServerData("/api/enroll/list", "POST",
        { page: 1, page_size: 5 }// 请求参数
      ).then(function (data) {
        that.setData({
          indexdata3: data.data.data,
          active: 'active'
        })
      });
    } else if (this.data.category == 0){
      that.setData({
        active: 'active'
      })
    }else{
      call.requestServerData("/api/enroll/list", "POST",
        { page: 1, page_size: 5 ,category_id:that.data.category2}// 请求参数
      ).then(function (data) {
        that.setData({
          indexdata3: data.data.data,
          active: 'active'
        })
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  
  },
  salary:function(e){
    var that=this
    number = 1
    var data = { page: 1, page_size: 5 }
    if (that.data.category2 != 0) {
      data.category_id = that.data.category2
    }
    if (that.data.search != '') {
      data.title = that.data.search
    }
 
    if (e.currentTarget.dataset.salary == 'desc') {
      that.setData({
        salary: 'asc', time: ''
      })
      } else {
      that.setData({
        salary: 'desc', time: ''
      })
    }
    data.money_sort = this.data.salary
    call.requestServerData("/api/enroll/list", "POST",
      data// 请求参数
    ).then(function (data) {
      that.setData({
        indexdata3: data.data.data,
      })
    });

  },
  time:function(e){
    number=1
    var that=this
    var that = this
    var data = { page: 1, page_size: 5 }
    if (that.data.category2 != 0) {
      data.category_id = that.data.category2
    }
    if (that.data.search != '') {
      data.title = that.data.search
    }
    if (e.currentTarget.dataset.time == 'desc') {
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
    data.time_sort  = this.data.time
    call.requestServerData("/api/enroll/list", "POST",
      data// 请求参数
    ).then(function (data) {
      that.setData({
        indexdata3: data.data.data,
      })
    });
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
    if (number * 5 == that.data.indexdata3.length) {

    number+=1
    var data = { page: number, page_size: 5, 'number':5}
    if (that.data.category2 != 0) {
      data.category_id = that.data.category2
    }
    if (that.data.search != '') {
      data.title = that.data.search
    }
    if (that.data.time!=''){
      data.time_sort = that.data.time
    }
    if (that.data.salary != ''){
      data.salary_sort = that.data.salary
    }
    call.requestServerData("/api/enroll/list", "POST",
      data// 请求参数
    ).then(function (data) {
      console.log(that.data.indexdata3)
      console.log(data.data.data)
      var indexdata3=that.data.indexdata3.concat(data.data.data)
      that.setData({
        indexdata3: indexdata3,
      })
    });
    }
  },
  bindChange: function (e) {
    this.setData({
      search: e.detail.value
    })
  },
  search: function () {
    number=1
    var that = this
    if (that.data.search == '') {
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none',
        duration: 2000,
      });
    } else {
    that.setData({
      salary: '', time: ''
    })
    call.requestServerData("/api/enroll/list", "POST",
      { page: 1, page_size: 5, title: that.data.search }// 请求参数
    ).then(function (data) {
      that.setData({
        indexdata3: data.data.data,
      })
    });
    }
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  traininfo:function(e){

    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "../Traininfo/Traininfo?id=" + id,
    })//跳转
  }
})