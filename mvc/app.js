(function(win){
	function App () {
		this.todoView = new TodoView()
	    this.todoModel = new TodoModel()
		this.todoController = new TodoController(this.todoView,this.todoModel)
	}
	var app = new App()
	$(win).on('load',function(){
		app.todoController.setView(document.location.hash)
	})
	$(win).on('hashchange',function(){
		app.todoController.setView(document.location.hash)
	})
})( window )