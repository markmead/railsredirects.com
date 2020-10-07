import Vue from 'vue'
import VuePapaParse from 'vue-papa-parse'
import VueClipboard from 'vue-clipboard2'
import VueGtag from 'vue-gtag'
import App from './App.vue'

import 'typeface-archivo-black'

import '@/assets/css/main.css'

Vue.use(VuePapaParse)
Vue.use(VueClipboard)
Vue.use(VueGtag, {
  config: { id: 'UA-177960351-2' },
})

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
