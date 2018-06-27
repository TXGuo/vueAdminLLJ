<template>
  <div class='init'>
    <div>
      <h2>{{isInit == true?"设备初始化":'设备编辑'}}</h2>
      <el-form :model="form" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
        <el-form-item label="设备自定义名称" prop="Name" required>
          <el-input v-model="form.Name"></el-input>
        </el-form-item>
        <el-form-item label="设备抓型" prop="ClawType" required>
          <el-select v-model="form.ClawType" placeholder="请选择活动区域">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抓力区间" required >
          <el-col :span="11">
            <el-form-item prop="MinPower" class="line" required>
              <el-input type="number" v-model.number="form.MinPower"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="line tc">-</el-col>
          <el-col :span="11">
            <el-form-item prop="MaxPower" class="line" required>
              <el-input type="number" v-model.number="form.MaxPower" ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="设备启动币数" prop="PriceThreshold" required>
          <el-input type="number" v-model.number="form.PriceThreshold" placeholder="请输入启动币数"></el-input>
        </el-form-item>
        <el-form-item label="启动概率设定" prop="Probability" required>
          <el-input type="number" v-model.number="form.Probability" placeholder="请输入0-1的小数"></el-input>
        </el-form-item>
        <el-form-item label="景品绑定" prop="ProductId" required>
            <el-button type="warning" @click="open" v-show="!bindPrize" >景品绑定</el-button>
            <el-row v-show="bindPrize">
              <el-col :span="4">
               <el-col :span="12">
                 <img :src="productImg" alt="">
               </el-col>
               <el-col :span="12">
                <el-button type="warning" @click="cancel" >取消</el-button>
               </el-col>
               <el-col :span="24">
                  <div>{{productName}}</div>
               </el-col>
              </el-col>

            </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class='cover' v-if="showCover">
       <prize :formInline='formInline' :showCover='showCover' :close='close' @bindVal='val'></prize>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .init{
      // height:100vh;

      >div{
        width:50%;
        min-width: 300px;
        margin:0 auto;
        h2{
          text-align: center;
          margin:20px auto;
        }
        .tc{
          text-align: center;
        }
        .line{
          margin-bottom:0;
        }
      }

      .cover{
        position: absolute;
        top:0;
        left:0;
        z-index: 10000;
        width:100%;
        height:100vh;
        background:rgba(0,0,0,.5);
        padding:20px;
      }
  }
</style>

<script>
import  prize from "./prize"

export default {
    data() {
      return {
        isInit:true,
        showCover:false,
        bindPrize:false,
        form: {
          Name: '',
          ClawType: '',
          MinPower: '',
          MaxPower: '',
          PriceThreshold: '',
          ProductId:'',
        },
        productImg:'',
        productName:'',
        rules: {

        },
        formInline: {
          user: '',
          region: ''
        },

        query:''
      };
    },
    components:{
      prize
    },
    mounted(){
      console.log(this.$route.query)
      this.query = this.$route.query;
      this.isInit = this.query.Status == 1;
      !this.isInit && (this.form = this.query)

       this.$api.products.getProduct(this.query.ProductId)
          .then((res) =>{
            if(res.data.status=='SUCCESS'){
              console.log(res.data.data)
              this.productImg = res.data.data.images;
              this.productName = res.data.data.name;
              this.bindPrize = true;
            }
        })
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(this.form)
          if (valid) {
            var par = {
              "Name": this.form.Name,
              "DeviceClawType":this.form.ClawType,
              "MinPower":this.form.MinPower,
              "MaxPower":this.form.MaxPower,
              "Probability":this.form.Probability,
              "ProductId":this.form.ProductId,
              "PriceThreshold" :this.form.PriceThreshold
            }
            console.log(par)

          this.$confirm("是否保存设备信息?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            this.$api.equipment.put(this.query.Id,par)
              .then((res) =>{
                  if(res.data.status=='SUCCESS'){
                    this.$message({
                      type: "success",
                      message: "保存成功!"
                    });
                    this.$router.go(-1)
                  }else{
                    console.log(res)
                  }
              })
              .catch((res) => {
                  this.$message({
                      type: "fail",
                      message: res.msg
                  });
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$router.go(-1)
      },
      open(){
        // console.log(this)
        this.showCover = true;
      },
      close() {
        this.showCover = false;
        console.log()
      },
      val(e){
        this.bindPrize = true;
        this.form.ProductId = e.id;
        this.productImg = e.img;
        this.productName = e.name;
        console.log(e)
      },
      cancel(){
        this.bindPrize = false;
        this.form.ProductId ='';
      }
    },
    watch:{
      showCover(val,val2){
       // console.log(val,val2)

      }
    }
  }
</script>
