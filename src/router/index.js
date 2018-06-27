import Vue from 'vue'
import Router from 'vue-router'
import req from './requireAuth'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
// import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
// const rootView = () => import('@/views/main/index')

export const constantRouterMap = [
  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/login', component: () => import('@/views/auth/Login'), hidden: true },
  { path: '/', redirct:'/mySelf', component: () => import('@/views/mySelf'), hidden: true },
  {
    path: '/mySelf',
    name: '个人中心',
    meta: { title: '个人中心', icon: 'example' },
    component: () => import('@/views/mySelf'),
    children: [
      {
        path: 'myInfo',
        name: '账户信息',
        meta: { title: '账户信息' },
        component: () => import('@/views/mySelf/myInfo'),
      },
      {
        path: 'users/password',
        name: '修改密码',
        meta: { title: '修改密码' },
        component: () => import('@/views/mySelf/ChangePassword'),
      }
    ]
  },
  {
    path: '/store',
    meta: {
      title: '门店管理',
      icon: 'example'
    },
    hidden: req('store'),
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
  },
  {
    name: 'equipment',
    path: '/equipment',
    meta: {
      title: '设备管理',
      icon: 'example'
    },
    hidden: req('service') || req('operative'),
    component: () => import('@/views/equipment'),

    children: [
      {
        name: 'service',
        meta: { title: '设备服务管理' },
        path: 'service',
        hidden: req('service'),
        component: () => import('@/views/equipment/service')
      },
      {
        name: 'active',
        meta: { title: '激活设备' },
        hidden: true,
        path: 'active',
        component: () => import('@/views/equipment/active')
      },
      {
        name: 'operative',
        meta: { title: '设备运营管理' },
        path: 'operative',
        hidden: req('operative'),
        component: () => import('@/views/equipment/operative')
      },
      {
        name: 'init',
        meta: { title: '设备初始化' },
        path: 'init:id',
        hidden: true,
        component: () => import('@/views/equipment/init')
      },
      {
        name: 'infoEdit',
        meta: { title: '运行设备信息编辑' },
        path: 'infoEdit',
        hidden: true,
        component: () => import('@/views/equipment/infoEdit')
      }
    ]
  },
  {
    name: 'operation',
    path: '/operation',
    meta: {
      title: '运营管理',
      icon: 'example'
    },
    hidden: req('recharge') || req('card'),
    component: () => import('@/views/operation'),

    children: [
      {
        name: 'recharge',
        meta: { title: '充值管理' },
        path: 'recharge',
        hidden: req('recharge'),
        component: () => import('@/views/operation/recharge')
      },
      {
        name: 'card',
        meta: { title: '卡券管理' },
        path: 'card',
        hidden: req('card'),
        component: () => import('@/views/operation/card')
      },
      {
        name: 'newcard',
        meta: { title: '新增卡券' },
        path: 'newcard',
        hidden: true,
        component: () => import('@/views/operation/newcard')
      },
      {
        name: 'cardDetails',
        meta: { title: '卡券详情' },
        path: 'cardDetails',
        hidden: true,
        component: () => import('@/views/operation/cardDetails')
      }
    ]
  },
  {
    path: '/client',
    meta: {
      title: '用户管理',
      icon: 'example'
    },
    hidden: req('userList') || req('operationLog'),
    component: () => import('@/views/client'),

    children: [
      {
        meta: { title: '用户列表' },
        path: 'userList',
        hidden: req('userList'),
        component: () => import('@/views/client/userList')
      },
      {
        name: '增加用户',
        meta: { title: '增加用户' },
        hidden: true,
        path: 'addUser/:id',
        component: () => import('@/views/client/AddUser')
      },
      {
        name: 'propertyManagement',
        meta: { title: '权限管理' },
        path: 'propertyManagement/:userId/:userName',
        hidden: true,
        component: () => import('@/views/client/PropertyManagement')
      },
      {
        name: 'operationLog',
        meta: { title: '用户操作日志' },
        path: 'operationLog',
        hidden: req('operationLog'),
        component: () => import('@/views/client/PropertyManagement')
      }
    ]
  },
  {
    path: '/customer',
    meta: {
      title: '客户管理',
      icon: 'example'
    },
    hidden: req('customerList') || req('integralManagement') || req('integralMall'),
    component: () => import('@/views/customer'),

    children: [
      {
        meta: { title: '客户列表' },
        path: 'customerList',
        hidden: req('customerList'),
        component: () => import('@/views/customer/CustomerList')
      },
      {
        name: '账户明细',
        meta: { title: '账户明细' },
        hidden: true,
        path: 'accountDetail/:id',
        component: () => import('@/views/customer/AccountDetail')
      },
      {
        name: '积分管理',
        meta: { title: '积分管理' },
        path: 'integralManagement',
        hidden: req('integralManagement'),
        component: () => import('@/views/customer/IntegralManagement')
      },
      {
        name: 'chognzhi',
        meta: { title: '充值方案新建' },
        hidden: true,
        path: 'rechargeAddPlane',
        component: () => import('@/views/customer/RechargeAddPlane')
      },
      {
        name: '充值方案新建',
        meta: { title: '充值方案新建' },
        hidden: true,
        path: 'signAddPlane/:id',
        component: () => import('@/views/customer/SignAddPlane')
      },
      {
        name: '积分商城',
        meta: { title: '积分商城' },
        path: 'integralMall',
        hidden: req('integralMall'),
        component: () => import('@/views/customer/IntegralMall')
      },
      {
        name: '新增商品',
        meta: { title: '新增商品' },
        hidden: true,
        path: 'addGoods',
        component: () => import('@/views/customer/AddGoods')
      }
    ]
  },
  {
    path: '/ip',
    meta: {
      title: 'IP管理',
      icon: 'tree'
    },
    hidden: req('list'),
    component: () => import('@/views/IP'),

    children: [
      {
        meta: { title: 'IP列表' },
        path: 'list',
        hidden: req('list'),
        component: () => import('@/views/IP/list')
      },
      {
        name: 'add',
        meta: { title: '新增IP' },
        path: 'add',
        component: () => import('@/views/IP/add')
      },
      {
        name: 'edit',
        meta: { title: 'IP编辑' },
        path: 'edit/:id',
        hidden: true,
        component: () => import('@/views/IP/edit')
      }
    ]
  },
  {
    path: '/scene',
    meta: {
      title: '景品管理',
      icon: 'example'
    },
    hidden: req('sceneList'),
    component: () => import('@/views/scene'),

    children: [
      {
        meta: { title: '景品列表' },
        path: 'sceneList',
        hidden: req('sceneList'),
        component: () => import('@/views/scene/sceneList')
      },
      {
        name: 'addScene',
        meta: { title: '增加景品' },
        path: 'addScene',
        component: () => import('@/views/scene/sceneAdd')
      },
      {
        name: '景品编辑',
        meta: { title: '景品编辑' },
        path: 'sceneEdit/:id',
        component: () => import('@/views/scene/sceneEdit')
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = []
