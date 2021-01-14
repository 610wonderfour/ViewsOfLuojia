// pages/selfCenter/quiz/quiz.js
const app = getApp()
const util = require('../../../utils/util')
const th = require('../../../utils/th')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 0,
    qArr: [],
    answerSheet: [],
    

  },

  init(){
    let arr = [];
    for(let i=0;i<20;i++){
      arr.push('');
    }
    this.setData({
      answerSheet: arr,
    })
  },

  getQuestion(){
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.url + 'Quiz/',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          'account': wx.getStorageSync('openid'),

        },
        success: res => resolve(res),
        fail: err => reject(err)
      })
    }).then(res => {
      console.log('答题：', res);
      let temp = [];
      for(let key in res.data){
        temp.push(res.data[key]);
      }

      /*
      qArr: [
        {
          imgUrl: '',
          qContent: [
            {
              choice: 'A',
              content: '',
            },
            {
              choice: 'B',
              content: '',
            },
            ...
          ]

        }
      ]
      */
      for(let qId=0;qId<temp.length;qId++){
        let item = temp[qId];
        item.qId = qId;
        item.imgUrl = item.imgUrl[0];
        for(let cId=0;cId<item.qContent.length;cId++){
          let qItem = item.qContent[cId];
          let choice = th.choiceHash(cId);
          let content = qItem.split(';')[0];
          let score = qItem.split(';')[1];
          qItem = {
            choice: choice,
            content: content,
            score: score,
          };
          // console.log(qItem);
          item.qContent[cId] = qItem;
        }
        // console.log(item);

      }
      console.log(temp);
      
      this.setData({
        qArr: temp,
      })

    })
    
  },

  select(e){
    // console.log(e.target.dataset);
    let temp = this.data.answerSheet;
    temp[e.target.dataset.index] = e.target.dataset.choice;
    this.setData({
      answerSheet: temp,

    })
    


  },

  preStep(){
    this.setData({
      step: this.data.step - 1,
    });
  },

  nextStep(){
    this.setData({
      step: this.data.step + 1,
    })
  },

  submit(){
    wx.showModal({
      title: '确认提交吗?',
      success: () => {
        console.log(this.data.answerSheet);
        let score = 0;
        let as = this.data.answerSheet;
        let qArr = this.data.qArr;
        let scoreList = [];
        for(let asIndex=0;asIndex<as.length;asIndex++){
          let eachScore = 0;
          // console.log(as[asIndex]);

          let c = qArr[asIndex].qContent;
          //遍历四个选项，查看对应分值
          for(let cIndex=0;cIndex<c.length;cIndex++){
            if(as[asIndex] === c[cIndex].choice){
              eachScore = Number(c[cIndex].score)
            }
            
          }
          
          score += eachScore;
          if(eachScore !== 0){

            scoreList.push({
              choice: as[asIndex],
              score: eachScore,
            });
          }

          /*
          scoreList: [
            {
              choice: 'B',
              score: 2,
            },
            {
              choice: 'C',
              score: 3,
            },
            ...
          ]
          */
         
        }
        wx.setStorageSync('scoreList', scoreList); //将'批改'后的答题卡保存，便于后续输出
        wx.setStorageSync('totalScore', score); //保存总分

        console.log(score);

        new Promise((resolve, reject) => {
          wx.request({
            url: app.globalData.url + 'QuizScore/',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            data: {
              score: score,
            },
            success: res => resolve(res),
            fail: err => reject(err)
          })
        }).then(res => {
          console.log('提交答题：', res);

          return new Promise((resolve, reject) => {
            wx.showToast({
              title: '提交成功！',
              icon: 'success',
              success: () => {
                setTimeout(() => resolve(), 1500);
              },
            })
          })
        
        }).then(() => {
          wx.redirectTo({
            url: './result/result',
          })
          // return new Promise((resolve, reject) => {
          // })
          
        })
        
      }
    })
    
    
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
    this.getQuestion();

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