<template>
    <div>
        <el-form :inline="true" ref="formInline" :model="formInline" :rules="rules" class="demo-form-inline">
            <el-form-item label="用户名">
                <el-input v-model="formInline.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="登录ID">
                <el-input v-model="formInline.username" placeholder="请输入登录ID"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phoneNumber">
                <el-input v-model="formInline.phoneNumber" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="selectData('formInline')">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        formInline: {//输入框组件需要的变量
          name: '',
          username: '',
          phoneNumber: ''
        },
        rules: {
          phoneNumber: [
            {
              pattern: /^1(3|4|5|7|8)\d{9}$/,
              message: '手机号码格式有误'
            }
          ],
        },
      }
    },
    methods: {
      selectData(formName) {
        let formInline = this.formInline;
        if (!formInline.name.trim() && !formInline.username.trim() && !formInline.phoneNumber.trim()) {
          this.$message({
            message: '请您输入搜索条件',
            type: 'warning',
            duration: 1500
          })
        }
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log(_this.formInline)
            this.$emit('refreshList', _this.formInline);
          } else {
            this.$message({
              message: '请您填写正确手机号码',
              type: 'warning'
            })
            return false;
          }
        })
      }
    }
  }
</script>