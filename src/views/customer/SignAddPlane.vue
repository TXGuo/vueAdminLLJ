<template>
    <div class="wrap">
        <el-tabs type="border-card">
            <el-tab-pane label="方案新建">
                <el-row>
                    <el-col :lg="12" :md="19" :xl="8">
                        <el-form ref="form" :model="form" :rules="rules" label-width="90px">
                            <el-form-item prop="name">
                                <span slot="label">方案名称:</span>
                                <el-row>
                                    <el-col :span="20">
                                        <el-input v-model="form.name"></el-input>
                                    </el-col>
                                    <el-col :span="4">
                                        <span class="sm-title">0/50</span>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item prop="defPoints">
                                <span slot="label">默认配置:</span>
                                <span>默认一日签到积分</span>
                                <el-input v-model="form.defPoints" style="width: 100px"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <span slot="label">自定义:</span>
                                <el-row class="add-point" v-for="(item,index) in form.program" :key="index">
                                    <el-col :xs="24" :md="10" :sm="10" :lg="10">
                                        <el-col :xs="12" :sm="11" :md="10" :lg="12">累计签到天数:</el-col>
                                        <el-col :xs="12" :sm="11" :md="12" :lg="10">
                                            <el-input v-model="item.day" @input="blur(index)"></el-input>
                                        </el-col>
                                    </el-col>
                                    <el-col :xs="24" :md="10" :sm="10" :lg="10">
                                        <div>
                                            <el-col :xs="12" :sm="11" :md="8" :lg="8">获得积分:</el-col>
                                            <el-col :xs="12" :sm="11" :md="12" :lg="14">
                                                <el-input v-model="item.point" @input="blur(index)"></el-input>
                                            </el-col>
                                        </div>
                                    </el-col>
                                    <el-col :xs="24" :sm="4" :md="2" :lg="1">
                                        <el-button @click="del(index)" size="mini" type="danger" icon="el-icon-close">
                                            删 除
                                        </el-button>
                                    </el-col>
                                    <div class="el-form-item__error" v-if="item.status==0">
                                        请输入累计签到天数和积分
                                    </div>
                                </el-row>
                                <el-button icon="el-icon-plus" @click="addPlan">新 建</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" @click="onSubmit('form',1)">保存并启用</el-button>
                                <el-button type="primary" @click="onSubmit('form',0)">保存</el-button>
                                <el-button @click="cancel()">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="scss" type="text/scss">
    .title-A {
        font-size: 20px;
        padding: 10px 0;
    }

    .el-icon-close {
        width: 100%;
    }

    .red {
        color: red;
    }

    .wrap {
        background-color: #fff;
        margin: -20px;
        padding: 20px;
    }

    .add-point {
        border: 1px solid #aaa;
        border-radius: 5px;
        background: #eee;
        padding: 5px;
        margin-bottom: 15px;
    }

    .sm-title {
        margin-left: 10px;
        color: #999;
    }
</style>

<script>
  export default {
    data() {
      return {
        id: '',
        form: {
          name: '',
          defPoints: '',
          program: []
        },
        rules: {
          name: [
            {required: true, message: '请输入方案名称', trigger: 'change'},
            {min: 1, max: 50, message: '长度为 0-50 个字符', trigger: 'change'}
          ],
          defPoints: [
            {required: true, message: '请输入默认积分', trigger: 'change'},
            {
              pattern: /^[0-9]*$/,
              message: '请输入有效数字',
              trigger: 'change'
            }
          ]
        }
      }
    },
    methods: {
      loadData(id) {
        this.$api.checkins.get(id)
            .then((res) => {
              if (res.data.status == "SUCCESS") {
                var res = res.data.data;
                for (var i = 0; i < res.program.length; i++) {
                  res.program[i]['status'] = 1;
                }
                this.form = res;
              }
            })
            .catch(() => {
            })
      },
      addPlan() {
        this.form.program.push({id: 0, day: '', point: '', status: 1});
      },
      del(index) {
        this.form.program.splice(index, 1);
      },
      blur(index) {
        let program = this.form.program, reg = /^[0-9]{1,}$/;
        for (var i = 0; i < this.form.program.length; i++) {
          if (!reg.test(this.form.program[i].day) || !reg.test(this.form.program[i].point)) {
            this.form.program[i].status = 0;
          } else {
            this.form.program[i].status = 1;
          }
        }
      },
      onSubmit(formName, status) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let program = this.form.program, reg = /^[0-9]{1,}$/, form = this.form;
            ;
            for (var i = 0; i < program.length; i++) {
              program[i].id = i + 1;
              if (!reg.test(program[i].day) || !reg.test(program[i].point)) {
                this.$message({
                  message: '请输入有效的数字',
                  type: 'warning'
                })
                program[i].status = 1;
                return false;
              } else {
                program[i].day = +program[i].day;
                program[i].point = +program[i].point;
                delete program[i].status;
              }
            }
            form.status = status;
            form.defPoints = +form.defPoints;
            this.id == 0 ? this.save(formName) : this.edit(formName)
          } else {
            console.log('error submit!!')
            return false;
          }
        })
      },
      edit(formName) {
        let _this = this;
        this.$api.checkins.edit(this.id, this.form)
            .then((data) => {
              let res = data.data;
              if (res.status == 'SUCCESS') {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.loadData(_this.id);
              }
            })
            .catch(() => {
            })
      },
      save(formName, status) {
        this.$api.checkins.post(this.form)
            .then((data) => {
              let res = data.data;
              if (res.status == 'SUCCESS') {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.$refs[formName].resetFields();
                this.form.program = [{
                  id: '',
                  day: '',
                  point: '',
                  status: 0
                }]
              }
            })
            .catch(() => {
            })
      },
      cancel() {
        this.$router.back(-1)
      },
    },
    mounted() {
      let id = this.$route.params.id;
      this.id = id;
      if (id != 0) {//判断是否为新建
        this.loadData(id);
      }
    }
  }
</script>
