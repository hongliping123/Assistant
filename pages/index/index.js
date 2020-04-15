var ajax = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    useravatar:"",
    userId:"",
    team:[],
    today:[],
    totalsum:''
  },

  // 跳转到明细
  detailed(){
    wx.navigateTo({
      url: '/pages/Detailed/Detailed',
    })
  },
  // 跳转到我的团队
  myteam(){
    wx.navigateTo({
      url: '/pages/My_team/My_team',
    })
  },
  // 跳转到今日数据
  DateToday(){
    wx.navigateTo({
      url: '/pages/Date_today/Date_today',
    })
  },
  // 跳转到提现页面
  withdrawal(){
    wx.navigateTo({
      url: '/pages/withdrawal/withdrawal',
    })
  },

  // 扫一扫
  Scan(){
    let _this = this
    
    wx.scanCode({
      success(res){
        // console.log(res.rawData) //res 扫码返回的内容
        const prams = {
          userId: _this.data.userId,
          icode: res.rawData
        }
        ajax.postRequest('/assis/scan',prams,
          function(res){
           wx.showToast({
             title: res.msg,
             icon:"none"
           })
           setTimeout(()=>{
             _this.my_team()
           },2000)
           
          }
        )
      }
    })
  },

  // 我的团队信息
  my_team(){
   let _this = this
    const prams = {
      userId: _this.data.userId
    }
    ajax.postRequest("/assis/my/team", prams,
      function(res){
        _this.setData({
          team:res.data
        })
        wx.setStorageSync("team",res.data)
      }
    )
  },

  // 今日数据
  my_today() {
    let _this = this
    const prams = {
      userId: _this.data.userId,
      flag:1
    }
    ajax.postRequest("/assis/my/team", prams,
      function (res) {
        _this.setData({
          today: res.data
        })
        wx.setStorageSync("today",res.data)
      }
    )
  },

  // 用户总收益
  revenue(){
    let _this = this
    const prams = {
      userId: _this.data.userId,
    }
    ajax.postRequest('/assis/user/info',prams,
      function(res){
        console.log(res)
        _this.setData({
          totalsum:res.data
        })
        wx.setStorageSync("account", res.data.account)
      }
    )
  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
        username: wx.getStorageSync("name"),
        useravatar: wx.getStorageSync("avatar"),
        userId: wx.getStorageSync("userId")
    })
    this.my_team()
    this.my_today()
    this.revenue()
    wx.stopPullDownRefresh()
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
    // 隐藏了当前页面的转发按钮
    // wx.hideShareMenu();
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
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from == "button"){
      return {
        title: "邀请您加入蓝天保卫战，利国利民又赚钱",
        path: '/pages/Share/Share?userId=' + wx.getStorageSync("userId"),
        imageUrl: "../../utils/img/WechatIMG44.png",
      }
    }else{
      return {
        title: "邀请您加入蓝天保卫战，利国利民又赚钱",
        path: '/pages/login/login',
        imageUrl: "../../utils/img/WechatIMG44.png",
      }
    }
    
  },

})