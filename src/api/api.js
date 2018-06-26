import Vue from 'vue'

// https://github.com/mzabriskie/axios/issues/894
/**
 * create vue-resource's resource like object
 *
 * Default Actions
 *   get: {method: 'GET'}
 *   save: {method: 'POST'}
 *   query: {method: 'GET'}
 *   update: {method: 'PUT'}
 *   delete: {method: 'DELETE'}
 *
 * @param path the resource path
 * @param http axios instance
 * @param actions custom actions
 * @returns the resource object
 */
function resource (path, http, actions) {
  let obj = {
    get: id => http.get(path + '/' + id),
    save: obj => http.post(path, obj),
    query: params => http.get(path, {params}),
    update: (id, obj) => http.put(path + '/' + id, obj),
    delete: id => http.delete(path + '/' + id)
  }
  return Object.assign(obj, actions)
}

export default {
  install: () => {
    let http = Vue.axios
    const api = {
      stores: resource('api/getStoreList', http, {
        get: params => http.post('api/getStoreList', params),
        types: () => http.get('api/getStoreTypes'),
        info: params => http.post('api/getStoreInfo', params),
        save: obj => http.post('api/createStore', obj),
        update: obj => http.post('api/editStore', obj),
        deleting: obj => http.post('api/deleteStore', obj)
      }),
      devices: resource('api/getDeviceList', http, {
        get: params => http.post('api/getDeviceList', params),
        info: params => http.post('api/getDeviceInfo', params),
        save: obj => http.post('api/createDevice', obj),
        update: obj => http.post('api/editDevice', obj),
        types: () => http.get('api/getAdjustTypes'),
        updateStock: obj => http.post('api/adjustDevice', obj),
        deleting: obj => http.post('api/deleteDevice', obj)
      }),
      products: resource('api/getProductList', http, {
        get: params => http.post('api/getProductList', params),
        info: params => http.post('api/getProductInfo', params),
        save: obj => http.post('api/createProduct', obj),
        update: obj => http.post('api/editProduct', obj),
        deleting: obj => http.post('api/deleteProduct', obj)
      }),
      users: resource('api/getUserList', http, {
        updatePassword: obj => http.post('api/changePasswd', obj)
      }),
      qiniu: resource('api/getQiniuUploadToken', http, {
        token: () => http.post('api/getQiniuUploadToken')
      }),
      integrals: resource('api/getMallOrderList', http, {
        get: params => http.post('api/getMallOrderList', params),
        send: obj => http.post('api/mallOrderSend', obj)
      }),
      coupons: resource('api/getTicketList', http, {
        get: params => http.post('api/getTicketList', params),
        save: obj => http.post('api/createTicket', obj)
      }),
      clienteles: resource('api/getMobileUserList', http, {
        get: params => http.post('api/getMobileUserList', params),
        getRecharge: params => http.post('api/getUserRechargeList', params),
        getGrab: params => http.post('api/getUserWinList', params),
        refunds: params => http.post('api/userRefund', params)
      }),
      singIns: resource('api/getCheckInRules', http, {
        get: params => http.get('api/getCheckInRules', params),
        save: obj => http.post('api/getCheckInRules', obj)
      }),
      operations: resource('api/data/getDeviceDailyData', http, {
        get: params => http.post('api/data/getWechatDailyData', params),
        save: params => http.post('api/data/getDeviceDailyData', params),
        getcard: params => http.post('api//data/getTicketDailyData', params)
      }),
      login:resource('v1/users/login', http, {
        post: params => http.post('v1/users/login', params)
      }),//用户管理
      client: resource('v1/users', http, {
        getList: params => http.get('v1/users', params),
        post: params => http.post('v1/users', params),
        put: params => http.put('v1/users', params),
        del: id => http.delete('v1/users/'+id),
        isDisable: (id,fn) => http.get('v1/users/'+id,fn),
        change: (id,params) => http.put('v1/users/'+id,params),
        getLogs:params=>http.get('v1/users/logs',params)
      }),
      store:resource('v1/stores',http,{
        getList:params=>http.get('v1/stores',params),
        post:params=>http.post('v1/stores',params),
        del:id=>http.delete('v1/stores/'+id),
        put: (id,params) => http.put('v1/stores/'+id, params),
        putQrCode: (id,params) => http.put('v1/stores/'+id+'/qrcode?qrcode='+ params)
      }),
      equipment:resource('v1/devices',http,{
        get: params => http.get('v1/devices', params),
        post: params => http.post('v1/devices/activate', params),
        put: (id,params) => http.put('v1/devices/'+id, params),
        delete:params => http.delete('v1/devices/'+params),
      }),
      myInfo:resource('v1/users', http, {
        save: (id,params) => http.put('v1/users/'+id+'/password', params),
        getInfo:(id,params)=>http.get('v1/users/'+id ),
        editInfo:(id,params)=>http.put('v1/users/'+id ,params)
      }),
      qinniuToken:resource('v1/qiniu/token', http, {
        getToken: params=> http.get('v1/qiniu/token', params)
      }),
      IP:resource('v1/ips/', http, {
        addIp: params=> http.post('v1/ips/', params),
        getList:params=>http.get('v1/ips/', params),
        getDeatil:(id,params)=>http.get('v1/ips/'+id, params),
        editIp:(id,params)=> http.put('v1/ips/'+id, params),
        deleteIp:(id,params)=>http.delete('v1/ips/'+id, params)
      }),
      products:resource('v1/products/', http, {
        getProductList: params=> http.get('v1/products', params),
        create:params=>http.post('v1/products', params),
        offline:(id,params)=>http.put('v1/products/'+id+'/offline',params),
        online:(id,params)=>http.put('v1/products/'+id+'/online',params),
        deletePro:(id,params)=>http.delete('v1/products/'+id,params),
        editPro:(id,params)=>http.put('v1/products/'+id,params),
        getProduct:(id,params)=>http.get('v1/products/'+id,params)
      }),
      operation: resource('v1/recharges', http, {
        getPlan: params => http.get('v1/recharges', params),
        newPlan: params => http.post('v1/recharges', params),
        usePlan: id => http.get('v1/recharges/'+id+'/enabled'),
        deletePlan: id => http.delete('v1/recharges/'+id),
        editPlan: (id,params)=>http.put('v1/recharges/'+id,params),

        getTickets:params => http.get('v1/tickets', params),
        newTickets:params => http.post('v1/tickets', params),
        ticketsDetail:(id,uid,params)=>http.get('v1/tickets/'+id+'/user/'+uid,params),
      }),
      checkins: resource('v1/checkins', http, {
        getList: () => http.get('v1/checkins'),
        post: params => http.post('v1/checkins', params),
        enabled: id => http.get('v1/checkins/'+id+'/enabled'),
        del: id => http.delete('v1/checkins/'+id),
        edit: (id,params)=>http.put('v1/checkins/'+id,params),
      }),
      customer: resource('v1/consumers', http, {
        getList: () => http.get('v1/consumers'),
        getConsume: (id,params) => http.post('v1//consumers/'+id+'/consume', params),
        getRecharge: (id,params) => http.post('v1//consumers/'+id+'/Recharge', params),
      //   enabled: id => http.get('v1/consumers/'+id+'/enabled'),
      //   del: id => http.delete('v1/consumers/'+id),
      //   edit: (id,params)=>http.put('v1/consumers/'+id,params),
      }),
    }

    Vue.api = api
    Vue.prototype.$api = api
  }
}
