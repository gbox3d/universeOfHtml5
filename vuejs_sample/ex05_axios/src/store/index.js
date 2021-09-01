import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    todolist : []
  },
  mutations: {
    updateTodos(state,playload) {
        console.log(playload)
        state.todolist = playload
      }
  },
  actions: {
    async updateTodos(context) {

      try {
        let url = 'https://jsonplaceholder.typicode.com/todos';
        let { status, data } = await axios.get(url);
        console.log(status);
        // console.log(data);
        context.commit('updateTodos',data)

        // state.todos = data
      }
      catch (e) {
        console.log(e)
      }
       
    }
  },
  modules: {
  }
})