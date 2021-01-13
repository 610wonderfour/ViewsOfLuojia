// pages/collections/collections.js
const app = getApp()
const th = require('../../utils/th')
const util = require('../../utils/util')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionsArr: [],
    itemUrl: '',



  },
  
  initCard(){
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.url + 'UserCollections/',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data:{
          open_id: wx.getStorageSync('openid')
        },
        success: res => resolve(res),
        fail: err => reject(err)
      })
    }).then(res => {
      console.log(res);
      let temp = [];
      for(let i=0; i<res.data.locations.length; i++){
        let exampleUrl = app.globalData.imgUrl + 'example/target/' + res.data.locations[i] + '/' + res.data.images[i]
        temp.push({
          loc: th.typeHashBack(res.data.locations[i]),
          img: exampleUrl,
          des1: th.getDescription(th.typeHashBack(res.data.locations[i])).des1,
          des2: th.getDescription(th.typeHashBack(res.data.locations[i])).des2
        })
      }
      console.log(temp)

      this.setData({
        collectionsArr: temp
      })

    })

  },



  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initCard();
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