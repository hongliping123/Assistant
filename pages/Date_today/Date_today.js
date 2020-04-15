// pages/Date_today/Date_today.js
var ajax = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today:[],
    userId:'',
    todayList:[]
  },

  // 今日推广成员列表
  today_list(){
    let _this = this
    const prams = {
      userId: _this.data.userId,
      flag:1
    }
    ajax.postRequest("/assis/team/info", prams,
      function (res) {
        _this.setData({
          todayList: res.data
        })
       
      }
    )
  },

  // 跳转到成员主页
  MemberHomepage(e) {
    let ltbyuserid = e.currentTarget.dataset.ltbyuserid
    wx.navigateTo({
      url: '/pages/Member_Homepage/Member_Homepage?ltbyuserid=' + ltbyuserid + "&id=" + 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    _this.setData({
      today: wx.getStorageSync('today'),
      userId:wx.getStorageSync('userId')
    })
    _this.today_list()
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