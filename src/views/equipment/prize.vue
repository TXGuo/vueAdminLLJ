<template>
<div class='prize'>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="景品" style="">
      <el-input v-model="formInline.user" placeholder="请输入景品编号或名称"></el-input>
    </el-form-item>
    <el-form-item label="所在门店">
      <el-select v-model="formInline.region" placeholder="所在门店">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>

  <div class="table">
    <el-table ref="multipleTable" :height="height" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
      <el-table-column  prop="id" width="55">
        <template slot-scope="scope">
         <el-radio v-model="radio" :label="scope.row.id" @change="change(scope.row.id ,scope.row.name,scope.row.images)">{{num}}</el-radio>
        </template>
      </el-table-column>
      <el-table-column  prop="id" label="景品编号" width="120"> </el-table-column>
      <el-table-column prop="name" label="景品名称" width="120">  </el-table-column>
      <el-table-column prop="images" label="缩略图" show-overflow-tooltip>
        <template slot-scope="scope">
          <img class="image is-64x64" :src="scope.row.images" />
        </template>
      </el-table-column>
      <el-table-column prop="ipId" label="所属IP" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="size" label="尺寸" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="color" label="颜色/标签" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="cost" label="成本" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="price" label="售价" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="status" label="状态" show-overflow-tooltip>
       <template slot-scope="scope">
         <span>{{scope.row.status == 1? '在售':'下架'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="storeCount" label="所在门店" show-overflow-tooltip> </el-table-column>
    </el-table>
  </div>
  <div class='btn'>
    <el-button type="primary" @click='chooseCover'>确定</el-button>
    <el-button type="success" @click='closeCover()'>取消</el-button>
  </div>
  <div class="pagination">
    <el-pagination  background  layout="total,prev, pager, next"  :total="total" :current-page='currentPage'  :page-size="params.perpage"  @current-change="handleCurrentChange"></el-pagination>
  </div>
</div>

</template>

<style  lang="scss">
.prize{

  .lf {
    float: left;
    margin-right: 10px;
  }

  div.table {
    margin: 20px 0;
  }
  .el-form-item__label{
    color:#fff !important;
  }
  .btn{
    text-align: center;
    margin:20px auto;
  }
  .pagination{
    margin-top:20px;
    float: right;
  }
}
</style>

<script>

export default {
  props:[
    "formInline",
    "showCover",
    "close"
  ],
  data() {
    return {
        num:'',
        height:window.innerHeight/2,
        currentPage: 1,
        radio:"-1",
        tableData:[],
        total:100,
        params: {
          page: 1,
          perpage: 10,
        },
        bindVal:null
    };
  },
  mounted(){
    this.getProductList(this.params)
  },
  methods: {
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // },
    getProductList(params){
      this.$api.products.getProductList({params})
        .then(res=>{
          if(res.data.status=="SUCCESS"){
            this.tableData = [];
            var products=res.data.data.products;
            var pagination=res.data.data.pagination;
            console.log(products)
            console.log(pagination)
            this.total = pagination.total;
            this.tableData.push(...products)
            this.radio = products[0].Id;
            let bindVal = {
              id:products[0].Id,
              name:products[0].Name,
              img:products[0].TextImages
            }
            return bindVal
          }
        })
        .then(res=>{
        //  console.log(res)
          this.bindVal = res;
          // this.$emit('bindVal',res);
        })
    },
    onSubmit() {
      console.log('submit!');
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        var params = {
          page: val,
          perpage: this.params.perpage,
        }
        this.getProductList(params)
    },
    chooseCover(){
      console.log(this.bindVal)
      this.$emit('bindVal',this.bindVal);
      this.$parent.close()
      this.bindPrize = true;
    },
    closeCover(){
      console.log(132)
      this.$parent.close()
    },
    change(id,name,img){
      console.log(id,name,img)
      var val = {
        id,
        name,
        img
      };
      this.bindVal = val;
      // this.$emit('bindVal',val);
    }
  },
  // watch:{
  //   showCover(val,val2){
  //     console.log(val,val2)
  //     if(val){
  //       this.getProductList(this.params)
  //     }
  //   }
  // }
};
</script>
