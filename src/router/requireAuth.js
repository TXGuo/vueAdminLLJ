// lazy loading Components
// https://github.com/vuejs/vue-router/blob/dev/examples/lazy-loading/app.js#L8

var req = JSON.parse(localStorage.getItem('roles'));
var back = {
  accountInformation: "myInfo",  //账户信息
  allConsumers: true, // 全部
  changePassword: "changePassword", //密码修改
  deviceOperations: "operative", //设备运营
  deviceServices: "service", // 设备服务
  ipManagement: true, //IP管理
  points: true, // 积分
  pointsMall: "IntegralMall", // 积分商城
  productsManagementy: false, //景品管理
  rechargeManagement: true, //充值管理
  storeManagement: true, //店铺管理
  ticketManagement: true, // 卡券管理
  userList: true, //用户列表
  userOperationLog: true //用户操作日志
}

function transfrom(api) { //前台API转成后台
  switch(api){
    case "operative":
      return "deviceOperations";
    case "service":
      return "deviceServices";
    case "sceneList":
      return "productsManagementy";
    case "list":
      return "ipManagement";
    case 'customerList':
      return "allConsumers";
    case 'customerList':
      return "allConsumers";
    case 'integralMall':
    return "pointsMall";
    case 'integralManagement':
      return "points";
    case 'recharge':
      return "rechargeManagement";
    case 'card':
    return "ticketManagement";
    case 'userList':
    return "userList";
    case 'operationLog':
      return "userOperationLog";
    case 'store':
      return "storeManagement"
  }
}
export default (api) =>{
 // console.log(req)
  if(req){
    return !req[transfrom(api)]
  }else{
    return true;
  }
}
