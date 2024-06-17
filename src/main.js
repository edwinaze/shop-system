import { createApp } from 'vue'

import './css/bootstrap.css'
import './style.css'
import App from './App.vue'
import './mock/mockServer'

import router from './router'
const app = createApp(App)

app.use(router)

app.mount('#app')
