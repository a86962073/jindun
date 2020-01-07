// pages/resume/resume.js
var call = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array5: ['小学', '初中', '高中', '中专', '大专', '本科','硕士研究生','博士研究生'],
    array2: ['实习', '1年以内', '1-3年', '3-5年', '5-10年', '10年以上'],
    array3: ["浙江省", "杭州市", "下城区"],
    array4: ["是", "否"],
    region: ['北京市', '北京市', '东城区'],
    multiIndex: [0, 0],
    current_city_id: 110100
  },
  bindRegionChange:function(e){
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(call)
    var that=this
    var ssls
    wx.getStorage({//获取本地缓存
      key: "data",
      success: function (res) {
        that.setData({
          image: res.data.image
        });
      },
    })
    call.requestServerData("/api/job/resume/template", "POST",
      {} // 请求参数
    ).then(function (data) {
      that.setData({
        array5: data.data.data.education_list,
        array2: data.data.data.work_experience_list,
        array4: data.data.data.job_status_list
      })

    });
    call.requestServerData("/api/foundation/website/get-address-data", "POST",
      { } // 请求参数
    ).then(function (data) {
      console.log(data)
      that.setData({
        ssl: data.data.data
      })
      ssls = data.data.data
      var sheng = [];
      var shi = [];
      var qu = [];
      for (var i in ssls) {
        sheng.push(ssls[i].province)
        for (var u in ssls[i].city_list) {
          if (i == 0) {
          // console.log(ssls[i].city_list[u].city)
          shi.push(ssls[i].city_list[u].city)
          for (var j in ssls[i].city_list[u].area_list) {
            // console.log(ssls[i].city_list[u].area_list)
            qu.push(ssls[i].city_list[u].area_list[j].area)
          }
        }
        }
      }
      that.setData({
        multiArray: [sheng, shi]
      });
      
    });
   
    //定义对应变量
   
  },
  getCity: function (x, y = 999, z = 999) {
    console.log("xy", x, y);
    var ssls = this.data.ssl;
    var shi = [];
    var qu = [];
    for (var i in ssls) {
      if (i == x) {
        for (var u in ssls[i].city_list) {
          shi.push(ssls[i].city_list[u].city)
          if (u == y) {
            for (var j in ssls[i].city_list[u].area_list) {
              qu.push(ssls[i].city_list[u].area_list[j].area)
            }
            break;
          }
          if (y == 999) {
            for (var j in ssls[i].city_list[u].area_list) {
              qu.push(ssls[i].city_list[u].area_list[j].area)
            }
          }

        }
        break;
      }
    }
    console.log(shi);
    return [shi];
  },
  bindMultiPickerChange: function (e) {
    console.log()
    this.setData({
      multiIndex: e.detail.value,
      current_city_id: this.data.ssl[e.detail.value[0]].city_list[e.detail.value[1]].cityID
    })
  },

  //第四步：下拉拖动选项事件（这里只需要处理第一栏，与第二栏【因为第三栏拖动的时候，没有第四栏关联变动了，关于此处讲的栏，请看代码后图1-3】）

  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        this.setData({
          thisSheng: e.detail.value
        })
        var row = this.getCity(e.detail.value);
        data.multiArray[1] = row[0];
        data.multiArray[2] = row[1];

        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        var row = this.getCity(this.data.thisSheng, e.detail.value);
        console.log(row);
        data.multiArray[2] = row[1];
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  next:function(){
    var that=this
    if (this.data.index5){
      if (this.data.index2){
          if(this.data.index4){
            var data={}
            wx.setStorage({//存储到本地
              key: "data3",
              data: that.data
            })
            wx.navigateTo({
              url: '../information3/information3',
            })
          }else{
            wx.showToast({
              title: "请选择是否在职",
              icon: 'none',
              duration: 2000,
            });
          }
      }else{
        wx.showToast({
          title: "请填写参加工作时间",
          icon: 'none',
          duration: 2000,
        });
      }
    }else{
      wx.showToast({
        title: "请填写最高学历",
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
  bindChange: function (e) {
    //设置事件
    this.setData({
      //给当前time进行赋值
      index5: e.detail.value
    })
  },
  bindChange2: function (e) {
    //设置事件
    this.setData({
      //给当前time进行赋值
      index2: e.detail.value
    })
  },
  bindChange4: function (e) {
    //设置事件
    this.setData({
      //给当前time进行赋值
      index4: e.detail.value
    })
  },
  bindChange3(e) {
    this.setData({ array3: e.detail.value });
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