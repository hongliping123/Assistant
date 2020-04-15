
App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  //重写分享方法
  overShare: function () {
    //监听路由切换
    //间接实现全局设置分享内容
    wx.onAppRoute(function (res) {
      //获取加载的页面
      let pages = getCurrentPages(),
        //获取当前页面的对象
        view = pages[pages.length - 1],
        data;
      if (view) {
        data = view.data;
        if (!data.isOverShare) {
          data.isOverShare = true;
          view.onShareAppMessage = function (res) {
            if (res.from == "button") {
              return {
                title: "邀请您加入蓝天保卫战，利国利民又赚钱",
                path: '/pages/Share/Share?userId=' + wx.getStorageSync("userId"),
                imageUrl: "../../utils/img/WechatIMG44.png",
              }
            } else {
              return {
                title: "邀请您加入蓝天保卫战，利国利民又赚钱",
                path: '/pages/homepage/homepage',
                imageUrl: "../../utils/img/WechatIMG44.png",
              }
            }
          }
        }
      }
    })
  },

  onLaunch: function () {
    this.overShare()
  },
  
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
