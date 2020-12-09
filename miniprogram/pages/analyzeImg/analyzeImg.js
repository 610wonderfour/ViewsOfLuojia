// pages/analyzeImg/analyzeImg.js
const app = getApp()
const as = require('../../utils/as')
const th = require('../../utils/th')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    targetImgPath: '',
    exampleImgPath: '',
    analyzeRes: '',
    trueLabel: 0, //标签类别
    

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      targetImgPath: wx.getStorageSync('targetImgPath'),
      //调试阶段用，后续须改成exampleImgPath
      exampleImgPath: wx.getStorageSync('exampleImgPath'),
      analyzeRes: wx.getStorageSync('analyzeRes')
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