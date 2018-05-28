var Bmob = require('../../utils/bmob.js');
var util=require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imagePath:"../image/choosePhoto.png",
    postPos:"请选择位置>",
    postItemType:"请选择分类>",
    array: ["卡片","钥匙","证件","数码","箱包","日常用品","其他"],
    index:0,
    title:"",
    description:"",
    type:"",
    phoneNumber:"",
    userInfo:{},
    time:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo=getApp().userInfo;
    this.setData({
      userInfo:userInfo,
    });
    console.log(userInfo);

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
  choosePhoto:function(){
    var _this=this;
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        _this.setData({
          imagePath:tempFilePaths[0]
        })
      },
      count:1
    })
  },
 typeChanged:function(event){
    this.setData({
      type:event.detail.value
    });
 },
 choosePostPos:function(){
   var _this=this;
   wx.chooseLocation({
     success: function(res) {
      _this.setData({
        postPos:res.address
      })
     },
   })
 },
 bindPickerChange:function(e){
   console.log(e);
   var _this=this;
   _this.setData({
      index: e.detail.value,
      postItemType:_this.data.array[_this.data.index]
    })
 },
 inputTitle:function(e){
   this.setData({
     title:e.detail.value
   });
 },
 inputDescription:function(e){
   this.setData({
     description:e.detail.value
   })
 },
 inputTel:function(event){
   this.setData({
     phoneNumber:event.detail.value
   })
 },
 send:function(e){
   var that=this;
   if (that.data.title !== "" && that.data.description !== "" && that.data.type !== "" && that.data.type !== "" && that.data.postPos !== "请选择位置>" && that.data.postItemType !== "请选择分类>"&&that.data.phoneNumber!=="" ){

     var time=new Date();
     var year=time.getFullYear();
     var month=time.getMonth()+1;
     var day=time.getDate();

     time=[year,month,day].map(function(n){
       n=n.toString();
       return n[1]?n:'0'+n;
     }).join('/');
     console.log(time);
     that.setData({
       time:time,
     });
     var Post=Bmob.Object.extend("Post");
     var post=new Post();
     post.set("user", that.data.userInfo.nickName||"");
     post.set("title", that.data.title);
     post.set("description",that.data.description);
     post.set("type", that.data.type);
     post.set("imagePath", that.data.imagePath);
     post.set("position", that.data.postPos );
     post.set("phoneNumber",that.data.phoneNumber);
     post.set("itemType", that.data.postItemType );
     post.set("date",that.data.time);
     post.save(null,{
       success:function(result){
         console.log("合法的启事");
         wx.showToast({
           title: '成功发送',
           icon: "success",
         });
         setTimeout(function () {

           wx.switchTab({
             url: '../home/home',
             success: function () {
               wx.showToast({
                 title: '加载中..',
                 icon: "loading"
               })
             }
           });
           that.setData({
             imagePath: "../image/choosePhoto.png",
             postPos: "请选择位置>",
             postItemType: "请选择分类>",
             title: "",
             description: "",
             type: "",
             phoneNumber: "",
           });
         }, 1500);  
       },
       error:function(result,error){
         console.log(error);
         console.log("发帖失败");
         console.log(result);
         wx.showModal({
           title: "发送失败",
           content: "未知错误",
         })
       }
     })
   }
   else{
     wx.showModal({
       title: '提示',
       content: '请完善信息',
     })
   }
 },
 
})