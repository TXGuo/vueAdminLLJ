<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="基本筛选">
                <div class="wrap">
                    <div>
                        <el-form :inline="true" ref="formInline" :model="formInline"
                                 class="demo-form-inline">
                            <el-form-item label="用户名:">
                                <el-input v-model="formInline.username" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item label="模块名称:">
                                <el-select v-model="formInline.modelName" clearable filterable placeholder="请选择">
                                    <el-option
                                            v-for="item in moduleList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="selectData('formInline')">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <el-table border align="center"
                              ref="multipleTable"
                              :data="tableData"
                              tooltip-effect="dark"
                              style="width: 100%">
                        <el-table-column
                                prop="username"
                                label="用户名"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="modelName"
                                label="模块名称"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="operation"
                                label="操作"
                                align="center"
                                width="500">
                        </el-table-column>
                        <el-table-column
                                prop="createTime"
                                label="时间"
                                align="center">
                        </el-table-column>
                    </el-table>
                </div>
                <br>
                <pagination :metadata="pagination" @paginated="paginated"></pagination>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style scoped lang="scss" type="text/scss">

</style>
<script>
  import Pagination from '../../components/ui/Pagination'
  export default {
    data() {
      return {
        pagination: {},
        params: {
          page: 1,
          perpage: 10
        },
        formInline: {//输入框组件需要的变量
          username: '',
          modelName: ''
        },
        tableData: [],
        moduleList: [{
          value: 'user',
          label: '用户列表'
        }, {
          value: 'name',
          label: '门店管理'
        }, {
          value: 'war',
          label: '门店管理'
        }],
        moduleVal: ''
      }
    },
    methods: {
      loadData(page) {
        if (page) {
          this.params.page = page;
        }
        if(!(JSON.stringify(this.formInline) == "{}")){
          this.params = Object.assign(this.params, this.formInline);
          // console.log(this.params)
        }
        this.$api.client.getLogs({params: this.params}).then((data) => {
          var res = data.data;
          if (res.status == 'SUCCESS') {
            this.tableData = res.data.accessLog;
            this.pagination = res.data.pagination;
          } else {
            this.$message({
              message: '获取数据失败',
              type: 'error'
            })
          }
        }).catch(() => {
          this.$message({
            message: '发生错误',
            type: 'error'
          })
        })
      },
      paginated(page) {//翻页
        this.loadData(page)
      },
      selectData() {//搜索
        var formInline = this.formInline;
        if (!formInline.username.trim() && !formInline.modelName.trim()) {
          this.$message({
            message: '请您输入搜索条件',
            type: 'warning',
            duration: 1500
          });
          return;
        }
        this.loadData();
      }
    },
    mounted() {//页面初始化
      this.loadData()
    },
    components: {//组件
      Pagination
    }
  }
</script>
