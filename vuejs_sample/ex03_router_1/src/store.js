import { createStore } from 'vuex'

// Create a new store instance.
export const store = createStore({
  state () {

    //local storage 에 count 값 보존
    let _count = 0
    if(localStorage.getItem('count') != undefined) {
      _count = parseInt(localStorage.count)
    } 
    else {
      localStorage.setItem('count',_count)
    }

    return {
      count: _count
    }
  },
  mutations: {
    increment (state) {
      state.count++
      localStorage.count = state.count
    },
    decrement (state) {
      state.count--
      localStorage.count = state.count
    },
    setvalue(state,playload) {
      state.count = playload.value
      localStorage.count = state.count
    }
  }
})

//  = store;