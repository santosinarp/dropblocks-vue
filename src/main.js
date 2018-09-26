import Vue from 'vue'
import VueMaterial from 'materialize-css'
import 'materialize-css/dist/css/materialize.css'
import dotenv from 'dotenv'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

Vue.use(VueMaterial)
dotenv.config()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
