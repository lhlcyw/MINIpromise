Component({
  properties: {
   title:{
     type:Array,
     value:[]
   }
  },
  data: {
   currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemClick(event){
      const index=event.currentTarget.dataset.index;
      this.setData({
        currentIndex:index
      })
      this.triggerEvent('itemclick',{index,title:this.properties.title[index]},{})
    } 
  }
})
