import Vue from 'vue'
import VuePapaParse from 'vue-papa-parse'
import VueClipboard from 'vue-clipboard2'
import 'typeface-archivo-black'

import App from './App.vue'

import '@/assets/css/main.css'

Vue.use(VuePapaParse)
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
