// import Vue from 'vue'
// import Vuex from 'vuex'
import { createApp } from 'vue'


import App from './App.vue'

// import { store } from './store';
import { router } from './router'; // 라우터 추가하고 
import {store}  from './store';

// Vue.use(Vuex)
const app = createApp(App)
// app.use(Vuex)
app.use(router)
app.use(store)
// app.use(store)
app.mount('#app')
