// (function(win){
  function TodoController(todoView, todoModel){
  	this.view = todoView
    this.model = todoModel
    var that = this
    this.view.$newTodo.addEventListener('change',function(){
      that.add()
    },false)
    this.view.$clearCompleted.addEventListener('click',function(){
      that.clearCompleted()
    })
    this.bindEvent()
  }	


  TodoController.prototype.bindEvent = function(){
    var that = this
    this.view.bind('itemToggle',function(item){
      that.itemToggle(item)
    })
    this.view.bind('itemRemove',function(item){
      that.itemRemove(item)
    })
    this.view.bind('itemEdit',function(item){
      that.itemEdit(item)
    })
    this.view.bind('itemEditDone',function(item){
    })
    this.view.bind('itemEditCancel',function(item){
      console.log('itemEditCancel','item='+item)
      that.itemEditCancel(item)
    })
  }

  TodoController.prototype.add = function(){
    var title = this.view.$newTodo.value
    var that = this
    if(title && title.trim() && title.length > 0){
      this.model.add(title)
      this.view.clearInput()
      this.filter(true)
    }
  }
  TodoController.prototype.clearCompleted = function(){
    this.model.clearCompleted()
    this.filter()
  }

  TodoController.prototype.itemToggle = function( item ) {
        this.model.toggle(item.id,item.completed)
        this.filter()
  }

  TodoController.prototype.itemRemove = function(item){
      this.view.removeItem(item.id)
      this.model.remove(item.id)
      this.filter()
  }
  TodoController.prototype.itemEdit = function(item){
      this.view.editItem(item.id)
  }

  TodoController.prototype.itemEditCancel = function(item){
    if (item.title){
      this.view.editItemCancel(item.id)
      this.model.update(item.id,item.title)
    }else{
      this.view.removeItem(item.id)
      this.model.remove(item.id)
    }
  }

  TodoController.prototype.showAll = function(){
    this.view.render(this.model.todos)
  }
  TodoController.prototype.showActived = function(){
    this.view.render(this.model.actived())
  }
  TodoController.prototype.showCompleted = function(){
    this.view.render(this.model.completed())
  }

  TodoController.prototype.setView = function(locationHash){
    console.log('locationHash= '+locationHash)
    var hashArray = locationHash.split('/')
    var router  = hashArray[1]
    var page = router || ''
    this.updateFilterState(page)
  }
  TodoController.prototype.updateFilterState = function(currentPage){
    //保存当前的路径
    if(currentPage==''){
      this.activedPath = 'All'
    }else {
      this.activedPath = currentPage.charAt(0).toUpperCase()+ currentPage.slice(1)
    }
    this.filter()
    this.view.setLinkState(currentPage)// 更新链接选中的状态
  }

  TodoController.prototype.filter = function(force){
    //更新数据
    var leftCount = this.model.actived().length
    this.view.updateLeftCount(leftCount)
    if(force || this.lastActivedPath!='All'||this.lastActivedPath!=this.activedPath){
      var funcName = 'this.show'+this.activedPath
      eval(funcName+"()") //调用方法
    }
    this.lastActivedPath = this.activedPath
  }

// })(window)