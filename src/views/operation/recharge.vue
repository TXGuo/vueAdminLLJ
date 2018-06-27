<template>
    <div class="recharge">
      <div class="wrap">
        <el-tabs type="border-card">
          <div class="block">
              <el-button type="primary" icon="el-icon-circle-plus" @click="addTrue">
                  新建方案
              </el-button>
          </div>
          <h1 class="title">当前方案</h1>
          <el-row class="list-wrap" :gutter="20">
              <el-col class="col" v-for="(item,index) in lists" :class="index==0?'col-1':'col-2'" :span="index==0?24:5" :xs="24"   :key="index">
                <div class="list" :class="index==0?'width':''">
                  <p class="list-title">{{item.name}}</p>
                  <el-button type="warning" plain size="mini" v-if="index!=0" @click="usePlan(item.id)">启用</el-button>
                  <el-button type="primary" plain size="mini"  @click="editPlan(item.id,item)">编辑</el-button>
                  <el-button type="danger" size="mini" @click="deletePlan(item.id)">删除</el-button>
                </div>
              </el-col>

          </el-row>
        </el-tabs>
        <el-tabs type="border-card" v-show="addshow">
          <div class="new-wrap">
            <h1 class="title-A">方案新建</h1>
            <el-row>
              <el-col :lg="22" :xl="14" :xs='24'>
                  <el-form  label-position="right"  ref="form" :model="form" label-width="80px"  :rules="rules">
                      <el-form-item label='方案名称' required prop='name' >
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                        <el-form-item label="适用门店" required prop='storeId'>
                          <!-- <el-select v-model.number="form.storeId" placeholder="请选择活动区域">
                            <el-option label="门店0" :value='0'></el-option>
                            <el-option label="门店1" :value='1'></el-option>
                          </el-select> -->

                          <el-select v-model="form.storeId" placeholder="请选择">
                            <el-option
                              v-for="(item,index) in StoreItem"
                              :key="index"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>

                      </el-form-item>
                      <label for="name" class="el-form-item__label" style="width: 80px;">自定义</label>
                      <div class="mr">
                          <el-row class="add-point" v-for="(item,index) in form.program" :key="index"  :gutter="10">
                              <el-col :span="5" :xs='24'>
                                <el-form-item label="充值金额"  :prop="'program.' + index + '.rmb'"
                                  :rules="{
                                    required: true, message: '充值金额不能为空', trigger: 'blur'
                                  }">
                                  <el-input class="input-list" v-model.number="item.rmb" style="width:100%"></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="5" :xs='24'>
                                <el-form-item label="充值币数" :prop="'program.' + index + '.coins'"
                                  :rules="{
                                    required: true, message: '充值币数不能为空', trigger: 'blur'
                                  }">
                                  <el-input class="input-list" v-model.number="item.coins" style="width:100%"></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="5" :xs='24'>
                                <el-form-item label="赠送类型" :prop="'program.' + index + '.extraType'"
                                  :rules="{
                                    required: true, message: '请选择赠送类型', trigger: 'blur'
                                  }">
                                  <el-select v-model="item.extraType" placeholder="赠送类型" style="width:100%">
                                    <el-option label="积分" :value="0"></el-option>
                                    <el-option label="啵啵币" :value="1"></el-option>
                                  </el-select>
                                </el-form-item>
                              </el-col>
                              <el-col :span="5" :xs='24'>
                                <el-form-item label="赠币数量" :prop="'program.' + index + '.extraCount'"
                                    :rules="{
                                    required: true, message: '赠币数量不能为空', trigger: 'blur'
                                  }">
                                  <el-input class="input-list" v-model.number="item.extraCount" style="width:100%"></el-input>
                                </el-form-item>
                              </el-col>
                              <el-col :span="2">
                                  <el-button @click="del(index)" type="danger" icon="el-icon-close" v-show="proLen>1">删 除</el-button>
                              </el-col>
                          </el-row>
                          <el-button icon="el-icon-plus" @click="addPlan">新 建 </el-button>
                      </div>

                      <el-form-item>
                        <el-button type="primary" @click="onSubmit('form',1)">保存并启用</el-button>
                        <el-button @click="onSubmit('form',0)">保存</el-button>
                        <el-button @click="cancel()">取消</el-button>
                      </el-form-item>
                  </el-form>
              </el-col>
            </el-row>
          </div>
        </el-tabs>
      </div>
    </div>
</template>

<style scoped lang="scss" type="text/scss">
.recharge {
  .wrap {
    .title {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .mr {
      margin-left: 85px;
      margin-bottom: 20px;
    }
    .list-wrap {
      .list {
        // width: 220px;
        text-align: center;
        padding: 15px 0 20px 0;
        border-radius: 5px;
        .list-title {
          padding: 10px 0 20px 0;
        }
      }
      .width {
        width: 15%;
        min-width: 220px;
      }
      .col {
        padding-bottom: 15px;
      }
      .col-1 {
        .list {
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
        }
      }
    }
  }
  .new-wrap {
    .title-A {
      font-size: 20px;
      padding: 10px 0;
    }
    .red {
      color: red;
    }
    .add-point {
      border: 1px solid #aaa;
      border-radius: 5px;
      background: #eee;
      margin-bottom: 15px;
      padding-top: 18px;
      padding-bottom: 5px;
    }
    .sm-title {
      margin-left: 10px;
      color: #999;
    }
    .input-list {
      width: 100px;
    }
  }
}
</style>

<script>
// import Pagination from "../../components/ui/Pagination"; //分页组件

export default {
  components: {
    // Pagination
  },
  data() {
    return {
      form: {
        name: "",
        storeId: "",
        program: [
          {
            id: 0,
            coins: "",
            rmb: "",
            extraType: "",
            extraCount: ""
          }
        ],
        status: 0
      },
      StoreItem: [],
      isNew: true,
      putId: 0,
      lists: [],
      proLen: 0,
      addshow: false,
      rules: {
        name: [{ required: true, message: "请输入名字", trigger: "blur" }],
        storeId: [
          { required: true, message: "请选择商铺名称", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    var params = {
      page: 1,
      perpage: 10
    };
    this.getStoreLists(params);
    this.getPlan();
  },
  methods: {
    getStoreLists(params) {
      //获取店铺信息
      this.$api.store.getList({ params }).then(res => {
        //  console.log(res.data)
        if (res.data.status == "SUCCESS") {
          //     console.log(res.data.data.store)
          var StoreItem = res.data.data.stores;
          console.log("----------");
          //this.StoreItem =
          for (let i in StoreItem) {
            StoreItem[i].value = StoreItem[i].id;
            StoreItem[i].label = StoreItem[i].name;
          }
          this.StoreItem.push(...StoreItem);
        }
      });
    },
    addTrue() {
      //新建方案
      this.addshow = true;
      this.isNew = true;
      var params = {
        page: 1,
        perpage: 10
      };
      this.getStoreLists(params);
    },
    addPlan() {
      var idx = this.form.program.length;
      this.form.program.push({ id: idx });
      this.proLen = this.form.program.length;
    },
    del(index) {
      this.form.program.splice(index, 1);
      this.proLen = this.form.program.length;
    },
    onSubmit(form, status) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.form.status = status;
          delete this.form.id;
          console.log(this.form);
          this.newPlan(this.form, this.isNew, this.putId);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    getPlan(params) {
      //获取所有充值方案
      this.$api.operation.getPlan(params).then(res => {
        if (res.data.status == "SUCCESS") {
          var lists = res.data.data.recharges;
          for (let i = 0; i < lists.length; i++) {
            if (lists[i].status == 1) {
              var use = lists.splice(i, 1)[0];
              lists.unshift(use);
              break;
            }
          }
          console.log(lists);
          this.lists = lists;
        } else {
          console.log(res);
        }
      });
    },
    newPlan(params, isNew, id) {
      this.$confirm("是否保存设备信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (isNew == true) {
            //新方案
            console.log("新方案");
            this.$api.operation.newPlan(params).then(res => {
              console.log(res);
              if (res.data.status == "SUCCESS") {
                console.log(res.data);
                this.getPlan();
                this.$message({
                  type: "success",
                  message: "保存成功!"
                });
                this.addshow = false;
              }
            });
          } else {
            //编辑原有方案
            console.log("原有方案");
            this.$api.operation.editPlan(id, params).then(res => {
              console.log(res);
              if (res.data.status == "SUCCESS") {
                console.log(res.data);
                this.getPlan();
                this.$message({
                  type: "success",
                  message: "保存成功!"
                });
                this.addshow = false;
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    usePlan(id) {
      console.log(id);
      this.$confirm("是否启用该设备?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.operation.usePlan(id).then(res => {
            if (res.data.status == "SUCCESS") {
              console.log(res.data);
              this.getPlan();
              this.$message({
                type: "success",
                message: "启用成功"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    deletePlan(id) {
      console.log(id);
      this.$confirm("是否启用该设备?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.operation.deletePlan(id).then(res => {
            if (res.data.status == "SUCCESS") {
              console.log(res.data);
              this.getPlan();
              this.$message({
                type: "info",
                message: "删除成功"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    editPlan(id, params) {
      // console.log(params)
      this.putId = id;
      this.addshow = true;
      this.form = params;
      this.isNew = false;
    },
    cancel() {
      this.addshow = false;
    },
    getStoreLists(params) {
      //获取店铺信息
      this.$api.store.getList({ params }).then(res => {
        //  console.log(res.data)
        if (res.data.status == "SUCCESS") {
          //     console.log(res.data.data.store)
          var StoreItem = res.data.data.stores;
          console.log("----------");
          //this.StoreItem =
          for (let i in StoreItem) {
            StoreItem[i].value = StoreItem[i].id;
            StoreItem[i].label = StoreItem[i].name;
          }
          this.StoreItem.push(...StoreItem);
        }
      });
    }
  },

  watch: {
    proLen(len) {
      console.log(len);
      if (len <= 1) {
      }
    }
  }
};
</script>
