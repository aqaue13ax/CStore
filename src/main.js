import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAMap from 'vue-amap';
import Vuex from 'vuex'
import store from './store'
import http from './utils/http'
// import VCharts from 'v-charts'
import { ImagePreview, Popup, Picker, Icon, Area, Loading } from 'vant';

localStorage.setItem('loading', 0)

Vue.use(VueAMap);
Vue.use(Vuex)
// Vue.use(VCharts)

Vue.prototype.$http = http;

Vue.use(Icon);
Vue.use(Area);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Loading);
Vue.use(ImagePreview);



VueAMap.initAMapApiLoader({
  key: '124ac7da3c120c5129671386c225180f',
  plugin: ['AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.ElasticMarker'],
  uiVersion: '1.0.11',
  v: '1.4.4'
});

Vue.config.productionTip = false

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

if (!localStorage.area) localStorage.area = 330300

new Vue({
  data() {
    return {
      logo: true,
      user: {
        name: '',
        address: '',
        email: '',
        agency: {},
        role: { modules: [] },
        roles: {market: {}, store: {}, dev: {}},
      },
      range: [],
      stores: [],
      center: JSON.parse(localStorage.getItem("lat&lng")) || [120.670856, 28.000986],
      zoom: 12,
    }
  },

  computed: {
    market () {
      return this.user.roles.market
    },
    store () {
      return this.user.roles.store
    }
  },

  methods: {},

  async created() {
    if (!this.$root.user.id) {
      await this.$http
        .get("api/user")
        .then(data => {
          if (data.role == null) {
            data.role = { name: "" };
          }

          if (data.agency == null) {
            data.agency = { name: "" };
          }

          this.$root.user = data;

          localStorage.setItem('roles', JSON.stringify(data.roles));

          if (this.$root.user.audit_status != 1) {
            this.$router.replace("/user");
          }
        })
    } else {
      if (this.$root.user.audit_status != 1) {
        this.$router.replace("/user");
      }
    }
  },

  store,
  router,
  render: h => h(App)
}).$mount('#app')
