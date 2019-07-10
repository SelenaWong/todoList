// (function(win){
	function TodoView () {
		this.$main = this.queryElement('.main')
		this.$newTodo = this.queryElement('.new-todos')
		this.$todoList = this.queryElement('.todo-list')
		this.$todoCount = this.queryElement('.todo-count')
		this.$footer = this.queryElement('.footer')
		this.$clearCompleted = this.queryElement('.clear-completed')
		this.$filters= this.queryElement('.filters')
		// this.$showAll = this.queryElement('#showAll',this.$filters)
		// this.$showCompleted = this.queryElement('#showCompleted', this.$filters)
		// this.$showActived = this.queryElement('#showActived', this.$filters)
	}

	TodoView.prototype.setLinkState = function(page){
		this.queryElement('.selected',this.$filters).className = ''
		this.queryElement('a[href^="#/'+page+'"]',this.$filters).className = 'selected'
	}


	TodoView.prototype.clearInput = function() {
		this.$newTodo.value = ''
	}

    TodoView.prototype.Template = function () {
    	let li_template = '<li id={{id}} class={{completed}}'
						+'><div class="view">'
						+'<input type="checkbox" class="toggle" {{attr}}>'
						+'<label>{{title}}</label>'
						+'<button class="destroy"></button>'
						+'</div>'
						+'<input class="edit">'
						+'</li>'
		return li_template
    }


	TodoView.prototype.queryElement = function (element,scope) {
		// document.querySelector 查找css标签
		var target = scope ? scope : document
		var ele = target.querySelector(element)
		return ele
	}

	TodoView.prototype.queryElements = function (element,scope) {
		// document.querySelector 查找css标签
		var target = scope ? scope : document
		var eles = target.querySelectorAll(element)
		return eles
	}

	TodoView.prototype.show = function (datas) {
		var view = ''
		for (var i=0;i< datas.length;i++) {
			var template = this.Template()
			var completed = ' '
			if(datas[i].completed) {
				completed = "completed"
			}
			console.log('datas[i].title='+datas[i].title)
			template = template.replace('{{id}}',datas[i].id)
			template = template.replace('{{completed}}',completed)
			template = template.replace('{{title}}',datas[i].title)
			template = template.replace('{{attr}}',datas[i].checked? 'checked':'')
			view += template
		}
		return view
	}

	TodoView.prototype.render= function (datas) {
		this.$todoList.innerHTML = this.show(datas)
	}

	/**局部刷新list item**/
	TodoView.prototype.renderItem = function(id,completed){
		var $liElement  = this.queryElement("#"+id,this.$todoList)
		$liElement.className = completed
	}

	/**点击删除按钮，删除list item */
    TodoView.prototype.removeItem = function (id) {
		var child = this.queryElement("#"+id)
    	this.$todoList.removeChild(child)
	}

	TodoView.prototype.updateLeftCount = function(count){
		if(count==undefined){
			count = 0
		}
		var $leftCount = this.queryElement("#todo-count")
		$leftCount.innerHTML = count + ' item left'
	}

	/**编辑list item */
	TodoView.prototype.editItem = function (id){
		var $liElement = this.queryElement("#"+id)
		$liElement.className += ' editing'
		var $labelElement = this.queryElement('label',$liElement)
		var $inputElement = this.queryElement(".edit",$liElement)
		$inputElement.value = $labelElement.innerHTML.trim()
		$inputElement.focus()
	}

	/**list item取消编辑 */
	TodoView.prototype.editItemCancel = function(id){
		var $liElement = this.queryElement("#"+id)
		$liElement.className = $liElement.className.replace('editing','')
		var $labelElement = this.queryElement('label',$liElement)
		var $inputElement = this.queryElement(".edit",$liElement)
		$labelElement.innerHTML = $inputElement.value.trim()
	}


	TodoView.prototype._addEventListener = function(target, type,dispatchEvent,useCapture){
		target.addEventListener(type,dispatchEvent,!!useCapture)
	}

	/**设置事件委托提高事件绑定效率 **/
	TodoView.prototype.delegateEvent = function(target,selector,type,handler){
		var that = this
		function dispatchEvent(event){
			var targetElement = event.target
			var queryElements = that.queryElements(selector,target)
			if ( Array.prototype.indexOf.call(queryElements, targetElement)>=0){
				handler.call(targetElement,event)
			}
		}
		var useCapture = type === 'blur' || type === 'focus'
		// !!逻辑取反，强制转换为boolean型
		// target.addEventListener(type,dispatchEvent,!!useCapture)
		this._addEventListener(target,type,dispatchEvent,useCapture)
	}

	TodoView.prototype.bind = function(action,handler){
		var that = this
		if('itemToggle'== action){ // click checkbox of list item 
			this.delegateEvent(this.$todoList, '.toggle','click', function(){
				handler({
					// 需要获取的参数
					id: that.getItemId(this),
					completed: this.checked? 'completed':''
				})
			  })
		} else if ('itemRemove'==action){// click button of list item
			this.delegateEvent(this.$todoList,'.destroy','click',function(){
				handler({
					id: that.getItemId(this)
				})
			})
		}else if('itemEdit'==action ){// double click input of list item
			this.delegateEvent(this.$todoList, 'label','dblclick',function(){
				handler({id: that.getItemId(this)})
			})
		}else if('itemEditDone' == action){// edit item done
			this.delegateEvent(this.$todoList, '.edit','keyup',function(event){
				if(event.keyCode == 13){
					this.blur()
				}
			})
		}else if('itemEditCancel' == action){// cancel edit item
			this.delegateEvent(this.$todoList, '.edit','blur',function(){
				handler({id: that.getItemId(this), title: that.getEditTitle(this)})
			})
		}
	}

	/** 获取元素名为tagName的祖先节点 **/
	TodoView.prototype.getParent = function(element, tagName){
		if(!element.parentNode){
			return 
		}
		if (element.parentNode.tagName.toLowerCase() == tagName.toLowerCase()){
			return element.parentNode
		}
		return this.getParent(element.parentNode,tagName)
	}

	/**获取li的父级节点 */
	TodoView.prototype.getItemId = function(element){
		var $liElement = this.getParent(element,'li')
		return $liElement.id
	}

	TodoView.prototype.getEditTitle = function(element){
		var $liElement = this.getParent(element,'li')
		var $inputElement = this.queryElement(".edit",$liElement)
		return $inputElement.value
	}


// })(window)