<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="用户列表">
                <div class="wrap">
                    <div class="block">
                        <el-button type="primary" @click="jump(1)" icon="el-icon-circle-plus">
                            新建用户
                        </el-button>
                        <!--<el-button type="">-->
                            <!--批量新建-->
                        <!--</el-button>-->
                        <el-button type="warning" @click="jump(2)">
                            权限管理
                        </el-button>
                        <el-button type="info" @click="handleOperate(1)">
                            禁用
                        </el-button>
                        <el-button type="success" @click="handleOperate(2)">
                            启用
                        </el-button>
                        <el-button type="danger" @click="handleOperate(3)">
                            删除
                        </el-button>
                        <!--<el-button>-->
                            <!--导出Excel-->
                        <!--</el-button>-->
                    </div>
                    <search-components @refreshList="refreshList" @click="selectData"></search-components>
                    <el-table border align="center"
                              ref="multipleTable"
                              :data="tableData3"
                              tooltip-effect="dark"
                              style="width: 100%"
                              @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection">
                        </el-table-column>
                        <el-table-column
                                prop="username"
                                label="登录ID"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="用户名"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="createTime"
                                label="注册时间"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="phone"
                                label="手机号码"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="superAdmin"
                                label="系统权限"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="department"
                                label="所属部门"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="position"
                                label="职位"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="状态"
                                :formatter="formatRole"
                                align="center">
                        </el-table-column>
                    </el-table>
                  <el-pagination  @current-change="handleCurrentChange" :page-size="20" background  :total="this.pageNation.total"  layout="prev, pager, next,jumper" v-if="this.pageNation.total>20">
                  </el-pagination>
                </div>
                <br>
                <!--<Pagination :metadata="pagination" @paginated="paginated"></Pagination>-->
            </el-tab-pane>
        </el-tabs>
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
  import SearchComponents from './SearchComponents' //查询组件

  export default {
    components: {
      // Pagination,
      SearchComponents
    },
    data() {
      return {
        pagination: {},
        timeStart: null,
        timeEnd: null,
        products: null,
        params: {
          page:1,
          perpage:20
        },
        pageNation:{
        },
        params1:{},
        tableData3: [],
        multipleSelection: []
      }
    },

    methods: {
      userEdit(event){ // 跳转到用户编辑页面 id=0 新增 id!=0 编辑
        this.$router.push('/client/addUser/' + event.Id);
      },
      loadData(page){
        if(page){
          this.params.page = page
        }
        if(!(JSON.stringify(this.params1) == "{}")){
          this.params = Object.assign(this.params, this.params1);
          console.log(this.params)
        }
        this.$api.client.getList({params:this.params}).then((data) => {
          let res = data.data;
          if (res.status === "SUCCESS") {
            let users = res.data.users;
            this.tableData3 = users;
            this.pageNation = res.data.pagination
          } else {
            console.log('出错了')
          }
        }).catch(() => {
          console.log('HTTP出错了1111')
        })
      },
      handleCurrentChange(val){
        // this.params.page=val;
        this.loadData(val);
      },
      paginated(page) {
        this.loadData(page)
      },
      refreshList(selectData) { //查询条件
        console.log(selectData);
        this.params1 = selectData;
        this.loadData(1);
      },
      jump(index) {//跳转到新增用户页面 index:1 新增用户页面 index: 权限管理页面
        var url = null;
        if (index == 1) {
          url = '/client/addUser/0';
        } else if (index == 2) {
          let arr = this.multipleSelection;
          if (!arr.length || arr.length > 1) {
            this.prompt('请您选择一位用户,进行操作', 'warning');
            return;
          }
          url = '/client/propertyManagement/' + arr[0].id + '/'+ arr[0].Username
        }
        this.$router.push(url);
      },
      handleSelectionChange(val) {//table复选框事件
        this.multipleSelection = [];
        for (let i = 0, j = val.length; i < j; i++) {
          let id = val[i].Id;
          this.multipleSelection.push({id:id,Username:val[i].Username})
        }
        console.log(this.multipleSelection)
      },
      handleOperate(index) {// type: 1 禁用 2 启用 3 删除
        let id = this.multipleSelection[0],//获取选择用户列表id
            promptTitle = '',
            content = '',
            type="";
        if (!id) {
          this.prompt('请您选择用户,进行操作吗？', 'warning');
          return;
        }
        switch (index) {
          case 1:
            content = '确定要执行禁用操作吗？';
            id += '/disable';
            break;
          case 2:
            content = '确定要执行启用操作吗？';
            id += '/enabled';
            break;
          case 3:
            content = '删除操作将不可恢复！确定要执行删除操作吗？';
            type = 1;
            break;
        }
        this.toast(content, '提示', 'warning', () => {
                if(type == 1){
                  this.del(id)
                }else{
                  this.isDisable(id)
                }
            }, () => {
                // alert(111)
            })
      },
      isDisable(id){
        this.$api.client.isDisable(id).then((data) => {
          let res = data.data;
          if (res.status === "SUCCESS") {
            console.log(this.params)
            this.loadData()
          } else {
            console.log('出111错了')
          }
        }).catch(() => {
          console.log('HTTP出错了')
        })
      },
      del(id){
        this.$api.client.del(id).then((data) => {
          let res = data.data;
          if (res.status === "SUCCESS") {
            this.loadData();
          } else {
            console.log('出错了')
          }
        }).catch(() => {
          console.log('HTTP出错了')
        })
      },
      prompt(message, type) {//信息公共弹框
        this.$message({
          message: message,
          type: type,
          center: true,
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
      formatRole(row, column) {
        return row.Status==1 ? "启用" : "禁用";
      }
    },
    mounted() {
      this.loadData()
      // console.log(this.$router)
    }
  }
</script>
