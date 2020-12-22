//index.js
const app = getApp()
const th = require('../../utils/th')
const util = require('../../utils/util')

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

  initCollectionRecord: function(){
    //向服务器发起请求获取用户登录态（传openid）
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.url + 'UserStatus/',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          'open_id': wx.getStorageSync('openid'),
        },
        success: res => resolve(res),
        fail: res => reject(res)
      })
    }).then(res => {
      console.log('用户登录态:', res);
      wx.setStorageSync('collectionStatus', res.data.UserCollections.join());
      app.globalData.collected = util.checkCollectionStatus(
        wx.getStorageSync('collectionStatus'),
        wx.getStorageSync('analyzeRes')
      )
      
    }).catch(res => {
      console.log(res);
      wx.showToast({
        title: '拉取信息失败',
        icon: 'none'
      })
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
    *正式阶段Promise改写代码
    */
     new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => resolve(res),
        fail: res => reject(res)
     })
    }).then(res => {
      // console.log(res);
      wx.showLoading({
        title: '小图努力中...'
      });
      var tempFilePath = res.tempFilePaths[0];
      wx.setStorageSync('targetImgPath', tempFilePath);

      return new Promise((resolve, reject) => {
        wx.uploadFile({
          url: app.globalData.url + 'WxAppPredict/',
          filePath: tempFilePath,
          name: 'file',
          formData: {
            'openId': wx.getStorageSync('openid')
          },
          success: res => resolve(res),
          fail: res => reject(res)
        })
     })
    }).then(res => {
      console.log('识别结果:', res);

      return new Promise((resolve, reject) => {
        if(res.statusCode === 200){
          var data = JSON.parse(res.data);
          wx.setStorageSync('analyzeRes', data.predict_ans);
          wx.showToast({
            title: "识别成功", // 提示的内容
            icon: "success", // 图标，默认success
            image: "", // 自定义图标的本地路径，image 的优先级高于 icon
            mask: false, // 是否显示透明蒙层，防止触摸穿透
            duration: 2500,
            success: res => resolve(res),
            fail: res => reject(res)
          })
          
        }
        else{
          wx.showToast({
            title: '服务器开小差了噢~',
            icon: 'none',
            image: ''
          })
        }
     })
    }).then(res => {
      this.initCollectionRecord();
      return new Promise((resolve, reject) => {
        wx.request({
          url: app.globalData.url + 'returnTarget/',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            'predict_ans': th.typeHash(wx.getStorageSync('analyzeRes'))
          },
          success: res => resolve(res),
          fail: res => reject(res)
        })
      })
    }).then(res => {
      console.log('返回示例和精选图片', res);
      
      return new Promise((resolve, reject) => {
        var exampleUrl = app.globalData.imgUrl + 'example/target/' + th.typeHash(wx.getStorageSync('analyzeRes')) + '/' + res.data.target_file;
        wx.setStorageSync('exampleImgPath', exampleUrl);

        var arr = res.data.display_files;
        app.picArray = [];
        arr.forEach(item => {
          app.picArray.push(
            app.globalData.imgUrl + 'example/display/' + th.typeHash(wx.getStorageSync('analyzeRes')) + '/' + item
          )
        })
        console.log('精选图片', app.picArray);
      
        
        setTimeout(()=>{
          wx.navigateTo({
            url: '../analyzeImg/analyzeImg',
          })
        }, 1500) 
      })
    }).catch(res => {
      wx.showToast({
        title: '小图出错了..',
        icon: 'none'
      })
    }).then(() => wx.hideLoading())



    /*
    *正式阶段嵌套回调函数代码
    */
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'],
    //   sourceType: ['album', 'camera'],
    //   success: function(res) {
    //     console.log(res);
    //     wx.showLoading({
    //       title: '小图努力中...'
    //     });
    //     var tempFilePath = res.tempFilePaths[0];
    //     wx.setStorageSync('targetImgPath', tempFilePath);
    //     console.log(tempFilePath);
    //     //上传图片进行识别
    //     wx.uploadFile({
    //       url: app.globalData.url + 'WxAppPredict/',
    //       filePath: tempFilePath,
    //       name: 'file',
    //       formData: {
    //         'openId': wx.getStorageSync('openid')
    //       },
    //       success: function(res) {
    //         console.log(res);
    //         if(res.statusCode === 200){
    //           var data = JSON.parse(res.data);
    //           wx.setStorageSync('analyzeRes', data.predict_ans);
    //           wx.showToast({
    //             title: "识别成功", // 提示的内容
    //             icon: "success", // 图标，默认success
    //             image: "", // 自定义图标的本地路径，image 的优先级高于 icon
    //             mask: false, // 是否显示透明蒙层，防止触摸穿透
    //             duration: 2500,
    //             success: function(){
                  
    //             }
    //           })
              
    //         }
    //         else{
    //           wx.showToast({
    //             title: '服务器开小差了噢~',
    //             icon: 'none',
    //             image: ''
    //           })
    //         }
            
    //         //上传识别结果获取示例图片
    //         wx.request({
    //           url: app.globalData.url + 'returnTarget/',
    //           method: 'POST',
    //           header: {
    //             'content-type': 'application/x-www-form-urlencoded'
    //           },
    //           data: {
    //             'predict_ans': th.typeHash(wx.getStorageSync('analyzeRes'))
    //           },
    //           success:function(res) {
    //             console.log(res);
    //             var url = app.globalData.imgUrl + 'uploaded/images/' + th.typeHash(wx.getStorageSync('analyzeRes')) + '/' + res.data.target_file
    //             wx.setStorageSync('exampleImgPath', url);
                
    //             setTimeout(()=>{
    //               wx.navigateTo({
    //                 url: '../analyzeImg/analyzeImg',
    //               })
    //             }, 2500) 
    //           },
    //           fail:function(res) {
    //             console.log(res);
    //             wx.showToast({
    //               title: '获取示例图片失败~',
    //               icon: 'none'
    //             })
    //           }

    //         })


    //       },
    //       complete: function(){
    //         wx.hideLoading();
    //       }

    //     })

        

    //   },
    //   fail: function(res) {
    //     console.log(res.errMsg);
    //   }
    // })
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

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
        
      }
    });

    this.initCollectionRecord();
    if(wx.getStorageSync('openid') !== '')
    console.log('openid:', wx.getStorageSync('openid'));

  },

  onShow: function() {
    this.setData({
      collectionsIcon: '../../icons/collections.png',
      selfCenterIcon: '../../icons/self_center.png'
    })

    this.moveTolocation();
  },

  moveTolocation: function() {
    this.mapCtx = wx.createMapContext('map')
    console.log(this.mapCtx);
    this.mapCtx.moveToLocation()
  },

})
