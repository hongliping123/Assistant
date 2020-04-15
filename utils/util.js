/**
 * 请求头
 */
var header = {
  'content-type': 'application/x-www-form-urlencoded',
  'Authorization': "Bearer " + wx.getStorageSync("token"),
  'os': 'android',
  'version': '1.0.0',
  'device_token': 'ebc9f523e570ef14',
}

/**
 * 供外部post请求调用  
 */
function post(url, params, onSuccess, onFailed) {
  request(url, params, "POST", onSuccess, onFailed);

}

/**
 * 供外部get请求调用
 */
function get(url, params, onSuccess, onFailed) {
  request(url, params, "GET", onSuccess, onFailed);
}

/**
 * function: 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onSuccess 成功回调
 * @onFailed  失败回调
 */

function request(url, params, method, onSuccess, onFailed) {
  wx.showLoading({
    title: "正在加载中...",
  })
  wx.request({
    //  url: 'https://zs.ltby65.com/' + url, 
    url: 'https://apis.ltby65.com' +url,
    // url:"http://192.168.33.230:8080" + url, 
    data: dealParams(params),
    method: method,
    header: header,
    success: function (res) {
      wx.hideLoading();
      if (res.data) {
        /** start 根据需求 接口的返回状态码进行处理 */
        if (res.statusCode == 200) {
          onSuccess(res.data); //request success
        } else {
          onFailed(res.data.message); //request failed
        }
        /** end 处理结束*/
      }
    },
    fail: function (error) {
      onFailed(""); //failure for other reasons
    }
  })
}

/**
 * function: 根据需求处理请求参数：添加固定参数配置等
 * @params 请求参数
 */
function dealParams(params) {
  return params;
}


// 1.通过module.exports方式提供给外部调用
module.exports = {
  postRequest: post,
  getRequest: get,
}