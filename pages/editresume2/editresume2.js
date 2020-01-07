// pages/editresume/editresume.js
var call = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['北京市', '北京市', '东城区'],
    index4:-1, 
    index5:-1, 
    index2:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var id = options.id
    var ssls
    this.setData({
      resume_id: id
    })
    call.requestServerData("/api/job/resume/details", "POST",
      { resume_id: id}
    ).then(function (data) {
        var array=[]
      if (data.data.data.job_preferences_info.length>0){
        array = [data.data.data.job_preferences_info.work_location_info.province_name, data.data.data.job_preferences_info.work_location_info.province_name == '市辖区' ? data.data.data.job_preferences_info.work_location_info.province_name : data.data.data.job_preferences_info.work_location_info.city_name, data.data.data.job_preferences_info.work_location_info.area_name]
      }else{
        array= ['北京市', '北京市', '东城区']
      }
      that.setData({
        indexdata: data.data.data,
        region: array,
        time2: data.data.data.date_of_birth_format.replace('年', "-").replace('月', "-").replace('日', '')
      })
      call.requestServerData("/api/job/demand/type", "POST",
        { type: 'industry'}
      ).then(function (data) {
        var job = data.data.data.taskTypeInfo
        var job1 = [], job2 = []
        for (var i in job) {
          job1.push(job[i].name)
          for (var u in job[i].children) {
              if(i==0){
              

              }
            if (that.data.indexdata.job_preferences_info.job_industry_ids == job[i].children[u].id){
              that.setData({
                index4:[i,u]
              })
              for (var n in job[i].children) {
                job2.push(job[u].children[n].name)
              }
             
            }else{
             
            }
            if(!that.data.index4){
              that.setData({
                index4: [0, 0]
              })
            }
          }
        }
      
        that.data.indexdata.job_industry_ids = job[0].children[0].id
        that.setData({
          array4: [job1, job2],
          job:job
        })
      });
      call.requestServerData("/api/job/demand/type", "POST",
        { type: 'function' }
      ).then(function (data) {
        var job = data.data.data.taskTypeInfo
        var job1 = [], job2 = []
        for (var i in job) {
          job1.push(job[i].name)
          for (var u in job[i].children) {
            if (i == 0) {
              
            }
            if (that.data.indexdata.job_preferences_info.job_function_ids == job[i].children[u].id) {
              that.setData({
                index3: [i, u]
              })
              for (var n in job[i].children) {
                job2.push(job[i].children[n].name)
              }
            } 
            if (!that.data.index3){
              that.setData({
                index3: [0, 0]
              })
            }
            
          }
        }

        that.data.indexdata.job_function_ids = job[0].children[0].id
        that.setData({
          array3: [job1, job2],
          job2: job 
        })
      });
      call.requestServerData("/api/job/resume/template", "POST",
        {} // 请求参数
      ).then(function (data) {
        var index4, index5, index2
        for (var n in data.data.data.salary_list) {
          if (data.data.data.salary_list[n].id == that.data.indexdata.job_preferences_info.salary_id) {
            index5 = n
          }
        }
        for (var n in data.data.data.work_experience_list) {
          if (data.data.data.work_experience_list[n].id == that.data.indexdata.work_experience) {
            index2 = n
          }
        }
        that.setData({
          array5: data.data.data.salary_list,
          array2: data.data.data.work_experience_list


        })
        that.setData({
          index5: index5,
          index2: index2
        })
    }); //ajax
   
      call.requestServerData("/api/foundation/website/get-address-data", "POST",
        {} // 请求参数
      ).then(function (data) {
        that.setData({
          ssl: data.data.data
        })
        ssls = data.data.data
        var sheng = [];
        var shi = [];
        var qu = [];
        var index = ''
        for (var i in ssls) {
          sheng.push(ssls[i].province)
          for (var u in ssls[i].city_list) {
            if (ssls[i].city_list[u].cityID == that.data.indexdata.job_preferences_info.work_location_info.city_id){
              that.setData({
                multiIndex: [i, u]
              });
              index = u
              for (var a in ssls[i].city_list) {
                shi.push(ssls[i].city_list[a].city)
                for (var j in ssls[i].city_list[a].area_list) {
                  // console.log(ssls[i].city_list[u].area_list)
                  qu.push(ssls[i].city_list[a].area_list[j].area)
                }
              }
            }
            }
          
        }
        that.setData({
          multiArray: [sheng, shi]
        });
      })
    });
    
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
        // data.multiArray[2] = row[1];
        data.multiIndex[1] = 0;
        // data.multiIndex[2] = 0;
        break;
      case 1:
        // var row = this.getCity(this.data.thisSheng, e.detail.value);
        // console.log(row);
        // data.multiArray[2] = row[1];
        // data.multiIndex[2] = 0;
        // console.log(data.multiIndex);
        // break;
    }
    this.setData(data);
  },
  uploader: function () {
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
            image: res.tempFilePaths[0]
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
            
              that.data.indexdata.profile_photo_url = obj.data.path
              that.setData({
                indexdata: that.data.indexdata
              })
            }

          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  bindChange: function (e) {
    this.data.indexdata.job_preferences_info.position  = e.detail.value
    this.setData({
      indexdata:this.data.indexdata
    })
  },
  bindcolumnchange:function(e){
    var that = this
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 0) {
      var job = this.data.job
      var job1 = [], job2 = []
      for (var i in job) {
        job1.push(job[i].name)
        for (var u in job[i].children) {
          if (i == e.detail.value) {
            job2.push(job[i].children[u].name)
          }
        }
      }
      that.setData({
        array4: [job1, job2],
      })
      that.data.indexdata.job_industry_ids = that.data.job[e.detail.value].children[0].id
      that.data.index4[0] = e.detail.value
    }else{
      this.data.indexdata.job_industry_ids = this.data.job[that.data.index4[0]].children[e.detail.value].id
      that.data.index4[1] = e.detail.value
    }
    this.setData({
      index4: this.data.index4,
      indexdata: this.data.indexdata
    })
  },
  bindcolumnchange2: function (e) {
    var that = this
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 0) {
      var job = this.data.job2
      var job1 = [], job2 = []
      for (var i in job) {
        job1.push(job[i].name)
        for (var u in job[i].children) {
          if (i == e.detail.value) {
            job2.push(job[i].children[u].name)
          }
        }
      }
      that.setData({
        array3: [job1, job2]
      })
      that.data.indexdata.job_function_ids = that.data.job2[e.detail.value].children[0].id
      that.data.index3[0] = e.detail.value
    } else {
      this.data.indexdata.job_function_ids = this.data.job2[that.data.index3[0]].children[e.detail.value].id
      that.data.index3[1] = e.detail.value
    }
    this.setData({
      index3: this.data.index3,
      indexdata: this.data.indexdata
    })
  },
  bindChange1:function(e){
    this.setData({
      //给当前time进行赋值
      index4: e.detail.value
    })
  },
  bindTimeChange2: function (e) {
    this.setData({
      //给当前time进行赋值
      time2: e.detail.value
    })
  },
  bindChange2: function (e) {
    
    this.setData({
      //给当前time进行赋值
      index5: e.detail.value
    })
  },
  bindChange3: function (e) {
    this.setData({
      //给当前time进行赋值
      index2: e.detail.value
    })
  },
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
  save:function(){
    var that = this
    let d = new Date(this.data.time2)
    let date_of_birth = d.getTime(d) / 1000
    var data={
      resume_id: this.data.resume_id,
      position: this.data.indexdata.job_preferences_info.position,
      job_industry_ids: this.data.job[this.data.index4[0]].children[this.data.index4[1]].id,
      job_function_ids: this.data.job2[this.data.index3[0]].children[this.data.index3[1]].id,
      job_salary_id: this.data.array5[this.data.index5].id,
      work_location_ids :this.data.current_city_id,
      work_location: that.data.region
    }
    call.requestServerData("/api/job/resume/edit", "POST",
      data
    ).then(function (data) {
      wx.showToast({
        title: '保存成功',
        icon: 'none',
        duration: 2000,
      });
      setTimeout(function () {
        wx.navigateBack({
          delta: 1,
        })
      }, 2000)
     
    }); //ajax
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