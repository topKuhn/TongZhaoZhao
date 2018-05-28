//index.js
//获取应用实例

var BmobSocketIo = require('../../utils/bmobSocketIo.js').BmobSocketIo;
var Bmob = require('../../utils/bmob.js');

var util=require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfor: {},
    selectedStyleFindLostProperty:"selectedStyleLostProperty",
    selectedStyleFindLostOwner:"",
    choosePosShow:"请选择地区∨",
    choosePosReal:"",
    itemsArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    wx.showToast({
      title: '加载中..',
      icon:"loading",
    });
    console.log("开始查询");

    var dis = Math.round(Math.random() * 10000);
    var distance = "距您" + dis + "m";
    var times = Math.round(Math.random() * 500);
    var viewTimes = "浏览" + times + "次";


    var _this = this;
    var post = Bmob.Object.extend("Post");
    var query = new Bmob.Query(post);
    // 查询所有寻物启事
    var arr = [];
    var _this = this;
    query.equalTo("type","寻找失物");
    query.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        for (var i = 0; i < results.length; i++) {
          arr.push(results[i]);
          console.log(arr[0].distance);
        }
        _this.setData({
          itemsArray: arr,
          distance: distance,
          viewTimes:viewTimes
        });
        
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
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
  toFindLostPropertyPage:function(){
    var _this = this;
    var post = Bmob.Object.extend("Post");
    var query = new Bmob.Query(post);
    // 查询所有寻物启事
    var dis = Math.round(Math.random() * 10000);
    var distance = "距您" + dis + "m";
    var times = Math.round(Math.random() * 500);
    var viewTimes = "浏览" + times + "次";
    var arr = [];
    var _this = this;
    query.equalTo("type", "寻找失物");
    query.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        for (var i = 0; i < results.length; i++) {
          arr.push(results[i]);
        }
        _this.setData({
          selectedStyleFindLostProperty: "selectedStyleLostProperty",
          selectedStyleFindLostOwner: "",
          distance: distance,
          viewTimes: viewTimes,
          itemsArray:arr
          
        });
        console.log(_this.data.itemsArray[0]);
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    })
  },
  toFindLostOwnerPage:function(){
    var _this = this;
    var post = Bmob.Object.extend("Post");
    var query = new Bmob.Query(post);
    // 查询所有寻物启事
    var dis=Math.round(Math.random()*10000);
    var distance="距您"+dis+"m";
    var times=Math.round(Math.random()*500);
    var viewTimes="浏览"+times+"次";
    var arr = [];
    var _this = this;
    query.equalTo("type", "寻找失主");
    query.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        for (var i = 0; i < results.length; i++) {
          arr.push(results[i]);
        }
        _this.setData({
          selectedStyleFindLostOwner: "selectedStyleFindLostOwner",
          selectedStyleFindLostProperty: "",
          itemsArray: arr,
          distance: distance,
          viewTimes: viewTimes

        });
        console.log(_this.data.itemsArray[0]);
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
   
  },
  choosePosition:function(){
    var _this=this;
    wx.chooseLocation({
      success: function(res) {
        var address=res.address;
        var _address;
        if(address.length>5){
          _address = address.substring(0, 5) +"...";
        }
        else{
          _address = address;
        }
        _this.setData({
          choosePosShow:_address,
          choosePosReal:address
        })
      },
      fail:function(e){
        console.log(e);
        console.log("ERROR");
      }
    })
  },
  showDetail:function(e){
    var id=e.currentTarget.id;
    var info = this.data.itemsArray[id];
    var app=getApp();
    app.info=info;
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  searchResult:function(e){
    var keyWord=e.detail.value;
    var arr=this.data.itemsArray;
    arr=arr.filter(function(value,key,self){
      return value.title.indexOf(keyWord);
    });
    this.setData({
      itemsArray:arr
    });
  }
})








/*
Page({
  data: {
    pos:"请选择位置>",
    showView:true,
    uhide:0
  },
 
  onLoad: function (query) {
    
   // BmobSocketIo.init();
    var data = {
      "datas": [
        {
          "id": 1,
          "imgurl": "../image/car.png",
          "useDate": "2017-12-22",
          "cx": "奇瑞EQ1",
          "time": "1小时",
          "feiyong": "20元"
        },
        {
          "id": 2,
          "imgurl": "../image/car.png",
          "useDate": "2017-12-22",
          "cx": "奇瑞EQ1",
          "time": "1小时",
          "feiyong": "20元"
        },
        {
          "id": 3,
          "imgurl": "../image/car.png",
          "useDate": "2017-12-22",
          "cx": "奇瑞EQ1",
          "time": "1小时",
          "feiyong": "20元"
        },
        {
          "id": 4,
          "imgurl": "../image/car.png",
          "useDate": "2017-12-22",
          "cx": "奇瑞EQ1",
          "time": "1小时",
          "feiyong": "20元"
        }
      ]
    };
    this.setData({
      carInfoData: data.datas
    })
   
  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  toggleBtn: function (event) {
    var that = this;
    var toggleBtnVal = that.data.uhide;
    var itemId = event.currentTarget.id;
    if (toggleBtnVal == itemId) {
      that.setData({
        uhide: 0
      })
    } else {
      that.setData({
        uhide: itemId
      })
    }
  },
  clickme:function(e){
    console.log("点击了我");
    this.setData({
      hello:"helloworld"
    })
    var _this=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        _this.setData({
          tempFilePaths:res.tempFilePaths
        })
       
      }
    }); 
  },
  choosePos:function(e){
    var pos_this=this;
    wx.chooseLocation({
      success: function(res) {
        pos_this.setData({
          pos: res.name
        });
      },
    })
  },
  addData:function(){
    console.log("成功添加数据");
    console.log(uuid.v4());
    
    /////////添加一行数据
    var diary = new Diary();
    diary.set("title", uuid.v4());
    diary.set("content", "helloBmob");
    diary.set("author", "wx");
    //添加数据，第一个入口参数是null
    diary.save(null, {
      success: function (result) {
        //添加成功后，返回成功之后的ObjectId(返回的属性名是id,不是objectid)可以在Bmob的Web管理后台看到对应的数据
        console.log("日记创建成功，objectid:" + result.id);
      },
      error: function (result, error) {
        //添加失败
        console.log("创建日记失败");
      }
    });
    
  },
  imageInfo: function (e) {
    console.log('点击图片');
    var _this=this;
  }
}),
wx.onSocketOpen(function(res){
  console.log("WebSocket连接已打开");
});
const requestTask=wx.request({
  url: 'https://www.baidu.com',
  header:{
    'Content-Type':'application/json'
  },
  success:function(e){
    console.log('成功');
    console.log(e);

  },
  complete:function(){
    console.log('无论成功或者失败都会执行');
  }
});
requestTask.abort(function () {
  console.log('请求被终止');
});
*/

/*
/////////添加一行数据
var diary=new Diary();
diary.set("title","wx");
diary.set("content","helloBmob");
diary.set("author","wx");
//添加数据，第一个入口参数是null
diary.save(null,{
  success:function(result){
    //添加成功后，返回成功之后的ObjectId(返回的属性名是id,不是objectid)可以在Bmob的Web管理后台看到对应的数据
    console.log("日记创建成功，objectid:"+result.id);
  },
  error:function(result,error){
    //添加失败
    console.log("创建日记失败");
  }
});
*/

/*
//////////////获取一行数据
var query = new Bmob.Query(Diary);
query.get("e299dd2695",{
  success:function(result){
    ///数据获取成功
    console.log("日记的title: "+result.get("title")+" content: "+result.get("content")+" author: "+result.get("author"));
  },
  error:function(result,error){
    console.log("查询失败");  
  }
})
*/

/*
///////修改一行数据
var query= new Bmob.Query(Diary);
query.get("0eeba85bc8",{
  success:function(result){
    //回调中对获取的这个查询对象的实例进行修改
    result.set("title","phone");
    result.set("content","lost");
    result.set("author","xiaoming");
    result.save();
    console.log("修改成功");
  },
  error:function(result,error){
    console.log("修改数据失败");
  }
});
*/

/*
/////////////////////删除一行数据
var query= new Bmob.Query(Diary);
query.get("e299dd2695",{
  success:function(object){
    object.destroy({
      success:function(deleteobject){
        console.log("成功删除该条数据");
      },
      error:function(deleteobject,error){
        console.log("删除数据失败");
      }
    })
  },
  error:function(object,error){
    console.log("获取数据失败");
  }
})
*/

/*
 //初始连接socket.io服务器后，需要监听的事件都写在这个函数内
BmobSocketIo.onInitListen=function(){
  //订阅diary表的数据更新事件
  BmobSocketIo.updateTable("diary");
};
//监听服务器返回的更新的表的数据
BmobSocketIo.onUpdateTable=function(tablename,data){
  if(tablename=="diary"){
    console.log(data);
  }
}
*/