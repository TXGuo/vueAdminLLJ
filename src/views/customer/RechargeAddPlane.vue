<template>
    <div class="wrap">
        <h1 class="title-A">方案新建</h1>
        <el-row>
            <el-col :lg="11" :xl="8">
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item>
                        <span slot="label">方案名称<i class="red">*</i>:</span>
                        <el-row>
                            <el-col :span="20">
                                <el-input v-model="form.name"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <span class="sm-title">0/50</span>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label">自定义<i class="red">*</i>:</span>
                        <el-row class="add-point" v-for="(item,index) in addArr" :key="index">
                            <el-col :span="10">
                                    <span>充值金额<i class="red">*</i></span>
                                    <el-input class="input-list" v-model="item.price"></el-input>
                            </el-col>
                            <el-col :span="10">
                                <div>
                                    <span>获得积分<i class="red">*</i></span>
                                    <el-input class="input-list" v-model="item.integration"></el-input>
                                </div>
                            </el-col>
                            <el-col :span="4">
                                <el-button @click="del(index)" type="danger" icon="el-icon-close">删 除</el-button>
                            </el-col>
                        </el-row>
                        <el-button icon="el-icon-plus" @click="addPlan">新 建 </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form')">保存并启用</el-button>
                        <el-button>保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped lang="scss" type="text/scss">
    .title-A {
        font-size: 20px;
        padding: 10px 0;
    }
    .red{
        color: red;
    }
    .wrap {
        background-color: #fff;
        margin: -20px;
        padding: 20px;
    }
    .add-point{
        border: 1px solid #aaa;
        border-radius: 5px;
        background:#eee;
        padding: 5px;
        margin-bottom: 15px;
    }
    .sm-title{
        margin-left: 10px;
        color: #999;
    }
    .input-list{
        width: 100px;
    }
</style>

<script>
  export default {
    data() {
      return {
        addArr:[
          {
            id:1,
            price:'',
            integration:'',
          }
        ],
        form: {
          name: '',
        }
      }
    },
    methods: {
      addPlan(){
        this.addArr.push({id:1,price:'',integration:''});
      },
      del(index){
        this.addArr.splice(index,1);
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid){
            console.log(valid)
            alert('submit')
          }else{
            console.log('error submit!!')
            return false;
          }
        });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>
