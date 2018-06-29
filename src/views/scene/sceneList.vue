<template>
  <div class="scene">
      <div>
        <span>景品管理</span><span> ></span><span>全部景品</span>
      </div>
      <div class="title">全部景品</div>
      <div>
        <el-row>
          <el-button type="primary" @click="addScene">新建景品</el-button>
          <el-button type="info" @click="editScene()">编辑</el-button>
          <el-button type="success" @click="online()">上线</el-button>
          <el-button type="warning" @click="offline()">下架</el-button>
          <el-button type="danger" @click="deletePro()">删除</el-button>
        </el-row>
      </div>
      <div class="search">
        <span class="searTxt">景品编号：</span>
        <el-input v-model="code" class="no" placeholder="请输入景品编号"></el-input>
        <span class="searTxt txt">景品名称：</span>
        <el-input v-model="name" class="no" placeholder="请输入景品名称"></el-input>
        <!--<span class="shop">所在门店:</span>-->
        <!--<el-select v-model="value" placeholder="请选择">-->
          <!--<el-option-->
            <!--v-for="item in options"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
        <el-button class="searBtn" type="primary" @click="searchPro()">搜索</el-button>
      </div>
    <el-table border align="center"
      ref=""
      :data="products"
      tooltip-effect="dark"
      @select="handleSelectionChange"
      @selection-change="multipleId"
      style="width:100%">
      <el-table-column
        align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        prop="code"
        label="景品编号"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="景品名称"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop=""
        label="缩略图">
        <template slot-scope="scope">
          <img :src="scope.row.images" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="clawType"
        label="适配爪型">
      </el-table-column>
      <el-table-column
        align="center"
        :formatter="getPower"
        prop=""
        label="抓力区间">
      </el-table-column>
        <el-table-column
          align="center"
          :formatter="showIp"
          prop=""
          label="所属IP">
        </el-table-column>
        <el-table-column
          align="center"
          prop="size"
          label="尺寸">
        </el-table-column>
          <el-table-column
            align="center"
            prop="color"
            label="颜色/标签">
          </el-table-column>
          <el-table-column
            align="center"
            prop="cost"
            label="成本">
          </el-table-column>
          <el-table-column
            align="center"
            prop="price"
            label="售价">
          </el-table-column>
          <el-table-column
            align="center"
            :formatter="getStatus"
            prop=""
            label="状态">
          </el-table-column>
          <el-table-column
            align="center"
            prop="storeCount"
            label="绑定门店数量">
          </el-table-column>
    </el-table>
    <el-pagination  @current-change="handleCurrentChange" :page-size="20" background  :total="this.pageNation.total"  layout="prev, pager, next,jumper" v-if="this.pageNation.total>20">
    </el-pagination>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        No:'',
        multipleSelection: [],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        products: [],
        IP:[],
        params: {
          page:1,
          perpage:20
        },
       pageNation:{
       },
        name:'',
        code:'',
        value:'',
        rowId:''
      }
    },
    created(){
      this.getIps();
      this.getProductList();
    },
    methods:{
      //获取所有Ip
      getIps(){
        this.$api.IP.getList()
          .then(data=>{
            this.IP=data.data.data.IPs;
          }).catch(data=>{

        })
      },
      //遍历回显ip
      showIp(row){
        let name='';
        this.IP.forEach(item=>{
          if(item.Id==row.ipId){
            name=item.Name;
          }
        })
        return name;
      },
      getProductList(obj){
        this.params=obj?obj:this.params;
        this.$api.products.getProductList({params:this.params})
          .then(data=>{
            if(data.data.status=="SUCCESS"){
              this.products=data.data.data.products;
              this.pageNation=data.data.data.pagination;
            }
          })
      },
      getPower(row){
        return row.minPower+'-'+row.maxPower
      },
      getStatus(row){
        switch(row.status){
          case 0:
            return '已下架'
          case 1:
            return '在售'
          default:
            return ''
        }
      },
      addScene(){
        this.$router.push('/scene/addScene')
      },
      editScene(){
        if(!this.multipleSelection.length){
          this.$message({
            message: '请先选择景品',
            title: '错误'
          });
          return;
        };
        this.$router.push('/scene/sceneEdit/'+this.rowId)
      },
      handleCurrentChange(val){
        this.params.page=val;
        this.getProductList(this.params);
      },
      deletePro(){
        if(!this.multipleSelection.length){
          this.$message({
            message: '请先选择景品',
            title: '错误'
          });
          return;
        };
        this.$confirm('删除操作不恢复，您是否确定要执行删除操作？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.products.deletePro(this.rowId)
            .then(data => {
              if (data.data.status == "SUCCESS") {
                this.$message({
                  message: '该景品删除成功',
                  type: 'success'
                });
                this.getProductList()
              }
            })
        }).catch(() => {

        });
      },
      online() {
        if(!this.multipleSelection.length){
          this.$message({
            message: '请先选择景品',
            title: '错误'
          });
          return;
        };
        this.$api.products.online(this.rowId)
          .then(data => {
            if (data.data.status == "SUCCESS") {
              this.$message({
                message: '该景品上架成功',
                type: 'success'
              });
              this.getProductList()
            }
          })
      },
      offline(){
        if(!this.multipleSelection.length){
          this.$message({
            message: '请先选择景品',
            title: '错误'
          });
          return;
        };
          this.$api.products.offline(this.rowId)
            .then(data=>{
             if(data.data.status=="SUCCESS"){
               this.$message({
                 message: '该精品下架成功',
                 type: 'success'
               });
               this.getProductList()
             }
          })
      },
      handleSelectionChange(selection,row){
        this.rowId=row.id;
      },
      multipleId(val){
        this.multipleSelection = val;
      },
      searchPro(){
        let obj={
          name:this.name,
          code:this.code
        }
        this.getProductList(obj)
      }
    }
  }
</script>
<style lang="less" scoped>
  .scene{
    width:100%;
    .title{
      font-size:14px;
      line-height:14px;
      margin-top:10px;
    }
    .el-pagination{
      width:700px;
      float:right;
      margin-top:20px;
      text-align:right;
    }
    .search{
      margin-top:30px;
      line-height:40px;
      margin-bottom:20px;
      .searTxt{
        width:100px;
        float:left;
      }
      .txt{
        margin-left:10px;
      }
      .no{
        width:200px;
        float:left;
      }
      .shop,.searBtn{
        margin-left:20px;
      }
    }
  }
</style>
