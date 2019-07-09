import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'
Vue.prototype.axios=axios;
//使用mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
//使用vue-touch
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
Vue.config.productionTip = false
//设置过滤器
Vue.filter("setWH",(url,arg)=>{
  return url.replace(/w\.h/,arg)
});
new Vue({
  router, 
  store,
  render: h => h(App)
}).$mount('#app')
