// pages/Share/Share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invId:""
  },
  // 跳转到小程序
  jump(){
   let _this = this
    wx.navigateToMiniProgram({
      appId: 'wx30ea7e0e697b5ece',
      path: 'pages/partner?invId=' + _this.data.invId,
      envVersion: 'release'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.userId)
    this.setData({
      invId: options.userId
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
    // 隐藏返回首页按钮
    wx.hideHomeButton({})
   
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