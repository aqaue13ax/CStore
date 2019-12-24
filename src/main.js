import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAMap from 'vue-amap';
import http from './utils/http'
import { ImagePreview } from 'vant';

Vue.prototype.$http = http;
Vue.use(VueAMap);
Vue.use(ImagePreview);

VueAMap.initAMapApiLoader({
  key: '124ac7da3c120c5129671386c225180f',
  plugin: ['AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.ElasticMarker'],
  uiVersion: '1.0.11',
  v: '1.4.4'
});

Vue.config.productionTip = false

new Vue({
  data() {
    return {
      logo: true,
      user: {
        name: '',
        address: '',
        email: '',
        role: { modules: [] }
      },
      range: [],
      stores: [],
      center: JSON.parse(localStorage.getItem("lat&lng")) || [120.670856, 28.000986],
      zoom: 14,
    }
  },
  methods: {},
  router,
  render: h => h(App)
}).$mount('#app')
