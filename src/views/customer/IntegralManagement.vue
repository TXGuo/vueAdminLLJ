<template>
    <div class="wrap">
        <el-tabs type="border-card">
            <el-tab-pane label="签到积分管理">
                <div class="block">
                    <el-button type="primary" @click="jump('signAddPlane/0')" icon="el-icon-circle-plus">
                        新建方案
                    </el-button>
                </div>
                <h1 class="title">当前方案</h1>
                <el-row class="list-wrap">
                    <el-row :gutter="20">
                        <el-col class="col col-1" :xs="24" :sm="12" :md="8" :lg="6" :xl="4" :key="item.id"
                                v-for="item in plan" v-if="item.status==1">
                            <div class="list">
                                <p class="list-title">{{item.name}}</p>
                                <el-button @click="edit(item.id)" type="primary" size="mini" plain>编辑</el-button>
                                <el-button @click="del(item.id)" type="danger" size="mini">删除</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-col class="col col-2" :span="24">
                        <el-row :gutter="20">
                            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" :key="item.id" v-for="item in plan"
                                    v-if="item.status==0">
                                <div class="list">
                                    <p class="list-title"> {{item.name}} </p>
                                    <el-button @click="enabled(item.id)" type="warning" plain size="mini">启用</el-button>
                                    <el-button @click="edit(item.id)" type="primary" plain size="mini">编辑</el-button>
                                    <el-button @click="del(item.id)" type="danger" size="mini">删除</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  // import Pagination from '../../components/ui/Pagination' //分页组件

  export default {
    data() {
      return {
        plan: [],
      }
    },
    methods: {
      loadData() {
        this.$api.checkins.getList().then((res) => {
          var res = res.data;
          if (res.status == "SUCCESS") {
            console.log(res.data.checkInRules);
            this.plan = res.data.checkInRules;
          }
        }).catch(() => {
        })
      },
      del(id) {
        let _this = this;
        this.$confirm('确认要执行删除操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$api.checkins.del(id)
              .then((res) => {
                if (res.data.status == 'SUCCESS') {
                  _this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.loadData();
                }
              })
              .catch(() => {
                _this.$message({
                  type: 'error',
                  message: '程序出错了!'
                });
              })
        }).catch(() => {});
      },
      enabled(id) {
        let _this = this;
        this.$confirm('确认要执行启用操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$api.checkins.enabled(id)
              .then((data) => {
                let res = data.data;
                if (res.status == "SUCCESS") {
                  _this.loadData();
                  _this.$message({
                    message: "启用成功",
                    type: 'success'
                  })
                }
              })
              .catch(() => {
                _this.$message({
                  type: 'error',
                  message: '程序出错了!'
                });
              })
        }).catch(() => {});

      },
      edit(id) {//跳转到编辑页面
        this.$router.push('signAddPlane/' + id)
      },
      refreshList(selectData) { //查询条件
        console.log("查询条件为 " + selectData)
      },
      jump(index) {//跳转到新增用户页面 index:1 新增用户页面 index: 权限管理页面
        // signAddPlane
        this.$router.push(index);
      }
    },
    mounted() {
      this.loadData()
    },
    components: {
      // Pagination
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
    .wrap {
        .title {
            font-size: 20px;
            margin-bottom: 10px;
        }
        .list-wrap {
            .list {
                width: 220px;
                text-align: center;
                padding: 15px 0 20px 0;
                border-radius: 5px;
                .list-title {
                    padding: 10px 0 20px 0;
                }
            }
            .col {
                padding-bottom: 15px;
            }
            .col-1 {
                .list {
                    width: 100%;
                    background-color: #ccc;
                    .list-title {
                        color: #000;
                    }
                }
            }
            .col-2 {
                .list {
                    background-color: #eee;
                }
                .el-row .el-col {
                    margin-bottom: 15px;
                    div.list {
                        width: 100%
                    }
                }
            }
        }
    }
</style>
