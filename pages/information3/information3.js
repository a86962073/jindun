// pages/resume/resume.js
var call = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    array2: ['2000-3000', '3000-5000', '5000-8000', '8000-10000', '10000-15000', '20000-30000','30000以上'],
    array3: ["浙江省", "杭州市", "下城区"],
    region: ['北京市', '北京市', '东城区'],
    multiIndex: [0, 0],
    multiIndex2:[0,0],
    indexdata:{}
  },
  save:function(){
    var that=this
    var data = that.data.indexdata
    console.log(that.data.list.work_experience_list)
    console.log(data.work_experience)
    console.log(that.data.list.work_experience_list[data.work_experience].id)
    data.work_location = that.data.region
    data.job_salary_id = that.data.list.salary_list[data.job_salary_id].id
    data.education = that.data.list.education_list[data.education].id
    data.work_experience = that.data.list.work_experience_list[data.work_experience].id
    data.job_status = that.data.list.job_status_list[data.job_status].id
    if (data.position){
      if (data.job_salary_id){
        call.requestServerData("/api/job/resume/create", "POST",
          data // 请求参数
        ).then(function (data) {
          console.log(data)
          if (data.data.code == 0) {
            wx.removeStorage({
              key: 'data',
              success: function () {
                wx.removeStorage({
                  key: 'data2',
                  success: function () {
                    wx.removeStorage({
                      key: 'data3',
                      success: function () {
                        wx.navigateTo({
                          url: '../experience/experience?id=' +data.data.data.resume_id,
                        })
                      }
                    })
                  }
                })
              }
            })
            
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000,
            });
          }
        });
      }else{
        wx.showToast({
          title: '请填期望月薪',
          icon: 'none',
          duration: 2000,
        });
      }
    }else{
      wx.showToast({
        title: '请填写职位意向',
        icon: 'none',
        duration: 2000,
      });
    }
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var ssls
    var data={}
    
    wx.getStorage({//获取本地缓存
      key: "data",
      success: function (res) {
        
        that.setData({
          image: res.data.image
        });
      },
    })
    wx.getStorage({//获取本地缓存
      key: "data",
      success: function (res) {
        console.log(res)
        data.gender=res.data.gender
        data.profile_photo_url=res.data.image
        wx.getStorage({//获取本地缓存
          key: "data2",
          success: function (res) {
            data.full_name=res.data.name
            data.profile_photo_url= res.data.image
            let d = new Date(res.data.time)
            let date_of_birth = d.getTime(d) / 1000
            let d2 = new Date(res.data.time2) 
            let job_start_time = d2.getTime(d2) / 1000
            data.date_of_birth = date_of_birth
            data.job_start_time = job_start_time
            wx.getStorage({//获取本地缓存
              key: "data3",
              success: function (res) {
                
                call.requestServerData("/api/job/resume/template", "POST",
                  {} // 请求参数
                ).then(function (data) {
                  that.setData({
                    array2: data.data.data.salary_list,
                    array: data.data.data.job_status_list,
                    list: data.data.data
                  })
                });
                data.education = parseInt(res.data.index5)
                data.work_experience = parseInt(res.data.index2)
                data.job_status = parseInt(res.data.index4)
                data.current_city_id = res.data.current_city_id
                data.current_city = res.data.region
                data.work_location_ids ='110100'
                that.setData({
                  indexdata: data
                })
              },
            })
          },
        })
      },
    })
 
  
    call.requestServerData("/api/job/demand/type", "POST",
      {type:'function'} // 请求参数
    ).then(function (data) {
      that.setData({
        job:data.data.data.taskTypeInfo
      })
      var job = data.data.data.taskTypeInfo
      var job1=[],job2=[]
      for (var i in job) {
        job1.push(job[i].name)
        for (var u in job[i].name) {
        if(i==0){
          job2.push(job[i].children[u].name)
        }
        }
      }
      console.log([job1, job2])
      that.data.indexdata.job_function_ids = job[0].children[0].id
      that.setData({
        multiArray2:[job1,job2],
        indexdata: that.data.indexdata
      })
    });
    call.requestServerData("/api/foundation/website/get-address-data", "POST",
      {} // 请求参数
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
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.indexdata.work_location_ids = this.data.ssl[e.detail.value[0]].city_list[e.detail.value[1]].cityID
    this.setData({
      multiIndex: e.detail.value,
      indexdata:this.data.indexdata
    })
  },
  bindMultiPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.indexdata.job_function_ids = this.data.job[e.detail.value[0]].children[e.detail.value[1]].id
    this.setData({
      multiIndex2: e.detail.value,
      indexdata: this.data.indexdata
    })
  },
  bindcolumnchange:function(e){
    var that=this
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column==0){
      var job = this.data.job
      var job1 = [], job2 = []
      for (var i in job) {
        job1.push(job[i].name)
        for (var u in job[i].name) {
          if (i == e.detail.value) {
            job2.push(job[i].children[u].name)
          }
        }
      }
      that.setData({
        multiArray2: [job1, job2]
      })
    }
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
  bindMultiPickerColumnChange2: function (e) {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  bindChange: function (e) {
    //设置事件
    this.setData({
      index: e.detail.value
    })
  },
  bindKeyInput(e) {
    this.data.indexdata.position = e.detail.value
    this.setData({

      indexdata: this.data.indexdata
    })
  },
  bindChange2: function (e) {
    //设置事件
+
    this.setData({

      indexdata: this.data.indexdata
    })
  },
  bindChange2: function (e) {
    //设置事件
    this.data.indexdata.job_salary_id = parseInt(e.detail.value)
    this.setData({
      index2: e.detail.value,
        indexdata: this.data.indexdata
    })
  },
  bindChange4: function (e) {
    this.setData({
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