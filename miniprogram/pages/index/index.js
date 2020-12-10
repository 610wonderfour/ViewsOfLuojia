//index.js
const app = getApp()
const th = require('../../utils/th')

Page({
  data: {
    location:{
      latitude: 10.040415,
      longtitude: 116.273511
    },
    collectionsIcon: '../../icons/collections.png',
    selfCenterIcon: '../../icons/self_center.png',
  },


  checkIfSign: function(){
    if (!wx.getStorageSync('logged')) {
      wx.navigateTo({
        url: '../signIn/signIn'
      })
      return false;
    } else return true;
  },

  enterCollections: function(){
    this.setData({
      collectionsIcon: '../../icons/collections_focus.png'
    })
    if(this.checkIfSign())
    wx.navigateTo({
      url: '../collections/collections',
    })


  },

  enterSelfCenter: function(){
    this.setData({
      selfCenterIcon: '../../icons/self_center_focus.png'
    })
    if(this.checkIfSign())
    wx.navigateTo({
      url: '../selfCenter/selfCenter',
    })

  },

  analyzeImg: function(){
    if(this.checkIfSign()){
      this.choosePic();

    }
  },

  //用户选择拍照或相册中图片上传
  choosePic: function(options) {
    /*
    *调试阶段代码（最终须注释）
    */
    // wx.navigateTo({
    //   url: '../analyzeImg/analyzeImg',
    // })

    /*
    *正式阶段代码
    */
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res);
        wx.showLoading({
          title: '小图努力中...'
        });
        var tempFilePath = res.tempFilePaths[0];
        wx.setStorageSync('targetImgPath', tempFilePath);
        console.log(tempFilePath);
        //上传图片进行识别
        wx.uploadFile({
          url: app.globalData.url + 'WxAppPredict/',
          filePath: tempFilePath,
          name: 'file',
          formData: {
            'openId': wx.getStorageSync('openid')
          },
          success: function(res) {
            console.log(res);
            if(res.statusCode === 200){
              var data = JSON.parse(res.data);
              wx.setStorageSync('analyzeRes', data.predict_ans);
              wx.showToast({
                title: "识别成功", // 提示的内容
                icon: "success", // 图标，默认success
                image: "", // 自定义图标的本地路径，image 的优先级高于 icon
                mask: false, // 是否显示透明蒙层，防止触摸穿透
                duration: 2500,
                success: function(){
                  
                }
              })
              
            }
            else{
              wx.showToast({
                title: '服务器开小差了噢~',
                icon: 'none',
                image: ''
              })
            }
            
            //上传识别结果获取示例图片
            wx.request({
              url: app.globalData.url + 'returnTarget/',
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                'predict_ans': th.typeHash(wx.getStorageSync('analyzeRes'))
              },
              success:function(res) {
                console.log(res);
                var url = app.globalData.imgUrl + 'uploaded/images/' + th.typeHash(wx.getStorageSync('analyzeRes')) + '/' + res.data.target_file
                wx.setStorageSync('exampleImgPath', url);
                
                setTimeout(()=>{
                  wx.navigateTo({
                    url: '../analyzeImg/analyzeImg',
                  })
                }, 2500) 
              },
              fail:function(res) {
                console.log(res);
                wx.showToast({
                  title: '获取示例图片失败~',
                  icon: 'none'
                })
              }

            })


          },
          complete: function(){
            wx.hideLoading();
          }

        })

        

      },
      fail: function(res) {
        console.log(res.errMsg);
      }
    })
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    console.log(wx.getStorageSync('openid'));

    // 激活定位控件
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        const {latitude, longitude} = res;
        this.setData({
          location: {
            latitude,
            longitude
          }
        });
        this.moveTolocation();
      }
    });




  },

  onShow: function() {
    this.setData({
      collectionsIcon: '../../icons/collections.png',
      selfCenterIcon: '../../icons/self_center.png'
    })
  },

  moveTolocation: function() {
    this.mapCtx = wx.createMapContext('map')
    this.mapCtx.moveToLocation()
  },

})
