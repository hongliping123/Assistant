// pages/Member_Homepage/Member_Homepage.js
var ajax = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ltbyuserid:'',
    member:[],
    business:[],
    id:"",
    // list:[{id:1}]
  },

  // 拨打电话
  Telephone(){
    let _this = this
    wx.makePhoneCall({
      phoneNumber: _this.data.member.mobile,
    })
  },

  member(){
    let _this = this
    const prams = {
      ltbyUserId:_this.data.ltbyuserid,
      flag:_this.data.id = '1' ? 1 :''
    }
    ajax.postRequest("/assis/team/personal", prams,
      function(res){
        _this.setData({
          member:res.data
        })
      }
    )
  },

  // // 商家信息
  company(){
    let _this = this
    const prams = {
      ltbyUserId: _this.data.ltbyuserid,
      flag: _this.data.id = '1' ? 1 : ''
    }
    ajax.postRequest("/assis/team/company",prams,
      function(res){
        _this.setData({
          business: res.data
        })
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this 
    _this.setData({
      ltbyuserid: options.ltbyuserid,
      id: options.id
    })
    _this.member()
    _this.company()
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