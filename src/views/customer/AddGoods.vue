<template>
    <div class="wrap">
        <h1 class="title-A">账户预览</h1>
        <el-row>
            <el-col :span="8">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="商品名称:">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称:">
                        <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed"
                                >
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="兑换积分:">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item label="兑换方式:">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="线下自取"></el-radio>
                            <el-radio label="线上邮寄"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="库存数量:">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品详情">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
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

    .wrap {
        background-color: #fff;
        margin: -20px;
        padding: 20px;
    }
</style>

<script>
  export default {
    data() {
      return {
        // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
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
