<template>
  <div class="add">
    <div>
      <span>景品管理</span><span> ></span><span>全部景品</span><span> ></span><span>新增景品</span>
    </div>
    <div class="title">景品基本信息</div>
    <el-form class="form" ref="ruleForm" :rules="rules" :model="form" label-width="120px">
      <el-form-item  required label="景品编号：" prop="code">
        <el-input v-model="form.code"></el-input>
        <span>0/50</span>
      </el-form-item>
      <el-form-item  required label="景品名称：" prop="name">
        <el-input v-model="form.name"></el-input>
        <span>0/50</span>
      </el-form-item>
      <el-form-item label="景品图片" prop="images">
        <el-upload
          class="upload-demo"
          action="//upload-z2.qbox.me"
          :limit="1"
          :data="formData"
          :file-list="photo"
          list-type="picture-card"
          :before-upload="beforeUpload"
          :on-preview="handlePictureCardPreview"
          :on-success="handleSuccess"
          :before-remove="beforeRemove"
          :on-remove="handleRemove">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">不超过2M</div>
        </el-upload>
        <el-dialog :visible.sync="previewDialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item  required label="所属IP：">
        <el-select class="IP" v-model="name1" placeholder="自有">
          <el-option v-for="item in IP1"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
        <el-select class="IP" v-model="name2" placeholder="授权">
          <el-option v-for="item in IP2"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
        <div v-if="isIp" class="el-form-item__error">
          请选择所属Ip
        </div>
      </el-form-item>
      <el-form-item  required label="尺寸：" prop="size">
        <el-input v-model="form.size"></el-input>
      </el-form-item>
      <el-form-item  required label="颜色/标签：" prop="color">
        <el-input v-model="form.color"></el-input>
      </el-form-item>
      <el-form-item  required label="品牌：" prop="brand">
        <el-input type="text" v-model="form.brand"></el-input>
      </el-form-item>
      <el-form-item required label="合作方式" prop="cooperation">
        <el-select class="shop" v-model="form.cooperation" placeholder="请选择">
          <el-option  v-for="item in ways"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="title" label="景品销售">
      </el-form-item>
      <el-form-item  required label="启动币数：" prop="priceThreshold">
        <el-input type="number" v-model="form.priceThreshold"></el-input>
      </el-form-item>
      <el-form-item  required label="成本：" prop="cost">
        <el-input type="number" v-model="form.cost"></el-input>
      </el-form-item>
      <el-form-item  required label="售价：" prop="price">
        <el-input type="price" v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item class="title" label="设备匹配">
      </el-form-item>
      <el-form-item required label="景品爪型" prop="clawType">
        <el-select class="shop" v-model="form.clawType" placeholder="请选择">
          <el-option  v-for="item in types"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  class="power" required label="抓力区间" prop="minPower">
        <el-input type="number" placeholder="弱爪力" v-model="form.minPower"></el-input>
        -
      </el-form-item>
      <el-form-item class="power power1" required prop="maxPower">
        <el-input type="number" placeholder="强爪力" v-model="form.maxPower"></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button class="addBtn" type="primary" @click="onSubmit('ruleForm')">保存</el-button>
        <el-button class="cancelBtn" type="" @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        uploadImages:[],
        dialogImageUrl: '',//预览图片链接
        previewDialogVisible: false,//预览图片
        photo:[],
        formData:{ //上传参数
          token:this.getToken(),
          key:''
        },
        isIp:false,
        Id1:'',
        Id2:'',
        IP1:[],
        IP2:[],
        name:'',
        name1:'',
        name2:'',
        allIP:[],
        source:'',
        ways:[
          {
            label:'自产',
            value:1
          },
          {
            label:'授权资产',
            value:2
          },
          {
            label:'直采',
            value:3
          },
          {
            label:'代销',
            value:4
          }
        ],
        types:[
          {
            label:'S',
            value:'S'
          },
          {
            label:'M',
            value:'M'
          },
          {
            label:'L',
            value:'L'
          },
          {
            label:'XL',
            value:'XL'
          },
          {
            label:'XXL',
            value:'XXL'
          }
        ],
        form: {

        },
        rules: {
          code: [
            { required: true, message: '请输入景品编号', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入景品名称', trigger: 'blur' }
          ],
          images:[
            {required: true, message: '请上传景品图片', trigger: 'blur'}
          ],
          size:[
            {required: true, message: '请输入尺寸', trigger: 'blur'}
          ],
          brand:[
            {required: true, message: '请输入品牌名称', trigger: 'blur'}
          ],
          cooperation:[
            {required: true, message: '请选择合作方式', trigger: 'change'}
          ],
          priceThreshold:[
            {required: true, message: '请输入启动币数', trigger: 'blur'}
          ],
          cost:[
            {required: true, message: '请输入成本', trigger: 'blur'}
          ],
          price:[
            {required: true, message: '请输入售价', trigger: 'blur'}
          ],
          minPower:[
            {required: true, message: '请输入弱爪力', trigger: 'blur'}
          ],
          maxPower:[
            {required: true, message: '请输入强爪力', trigger: 'blur'}
          ],
          clawType:[
            {required: true, message: '请选择爪型', trigger: 'change'}
          ],
          color:[
            {required: true, message: '请输入颜色或标签', trigger: 'blur'}
          ]
        }
      }
    },
    created(){
      this.getIps();
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate(
          (valid) => {
            if (valid){
              if(this.name1||this.name2){
                this.editPro();
              }else{
                this.isIp=true;
                return;
              }
            }else {
              console.log('error submit!!');
              return false;
            }
          });
        // console.log('submit!');
      },
      getToken(){
        this.$api.qinniuToken.getToken()
          .then(data=>{
            if(data.data.status=="SUCCESS"){
              this.formData.token=data.data.data.uploadToken;
            }
          })
      },
      //获取所有Ip
      getIps(){
        this.$api.IP.getList()
          .then(data=>{
           this. allIP=data.data.data.IPs;
            this.allIP.forEach(item=>{
              if(item.Source==1){
                this.IP1.push({"label":item.Name,"value":item.Id})
              }else if(item.Source==2){
                this.IP2.push({"label":item.Name,"value":item.Id})
              }else if(item.Id==this.form.ipId){
                this.source=item.Source
              }
            })
            this.getProInfo();
          }).catch(data=>{

        })
      },
      showIp(data){

      },
      beforeUpload (file) {  //每次上传文件之前设置key
        this.getToken();
        let suffix = file.name
        let key = encodeURI(`${suffix}`)
        this.formData.key=this.form.images=key;
        const isImg = ['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type)>-1;
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isImg) {
          this.$message.error('请上传上传JPG/PNG格式的头像图片!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isImg && isLt2M;
      },
      handlePictureCardPreview(file){
        this.previewDialogVisible = true
        this.dialogImageUrl = file.url
      },
      beforeRemove(file){
        return this.$confirm(`确定移除 ${ file.name }？`).then(()=>{
//            这里再调用具体的删除接口
        })
      },
      handleRemove(){},
      handleSuccess(){},
      editPro(){
        this.form.cost=parseFloat(this.form.cost);
        this.form.price=parseFloat(this.form.price);
        this.form.maxPower =parseFloat(this.form.maxPower);
        this.form.minPower=parseFloat(this.form.minPower);
        this.form.priceThreshold=parseFloat(this.form.priceThreshold);
        this.form.Id=parseFloat(this.Id1)||parseFloat(this.Id2);
        this.$api.products.editPro(this.$route.params.id,this.form)
          .then(data=>{
             if(data.data.status=="SUCCESS"){
               this.$message({
                 message: '该景品编辑成功',
                 type: 'success'
               });
               this.$router.push('/scene/sceneList');
             }
          }).catch(data=>{
          this.$message({
            message:data.msg,
            title: '错误'
          });
        })
      },
      //取消
      cancel(){
        this.$confirm('是否放弃当前操作并退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.go(-1);
        }).catch(() => {

        });
      },
      //获取景品信息
      getProInfo(){
        this.$api.products.getProduct(this.$route.params.id)
          .then(data=>{
                if(data.data.status=="SUCCESS"){
                this.form=data.data.data;
                // this.Id1=this.Id2=this.form.ipId;
                let urlAry=this.form.images;
                this.$set(this.photo,0,{url:urlAry ,name:''});
                  this.$nextTick(function () {
                    this.allIP.forEach(item=>{
                      if(item.Id==this.form.ipId){
                        this.source=item.Source;
                        this.name=item.Name;
                        this.source==2?this.name2=this.name:this.name1=this.name;
                        this.source==2?this.Id2=this.form.ipId:this.Id1=this.form.ipId;
                      }
                    })
                  })
              }
          })
      }
    }
  }
</script>
<style lang="less">
  .add{
    width:600px;
    .title{
      font-size:16px;
      margin-top:10px;
    }
    .IP{
      width:100px;
    }
    .form{
      width:500px;
      .el-input{
        width:200px;
      }
      .btns{
        margin-top:20px;
        clear:both;
      }
      .power{
        float:left;
        .el-form-item__content:nth-child(1){
          margin-left:0!important;
        }
      }
      .power .el-input{
        width:140px;
      }
      .el-select{
        width:150px;
        .el-input{
          width:150px;
        }
      }
      .el-form-item__label{
        text-align:left;
      }
      .shop{
        width:200px;
        .el-select,.el-input{
          width:200px;
        }
      }
      .addBtn,.cancelBtn{
        width:140px;
        height:38px;
      }
    }
  }
</style>
