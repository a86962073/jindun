// pages/release/release.js
var call = require("../../utils/request.js")
var tag_list = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['不限','男','女'],
    array2: ['前端','ui'],
    multiIndex2: [0, 0],
    multiIndex:[0,0,0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var data1 = {}
    data1.company_id = options.id
    call.requestServerData("/api/foundation/website/get-address-data", "POST",
      {} // 请求参数
    ).then(function (data) {
      console.log(data)
      that.setData({
        ssl: data.data.data
      })
      var ssls = data.data.data
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
        multiArray: [sheng, shi, qu]
      });
    })
      
    call.requestServerData("/api/job/recruitment/publish-template", "POST",
      { company_id: options.id}
    ).then(function (data) {
      data1.bd_longitude = data.data.data.longitude
      data1.bd_latitude = data.data.data.latitude
      data1.display=0
      that.setData({
        indexdata:data.data.data,
        data1: data1
        
      })
      var job = data.data.data.position_list
      var job1 = [], job2 = []
      for (var i in job) {
        job1.push(job[i].name)
        for (var u in job[i].name) {
          if (i == 0) {
            job2.push(job[i].children[u].name)
          }
        }
      }
      that.data.data1.job_function_id = job[0].children[0].id
      that.data.data1.province_id = 110000
      that.data.data1.city_id = 110100
      that.data.data1.area_id = 110101
      that.setData({
        multiArray2: [job1, job2],
        data1: that.data.data1
      })       
    });
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
    console.log(shi, qu);
    return [shi, qu];
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
    this.data.data1.province_id = this.data.ssl[data.multiIndex[0]].provinceID
    this.data.data1.city_id = this.data.ssl[data.multiIndex[0]].city_list[data.multiIndex[1]].cityID
    this.data.data1.area_id = this.data.ssl[data.multiIndex[0]].city_list[data.multiIndex[1]].area_list[data.multiIndex[2]].areaID
    this.setData(data);
    
  },
  bindChange1:function(e){
    this.data.data1.title = e.detail.value
    this.setData({
      data1: this.data.data1
    })   
  },
  bindWordLimit:function(e){
    this.data.data1.work_address=e.detail.value
    this.setData({
      data1: this.data.data1
    })   
  },
  bindWordLimit2: function (e) {
    this.data.data1.content= e.detail.value
    this.setData({
      data1: this.data.data1
    })
  },
  bindWordLimit3: function (e) {
    this.data.data1.skill = e.detail.value
    this.setData({
      data1: this.data.data1
    })
  },
  bindcolumnchange: function (e) {
    
    var that = this
    that.data.multiIndex2[e.detail.column] = e.detail.value
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var job = this.data.indexdata.position_list
    var job1 = [], job2 = []
    if (e.detail.column == 0) {
      for (var i in job) {
        job1.push(job[i].name)
        for (var u in job[i].name) {
          if (i == e.detail.value) {
            job2.push(job[i].children[u].name)
          }
        }
      }
    that.setData({
      multiArray2: [job1, job2],
    })
    }else{
     
  }
    that.data.data1.oa_department_id=this.data.indexdata.position_list[this.data.multiIndex2[0]].children  [this.data.multiIndex2[1]].id

    that.setData({
      data1: this.data.data1,
      multiIndex2: this.data.multiIndex2
    })
  },
  save:function(e){
    var that=this
    console.log(that.data.data1)
    call.requestServerData("/api/job/recruitment/publish-job", "POST",
      that.data.data1 // 请求参数
    ).then(function (data) {
      wx.navigateBack({
    delta: 1
    })
    });
  },
  bindChange2: function (e) {
    var oa_department_id=e.detail.value
    this.data.data1.oa_department_id = this.data.indexdata.department_list[oa_department_id].id
    this.setData({
      index: e.detail.value,
      data1: this.data.data1
    })

  },
  bindChange3: function (e) {
  
  },
  bindChange4: function (e) {
    this.data.data1.number = e.detail.value
    this.setData({
      data1: this.data.data1
    })
  },
  bindChange5: function (e) {
    var work_experience = e.detail.value
    this.data.data1.work_experience= this.data.indexdata.work_experience_list[work_experience].id
    this.setData({
      index2: e.detail.value,
      data1: this.data.data1
    })

  },
  bindChange6: function (e) {
    var education = e.detail.value
    this.data.data1.education = this.data.indexdata.education_list[education].id
    this.setData({
      index3: e.detail.value,
      data1: this.data.data1
    })
  },
  bindChange7:function(e){
    this.data.data1.sex= e.detail.value
    this.setData({
      data1: this.data.data1,
      index7: e.detail.value
    })
  },
  bindChange8:function(e){
    this.data.data1.age=e.detail.value
    this.setData({
      data1: this.data.data1
    })
  },
  bindChange9: function (e) {
    var job_salary_id = e.detail.value
    this.data.data1.job_salary_id = this.data.indexdata.salary_list[job_salary_id].id
    this.setData({
      index4: e.detail.value,
      data1: this.data.data1
    })
  },
  bindChange10: function (e) {
    var salary_type = e.detail.value
    this.data.data1.salary_type = this.data.indexdata.salary_type_list[salary_type].id
    this.setData({
      index5: e.detail.value,
      data1: this.data.data1
    })
  },
  bindChange11: function (e) {
    var tag = e.detail.value
    var has=false
    for (var i = 0; i <tag_list.length;i++){
      if (this.data.indexdata.welfare_list[tag].id == tag_list[i]){
        has=true
    
      }
    }
    if (has == false){
      tag_list.push(this.data.indexdata.welfare_list[tag].id)
    }
    this.data.data1.tag_list = tag_list
    this.setData({
      index6: '已选择' + this.data.data1.tag_list.length+'样',
      data1: this.data.data1
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  changeSwitch1:function(e){
    this.data.data1.display = e.detail.value?1:0
    this.setData({
      data1: this.data.data1
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

  }
})