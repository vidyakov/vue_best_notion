import Vue from 'vue'
import App from './App.vue'

import '@/assets/scss/main.scss'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

// Vue.directive('click-outside',
//     {
//       bind(el, binding) {
//         el.addEventListener('click', e => e.stopPropagation());
//         document.body.addEventListener('click', binding.value);
//       },
//       unbind(el, binding) {
//         document.body.removeEventListener('click', binding.value);
//       }});
