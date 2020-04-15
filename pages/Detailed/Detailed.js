// pages/Detailed/Detailed.js
var ajax = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moneyList:[],
    account:""
  },


  // 金额列表
  money_list(){
    let _this = this
    const prams = {
      userId: wx.getStorageSync('userId')
    }
    ajax.postRequest('/assis/money/logs',prams,
      function(res){
        // var arr = res.data.map((item)=>{
        //     let str = item
        //     item.createTime = str.createTime.replace(/T/ig," ")
        //     return item
        // })
        var arr =  res.data.map((item)=>{
          let str = item 
          item.createTime = str.createTime.replace(/T/ig, " ")
          return item
        })
        _this.setData({
          moneyList: arr
        })
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.money_list()
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
    this.setData({
      account: wx.getStorageSync("account").toFixed(2)
    })
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