//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('personalCenter') || []
    logs.unshift(Date.now())
    wx.setStorageSync('personalCenter', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
  globalData: {
    userInfo: null
  }
})
const Bmob = require('utils/bmob.js');
Bmob.initialize("3259006de4aea8953e8b47c8ad631674","dac1b4aca7e832f10ccc5a8fba3fba8f");
//const BmobSocketIo=require('utils/bmobSocketIo.js').BmobSocketIo;
//BmobSocketIo.initialize("3259006de4aea8953e8b47c8ad631674");