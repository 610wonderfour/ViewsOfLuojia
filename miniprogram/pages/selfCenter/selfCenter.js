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
    feedbackBgColor: 'white',
    chatroomBgColor: 'white',
    aboutUsBgColor: 'white',
    areaBgColor: 'white',
    quizBgColor: 'white',
    settingsBgColor: 'white'
  },

  touchStartFeedback: function(event){
    // console.log(event)
    switch (event.target.id) {
      case 'collections':
        this.setData({collectionsBgColor: '#dadada'});
        break;
      case 'history':
        this.setData({historyBgColor: '#dadada'});
        break;
      case 'feedback':
        this.setData({feedbackBgColor: '#dadada'});
        break;
      case 'chatroom':
        this.setData({chatroomBgColor: '#dadada'});
        break;
      case 'aboutUs':
        this.setData({aboutUsBgColor: '#dadada'});
        break;
      case 'area-separate':
        this.setData({areaBgColor: '#dadada'});
        break;
      case 'quiz':
        this.setData({quizBgColor: '#dadada'});
        break;
      case 'settings':
        this.setData({settingsBgColor: '#dadada'});
        break;
      default:
        break;
    }
  },

  touchEndFeedback: function(event){
    // console.log(event)
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
      case 'feedback':
        this.setData({feedbackBgColor: 'white'});
        break;
      case 'chatroom':
        this.setData({chatroomBgColor: 'white'});
        wx.navigateTo({
          url: 'chatroom/chatroom',
        })
        break;
      case 'aboutUs':
        this.setData({aboutUsBgColor: 'white'});
        wx.navigateTo({
          url: 'aboutUs/aboutUs',
        })
        break;
      case 'area-separate':
        this.setData({areaBgColor: 'white'});
        wx.navigateTo({
          url: 'areaSeparate/areaSeparate',
        })
        break;
      case 'quiz':
        this.setData({quizBgColor: 'white'});
        wx.navigateTo({
          url: 'quiz/start/start',
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