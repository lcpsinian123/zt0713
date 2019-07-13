import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
Vue.config.productionTip = false
import './statics/css/adminindex.css'
import 'element-ui/lib/theme-chalk/index.css';
import md5 from 'js-md5';//  md5
Vue.prototype.$md5 = md5;
Vue.use(ElementUI)
import router from './router'
new Vue({
  render: h => h(App),
  router
}).$mount('#app')

