import { createApp } from 'vue'
import App from './App.vue'
import bus from './bus'
import animate from 'animate.css'

const app = createApp(App)
// 全局注册 bus, 可以不同组件间通过全局对象 $bus 来进行事件传递
app.config.globalProperties.$bus = bus
//通过use添加
app.use(animate)
app.mount('#app')