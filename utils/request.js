module.exports.requestServerData = function (url, method, data) {
  return new Promise(function (resolve, reject) {
    var token=''
    wx.getStorage({
      key: 'token',
      complete: function (res) {
        token = res.data
        if(token!=''){
        wx.request({
          url: "https://jd.100dp.com" + url,
          method: method,
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': token//MTgzNjg3ODE4NTh8fDE1NDgzNzg3NjZ8OHww
          },
          data: data,
          success: function (res) {
            if (res.data.status == 200) {
              if (res.data.code == 0) {
                resolve(res)
              } else if (res.data.code == 10004 || res.data.code == 10005){
                wx.redirectTo({
                  url: '../login/login',
                  success: function (e) {
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.onLoad();
                  }
                })//跳转
               
                
              } else {
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 2000,
                });
              }
            } else {
              
            }
          },
          fail: function (res) {
            reject(res)
          }
        })
        } else {
          wx.request({
            url: "https://jd.100dp.com" + url,
            method: method,
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'token': token//MTgzNjg3ODE4NTh8fDE1NDgzNzg3NjZ8OHww
            },
            data: data,        
            success: function (res) {
              if (res.data.status == 200) {
                if (res.data.code == 0) {
                  resolve(res)
                } else if (res.data.code == 10004 || res.data.code == 10005) {
                  wx.redirectTo({
                    url: '../login/login',
                    success: function (e) {
                      var page = getCurrentPages().pop();
                      if (page == undefined || page == null) return;
                      page.onLoad();
                    }
                  })//跳转


                } else {
                  wx.showToast({
                    title: res.data.message,
                    icon: 'none',
                    duration: 2000,
                  });
                }
              } else {

              }
            },
            fail: function (res) {
              reject(res)
            }
          })
        }
      }
      
    })
    
  
  })
}
var domin ='https://jd.100dp.com'
