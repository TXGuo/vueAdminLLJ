<template>
  <div class="active">
    <el-row>
      <el-col :span="8">
        <h2>激活设备</h2>
        <el-form label-position="left" label-width="100px"  :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="设备主板ID" prop='DeviceId' required>
            <el-input v-model="form.DeviceId" placeholder="输入6位设备ID"></el-input>
          </el-form-item>
          <el-form-item label="启动密码" prop='DeviceSecret' required>
            <el-input v-model="form.DeviceSecret" placeholder="输入启动密码"></el-input>
          </el-form-item>
          <el-form-item label="设备类型" prop='DeviceType' required>
            <el-select v-model="form.DeviceType" placeholder="设备类型">
              <el-option label="标准机" value="1"></el-option>
              <el-option label="迷你机" value="2"></el-option>
              <el-option label="双人机" value="3"></el-option>
              <el-option label="大爪机" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属门店" prop='Store' required>
            <el-select v-model="form.Store" placeholder="所属门店">
             <el-option  label="全部" value=""> </el-option>
              <el-option
                v-for="item in StoreItem"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-button type="primary" @click="onSubmit('ruleForm')">激活提交</el-button>
      <el-button type="success"  @click="$router.go(-1)">取消操作</el-button>
    </el-row>


  </div>
</template>

<style scoped lang="scss">
.active {
  .w {
    input {
      width: 80%;
    }
  }
  h2 {
    margin-bottom: 20px;
  }
  line-height: 32px;
  .el-row {
    margin-bottom: 20px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      form: {
        DeviceId: "",
        DeviceSecret: "",
        DeviceType: "",
        Store: ""
      },
      StoreItem:[],
      rules: {
        DeviceId: [
          {
            required: true,
            message: "请输入6位设备ID",
            min: 6,
            max: 6,
            trigger: "blur"
          }
        ],
        DeviceSecret: [
          { required: true, message: "请输入启动密码", trigger: "blur" },
          {
            required: true,
            message: "最短6位最长50位",
            min: 6,
            max: 50,
            trigger: "blur"
          }
        ],
        DeviceType: [
          { required: true, message: "请选择设备类型", trigger: "change" }
        ],
        Store: [
          { required: true, message: "请选择所属门店", trigger: "change" }
        ]
      }
    };
  },
  mounted(){
     var params = {
      page: 1,
      perpage: 10,
    }
    this.getStoreLists(params)
  },
  methods: {
    getStoreLists(params){
      //获取店铺信息
      this.$api.store.getList({params})
        .then((res)=>{
        //  console.log(res.data)
          if(res.data.status=="SUCCESS"){
       //     console.log(res.data.data.store)
            var StoreItem = res.data.data.stores;
            console.log('----------')
            //this.StoreItem =
            for(let i in StoreItem){
               StoreItem[i].value = StoreItem[i].id
               StoreItem[i].label = StoreItem[i].name
            }
            this.StoreItem.push(...StoreItem)
          }
        })
    },
    onSubmit(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          var par = {
            DeviceId: this.form.DeviceId,
            DeviceSecret: this.form.DeviceSecret,
            DeviceType: parseInt(this.form.DeviceType),
            Store: parseInt(this.form.Store)
          };
          console.log(par);
          this.$confirm("确认激活该设备?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            this.$api.equipment.post(par)
              .then(res => {
                 this.$message({
                    type: "success",
                    message: "激活成功!"
                });
                console.log(res);
                this.$router.go(-1);
              })
              .catch((res) => {
                this.$message({
                  type: "warning",
                  message: res.msg
                })
              })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
