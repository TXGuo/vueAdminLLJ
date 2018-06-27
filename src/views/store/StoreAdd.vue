<template>
    <el-tabs type="border-card">
        <el-tab-pane label="新增门店">
            <el-row>
                <el-col :lg="8" :xl="9">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
                        <el-form-item label="门店名称:" prop="name">
                            <el-col :span="23">
                                <el-input v-model="ruleForm.name" placeholder="请输入门店名称"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="门店区域选择" prop="cities">
                            <el-col :span="24">
                                <el-cascader
                                        placeholder="请选择门店区域"
                                        class="city-wrap"
                                        :filterable="true"
                                        :clearable="true"
                                        :options="cities"
                                        v-model="ruleForm.cities"
                                        @change="handleChange"
                                        :separator="'-'">
                                </el-cascader>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="门店详细地址:" prop="detail">
                            <el-col :span="23">
                                <el-input v-model="ruleForm.detail" placeholder="请输入门店详细地址"></el-input>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="门店类型:" prop="type">
                            <el-col :span="7">
                                <el-select v-model="ruleForm.type"  placeholder="请选择门店类型">
                                    <el-option label="自营" value="0"></el-option>
                                    <el-option label="合伙" value="1"></el-option>
                                    <el-option label="临时合伙" value="2"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="门店负责人:" prop="ownerName">
                            <el-col :span="23">
                                <el-input v-model="ruleForm.ownerName" placeholder="请输入门店负责人"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="负责人手机号码:" prop="phone">
                            <el-col :span="23">
                                <el-input v-model="ruleForm.phone" placeholder="请输入负责人手机号码"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
                            <el-button @click="cancel">取 消</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

        </el-tab-pane>
    </el-tabs>
</template>
<script>
  import cities from '../../filters/cities';

  export default {
    data() {
      return {
        btnVal:'保 存',
        cities:cities[0].children,
        ruleForm: {
          name: '',
          cities: [],
          detail: '',
          type: '',
          ownerName: '',
          phone: '',
          province:'',
          city:'',
          region:'',
        },
        rules: {
          name: [
            {required: true, message: '请输入门店名称', trigger: 'blur'}
          ],
          cities: [
            { type: 'array', required: true, message: "请输入门店地址", trigger: 'blur' }
          ],
          detail: [
            {required: true, message: '请输入门店详细地址', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择门店类型', trigger: 'change'}
          ],
          ownerName: [
            {required: true, message: '请填写门店负责人', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请填写手机号', trigger: 'blur'},
            {
              pattern: /^1(3|4|5|7|8)\d{9}$/,
              message: '手机号码格式有误'
            }
          ]
        }
      };
    },
    methods: {
      handleChange(value) {
        let ruleForm = this.ruleForm;
        ruleForm.province = value[0];
        ruleForm.city = value[1];
        ruleForm.region = value[2];
      },
      loadData(storeId){
        this.$api.store.get(storeId).then((data)=>{
          var res = data.data;
          if(res.status == "SUCCESS"){
            let formData = res.data;
            this.ruleForm = formData;
            switch (formData.type){
              case 0:
                formData.type = '自营'
                break;
              case 1:
                formData.type = '合伙'
                break;
              case 2:
                formData.type = '临时合伙'
                break;
            }
            this.ruleForm.cities = [formData.province,formData.city,formData.region];
          }
        }).catch(()=>{

        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let storeId = this.$route.params.storeId,
                _this = this;
            delete this.ruleForm.cities;
            if(storeId!="0"){ //修改
              this.ruleForm.type = +this.ruleForm.type;
              // = {};
              let obj = Object.assign({},this.ruleForm);
              delete obj.cities;
              this.$api.store.put(storeId,obj).then((data)=>{
                let res = data.data;
                if(res.status == "SUCCESS"){
                  this.$message({
                    message:"修改成功",
                    type:'success'
                  })
                  _this.loadData(storeId)
                }
              }).catch(()=>{})
            }else{
              //新增
              this.ruleForm.type = +this.ruleForm.type;
              this.$api.store.post(this.ruleForm).then((data)=>{
                var res = data.data;
                if(res.status == "SUCCESS"){
                  this.$message({
                    message:"保存成功",
                    type:'success'
                  })
                  this.$refs[formName].resetFields();//对表单进行重置
                }
              }).catch(()=>{})
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancel() {
        this.$router.back(-1);
      }
    },
    mounted(){
      let storeId = this.$route.params.storeId;
      if(storeId!="0"){
        this.loadData(storeId);
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss">
    .city-wrap{
        width: 96%;
    }
</style>