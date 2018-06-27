<template>
  <div class="list">
    <div class="header">
        <span>IP管理</span><span> ></span><span>IP列表</span>
    </div>
    <h3>IP列表</h3>
    <div class="btns">
      <el-row>
        <el-button icon="el-icon-plus" type="primary" @click="addIp">新建</el-button>
        <el-button type="" @click="editIp">编辑</el-button>
        <el-button type="danger" @click="deleteIp()">删除</el-button>
      </el-row>
    </div>
    <div class="search">
      <span class="searTxt">按关键字：</span>
      <el-input v-model="name"  @keyup.enter.native="search()" class="no" placeholder="请输入标签名称"></el-input>
      <el-button @click="search()" type="primary">搜索</el-button>
    </div>
    <el-table border :data="IPs" class="ipList" ref="" @select="getIpId" tooltip-effect="dark" style="width:100%;"  @selection-change="handleSelectionChange">
      <el-table-column
        align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        prop="Id"
        label="序号"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="Name"
        label="IP名称"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="Source"
        label="IP来源">
      </el-table-column>
      <el-table-column
        align="center"
        prop="MOJIGOID"
        label="关联mojigo形象ID">
      </el-table-column>
    </el-table>
    <el-pagination  @current-change="handleCurrentChange" :page-size="20" background  :total="this.pageNation.total"  layout="prev, pager, next,jumper" v-if="this.pageNation.total>20">
    </el-pagination>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        IPs:[],
        multipleSelection:[],
        params:{
          page:1,
          perpage:20
        },
        name:'',
        rowId:null,
        pageNation:{
        },
      }
    },
    created(){
      this.getList()
    },
    methods:{
      search(){
        let obj={
          name:this.name
        }
        this.getList(obj)
      },
      getList(obj){
        this.params=obj?obj:this.params;
        this.$api.IP.getList({params:this.params})
          .then(data=>{
            if(data.data.status=="SUCCESS"){
             this.IPs=data.data.data.IPs;
              this.pageNation=data.data.data.pagination;
            }
          })
      },
      getIpId(selection,row){
        this.rowId=row.Id;
      },
      addIp(){
        this.$router.push('/ip/add')
      },
      editIp(){
        if(!this.multipleSelection.length){
          this.$message({
            message: '请先选择IP',
            title: '错误'
          });
          return;
        };
        this.$router.push('/ip/edit/'+this.rowId)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteIp(){
        if(!this.multipleSelection.length){
          this.$message({
            message: '请先选择IP',
            title: '错误'
          });
          return;
        };
        this.$confirm('删除操作不恢复，您是否确定要执行删除操作？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.IP.deleteIp(this.rowId)
            .then(data=>{
              if(data.data.status=="SUCCESS"){
                this.$message({
                  message: '该IP删除成功',
                  type: 'success'
                });
                this.getList();
              }
            })
        }).catch(() => {

        });
      }
    }
  }
</script>
<style lang="less" scoped>
  .list{
    width:600px;
    h3{
      font-weight:bold;
      margin-top:10px;
    }
    .search,.btns{
      margin-top:10px;
    }
    .el-input{
      width:300px;
    }
    .ipList{
      margin-top:20px;
    }
  }
</style>
