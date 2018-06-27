<template>
  <div id="mySelf">
    <h3>账户信息</h3>
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
    <el-form-item label="用户ID：">
        <el-input disabled  v-model="form.Name"></el-input>
      </el-form-item>
      <el-form-item label="登录账号：">
        <el-input disabled v-model="form.UserName"></el-input>
      </el-form-item>
      <el-form-item label="系统权限：">
        <el-input disabled v-model="form.SuperAdmin"></el-input>
      </el-form-item>
      <el-form-item required label="真实姓名：" prop="Name">
        <el-input v-model="form.Name"></el-input>
      </el-form-item>
      <el-form-item required label="手机号码：" prop="PhoneNumber">
        <el-input v-model="form.PhoneNumber"></el-input>
      </el-form-item>
      <el-form-item required label="所属部门：" prop="Department">
        <el-input v-model="form.Department"></el-input>
      </el-form-item>
      <el-form-item required="" label="职位：" prop="Position">
        <el-input v-model="form.Position"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submit" type="primary" @click="onSubmit('form')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
        },
        rules: {
          Name: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' }
          ],
          PhoneNumber: [
            { required: true, message: '手机号码不能为空', trigger: 'blur'},
            {
              pattern: /^1(3|4|5|7|8)\d{9}$/,
              message: '手机号码有误'
            }
          ],
          Department: [
            { required: true, message: '所属部门不能为空', trigger: 'blur'}
          ],
          Position: [
            { required: true, message: '职位不能为空', trigger: 'blur'}
          ]
        },
      }
    },
    created(){
      this.getInfo();
    },
    methods: {
      getInfo(){
        this.$api.myInfo.getInfo(window.localStorage.getItem('id'))
          .then(data=>{
            if(data.data.status=="SUCCESS"){
              this.form=data.data.data;
            }
          })
      },
      saveInfo(){
        this.$api.myInfo.editInfo(window.localStorage.getItem('id'),this.form)
          .then(data=>{
            if(data.data.status=="SUCCESS"){
              this.$message({
                message: '账户信息修改成功',
                type: 'success'
              });
            }
          })
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveInfo();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style lang="less" scoped>
  #mySelf{
    width:30%;
    margin:0 auto;
    min-width:300px;
    h3{
      text-align:center;
      font-size:1.14rem;
      font-weight:bold;
      padding-bottom:2rem;
    }
    .submit{
      width:10rem;
      text-align:center;
      position:relative;
      left:50%;
      margin-left:-5rem;
      margin-top:3.5rem;
    }
    .el-form-item--small.el-form-item{
      margin-bottom:2.2rem;
    }
  }
</style>
