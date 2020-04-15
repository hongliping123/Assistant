// pages/login/login.js

var ajax = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowLogin: false,
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    wx.login({
      timeout: 10000,
      success(res) {
        // console.log(res)
        if (res.code) {
          // 这里可以把code传给后台，后台用此获取openid及session_key
         _this.setData({
           code:res.code
         })
        }
      },
    })
  },

  // 获取用户信息
  onGotUserInfo(e) {
    var _this = this
  //  用wx.checkSession判断登录状态是否过期，如果过期就需要获取新的session_key。
    wx.checkSession({
      success:function(){
        if (e.detail.userInfo) {
          const prams = {
            code: _this.data.code,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData
          }
          ajax.postRequest("/wxlogin/assis/wxlogin", prams,
            function (res) {
              // console.log(res)
              const prams1 = {
                openid: res.data.openId,
                nickname: res.data.nickName,
                avatar: res.data.avatarUrl,
                unionid: res.data.unionId
              }
              ajax.postRequest("/wxlogin/openid/login", prams1,
                function (res) {
                  // userID存储在Storage中
                  wx.setStorageSync("userId", res.data.assisId)
                  wx.setStorageSync("avatar", res.data.avatar)
                  wx.setStorageSync("name", res.data.nickname)
                  wx.setStorageSync("account", res.data.account)
                  // let userId = wx.getStorageSync("userId")
                  // console.log(userId)
                  if( res.code == 200 ){
                    setTimeout(()=>{
                      wx.reLaunch({
                        url: '/pages/index/index',
                      })
                    },500)
                  }
                }
              )
            },
            function (err) {
            }
          )
        } else {
          console.log("拒绝授权")
        }

      },
      fail:function(){
        wx.login({
          timeout: 10000,
          success(res) {
            // console.log(res)
            if (res.code) {
              // 这里可以把code传给后台，后台用此获取openid及session_key
              _this.setData({
                code: res.code
              })
            }
          },
        })
      }
    })
    // }
  },
  returnindex(){
    wx.reLaunch({
      url: '/pages/homepage/homepage',
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