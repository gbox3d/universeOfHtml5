import { createStore } from 'vuex'

export default createStore({
  state: {
    msg: localStorage.getItem('msg') ? localStorage.getItem('msg') : 'hello',
    item : localStorage.getItem('item') ? JSON.parse(localStorage.getItem('item')) : {name:'',number:0}
  },
  mutations: {
    updateMsg(state,playload) {
      state.msg = playload.msg
      localStorage.setItem('msg',state.msg)
    },
    updateItem(state,playload) {
      state.item = playload.item
      localStorage.setItem('item',JSON.stringify(state.item))
    }
  },
  actions: {
  },
  modules: {
  }
})
