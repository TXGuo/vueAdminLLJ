<template>
    <div>
        <div class="wrap">
            <h1 class="title-A">账户预览</h1>
            <div class="wrap-A">
                <el-row class="row-bg">
                    <el-col :span="3">
                        <div class="content-left">
                            <img class="user-img"
                                 :src="userData.avatarUrl"
                                 alt="用户头像加载失败">
                            <ul class="user-info">
                                <li><span>客户 ID：</span> {{userData.id}}</li>
                                <li><span>客户昵称:</span> {{userData.nickname}}</li>
                            </ul>
                        </div>
                    </el-col>
                    <el-col :span="20" :offset="1">
                        <div class="content-right">
                            <el-row :gutter="10" type="flex" justify="center">
                                <el-col :span="9">
                                    <p>账户总余额：{{userData.balance + userData.extraBalance}}（币）</p>
                                    <p>账户充值余额：{{userData.balance}}（币）</p>
                                    <p>账户赠送余额：{{userData.extraBalance}}（币）</p>
                                </el-col>
                                <el-col :span="10">
                                    <p>累计充值：{{userData.totalRmb}}（元）</p>
                                    <p>累计充值获币：{{userData.totalBalanc}}（币）4</p>
                                    <p>累计赠送获币：{{userData.totalExtraBalance}}（币）</p>
                                </el-col>
                                <el-col :span="5">
                                    <p>积分余额：{{userData.storePoints}}</p>
                                    <p>总抓物数：{{userData.totalGrip}}</p>
                                    <p>已兑换卡券：{{userData.totalTicket}}</p>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-form :inline="true"
                     :model="formInline" class="demo-form-inline">
                <h1 class="title-A">账户详情</h1>
                <!--分类选择-->
                <el-form-item label="分类选择:">
                    <el-select @change="selectTable('changeTab')" v-model="changeTab.tabIndex"
                               placeholder="changeTab.tabIndex">
                        <el-option
                                v-for="item in changeTab.list"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item label="日期选择:">
                    <el-date-picker style="width: 150px"
                                    value-format="timestamp"
                                    v-model="formInline.startTime"
                                    type="datetime"
                                    placeholder="不限">
                    </el-date-picker>
                    -
                    <el-date-picker style="width: 150px"
                                    value-format="timestamp"
                                    v-model="formInline.endTime"
                                    type="datetime"
                                    placeholder="不限">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="抓取状态:">
                    <el-select v-model="formInline.status" placeholder="请选择">
                        <el-option
                                v-for="item in status.list"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="模式:">
                    <el-select v-model="formInline.pattern" placeholder="请选择">
                        <el-option
                                v-for="item in model.list"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchData">
                        搜索
                    </el-button>
                </el-form-item>
            </el-form>
            <!--消费及抓物明细-->
            <el-tabs type="border-card"  @tab-click="handleClick" v-show="changeTab.tabIndex==1">
                <el-tab-pane value="1" label="消费明细">
                    <div class="block">
                        <el-button type="">
                            导出Excel
                        </el-button>
                        &nbsp;&nbsp;
                        <span slot="label"><span class="el-icon-question"></span> 列表默认显示最近7天的数据</span>
                    </div>
                    <el-table align="center"
                              ref="multipleTable"
                              :data="tableData.table1"
                              tooltip-effect="dark"
                              style="width: 100%"
                              @selection-change="handleSelectionChange">
                        <!--<el-table-column-->
                        <!--type="selection">-->
                        <!--</el-table-column>-->
                        <el-table-column
                                prop="date"
                                label="消费时间"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="所在门店"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="设备编号"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="registerDate"
                                label="模式"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="phone"
                                label="消费币"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="power"
                                label="抓物数量"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="department"
                                label="抓物名称"
                                align="center">
                        </el-table-column>
                    </el-table>
                    <br>
                    <!--<Pagination :metadata="pagination.p1" @paginated="paginated"></Pagination>-->
                </el-tab-pane>
                <el-tab-pane value="2" label="充值明细">
                    <div class="block">
                        <div class="block">
                            <el-button type="">
                                导出Excel
                            </el-button>
                            &nbsp;&nbsp;
                            <span slot="label"><span class="el-icon-question"></span> 列表默认显示最近7天的数据</span>
                        </div>
                    </div>
                    <el-table align="center"
                              ref="multipleTable"
                              :data="tableData.table2"
                              tooltip-effect="dark"
                              style="width: 100%"
                              @selection-change="handleSelectionChange">
                        <!--<el-table-column-->
                        <!--type="selection">-->
                        <!--</el-table-column>-->
                        <el-table-column
                                prop="date"
                                label="客户ID"
                                align="center">
                            <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="微信昵称"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="称号"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="registerDate"
                                label="注册时间"
                                align="center">
                        </el-table-column>
                    </el-table>
                    <br>
                    <Pagination :metadata="pagination.p2" @paginated="paginated"></Pagination>
                </el-tab-pane>
            </el-tabs>
            <!--积分明细-->
            <el-tabs type="border-card" v-show="changeTab.tabIndex==2">
                <el-tab-pane label="积分消费">
                    <div class="block">
                        <span slot="label"><span class="el-icon-question"></span> 列表默认显示最近7天的数据</span>
                    </div>
                    <el-table align="center"
                              ref="multipleTable"
                              :data="tableData.table3"
                              tooltip-effect="dark"
                              style="width: 100%"
                              @selection-change="handleSelectionChange">
                        <el-table-column
                                prop="date"
                                label="时间"
                                align="center"
                        >
                            <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="消费积分"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="兑换数量"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="registerDate"
                                label="景品名称"
                                align="center">
                        </el-table-column>
                    <br>
                    </el-table>
                    <Pagination :metadata="pagination.p3" @paginated="paginated"></Pagination>
                </el-tab-pane>
                <el-tab-pane label="积分获取">
                    <div class="block">
                        <span slot="label"><span class="el-icon-question"></span> 列表默认显示最近7天的数据</span>
                    </div>
                    <el-table align="center"
                              ref="multipleTable"
                              :data="tableData.table4"
                              tooltip-effect="dark"
                              style="width: 100%"
                              @selection-change="handleSelectionChange">
                        <el-table-column
                                prop="date"
                                label="时间"
                                align="center"
                        >
                            <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="签到"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="充值赠送"
                                align="center">
                        </el-table-column>
                    </el-table>
                    <br>
                    <Pagination :metadata="pagination.p4" @paginated="paginated"></Pagination>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style scoped lang="scss" type="text/scss">
    ul, li {
        list-style: none;
    }

    .title-A {
        font-size: 20px;
        padding: 10px 0;
    }

    .el-tabs .user-img {
        width: 64px;
        height: 64px;
    }

    .wrap-A {
        background-color: #eee;
        padding: 10px;
        .content-left {
            text-align: center;
            .user-img {
                width: 64px;
                height: 64px;
            }
            .user-info {
                text-align: left;
                width: 110px;
                margin: 0 auto;
            }
        }
        .content-right {
            background: #fff;
            padding: 10px 0 10px 80px;
            /*border: 1px solid red;*/
            p {
                /*height: 35px;*/
                /*line-height: 35px;*/
            }
            p:nth-child(2) {
                height: auto;
                /*border: 1px solid red;*/
                padding: 25px 0;
            }
        }
    }

    .title {
        font-size: 24px;
        text-align: center;
    }

    .filters {
        padding-bottom: 20px;
        input {
            min-height: 40px;
            width: 300px;
            margin-right: 10px;
        }

        button {
            margin-left: 10px;
            margin-top: 4px;
        }
    }
</style>

<script>
  // import Pagination from '../../components/ui/Pagination' //分页组件

  export default {
    data() {
      return {
        userData:{
          //账户总余额 balance + extraBalance
          extraBalance:'',//账户赠送余额
          totalRmb:'',//累计充值人民币
          totalBalanc:'',//累计充值获币
          totalExtraBalance:'',//累计赠送获币
          storePoints:'',//积分余额
          totalGrip:'',//总抓物数
          totalTicket:'',//已兑换卡券
          extraBalance:'',//赠送余额
          avatarUrl:'',//头像
          id:'',//客户id
          nickname:''//客户昵称
        },
        height: '60',
        operation: true,
        changeTab: {//分类选择默认变量
          list: [
            {
              id: 1,
              title: "消费及抓物明细"
            },
            {
              id: 2,
              title: "积分明细"
            }
          ],
          tabIndex: 1,//分类选择变量
        },
        status: {//抓取状态
          list: [
            {
              id:'3',
              title: "全部"
            },
            {
              id: '0',
              title: "未抓中"
            },
            {
              id: '1',
              title: "抓中"
            }
          ]
        },
        model: {//模式下拉框变量
          list: [
            {
              id: '0',
              title: "全部"
            },
            {
              id: '1',
              title: "正常模式"
            },
            {
              id: '3',
              title: "霸体模式"
            }
          ]
        },
        pagination:{
          p1:{"total": 300, "page": 1, "perPage": 20, "hasNext": false},
          p2:{"total": 300, "page": 1, "perPage": 20, "hasNext": false},
          p3:{"total": 300, "page": 1, "perPage": 20, "hasNext": false},
          p4:{"total": 300, "page": 1, "perPage": 20, "hasNext": false},
        },
        timeStart: null,
        timeEnd: null,
        products: null,
        formInline: {//输入框组件需要的变量
          status: '3',
          pattern: '0',
          endTime:'',
          startTime:''
        },
        id:'',//用户id
        value1: 1244561277787,
        tableData: {
          table1: [
            {//tab表格数据 消费明细
              id: 1,
              date: '2018-05-30 16:30:25',
              name: '北京三里屯店',
              address: '123456',
              registerDate: "正常",
              phone: "25",
              power: "1",
              department: "长草颜团子",
            }, {//tab表格数据 消费明细
              id: 2,
              date: '2018-06-01 11:20:34',
              name: '北京三里屯店',
              address: '123456',
              registerDate: "霸体",
              phone: "0",
              power: "0",
              department: "/",
            }
          ],
          table2: [
            {//tab表格数据 充值明细
              id: 1,
              date: '2018-05-30 16:10:02',
              name: '19',
              address: '100',
              registerDate: "0",
            }, {//tab表格数据 充值明细
              id: 1,
              date: '2018-05-30 16:10:02',
              name: '19',
              address: '100',
              registerDate: "0",
            }],
          table3: [
            {//tab表格数据 积分消费
              id: 1,
              date: '2018-05-30 16:15:02',
              name: '3000',
              address: '1',
              registerDate: "长草颜团子"
            }, {//tab表格数据 积分消费
              id: 2,
              date: '2018-06-01 11:20:34',
              name: '6000',
              address: '2',
              registerDate: "汉堡旱獭"
            }],
          table4: [
              {//tab表格数据 积分获取
            id: 1,
            date: '2018-05-30 16:15:02',
            name: '10',
            address: '20'
          }, {//tab表格数据 积分消费
            id: 2,
            date: '2018-06-01 11:20:34',
            name: '70',
            address: '0'
          }]
        },
        multipleSelection: [],
        search:{},
        params:{//消费明细翻页
          page:1,
          perpage:10
        },
        params1:{//充值明细翻页
          page:1,
          perpage:10
        },
        status:{
          status:0,
        },
        tabledata:{
          t1:[],//消费明细
          t2:[],//充值明细
          t3:[],//
          t4:[]//
        }
      }
    },

    methods: {
      loadData(page,status){
        if(page){
          this.params.page = page;
        }
        if(!JSON.stringify(this.search) == '{}'){
          if(status==0){//消费明细
            this.params = Object.assign(this.params, this.search);
            this.$api.client.getConsume(this.id,this.params)
                .then((res)=>{
                  if(res.data.stauts == 'SUCCESS'){
                    this.tabledata.t1 = res.data.data.consumerDetails;
                    this.consumer = res.data.data.consumer;
                    this.pagination.p1 = res.data.data.pagination
                  }
                })
                .catch(()=>{
                  this.$message({
                    message:'程序出错了。。。',
                    type:'error'
                  })
                })
          }else if(status==1){
            this.params1 = Object.assign(this.params1, this.search);
            this.$api.client.getRecharge(this.id,this.params)
                .then((res)=>{
                  if(res.data.stauts == 'SUCCESS'){
                    this.tabledata.t2 = res.data.data.rechargeDetails;
                    this.consumer = res.data.data.consumer;
                    this.pagination.p2 = res.data.data.pagination
                  }
                })
                .catch(()=>{
                  this.$message({
                    message:'程序出错了。。。',
                    type:'error'
                  })
                })
          }
        }
      },
      selectTable(data) {
        //下拉框选择事件 多个下拉框复用一个事件 把值拼接起来作为搜索条件
        console.log(this[data])
      },
      paginated(page) {
        // alert("当前页码" + page)
        this.pagination.page = page
        this.loadData()
      },
      handleSelectionChange(val) {//table复选框事件
        this.multipleSelection = [];
        for (let i = 0, j = val.length; i < j; i++) {
          let id = val[i].id;
          this.multipleSelection.push(id)
        }
        console.log(this.multipleSelection)
      },
      searchData(){
        console.log(this.formInline)
      },
      handleClick(tab,event){
        console.log(tab.paneName)
        this.status.status = tab.paneName;

      }
    },
    mounted() {
      this.id = this.$route.params.id;
    },
    components: {
      // Pagination
    }
  }
</script>
