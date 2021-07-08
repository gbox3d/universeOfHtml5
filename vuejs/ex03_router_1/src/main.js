import { createApp } from 'vue'
import App from './App.vue'

// import { store } from './store';
import { router } from './router'; // 라우터 추가하고 

const app = createApp(App)

// app.use(store)
app.use(router)
app.mount('#app')
