// pages/selfCenter/history/history.js
const app = getApp()
const th = require('../../../utils/th')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyArr: [],
    

  },

  getHistory(){
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.url + 'History/',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          openId: wx.getStorageSync('openid'),
        },
        success: res => resolve(res),
        fail: err => reject(err)
      })
    }).then(res => {
      console.log('识图记录:', res);
      let temp = [];
      for(let i=res.data.length-1;i>=0;i--){
        temp.push({
          time: res.data[i].time,
          predict: th.typeHashBack(res.data[i].predict + 1),
        })
        if(temp.length >= 10){
          break;
        }
        
      }
      console.log(temp);
      this.setData({
        historyArr: temp,
      })

    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistory();
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