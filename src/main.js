import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入api
import api from '@/api'
// 引入vuex
import store from './store'
// 引入饿了吗组件
import '@/plugins/element.js'
// 引入公共样式
import '@/assets/css/common.css'
// 引入mockjs数据
// import '@/mock/mockServe'
// 引入公共组件
import categorySelect from '@/components/categorySelect'
import HintButton from '@/components/HintButton'

// 公共组件挂载到vue实例上
Vue.component(categorySelect.name, categorySelect)
Vue.component(HintButton.name, HintButton)
// product接口挂载在Vue实例上
Vue.prototype.$http = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
