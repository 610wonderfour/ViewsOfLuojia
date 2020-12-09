// pages/selfCenter/selfCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    avatarUrl: '',
    nickName: '',
    collectionsBgColor: 'white',
    historyBgColor: 'white',
    serviceBgColor: 'white',
    feedbackBgColor: 'white',
    aboutUsBgColor: 'white',
    settingsBgColor: 'white'
  },

  touchStartFeedback: function(event){
    console.log(event)
    switch (event.target.id) {
      case 'collections':
        this.setData({collectionsBgColor: '#dadada'});
        break;
      case 'history':
        this.setData({historyBgColor: '#dadada'});
        break;
      case 'service':
        this.setData({serviceBgColor: '#dadada'});
        break;
      case 'feedback':
        this.setData({feedbackBgColor: '#dadada'});
        break;
      case 'aboutUs':
        this.setData({aboutUsBgColor: '#dadada'});
        break;
      case 'settings':
        this.setData({settingsBgColor: '#dadada'});
        break;
      default:
        break;
    }
  },

  touchEndFeedback: function(event){
    console.log(event)
    switch (event.currentTarget.id) {
      case 'collections':
        this.setData({collectionsBgColor: 'white'});
        wx.navigateTo({
          url: '../collections/collections',
        })
        break;
      case 'history':
        this.setData({historyBgColor: 'white'});
        wx.navigateTo({
          url: 'history/history',
        })
        break;
      case 'service':
        this.setData({serviceBgColor: 'white'});
        break;
      case 'feedback':
        this.setData({feedbackBgColor: 'white'});
        wx.navigateTo({
          url: 'feedback/feedback',
        })
        break;
      case 'aboutUs':
        this.setData({aboutUsBgColor: 'white'});
        wx.navigateTo({
          url: 'aboutUs/aboutUs',
        })
        break;
      case 'settings':
        this.setData({settingsBgColor: 'white'});
        wx.navigateTo({
          url: 'settings/settings',
        })
        break;
      default:
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从本地缓存中取数据
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      avatarUrl: wx.getStorageSync('userInfo').avatarUrl,
      nickName: wx.getStorageSync('userInfo').nickName
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