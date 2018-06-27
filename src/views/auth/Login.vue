<template>
  <div id="login">
    <h2>LLJ后台管理系统</h2>
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="用户名" required prop="userName">
        <el-input  v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码"  required prop="password">
        <el-input type="password"  v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item class="bot">
        <el-checkbox v-model="form.checked" @change.native="save">记住我</el-checkbox>
        <a class="forget" @mouseover="changePassword" @mouseout="outHide">忘记密码？</a>
        <span class="warning" v-if="flag">请联系管理员</span>
      </el-form-item>
      <el-form-item>
        <el-button class="save" type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { setToken } from '@/utils/auth' // getToken from cookie
  import { mapActions } from 'vuex'
  export default{
    data(){
      return{
        form:{
          userName:window.localStorage.getItem('userName'),
          password:window.localStorage.getItem('password'),
          checked:window.localStorage.getItem('userName')?true:false
        },
        flag:false,
        rules:{
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    created(){
      // this.getMenu();
    },
    methods:{
      changePassword(){
        this.flag=!this.flag;
      },
      outHide(){
        this.flag=!this.flag;
      },
      save(){
        if(this.form.checked){
          window.localStorage.setItem('userName',this.form.userName);
          window.localStorage.setItem('password',this.form.password);
        }
      },
      login(){
        // console.log(this.$api)
        this.$api.login.post({"username":this.form.userName,"password":this.form.password})
          .then((data)=>{
            if(data.data.status="SUCCESS"){
              this.$store.dispatch('Login', data.data.data.bearer)

              //  this.$store.dispatch('permissio',data.data.data.permissio);
              // this.$store.dispatch('token',data.data.data.bearer);
              window.localStorage.setItem('id',data.data.data.user.Id);
              window.localStorage.setItem('author',data.data.data.user.SuperAdmin);
              window.localStorage.setItem('name',data.data.data.user.Name);
              window.localStorage.setItem('userName',data.data.data.user.Username);
              window.sessionStorage.setItem('token',data.data.data.bearer);
              window.localStorage.setItem('roles',JSON.stringify(data.data.data.permissio));
              // let path=this.getMenu();
              // console.log(path)

              this.$router.push('/mySelf');
              // this.$router.push('/');
              setTimeout(function(){
                location.reload()
              },100)
            }
        }).catch((data)=>{
          this.$message({
            message:data.msg,
            title: '错误'
          });
        })
      },
      alertMsg:function(data){
        this.$alert(data.msg, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.form.userName=this.form.password="";
          }
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getMenu(){
        let path='';
        for(var i=0; i<this.menu.length; i++){
          if(this.menu[i]&&!this.menu[i].hidden){
              if(this.menu[i].children){
                this.menu[i].children.forEach((item,index)=>{
                  if(index==0){
                    path=this.menu[i].path+'/'+ item.path
                  }
                })
              }else{
                path=this.menu[i].path
              }
            break;
          }
        }
        return path;
      }
    }
  }
</script>

<style lang="less" scoped>
  #login{
    width:40%;
    margin:0 auto;
    margin-top:3rem;
    h2{
      font-size:1.8rem;
      font-weight:bold;
      text-align:center;
      padding-bottom:2rem;
    }
    .bot{
      position:relative;
      top:10px;
    }
    .forget{
      float:right;
    }
    .warning{
      float:right;
      position:absolute;
      right:-22px;
      top:-22px;
      border:1px solid #ccc;
      border-radius:5px;
      height:26px;
      line-height:26px;
    }
    .save{
      width:9.8rem;
      height:2.7rem;
      margin:0 auto;
      display:block;
    }
  }
</style>


<!--<template>-->
<!--<div class="content has-text-centered">-->
<!--<h2 class="is-title is-bold">LLJ 后台管理系统</h2>-->

<!--<div class="columns is-vcentered">-->
<!--<div class="column is-4 is-offset-4">-->
<!--<div class="box">-->
<!--<form v-on:submit.prevent="login">-->
<!--<div class="control has-icon">-->
<!--<input v-validate="'required'" v-model="data.body.username" name="username" class="input" type="text" placeholder="用户名">-->
<!--<span class="icon is-small is-left">-->
<!--<i class="fa fa-user"></i>-->
<!--</span>-->
<!--<p class="help is-danger" v-if="errors.has('username')">{{ errors.first('username') }}</p>-->
<!--</div>-->
<!--<div class="control has-icon">-->
<!--<input v-validate="'required'" v-model="data.body.password" name="password" class="input" type="password" placeholder="密码">-->
<!--<span class="icon is-small is-left">-->
<!--<i class="fa fa-lock"></i>-->
<!--</span>-->
<!--<p class="help is-danger" v-if="errors.has('password')">{{ errors.first('password') }}</p>-->
<!--</div>-->
<!--<hr>-->
<!--<p class="control">-->
<!--<button type="submit" class="button is-primary">登录</button>-->
<!--</p>-->
<!--</form>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->

<!--data () {-->
<!--return {-->
<!--data: {-->
<!--body: {-->
<!--username: null,-->
<!--password: null-->
<!--}-->
<!--}-->
<!--}-->
<!--},-->
<!--mounted () {-->
<!--if (this.$auth.redirect()) {-->
<!--console.log('Redirect from: ' + this.$auth.redirect().from.name)-->
<!--}-->
<!--// Can set query parameter here for auth redirect or just do it silently in login redirect.-->
<!--},-->
<!--methods: {-->
<!--login () {-->
<!--this.$validator.validateAll()-->
<!--if (this.errors.any()) {-->
<!--return-->
<!--}-->
<!--var redirect = this.$auth.redirect()-->
<!--this.$auth.login({-->
<!--headers: {-->
<!--'Content-Type': 'application/json'-->
<!--},-->
<!--data: this.data.body,-->
<!--redirect: {name: redirect ? redirect.from.name : 'Home'},-->
<!--success (res) {-->
<!--console.log('Auth Success')-->
<!--console.log('Token: ' + this.$auth.token())-->
<!--// console.log(res)-->
<!--}-->
<!--})-->
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.is-title {-->
<!--margin-top: 50px;-->
<!--text-transform: capitalize;-->
<!--}-->

<!--.button {-->
<!--width: 100%;-->
<!--}-->
<!--</style>-->
