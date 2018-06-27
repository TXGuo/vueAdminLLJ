<template>
    <el-tabs type="border-card">
        <el-tab-pane label="门店充值二维码">
            <el-row>
                <el-col>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
                        <el-form-item  label="门店充值链接:" prop="name">
                            <el-row :lg="18" :xl="14">
                                <el-col :lg="8">
                                    <el-input :disabled="false" v-model="ruleForm.name"></el-input>
                                </el-col>
                                <el-col :lg="5" style="margin-left:20px">
                                    <el-row>
                                        <el-button @click="drawQrCode('ruleForm')" type="primary">生成二维码</el-button>
                                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-col :span="24">
                                <div id="code">
                                    <canvas v-show="!show" id="canvas"></canvas>
                                </div>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-button :disabled="show" type="success" @click="downLoadImage">下 载</el-button>
                            <el-button @click="cancel">取 消</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

        </el-tab-pane>
    </el-tabs>
</template>
<script>
  import Vue from 'vue'
  // import QRCode from 'qrcode'

  // Vue.use(QRCode)
  export default {
    data() {
      return {
        code: {
          qrcode: '',
          id: ''
        },
        ruleForm: {
          name: '',
        },
        show: true,
        rules: {
          name: [
            {required: true, message: '请输入门店充值链接地址', trigger: 'blur'},
            {max: 128, message: '最多输入128个字符!', trigger: 'blur'},
            {
              pattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/,
              message: '请输入正确链接地址'
            }
          ],
        }
      };
    },
    methods: {
      useqrcode(code) {
        // var canvas = document.getElementById('canvas')
        // QRCode.toCanvas(canvas, code, function (error) {
        //   if (error) console.error(error)
        // })
      },
      downLoadImage() {
        var canvas = document.getElementById('canvas'),
            image = new Image(),
            downLoad = document.createElement("a");
        console.log(canvas.toDataURL())
        image.src = canvas.toDataURL("image/png");
        downLoad.href = image.src;
        downLoad.download = "店铺充值二维码";
        downLoad.click();
      },
      cancel() {
        this.$router.back(-1)
      },
      drawQrCode(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.code.qrcode = this.ruleForm.name;
            this.$api.store.putQrCode(this.code.id, this.code.qrcode)
                .then((res) => {
                  var res = res.data;
                  if (res.status == 'SUCCESS') {
                    this.useqrcode(this.ruleForm.name);
                    this.show = false;
                  }
                })
                .catch((error) => {
                })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.show = true;
      }
    },
    mounted() {
      /**
       * 1.获取当前是否生成过二维码
       * 2.生成过渲染二维码,否则清空
       */
      let params = this.$route.params;

      this.status = status;
      console.log(params)
      if (params.qrcode == '0') {//未生成过
        //获取当前
        this.code = params;
      } else {
        this.code = params;
        this.ruleForm.name = params.qrcode;
        this.useqrcode(params.qrcode);
        this.show = false;
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss">
    #code {
        width: 200px;
        height: 200px;
    }
.reset{
    margin-right:15px
}
    #canvas {
        width: 200px !important;
        height: 200px !important;
        border: 1px solid #eee;
    }
</style>
