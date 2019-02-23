// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './style/reset.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import routes from './router';
import store from './store'
import  * as filters from './filters'


// store为实例化生成的
import Config from './config/index';
// 引入高德地图
// import VueAMap from 'vue-amap';
// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   key: 'a1583795d86b79646dc9750223d3df7f',
//   plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType'],
//   v: '1.4.4'
// });

import Sto from 'store';
import 'element-ui/lib/theme-default/index.css'
import { Message, Loading, MessageBox} from 'element-ui';

// 引入图表控件
import echarts from 'echarts'
Vue.prototype.$echarts = echarts


Vue.use(VueRouter);

Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$sto = Sto;
Vue.prototype.$confirm = MessageBox;
Vue.prototype.$conf = Config;

Vue.config.productionTip = false

// 注册全局过滤器
Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key])
})

// 创建路由实例
const router = new VueRouter({
  routes: routes,
  mode: 'history',
  strict: process.env.NODE_ENV === 'development' // 生产环境使用严格模式
})

router.beforeEach((to, from, next) => {
  let cookies = Sto.get(Config.constant.cookie);
  if ((!cookies || !cookies.token) && to.path != Config.route.login) {
    next(Config.route.login);
  } else if (cookies && cookies.token && to.path != Config.route.login) {
    let token = cookies.token;
    // 保存2个小时TOKEN
    if ((new Date()).getTime() - token > 7200000) {
      delete cookies.token;
      Sto.set(Config.constant.cookie, cookies);
      next(Config.route.login);
    } else {
      next();
    }
  } else {
    next();
  }
})

router.afterEach((transition) => {
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
