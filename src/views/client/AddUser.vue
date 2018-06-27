<template>
    <div class="wrap">

        <el-row>
            <el-col :span="8" :offset="7" class="title">
                新建用户
            </el-col>
            <el-col :span="8" :offset="7">
                <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="登录账号：" prop="UserName">
                        <el-input v-model="user.UserName" placeholder="请输入登录账号"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名：" prop="Name">
                        <el-input v-model="user.Name" placeholder="请输入真实姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：" prop="PhoneNumber">
                        <el-input v-model="user.PhoneNumber" placeholder="请输入11位手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="所属部门：" prop="Department">
                        <el-input v-model="user.Department" placeholder="请输入您所在的部门"></el-input>
                    </el-form-item>
                    <el-form-item label="职位：" prop="Position">
                        <el-input v-model="user.Position" placeholder="请输入您的岗位或职位"></el-input>
                    </el-form-item>
                    <el-form-item label="系统权限：" prop="SuperAdmin">
                        <el-select v-model="user.SuperAdmin" placeholder="请选择用户权限">
                            <el-option label="管理员" value="1"></el-option>
                            <el-option label="普通用户" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="medium" type="primary" @click="submitForm('user')">保 存</el-button>
                        <el-button size="medium" @click="close">取 消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped lang="scss" type="text/scss">
    .title {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }

    .el-form-item {
        margin-bottom: 2.2rem;
    }

    .el-select {
        width: 100%;
    }
</style>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        status: '',//编辑和新增判断
        user: {
          Name: '',//姓名
          UserName: '',//登录账号
          PhoneNumber: '',
          Position: '',
          Department: '',
          SuperAdmin: '',
          Password: ''
        },
        rules: {//表单验证规则
          UserName: [
            {required: true, message: '登录账号不能为空，不能包含汉字', trigger: 'blur'},
            {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'},
            {
              pattern: /^[^\u4e00-\u9fa5]{0,}$/,
              message: '登录账号不能包含中文'
            }
          ],
          Name: [
            {required: true, message: '真实姓名不能为空', trigger: 'blur'},
          ],
          PhoneNumber: [
            {required: true, message: '手机号码不能为空', trigger: 'blur'},
            // {min: 3, max: 11, message: '长度为 11 个字符', trigger: 'blur'},
            {
              pattern: /^1(3|4|5|7|8)\d{9}$/,
              message: '手机号码有误'
            }
          ],
          Department: [
            {required: true, message: '所属部门不能为空', trigger: 'blur'},
          ],
          Position: [
            {required: true, message: '职位不能为空', trigger: 'blur'},
          ],
          SuperAdmin: [
            {required: true, message: '请选择系统权限', trigger: 'change'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {//表单提交验证函数
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let users = Object.assign({}, this.user);
            this.$api.client.post(users).then((res) => {
              if (res.data.status === "SUCCESS") {
                this.$message({
                  message: "保存成功",
                  type: 'warning'
                });
              }
              this.$refs[formName].resetFields();
            }).catch(function (error) {
              let res = error.response;
              this.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }.bind(this));
          } else {
            this.$message({
              message:'请您填写完整',
              type:'warning'
            })
            return false;
          }
        })
      },
      close() {//取消按钮点击事件
        this.$router.back(-1)
      }
    },
    mounted() {
      this.status = this.$route.params.id; //获取编辑或者是新增\
      if (!this.status) {
        return false;
      }
      this.$api.client.get(this.status).then((data) => {
        let res = data.data;
        if (res.status === "SUCCESS") {
          this.user = res.data;
        } else {
          console.log('出错了')
        }
      }).catch((response) => {
        console.log('HTTP出错了')
      })
    }
  }
</script>
