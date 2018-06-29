<template>
    <div>
        <div class="wrap">
            <el-tabs type="border-card">
                <el-tab-pane label="基本筛选">
                    <el-form :style="{ height: operation?'100px':'200px'}" ref="formInline" :rules="rules"
                             :inline="true"
                             :model="formInline" class="demo-form-inline">
                        <!--<h1 class="title-A">基本筛选</h1>-->
                        <el-form-item label="客户ID:" prop="userId">
                            <el-input v-model="formInline.userId" placeholder="请输入客户ID"></el-input>
                        </el-form-item>
                        <el-form-item label="客户昵称:">
                            <el-input v-model="formInline.nickname" placeholder="请输入客户昵称"></el-input>
                        </el-form-item>
                        <el-form-item label="状态:">
                            <el-select v-model="formInline.status" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.id"
                                        :label="item.title"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <br>
                        <h1 class="title-A"> 高级筛选</h1>
                        <el-form-item label="消费区间(币):">
                            <el-col :span="11">
                                <el-form-item prop="priceStart">
                                    <el-input class="search-input" v-model="formInline.priceStart"
                                              placeholder="0"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                -
                            </el-col>
                            <el-col :span="11">
                                <el-form-item prop="priceEnd">
                                    <el-input class="search-input" v-model="formInline.priceEnd"
                                              placeholder="不限"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="消费时间">
                            <el-date-picker class="date-picker"
                                            v-model="formInline.dateStart"
                                            align="right"
                                            type="date"
                                            placeholder="选择日期"
                                            :picker-options="pickerOptions1">
                            </el-date-picker>
                            -
                            <el-date-picker class="date-picker"
                                            v-model="formInline.dateEnd"
                                            align="right"
                                            type="date"
                                            placeholder="选择日期"
                                            :picker-options="pickerOptions1">
                            </el-date-picker>
                        </el-form-item>
                        <br>
                        <el-form-item label="抓物总数(个):">
                            <el-col :span="11">
                                <el-form-item prop="numStart">
                                    <el-input class="search-input" v-model="formInline.numStart"
                                              placeholder="0"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="numEnd">
                                    <el-input class="search-input" v-model="formInline.numEnd"
                                              placeholder="不限"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <br>
                    </el-form>
                    <br>
                    <el-form :inline="true">
                        <el-form-item>
                    <span slot="label" @click="foldPanel">{{operation?"更多":"收起"}} <span
                            :class="[operation ? 'el-icon-arrow-down':'el-icon-arrow-up']"></span></span>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('formInline')">
                                搜索
                            </el-button>
                        </el-form-item>
                    </el-form>
                    <el-tabs type="card">
                        <el-tab-pane label="客户列表">
                            <div class="block">
                                <el-button type="primary" @click="userHandle('add')">
                                    加入黑名单
                                </el-button>
                                <el-button type="">
                                    导出Excel
                                </el-button>
                            </div>
                            <el-table border align="center"
                                      ref="multipleTable"
                                      :data="tableData"
                                      tooltip-effect="dark"
                                      style="width: 100%"
                                      @selection-change="handleSelectionChangeTable1">
                                <el-table-column
                                        type="selection">
                                </el-table-column>
                                <el-table-column
                                        prop="date"
                                        label="客户ID"
                                        align="center"
                                >
                                    <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                                </el-table-column>
                                <el-table-column
                                        prop="Nickname"
                                        label="微信昵称"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        label="头像"
                                        align="center">
                                    <template slot-scope="scope">
                                        <img class="user-title"
                                             src="https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=1a3d82d42f2dd42a4b0409f9625230d0/314e251f95cad1c86a912b9a753e6709c93d5161.jpg"
                                             alt="">
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="registerDate"
                                        label="称号"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="RegistrationTime"
                                        label="注册时间"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="LastLoginTime"
                                        label="最近消费时间"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="PhoneNumber"
                                        label="绑定手机号"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        align="center">
                                    <template slot-scope="scope">
                                        <router-link to="/customer/accountDetail/12">
                                            <el-button type="text" size="small">账户明细</el-button>
                                        </router-link>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <br>
                            <!--<Pagination :metadata="pagination" @paginated="paginated"></Pagination>-->
                        </el-tab-pane>
                        <el-tab-pane label="黑名单">
                            <div class="block">
                                <el-button type="primary" @click="userHandle('remove')">
                                    移除黑名单
                                </el-button>
                                <el-button type="">
                                    导出Excel
                                </el-button>
                            </div>
                            <el-table border align="center"
                                      ref="multipleTable"
                                      :data="tableData"
                                      tooltip-effect="dark"
                                      style="width: 100%"
                                      @selection-change="handleSelectionChangeTable2">
                                <el-table-column
                                        type="selection">
                                </el-table-column>
                                <el-table-column
                                        prop="date"
                                        label="客户ID"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="微信昵称"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        label="头像"
                                        align="center">
                                    <template slot-scope="scope">
                                        <img class="user-title"
                                             src="https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=1a3d82d42f2dd42a4b0409f9625230d0/314e251f95cad1c86a912b9a753e6709c93d5161.jpg"
                                             alt="">
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="registerDate"
                                        label="称号"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="phone"
                                        label="注册时间"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="power"
                                        label="最近消费时间"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="department"
                                        label="绑定手机号"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        align="center">
                                    <template slot-scope="scope">
                                        <router-link to="/customer/accountDetail/12">
                                            <el-button type="text" size="small">账户明细</el-button>
                                        </router-link>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <br>
                          <el-pagination  @current-change="handleCurrentChange" :page-size="20" background  :total="this.pageNation.total"  layout="prev, pager, next,jumper" v-if="this.pageNation.total>20">
                          </el-pagination>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
            </el-tabs>
        </div>
        <br>
    </div>
</template>

<style scoped lang="scss" type="text/scss">
  .el-pagination{
    width:700px;
    float:right;
    margin-top:20px;
    text-align:right;
  }
    .title {
        font-size: 24px;
        text-align: center;
    }

    .el-form {
        overflow: hidden
    }

    .title-A {
        font-size: 20px;
        padding: 10px 0;
    }

    .user-title {
        width: 64px;
        height: 64px;
    }

    .search-input {
        width: 66px;
        text-align: center;
    }

    .date-picker {
        width: 150px
    }
</style>

<script>
  // import Pagination from '../../components/ui/Pagination' //分页组件

  export default {
    data() {
      return {
        operation: true,//收起展开的开关
        params: {
          page:1,
          perpage:20
        },
        pageNation:{
        },
        search: {//搜索条件
          userId: '',
          nickname: '',
          status: '',
          // totalGrip:''
        },
        formInline: {//输入框组件需要的变量
          nickname: '',
          userId: '',
          status: '',
          // totalGrip:''
          // priceStart: '',
          // priceEnd: '',
          // numStart: '',
          // numEnd: '',
          // dateStart: '',
          // dateEnd: ''
        },
        options: [{
          id: "0",
          title: '正常',
        }, {
          id: "1",
          title: '黑名单'
        }],
        tableData: [],
        multipleSelection: {//table表格存储选中状态的
          userListActive: [],
          blackListActive: []
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        rules: {//搜索框验证规则
          userId: [
            {
              pattern: /^[0-9]*$/,
              message: '请输入数字'
            }
          ],
        }
      }
    },
    methods: {
      loadData(page) {
        if (page) {
          this.params.page = page;
        }
        if (!(JSON.stringify(this.search) == "{}")) {
          this.params = Object.assign(this.params, this.search);
          console.log(this.params)
        }
        this.$api.customer.getList({params: this.params})
            .then((res) => {
              var res = data.data;
              if (res.status == 'SUCCESS') {
                this.pageNation = res.data.pagination;
                this.tableData = res.data.consumers;
              }
              console.log(res)
            })
            .catch(() => {
            })
      },
      handleCurrentChange(val){
        this.loadData(val);
      },
      submitForm(formName) {
        console.log(this.formInline)
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      },
      userHandle(status) {//加入黑名单 status=add,移除黑名单事件 status=remove
        let list = this.multipleSelection;
        switch (status) {
          case 'add':
            if (!list.userListActive.length) {
              this.prompt('请您选择一位用户进行操作', 'warning')
              return;
            }
            break;
          case 'remove':
            if (!list.blackListActive.length) {
              this.prompt('请您选择一位用户进行操作', 'warning')
              return;
            }
            break;
        }
      },
      paginated(page) {
        // alert("当前页码" + page)
        this.pagination.page = page;
        console.log(page)
      },
      refreshList(selectData) { //查询条件
        console.log("查询条件为 " + selectData)
      },
      handleSelectionChangeTable1(val) {//table复选框事件 客户列表
        let userListActive = this.multipleSelection.userListActive = [];
        for (let i = 0, j = val.length; i < j; i++) {
          let id = val[i].id;
          userListActive.push(1)
        }
        console.log(userListActive, '客户列表')
      },
      handleSelectionChangeTable2(val) {//table复选框事件 黑名单
        let blackListActive = this.multipleSelection.blackListActive = [];
        for (let i = 0, j = val.length; i < j; i++) {
          let id = val[i].id;
          blackListActive.push(1)
        }
        console.log(blackListActive, '黑名单')
      },
      prompt(message, type) {//信息公共弹框
        this.$message({
          message: message,
          type: type,
          duration: 1500
        });
      },
      toast(content, title, type, successCallback, errorCallback) {
        this.$confirm(content, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: type
        }).then(successCallback).catch(errorCallback);
      },
      selectData() {
        var formInline = this.formInline;
        if (!formInline.user.trim() && !formInline.userId.trim() && !formInline.phone.trim()) {
          console.log('条件为空,不能进行查询');
          this.prompt('请输入搜索条件', 'warning')
          return false;
        }
        console.log('开始查询')
      },
      foldPanel() {
        this.operation = !this.operation
      }
    },
    mounted() {
      this.loadData();
    },
    components: {
      // Pagination,
    }
  }
</script>
