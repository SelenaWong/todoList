<template>
   <div>
       <section class="todoapp">
           <header class="v-header">
               <h1>todoApp</h1>
               <input type="text" class="new-todos" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newtodo" @keyup.enter="addTodo">
           </header>
            <section class="main">
                <input type="checkbox" id="toggle-all" class="toggle-all">
                <label for="toggle-all"></label>
                <ul class="todo-list">
                    <li v-for="(todo, index) in filterTodos"  :key="todo.id" :class= "{ completed: todo.completed, editing: todo == editedTodo}"
                    @dblclick="editItem(todo)">
                        <div class="view">
                            <input type="checkbox" class="toggle" @click="toggle(todo, index)">
                            <label>{{todo.title}}</label>
                            <button class="destroy" @click="removeTodo(todo)"></button>
                        </div>
                        <input type="text" class="edit" v-model="todo.title" v-focus="todo == editedTodo"
                        @blur="doneEdit(todo, index)" @keyup.enter="doneEdit(todo, index)" @keyup.esc="cancelEdit(todo)">
                    </li>
                </ul>
            </section>
            <footer class="footer" v-show="todos.length" v-cloak>
                <span class="todo-count">
                    <strong>{{remainings}}</strong>&nbsp;left
                </span>
                <ul class="filters">
                    <li><router-link :to="{path: 'all'}" :class="{selected: visibility == 'all'}">All</router-link></li>
                    <li><router-link :to="{path: 'actived'}" :class="{selected: visibility == 'actived'}">Active</router-link></li>
                    <li><router-link :to="{path: 'completed'}" :class="{selected: visibility == 'completed'}">Completed</router-link></li>
                </ul>
                <button class="clear-completed" @click="removeCompleted" v-show="todos.length>remainings">Clear completed</button>
            </footer>
       </section>
       <footer class="info">
           <p>Double-click to edit a todo</p>
           <p>Written by <a href="#">wxy</a></p>
           <p>Part of <a href="#">TodoApp</a></p>
       </footer>
   </div>
</template>
<script>
import Storage from '../Storage.js'
import Filters from '../Filters.js'

export default {
  name: 'todoApp',
  data () {
    return {
      newtodo: '',
      editedTodo: null,
      todos: [],
      visibility: '',
      filters: new Filters()
    }
  },
  watch: {
    '$route': 'fetchData', // 路由变换后重新获取数据
    todos: { // todos 数组变化后保存数据
      handler: function () {
        this.saveData()
      },
      deep: true
    }
  },
  directives: { // 自定义指令
    focus: {
      inserted: function (el, binding) {
        if (binding.value) {
          el.focus()
        }
      }
    }
  },
  computed: {
    filterTodos: function () {
      return this.filters.condition[this.visibility](this.todos)
    },
    remainings: function () {
      var datas = this.todos.filter((item, index) => !item.completed)
      return datas.length
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    saveData () {
      var myStorage = new Storage('TodoApp')
      myStorage.setData(this.todos)
    },
    fetchData () {
      this.visibility = this.$route.name
      var myStorage = new Storage('TodoApp')
      this.todos = myStorage.fetchData()
    },
    addTodo () {
      if (this.newtodo) {
        var todo = {}
        todo.title = this.newtodo
        todo.id = new Date().getTime()
        todo.completed = false
        this.todos.push(todo)
      }
      this.newtodo = ''
    },
    removeTodo (todo) {
      this.todos = this.todos.filter(item => item.id !== todo.id)
    },
    editItem (todo) {
      this.editedTodo = todo
    },
    doneEdit (todo) {
      this.editedTodo = {}
      if (todo.title) { // 更新数据
        var index = this.todos.findIndex((item, index, array) => {
          return item.id === todo.id
        })
        this.todos.splice(index, 1, todo)
      } else { // 删除数据
        this.removeTodo(todo)
      }
    },
    cancelEdit (todo) {
      this.editedTodo = {}
    },
    removeCompleted () {
      this.todos = this.filters.condition['actived'](this.todos)
    },
    toggle (todo, index) {
      todo.completed = !todo.completed
      var fIndex = this.todos.findIndex((item, index, array) => {
        return item.id === todo.id
      })
      this.todos.splice(fIndex, 1, todo)
    },
    changeVisibility (visibility) {
      this.visibility = visibility
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
