import Vue from 'vue'
import 'vue-class-component/hooks'
import '@/router/helper'
import router from '@/router'
import store from '@/store'
import App from '@/App.vue'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
