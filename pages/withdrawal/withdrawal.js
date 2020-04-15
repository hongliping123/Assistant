// pages/withdrawal/withdrawal.js
var ajax = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    username:'',
    userId:'',
    record_list:[],
    account:'',
    val:''
  },
  // tap切换
  swichNav(e){
    let _this = this
    _this.setData({
      currentTab: e.currentTarget.dataset.current
    })
 
  },

  // 预览保存图片
  code(){
    wx.previewImage({
      current: 'https://production.ltby65.com/image/gzh.png', // 当前显示图片的http链接
      urls: ['https://production.ltby65.com/image/gzh.png']
    })
  },

  // 提现记录
  record(){
    let _this = this
    const prams = {
      userId: _this.data.userId,
    }
    ajax.postRequest("/assis/withdrawal/logs", prams,
      function (res) {
        let arr = res.data.map((item)=>{
           let str = item
          item.createTime = str.createTime.replace(/T/ig, " ")
          switch (item.withdrawalStatus) {
            case '0':
              item.status = '已提交'
              item.color = 'yellow'
              break;
            case '1':
              item.status = '审核中'
              item.color = 'blue'
              break;
            case '2':
              item.status = '提现成功'
              item.color = 'green'
              break;
            case '3':
              item.status = '提现失败'
              item.color = 'red'
              break;
            case '4':
              item.status = '未知'
              item.color = 'black'
              break;
            case '5':
              item.status = '已取消'
              item.color = 'grey'
              break;
            default:
              break;
          }
          return item
        })
        _this.setData({
          record_list: arr
        })
        
      }
    )
  },
  inputval(e){
    let _this = this
    _this.setData({
      val: e.detail.value
    })
  },
  // 提现金额
  Cash_withdrawal(){
    let _this = this
    _this.setData({
      val: _this.data.account
    })
  },
  // 获取用户信息
  getuserinfo(){
    let _this = this
    const prams = {
      userId: _this.data.userId,
    }
    ajax.postRequest('/assis/user/info', prams,
      function (res) {
        _this.setData({
          account: res.data.account
        })
      }
    )
  },
  // 提交申请
  Apply(){
    let _this = this
    if ( _this.data.val == "" || _this.data.val <= 0 ){
      wx.showToast({
        title: "提现金额不能为空",
        icon: "none"
      })
      return
    }
    if (_this.data.account <= 0) {
      wx.showToast({
        title: "可提现金额不足",
        icon: "none"
      })
      return
    }
    const prams = {
      userId: _this.data.userId,
      amount: _this.data.val
    }
    ajax.postRequest('/assis/money/withdrawal',prams,
      function(res){
        setTimeout(()=>{
          _this.getuserinfo()
          _this.record()
        },1000)
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
        _this.setData({
          val:""
        })
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this  = this 
    _this.setData({
      username:wx.getStorageSync('name'),
      userId: wx.getStorageSync("userId"),
    })
    _this.record()
    _this.getuserinfo()
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