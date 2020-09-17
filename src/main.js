import Vue from 'vue'
import VuePapaParse from 'vue-papa-parse'
import VueClipboard from 'vue-clipboard2'
import VueAnalytics from 'vue-analytics'
import 'typeface-archivo-black'

import App from './App.vue'

import '@/assets/css/main.css'

Vue.use(VuePapaParse)
Vue.use(VueClipboard)
Vue.use(VueAnalytics, {
  id: 'UA-177960351-2',
})

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
