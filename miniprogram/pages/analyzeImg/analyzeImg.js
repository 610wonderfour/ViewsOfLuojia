// pages/analyzeImg/analyzeImg.js
const app = getApp()
const as = require('../../utils/as')
const th = require('../../utils/th')
const util = require('../../utils/util')
const collecting_animation = 'animation: collecting 1s 1 linear;'
const colleted_style = 'background-color:yellow;'
const uncollected_style = 'background-color:white;'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    targetImgPath: String,
    exampleImgPath: String,
    analyzeRes: String,
    trueLabel: Number, //标签类别
    collectStyle: String,
    collected: Boolean, //当前区域是否被收藏
    picArray: Array, //当前区域轮播图资源
    briefName: String,
    windowWidth: Number

    

  },

  

  collectTap: function(event){
    this.setData({
      collectStyle: collecting_animation
    })
  },

  relable: function() {
    var that = this;
    as.showActionSheet({
      itemList: [
        '牌坊区域', '梅园区域', '桂园区域', '枫园区域', '樱园区域',
        '湖滨区域', '工学部', '信息学部', '珞珈山区域', '校内家属区'
      ],
      itemColor: '',
      success: function(res){
        console.log(res);
        switch(res.tapIndex){
          case 0:
            that.setData({trueLabel: 6})
            break;
          case 1:
            that.setData({trueLabel: 5})
            break;
          case 2:
            that.setData({trueLabel: 3})
            break;
          case 3:
            that.setData({trueLabel: 1})
            break;
          case 4:
            that.setData({trueLabel: 8})
            break;
          case 5:
            that.setData({trueLabel: 4})
            break;
          case 6:
            that.setData({trueLabel: 2})
            break;
          case 7:
            that.setData({trueLabel: 7})
            break;
          case 8:
            that.setData({trueLabel: 9})
            break;
          case 9:
            that.setData({trueLabel: 10})
            break;
          default:
        }

        //将重新标签的结果传到后端
        wx.uploadFile({
          filePath: that.data.targetImgPath,
          name: 'file',
          url: app.globalData.url + 'Relabel/',
          formData: {
            'true_label': that.data.trueLabel
          },
          success: function(res){
            console.log(res);
            wx.showToast({
              title: '感谢您的反馈！',
              icon: 'success'
            })
          },
          fail: function(res){
            console.log(res);
            wx.showToast({
              title: '反馈失败~',
              icon: 'none'
            })
          }
        })
        

      }

    })
    
  },

  collectTap: function() {
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.url + 'AddCollection/',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          'open_id': wx.getStorageSync('openid'),
          'area_code': th.typeHash(wx.getStorageSync('analyzeRes'))
        },
        success: res => resolve(res),
        fail: res => resolve(res)
      })
    }).then(res => {
      console.log('添加收藏', res);

      return new Promise((resolve, reject) => {
        this.setData({
          collected: true
        })
        wx.showToast({
          title: '小图收藏好啦~',
          icon: 'success',
          duration: 1500,
        })
      })
    }).catch(res => {
      console.log(res);
      wx.showToast({
        title: '添加收藏失败',
        icon: 'none'
      })
    })
  },

  uncollectTap: function() {
    new Promise((resolve, reject) => {
      console.log(wx.getStorageSync('openid'));
      console.log(th.typeHash(wx.getStorageSync('analyzeRes')));
      wx.request({
        url: app.globalData.url + 'RemoveCollection/',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          'open_id': wx.getStorageSync('openid'),
          'area_code': th.typeHash(wx.getStorageSync('analyzeRes'))
        },
        success: res => resolve(res),
        fail: res => resolve(res)
      })
    }).then(res => {
      console.log('取消收藏', res);
      return new Promise((resolve, reject) => {
        this.setData({
          collected: false
        })
        wx.showToast({
          title: '不爱了么...',
          icon: 'none',
          duration: 1500,
          image: '../../images/dogCry.png'
        })
      })
    }).catch(res => {
      console.log(res);
      wx.showToast({
        title: '取消收藏失败',
        icon: 'none'
      })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      targetImgPath: wx.getStorageSync('targetImgPath'),
      //调试阶段用，后续须改成exampleImgPath
      exampleImgPath: wx.getStorageSync('exampleImgPath'),
      analyzeRes: wx.getStorageSync('analyzeRes'),
      collected: app.globalData.collected,
      picArray: app.picArray,
      briefName: util.getBriefName(wx.getStorageSync('analyzeRes')),
      windowWidth: app.globalData.windowWidth,

    })


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