<template>
  <div>
    <div class="box1">
      <div class="txt">
        密码修改
      </div>
      <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="原密码" required prop="oldPassword">
          <el-input type="password"  v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" required prop="newPassword">
          <el-input type="password" v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" required prop="confirmPassword">
          <el-input type="password"  v-model="form.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="save" type="primary" @click="showDialog('ruleForm')">保存</el-button>
          <el-button class="cancel" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
  div.box1 {
    width:50%;
    margin:0 auto;
    min-width: 400px;
    .txt{
      text-align:center;
      font-size:1.2rem;
      padding:3rem 0;
    }
    .save,.cancel{
      width:10rem;
      height:2.8rem;
      margin:3rem 0;
      float:left;
    }
    .cancel{
      float:right;
    }
  }
</style>

<script>
  import dialog1 from './dialog.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {dialog1},
    data () {
      return {
        form: {
          oldPassword: '',
          newPassword: null,
          confirmPassword: null
        },
        flag:false,
        rules:{
          oldPassword: [
            { required: true, message: '请输入原始密码', trigger: 'blur' }
          ],
          newPassword:[
            {required: true, message: '请输入新密码', trigger: 'blur' },
            {
              pattern: /^[\w]{6,12}$/,
              message: '包含非法字符或超过长度限制'
            }
          ],
          confirmPassword:[
            {required: true, message: '请输入新密码', trigger: 'blur' },
            {
              pattern: /^[\w]{6,12}$/,
              message: '包含非法字符或超过长度限制'
            }
          ]
        }
      }
    },
    computed:{
      getId(){
        return window.localStorage.getItem('id')
      }
    },
    methods:{
      showDialog(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.myInfo.save(this.getId,{"newPassword":this.form.newPassword,"oldPassword":this.form.oldPassword})
              .then(data=>{
               if(data.data.status=="SUCCESS"){
                 this.$alert('修改密码成功', '提示', {
                 });
               }
              }).catch(data=>{
              if(data.status=="FAILURE"){
                this.alertMsg(data);
              }
            })
          } else {
            // this.flag=true;
            // return false;
          }
        });
      },
      alertMsg:function(data){
        this.$alert(data.msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {

          }
        });
      },
      cancel(){
        this.$router.go(-1)
      }
    }
  }
</script>
