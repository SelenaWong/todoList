// (function(win){

	function TodoModel(){
		this.todos = []
		this.getData()
	}

	TodoModel.prototype.add = function(title){
		var todo = {}
		todo.title = title
		if(this.todo && this.todo.length%2==0){
			todo.completed = 'completed'
		}else{
			todo.completed = ''
		}
		todo.checked = false
		var date = new Date()
		todo.id = 'item'+date.getTime() //'item'+this.todos.length
		// 使用队列长度作为id,在后面有CRM操作时，会出现id重复的问题
		this.todos.push(todo)
		this.saveData()
		return this.todos
	}

	TodoModel.prototype.visit = function() {
		this.add('test1')
		this.add('test2')
		this.add('test3')
		this.todos.forEach( item => console.log('item.title= '+item.title 
			+', item.completed='+item.completed))
	}

	TodoModel.prototype.remove = function(id){
		this.todos.splice(this.todos.findIndex(item => item.id == id), 1)
		this.saveData()
		// splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目
	}

	TodoModel.prototype.clearCompleted = function(){
		this.todos = this.todos.filter( item => item.completed != 'completed')
	}
	TodoModel.prototype.actived = function(){
		return this.todos.filter( item => item.completed != 'completed')
	}
	TodoModel.prototype.completed = function(){
		return this.todos.filter( item => item.completed == 'completed')
	}

    TodoModel.prototype.edit = function(id,title){
    	var index = this.todos.findIndex(item => item.id == id)
		this.todos[index].title = title
		this.saveData()
	}
	
	TodoModel.prototype.toggle = function(id,completed){
		var index = this.todos.findIndex(item => item.id == id)
		this.todos[index].completed = completed
		this.todos[index].checked = 'completed'== completed ? true: false
		this.saveData()
	}

	TodoModel.prototype.update = function(id,title){
		var index = this.todos.findIndex(item => item.id == id)
		this.todos[index].title = title
		this.saveData()
	}
	TodoModel.prototype.saveData = function(){
		var datas = JSON.stringify(this.todos)
		localStorage.setItem('TodoApp', datas)
	}
	TodoModel.prototype.getData = function(){
		var datas = localStorage.getItem('TodoApp')
		if(!datas){
			this.todos = []
		}else{
			this.todos = JSON.parse(datas)
		}
	}
	TodoModel.prototype.clearData = function(){
		this.todos = []
		this.saveData()
	}
// })(window)