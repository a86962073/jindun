// pages/editresume/editresume.js
var call = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upload:0,
    region: ['北京市', '北京市', '东城区'],
    index4:-1,
    index5: -1,
    index2: -1,
    index3: -1,
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
      var array = [data.data.data.current_city_info.province_name, data.data.data.current_city_info.province_name == '市辖区' ? data.data.data.current_city_info.province_name : data.data.data.current_city_info.city_name, data.data.data.current_city_info.area_name]

      that.setData({
        indexdata:data.data.data,
        region:array,
        time2: data.data.data.date_of_birth_format.replace('年', "-").replace('月', "-").replace('日','')
      })
      call.requestServerData("/api/job/resume/template", "POST",
        {} // 请求参数
      ).then(function (data) {
        var index4, index5, index2,index3
        for (var n in data.data.data.gender_list){
          if (data.data.data.gender_list[n].id == that.data.indexdata.gender){
            index4=n
          }
        }
        for (var n in data.data.data.education_list) {
          if (data.data.data.education_list[n].id == that.data.indexdata.education) {
            index5 = n
          }
        }
        for (var n in data.data.data.work_experience_list) {
          if (data.data.data.work_experience_list[n].id == that.data.indexdata.work_experience) {
            index2 = n
          }
        }
        for (var n in data.data.data.job_status_list) {
          if (data.data.data.job_status_list[n].id == that.data.indexdata.job_status) {
            index3 = n
          }
        }
        that.setData({
          array5: data.data.data.education_list,
          array2: data.data.data.work_experience_list,
          array4: data.data.data.gender_list,
          array3: data.data.data.job_status_list,
          index4: index4,
          index5: index5,
          index2: index2,
          index3: index3
        })
    }); //ajax
   
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
            if (ssls[i].city_list[u].cityID == that.data.indexdata.current_city_id){
              that.setData({
                multiIndex: [i, u]
              });
            }
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
            image: res.tempFilePaths[0],
            upload:1
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
    this.data.indexdata.full_name = e.detail.value
    this.setData({
      //给当前time进行赋值
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
  bindChange4: function (e) {
    this.setData({
      //给当前time进行赋值
      index3: e.detail.value
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
    var data 
    console.log(this.data.upload)
    if (this.data.upload!=1){
      var gender, education, work_experience, job_status
      if (this.data.index4==-1){
        gender=0
      }else{
        gender=this.data.array4[this.data.index4].id
      }
      if (this.data.index5 == -1) {
        education = 0
      } else {
        education = this.data.array5[this.data.index5].id
      }
      if (this.data.index2 == -1) {
        work_experience = 0
      } else {
        work_experience = this.data.array2[this.data.index2].id
      }
      if (this.data.index3 == -1) {
        job_status = 0
      } else {
        job_status = this.data.array3[this.data.index3].id
      }
    data={
      resume_id: this.data.resume_id,
      full_name:this.data.indexdata.full_name,
      gender: this.data.index4==-1?0:this.data.array4[this.data.index4].id,
      date_of_birth: date_of_birth,
      education: this.data.index5==-1?0:this.data.array5[this.data.index5].id,
      work_experience: this.data.index2 == -1 ? 0 :this.data.array2[this.data.index2].id,
      current_city_id:this.data.current_city_id,
      job_status: this.data.index3 == -1 ? 0 :this.data.array3[this.data.index3].id,
      current_city: this.data.region
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
    }else{
      data = {
        resume_id: this.data.resume_id,
        full_name: this.data.full_name,
        profile_photo_url: this.data.indexdata.profile_photo_url,
        gender: this.data.array4[this.data.index4].id,
        date_of_birth: date_of_birth,
        education: parseInt(this.data.array5[this.data.index5].id),
        work_experience: parseInt(this.data.array2[this.data.index2].id),
        current_city_id: this.data.current_city_id,
        job_status: parseInt(this.data.array3[this.data.index3].id),
      }
      call.requestServerData("/api/job/resume/edit", "POST",
        data
      ).then(function (data) {
        wx.showToast({
          title: '保存成功',
          icon: 'none',
          duration: 2000,
        });
      }); //ajax
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