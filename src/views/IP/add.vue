<template>
  <div class="addList">
    <div class="header">
      <span>IP管理</span><span> ></span><span>IP列表</span><span> ></span><span>IP新增</span>
    </div>
    <h3 class="title">IP新增</h3>
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="140px">
      <el-form-item required label="IP名称：" prop="Name">
        <el-input v-model="form.Name"></el-input>
      </el-form-item>
      <el-form-item required label="IP来源：" prop="Source">
        <el-select v-model="form.Source" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item required label="关联mojigoID：" prop="MOJIGOID">
        <el-input type="number" v-model="form.MOJIGOID" placeholder="请输入mojigoID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="saveBtn" type="primary" @click="onSubmit('ruleForm')">保存</el-button>
        <el-button class="cancelBtn" @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        form: {

        },
        rules: {
          Name: [
            { required: true, message: '请输入IP名称', trigger: 'blur' }
          ],
          Source: [
            { required: true, message: '请选择IP来源', trigger: 'change' }
          ],
          MOJIGOID:[
            {required: true, message: '请输入mojigoId', trigger: 'blur'}
          ]
        },
        options:[
          {
            label:'自有',
            value:1
          },{
            label:'授权',
            value:2
          }
        ]
      }
    },
    methods:{
      onSubmit(formName) {
        this.$refs[formName].validate(
          (valid) => {
            if (valid){
              this.addIp();
            }else {
              console.log('error submit!!');
              return false;
            }
          });
      },
      addIp(){
        this.form.MOJIGOID=parseInt(this.form.MOJIGOID);
        this.$api.IP.addIp(this.form)
          .then(data=>{
             if(data.data.status=="SUCCESS"){
               this.$message({
                 message: 'IP新建成功',
                 type: 'success'
               });
               this.$router.push('/ip/list')
             }
          }).catch(data=>{
          this.$message({
            message:data.msg,
            title: '错误'
          });
        })

      },
      cancel(){
        this.$confirm('是否放弃当前操作并退出？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.go(-1)
        }).catch(() => {

        });
      }
    }
  }
</script>
<style lang="less">
  .addList{
    .title{
      font-weight:bold;
      font-size:16px;
      margin-top:10px;
    }
    .el-input,.el-select{
      width:300px;
    }
    .saveBtn,.cancelBtn{
      width:140px;
      height:36px;
    }
    .el-form-item__label{
      text-align:left;
    }
  }
</style>
