// pages/Order_details/Order_details.js
var ajax = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:"",
    Team:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 订单详情
  Team_list() {
    let _this = this
    const prams = {
      userId: _this.data.userId,
      // flag: 1
    }
    
    ajax.postRequest("/assis/order/info", prams,
      function (res) {
       let arr = res.data.map((item)=>{
          let srt = item
          item.payTime = srt.payTime.replace(/T/ig, " ")
          return item
        })
        _this.setData({
          Team: arr
        })
      }
    )
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let _this = this
    _this.setData({
     userId: wx.getStorageSync("userId")
    })
    _this.Team_list()
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