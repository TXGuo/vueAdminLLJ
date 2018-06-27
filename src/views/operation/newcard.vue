<template>
  <div class="newcard">
    <h2>新增卡券</h2>
    <el-row>
      <el-form label-position="left" label-width="120px"  :model="form" :rules="rules" ref="form">
        <el-form-item label="卡券数量" prop='num' required>
          <el-col :span="20">
            <el-input v-model.number="form.num"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="卡券标题" prop='title' required>
          <el-col :span="20">
            <el-input v-model="form.title"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="卡券类型" prop='type' required>
          <el-col :span="20">
            <el-select v-model="form.type" placeholder="选择类型">
              <el-option label="充值卡" :value="0"></el-option>
              <el-option label="活动赠卡" :value="1"></el-option>
              <el-option label="内部测试卡" :value="2"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="卡券面额" prop='balance' required>
          <el-col :span="20">
           <el-input v-model.number="form.balance"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="卡券基数"  prop='probability' required>
          <el-col :span="20">
           <el-input v-model.number="form.probability"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="卡券二维码间隔" prop='useInterval' required>
          <el-col :span="20">
            <el-select v-model="form.useInterval" placeholder="秒">
              <el-option label="10秒" :value="10"></el-option>
              <el-option label="20秒" :value="20"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="卡券有效期" required>
          <el-col :span="11">
            <el-form-item prop='StartTime' required>
              <el-date-picker  type="datetime" v-model="form.StartTime"  placeholder="选择开始时间"  default-time="12:00:00"
                value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop='EndTime' required>
              <el-date-picker  type="datetime" v-model="form.EndTime"  placeholder="选择结束时间"  default-time="12:00:00"
                value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="卡券有效门店"  prop='stores' required>
          <!-- <el-select v-model="form.stores" placeholder="选择门店" >
            <el-option label="区域一" :value="0"></el-option>
            <el-option label="区域二" :value="1"></el-option>
          </el-select> -->
          <el-select v-model="form.stores" placeholder="请选择">
            <el-option
              v-for="item in StoreItem"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onsubmit('form')">确定</el-button>
          <el-button type="success">取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>

  </div>
</template>

<style scoped lang="scss">
  .newcard{
    width: 50%;
    min-width: 300px;
    .w{
      input{
      width:80%;
      }
    }
    h2{
      font-weight: bold;
      margin-bottom:20px;
    }
      line-height: 32px;
    .el-row{
      margin-bottom:20px;
    }
    .line{
      text-align: center;
    }
  }
</style>

<script>
 export default {
    data() {
      return {
        form: {
          title:'',
          num: '',
          probability: '',
          type: '',
          stores:'',
          StartTime:'',
          EndTime:'',
          useInterval:''
        },
        StoreItem:[],
        rules: {

        },
      }
    },
    mounted(){
    var params = {
        page: 1,
        perpage: 10,
      }
      this.getStoreLists(params)
    },
    methods:{
      onsubmit(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            console.log(this.form)
            this.newTickets(this.form)
          }else{
            console.log('error submit!!');
            return false;
          }
        })
      },
      newTickets(params){
        this.$api.operation.newTickets(params)
        .then((res) =>{
          console.log(res)
          if(res.data.status=='SUCCESS'){
              this.$router.go(-1)
          }
        })
      },
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
    }
  }
</script>
