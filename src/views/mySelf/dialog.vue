<template>
  <div>
    <!--{{centerDialogVisible}}-->
    <el-dialog
      title="提示"
      :visible="centerDialogVisible"
      width="30%"
      center>
      <span>原始密码错误，请重新输入！</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="close">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  export default{
      data(){
          return{
          }
      },
    props:["centerDialogVisible"],
    methods:{
        close(){
          this.centerDialogVisible=false;
        }
    }
  }
</script>
