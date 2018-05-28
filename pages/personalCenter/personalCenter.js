//logs.js
const util = require('../../utils/util.js')
const app = getApp()
console.log(app.globalData)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello wx',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    query: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    this.data.query = query;
    this.setData(this.data);

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
    app.userInfo=this.data.userInfo;
    console.log(app.userInfo);
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url:'../home/home'
    });
    console.log("去我页");
  }
})














/*
Page({
  data: {
    logs: [],
    toView: 'item-3',/////当第一次渲染时，<scroll_view>默认滚动到id值为"item-3" 区域
    autoplay:true,
    currentPercent: 30,
    sliderList:[
      { className: 'bg-red', name: 'slider1' },
      { className:'bg-green', name: 'slider2'},
      { className:'bg-blue',name: 'slider3'}
    ],
    sizeList:[10,20,30,40],
    icon:{
      size:20,
      opacity:8,
    },
    typeList:['success','success_no_circle','safe_success','success_circle','info','info_circle','waiting','waiting_circle','warn','safe_warn','circle','download','cancle','search','clear'],
    colorList:['green','rgb(129,101,8)'],
    radios:[
      {value:'1',text:'选项1',checked:false},
      {value:'2',text:'选项2',checked:false},
      {value:'3',text:'选项3',checked:false}
    ],
    checkboxes: [
      { value: '1', text: '选项1', checked: false },
      { value: '2', text: '选项2', checked: false },
      { value: '3', text: '选项3', checked: false }
    ],
    src:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b124b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    danmu: [
      {
        text: '第1s出现的弹幕',
        color: '#ff0000',
        time: 2
      },
      {
        text: '第2s出现的弹幕',
        color: '#00ff00',
        time: 2
      }
    ],
    danmuText: '',
  },
  changeChoosed:function(event){
    console.log('你选中了:'+event.detail.value);
  },
  onReady:function(){
    this.videoContext=wx.createVideoContext("myVideo");
    var context=wx.createContext();
    context.setStrokeStyle("#0000ff");
    context.setLineWidth(2);
    context.rect(3,2,150,200);
    context.stroke();
    wx.drawCanvas({
      canvasId:"myCanvas",
      actions:context.getActions()
    });
    console.log('asdf');
  },
  getVideo:function(){
    var self= this ;
    wx.chooseVideo({
      success:function(res){
        self.setData({
          maxDuration:60,
          src:res.tempFilePath
        });
      }
    });
  },
  setInputValue:function(e){
    this.setData({
      danmuText:e.detail.value 
    });
  },
  sendDanmu:function(){
    var danmuText= this.data.danmuText;
    console.log(this.videoContext);
    this.videoContext.sendDanmu({
      text:danmuText,
      color:"#ff0000"
    });
    this.setData({
      danmuText:''
    });
  },
  onLoad:function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  scrollToUpper:function(){
    console.log("触发到滚动顶部事件");
  },
  scrollToLower:function(){
    console.log("触发滚动到底部事件");
  },
  scrollToTop:function(){
    this.setData({
      scrollTop:'0'
    });
  },
  scroll:function(){
    console.log('触发了滚动事件');
  },
  play:function(){
    this.setData ({
      autoplay:!this.data.autoplay  
    });
  },
  change:function(){
    console.log('执行了滚动');
  },
  changeSize:function(e){
    this.data.icon.size=e.detail.value;
    this.setData(this.data);
  },
  changeOpacity:function(e){
    this.data.icon.opacity=e.detail.value;
    this.setData(this.data);
  },
  changeValue:function(e){
    console.log(e.detail);
    var value = e.detail.value,
        pos = e.detail.cursor,
        left;
    if(pos!=-1){
      left=value.slice(0,pos);
      pos=left.replace( /123/g , '0').length;
    }
    return {
      value:e.detail.value.replace(/123/g , '0  '),
      cursor:pos
    }
  },
  reset:function(e){
    console.log(e.value);
  }
});
*/