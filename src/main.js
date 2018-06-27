import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import '@/theme/index.css' // global css
import api from '@/api/api'

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(VueAxios, axios)
Vue.use(api)

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false;
axios.interceptors.request.use(
  config => {
    if (window.sessionStorage.getItem('token')) {
      config.headers.Authorization = `Bearer ${window.sessionStorage.getItem('token')}`;
    }

    return config;
  },
  err => {
    alert(err)
    return Promise.reject(err);
  });
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: '/',
            query: { redirect: router.currentRoute.fullPath }
          })
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });


  router.addRoutes([{
    path: '/store',
    meta: {
      title: '门店管理',
      icon: 'example'
    },
    component: () => import('@/views/store'),

    children: [
      {
        meta: { title: '门店列表' },
        path: '',
        component: () => import('@/views/store/StoreList')
      },
      {
        name: 'qrcode',
        meta: { title: 'qrcode' },
        path: 'drawQrCode/:id/:qrcode',
        component: () => import('@/views/store/DrawQrCode')
      },
      {
        name: '新建门店',
        meta: { title: '新建门店' },
        path: 'edit/:storeId',
        component: () => import('@/views/store/DrawQrCode')
      }
    ]
  }]);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
