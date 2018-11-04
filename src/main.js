import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');
