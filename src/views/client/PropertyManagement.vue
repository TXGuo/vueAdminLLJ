<template>
    <div>
        <el-row class="account">
            <el-col>登录账号：{{userName}}</el-col>
        </el-row>
        <div class="wrap-A">
            <h1 class="title-A">功能权限设置</h1>
            <el-form>
                <el-row :gutter="20">
                    <el-col :span="4" v-for="(item,index) in cityOptions" :key="item.id">
                        <el-form-item>
                            <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.checkAll" :name="item.id"
                                         @change="handleCheckAllChange">
                                {{item.title}}
                            </el-checkbox>
                            <el-checkbox-group v-model="item.checkedArr" :id="index">
                                <el-checkbox @change="handleCheckedCitiesChange" class="checkbox"
                                             v-for="(city,index) in item.list" :name="item.id" :label="city.params"
                                             :key="index">
                                    {{city.title}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <h1 class="title-A">门店权限设置</h1>
        <div class="wrap-B">
            <!--<el-row :gutter="20">-->
                <!--<el-col class="el-col" :span="24" v-for="item in cities">-->
                    <!--&lt;!&ndash;<div class="city-A">{{item.title}}</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-checkbox class="shop-list" v-for="(city,index) in item.list" :label="city.title" :key="index">&ndash;&gt;-->
                        <!--&lt;!&ndash;{{city}}&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-checkbox>&ndash;&gt;-->
                <!--</el-col>-->
            <!--</el-row>-->

            <h1>待定</h1>
        </div>
        <el-row class="btn-A">
            <el-button type="primary" @click="submitData">确 定</el-button>
            <el-button @click="close">取 消</el-button>
        </el-row>
    </div>
</template>

<style scoped lang="scss" type="text/scss">
    .checkbox {
        display: block;
        margin-left: 30px;
    }

    .account {
        line-height: 50px;
        background-color: #ddd;
        margin: -20px -20px 0 -20px;
        padding: 0 20px;
    }

    .title-A {
        font-size: 20px;
        font-weight: bold;
    }

    .wrap-A {
        .el-row {
            margin: 20px;
        }
        .el-col {
            border-radius: 5px;
            height: 140px;
            background-color: #fff;
            padding: 10px 12px;
            margin: 0 20px 20px 20px;
            border: 1px solid #999;
        }
    }

    .wrap-B {
        background-color: #FFFFFF;
        padding: 10px;
        margin: 20px 6% 0 12px;
        border: 1px solid #999;
        border-radius: 5px;
        .el-row {
            .el-col {
                margin-bottom: 15px;
                padding: 10px 12px;
            }
        }
        .city-A {
            margin-bottom: 5px;
        }

        .shop-list {
            min-width: 150px;
        }

    }

    .btn-A {
        margin: 18px 12px;
    }
</style>

<script>
  const cityOptions1 = [
    {
      id: '0',
      title: "客户管理",
      params: "",
      list: [
        {
          title: '全部客户',
          params: "allConsumers"
        },
        {
          title: '积分',
          params: "points"
        },
        {
          title: '积分商城',
          params: "pointsMall"
        }],
      checkedArr: [],
      isIndeterminate: false,
      checkAll: false
    },
    {
      id: '1',
      title: "门店管理",
      params: "storeManagement",
      list: [],
      checkedArr: [],
      isIndeterminate: false,
      checkAll: false
    },
    {
      id: '2',
      title: "IP管理",
      params: "ipManagement",
      list: [],
      checkedArr: [],
      isIndeterminate: false,
      checkAll: false
    },
    {
      id: '3',
      title: "景品管理",
      params: "productsManagement",
      list: [],
      checkedArr: [],
      isIndeterminate: false,
      checkAll: false
    },
    {
      id: '4',
      title: "设备管理",
      params: "",
      list: [
        {
          title: '设备服务管理',
          params: "deviceServices"
        },
        {
          title: '设备运营管理',
          params: "deviceOperations"
        }],
      checkedArr: [],
      isIndeterminate: false,
      checkAll: false
    },
    {
      id: '5',
      title: "运营管理",
      params: "",
      list: [
        {
          title: '充值管理',
          params: "rechargeManagement"
        },
        {
          title: '卡券管理',
          params: "ticketManagement"
        }],
      checkedArr: [],
      isIndeterminate: false,
      checkAll: false
    },
    {
      id: '6',
      title: "用户管理",
      params: "",
      list: [
        {
          title: '用户列表',
          params: "userList"
        },
        {
          title: '用户操作日志',
          params: "userOperationLog"
        }],
      checkedArr: [],
      isIndeterminate: false,
      checkAll: false
    },
    // {
    //   id: '7',
    //   title: "数据中心",
    //   params: "",
    //   list: [
    //     {
    //       title: '基础数据看板',
    //       params: "userList"
    //     },
    //     {
    //       title: '数据分析看板',
    //       params: "userOperationLog"
    //     }],
    //   checkedArr: [],
    //   isIndeterminate: false,
    //   checkAll: false
    // }
  ];
  // var obj = {
  //   allConsumers: true,
  //   points: false,
  //   pointsMall: false,
  //   deviceServices: false,
  //   deviceOperations: false,
  //   rechargeManagement: false,
  //   ticketManagement: false,
  //   userList: false,
  //   userOperationLog: false,
  //   accountInformation: false,
  //   changePassword: false,
  //   storeManagement: false,
  //   productsManagementy: false,
  //   ipManagement: true
  // }

  export default {
    data() {
      return {
        userName:'未获取到登录账号',
        cities: [
          {
            title: "北京",
            list: ['北京三里屯', '北京三里屯']
          },
          {
            title: "北京",
            list: ['北京三里屯', '北京三里屯']
          }
        ],
        cityOptions: cityOptions1,
        obj: null,
        checkAll: false,
        checkedArr: [],
        isIndeterminate: true,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      loadData(){
        var id = this.$route.params.userId + '/atuh',
            _this = this;
        this.$api.client.isDisable(id).then((data) => {
          let res = data.data;
          if (res.status === "SUCCESS") {
            var obj = res.data.permissio;
            this.obj = obj;
            for (var j = 0; j < cityOptions1.length; j++) {
              for (var i in obj) {
                if (cityOptions1[j].params) {
                  if (cityOptions1[j].params == i && obj[i] == true) {
                    cityOptions1[j].checkedArr.push(cityOptions1[j].params)
                    cityOptions1[j].checkAll = true;
                  }else if(cityOptions1[j].params == i && obj[i]==false){
                    cityOptions1[j].checkedArr.shift();
                    cityOptions1[j].checkAll = false;
                  }
                } else {
                  for (var k = 0; k < cityOptions1[j].list.length; k++) {
                    if (i == cityOptions1[j].list[k].params && obj[i] == true) {
                      cityOptions1[j].checkedArr.push(i);
                      cityOptions1[j].isIndeterminate = true;
                      if (cityOptions1[j].checkedArr.length === cityOptions1[j].list.length) {
                        cityOptions1[j].checkAll = true;
                        cityOptions1[j].isIndeterminate = false;
                      }
                    }else if(i == cityOptions1[j].list[k].params && obj[i] == false){
                      cityOptions1[j].checkedArr.splice(i,1);
                      cityOptions1[j].isIndeterminate = false;
                      cityOptions1[j].checkAll = false;
                    }
                  }
                }
              }
            }
            _this.cityOptions = cityOptions1;
            console.log(_this.cityOptions)
          } else {
            console.log('出111错了')
          }
        }).catch(() => {
          console.log('HTTP出错了')
        })
      },
      submitData() {
        var obj = {},
            postData = this.obj,
            id = this.$route.params.userId + "/atuh";
        for (var i = 0; i < this.cityOptions.length; i++) {
          for (var j = 0; j < this.cityOptions[i].checkedArr.length; j++) {
            obj[this.cityOptions[i].checkedArr[j]] = true;
          }
        }
        Object.assign(postData,obj);
        var obj = {
          id:0,
          permissio:postData
        }
        this.$api.client.change(id,obj).then(function(data){
          var res = data.data;
          if(res.status === "SUCCESS"){
            this.loadData()
          }
        }.bind(this)).catch(()=>{
          console.log('http')
        })
      },
      close() {
        this.$router.back(-1)
      },
      handleCheckAllChange(val) {
        //1. 获取点击的index下标志 2.点击某一个复选框的时候  判断点击的是否有二级菜单的数据 获取当前复选框的值
        var index = +event.target.name;
        if (this.cityOptions[index].params) {//如果当前点击的是单个菜单的时候
          let params = this.cityOptions[index].params;
          this.cityOptions[index].checkedArr = [];
          val == true ? this.cityOptions[index].checkedArr.push(params) : [];
        } else {
          if (val) {
            for (var i = 0; i < cityOptions1[index].list.length; i++) {
              this.cityOptions[index].checkedArr.push(cityOptions1[index].list[i].params)
            }
          } else {
            this.cityOptions[index].checkedArr = []
          }
        }
        this.cityOptions[index].isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        var index = +event.target.name;
        var checkedArr = this.cityOptions[index].checkedArr.length,
            list = this.cityOptions[index].list.length;
        this.cityOptions[index].checkAll = checkedArr === list
        this.cityOptions[index].isIndeterminate = checkedArr > 0 && checkedArr < list
      }
    },
    created(){
      this.userName = this.$route.params.userName;
    },
    mounted() {
      this.loadData();
    }
  };
</script>
