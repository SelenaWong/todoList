import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TodoApp from '@/components/TodoApp'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/all',
      name: 'all',
      component: TodoApp
    },
    {
      path: '/actived',
      name: 'actived',
      component: TodoApp
    },
    {
      path: '/completed',
      name: 'completed',
      component: TodoApp
    }
  ]
})
