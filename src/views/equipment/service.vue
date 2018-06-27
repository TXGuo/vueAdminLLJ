<template>
    <div class='service'>
        <el-tabs type="border-card">
            <el-tab-pane label="已激活设备列表">
                <!--<h2>已激活设备列表</h2>-->
                <el-row>
                    <el-button type="primary" icon="el-icon-edit" class="lf" @click="$router.push({path:'./active'})">
                        激活设备
                    </el-button>
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                        <el-button size="small" type="primary">批量激活</el-button>
                    </el-upload>
                </el-row>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="设备ID">
                        <el-input v-model="formInline.deviceId" placeholder="请输入设备ID"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="formInline.type" placeholder="全部">
                            <el-option label="正常" :value="1"></el-option>
                            <el-option label="离线" :value="2"></el-option>
                            <el-option label="全部" :value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" icon="el-icon-search">搜索</el-button>
                    </el-form-item>
                </el-form>
                <div class="table">
                    <el-table border :data="tableData" style="width: 100%">
                        <el-table-column align="center" prop="Id" label="序号" width="180"></el-table-column>
                        <el-table-column align="center" prop="DeviceId" label="设备主板ID" width="180"></el-table-column>
                        <el-table-column align="center" prop="Status" label="状态">
                            <template slot-scope="scoped">
                                <span>{{scoped.row.Status == 1?'正常':'离线'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="Type" label="设备类型">
                            <template slot-scope="scoped">
                                <span>{{scoped.row.Type == 1?'标准机':scoped.row.Type==2?'迷你机':scoped.row.Type==3?'双人机':'大爪机'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="Store" label="所在门店"></el-table-column>
                    </el-table>
                </div>
                <div class="pagination">
                    <el-pagination background layout="total,prev, pager, next" :total="total"
                                   :current-page='currentPage' :page-size="params.perpage"
                                   @current-change="handleCurrentChange"></el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="scss">
    .service {

    .lf {
        float: left;
    }

    h2 {
        margin: 10px 0;
    }

    .upload-demo {
        display: inline-block;
        width: 50%;
        margin-left: 20px;
    }

    .demo-form-inline {
        margin: 20px 0;
    }

    .pagination {
        margin-top: 20px;
        float: right;
    }

    }

    .el-upload-list__item:first-child {
        margin: 0;
    }
</style>

<script>
  export default {
    data() {
      return {
        fileList: [],
        input: "",
        formInline: {
          deviceId: '',
          type: ''
        },
        tableData: [],
        currentPage: 1,
        total: 0,
        params: {
          page: 1,
          perpage: 10,
          status: 1
        },
      };
    },
    mounted() {
      this.getActiveLists(this.params)
    },
    methods: {
      onSubmit() {
        console.log(this.formInline)
        var params = {
          ...this.params,
          ...this.formInline
        }
        console.log(params)
        this.getActiveLists(params)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.params.page = val;
        this.getDeviceList(this.params)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        var params = {
          page: val,
          perpage: this.params.perpage,
          status: this.params.status
        }
        this.getActiveLists(params);
      },
      getActiveLists(params) {
        console.log(params)
        this.$api.equipment.get({params})
            .then((res) => {
              if (res.data.status == 'SUCCESS') {
                console.log(res.data.data)
                this.tableData = [];
                var pagination = res.data.data.pagination; //分页相关信息
                var lists = res.data.data.devices; //列表
                this.total = pagination.total;
                this.tableData.push(...lists)
              }
            })
      }
    }
  };
</script>
