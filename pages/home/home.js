// pages/home/home.js
const types=['pop','new','sell']
Page({

  /**
   * 页面的初始数据
   */
  data: {
   banners:[],
   recommends:[],
   titles:["流行","新款","精选"],
   goods:{
     'new':{page:0,list:[]},
     'pop':{page:0,list:[]},
     'sell':{page:0,list:[]}
   },
    currentType:"pop",
    isTabFixed:false,
    tabScrollTap:0
  },
  handleitem(event){
 const index=event.detail.index;
   this.setData({
     currentType:types[index]
   })
  },
  handlert(type) {
    const that=this;
    const page=this.data.goods[type].page+1
    wx.request({
      url: 'http://106.54.54.237:8000/api/v1/home/data?',
      data: {
        type: type,
        page: page
      },
      success: function (res) {
       const list=res.data.data.list;
       const oldList=that.data.goods[type].list;
       oldList.push(...list);
       const typeKey=`goods.${type}.list`;
       const pageKey=`goods.${type}.page`;
       that.setData({
         [typeKey]:oldList,
         [pageKey]:page
       })
      }
    })
  },
  goTop: function () {  // 一键回到顶部
      wx.pageScrollTo({
        scrollTop: 0
      })
    } ,
  handleImg(){
      wx.createSelectorQuery().select("#tab-control").boundingClientRect(rect => {
        console.log(rect)
        this.data.tabScrollTap=rect.top
      }).exec()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this;
    wx.request({
      url: 'http://123.207.32.32:8000/home/multidata',
      success:function(res){
    const banners=res.data.data.banner.list;
    const recommends=res.data.data.recommend.list;
    that.setData({
      banners:banners,
      recommends:recommends
    })
      }
    })
    this.handlert("pop");
    this.handlert("new");
    this.handlert("sell");
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
  //页面滚动到底部
  onReachBottom:function(){
    console.log("到达底部");
    //上拉加载更多->请求新的数据
    this.handlert(this.data.currentType)
  },
  onPageScroll: function (e) {
    console.log(e)
    const scrollTop=e.scrollTop;
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
    //3.修改isTabFixed属性
    const flag2=scrollTop>=this.data.tabScrollTap;
    if(flag2!=this.data.isTabFixed){
      this.setData({
        isTabFixed:flag2
      })
    }
  }
})