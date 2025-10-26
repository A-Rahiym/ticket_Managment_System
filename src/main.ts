import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import App from './App.vue'
import { routes } from './router'
import './style.css'

const app = createApp(App)
const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(Vue3Toastify, {
  // ⏱ Toast behavior
  autoClose: 5000,
  position: toast.POSITION.TOP_RIGHT,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  newestOnTop: true,

  // 💫 Animation — fade in/out instead of sliding
  transition: 'zoom', // "zoom" gives a smooth appear/disappear effect

  // 🎨 Visuals
  theme: 'dark',

  toastStyle: {
    background: 'rgba(0, 0, 0, 0.85)', // glassy black background
    color: '#fff',
    borderRadius: '12px',
    backdropFilter: 'blur(8px)',
    padding: '14px 18px',
    fontSize: '14px',
    fontWeight: '500',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
  },
})
app.use(pinia)
app.use(router)
app.mount('#app')
