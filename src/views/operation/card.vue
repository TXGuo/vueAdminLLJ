<template>
  <div class="cards">
    <el-button icon="el-icon-plus" type='primary' @click="$router.push('./newcard')">新建卡券 </el-button>
    <div class="margin"></div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="卡券关键字">
        <el-input v-model="formInline.code" placeholder="请输入激活码"></el-input>
      </el-form-item>
      <el-form-item label="卡券状态">
        <el-select v-model="formInline.status" placeholder="全部">
           <el-option label="全部" :value="-1"></el-option>
          <el-option label="未激活" :value="0"></el-option>
          <el-option label="已激活" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卡券类型">
        <el-select v-model="formInline.type" placeholder="全部">
          <el-option label="充值卡" :value="0"></el-option>
          <el-option label="活动赠送卡" :value="1"></el-option>
          <el-option label="内部测试卡" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <div class=""></div>
      <el-form-item label="卡券有效期">
        <el-col :span="11">
          <el-date-picker  type="datetime" v-model="formInline.startTime"  placeholder="选择开始时间"  default-time="12:00:00"
               value-format="timestamp" style="width: 100%;">
          </el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker  type="datetime" v-model="formInline.endTime"  placeholder="选择结束时间"  default-time="12:00:00"
               value-format="timestamp" style="width: 100%;">
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
     <div class="margin"></div>
    <div class="table">
      <el-table ref="multipleTable"  :data="tableData" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange" border align="center">
        <el-table-column type="selection" width="55" align="center"> </el-table-column>
        <el-table-column  prop="id" label="序号" width="100"  align="center"> </el-table-column>
        <el-table-column prop="code" label="激活码"  width="120"  align="center">  </el-table-column>
        <el-table-column prop="title" label="标题" width="100" align="center" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="balance" label="面额(啵啵币)" width="100" align="center" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="generateType" label="类型" width="80"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{scope.row.generateType == 0?'充值卡':scope.row.generateType == 1?'活动赠卡':'内部测试卡'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{scope.row.status == 1?'已激活':'未激活'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="validDate" label="有效期" width='350' align="center" show-overflow-tooltip > </el-table-column>
        <el-table-column prop="generateType" label="生成方式" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{scope.row.generateType == 0?'自动生成':'手动生成'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ownerUser" label="制券人"  align="center" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="user" label="持有人"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{scope.row.user == "0"?'/':scope.row.user}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="do" label="操作"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
              <el-button type="text" size="mini" v-if="scope.row.user != '0'"  @click="$router.push('./cardDetails?id='+scope.row.id+'&uid='+scope.row.user)">消费详情</el-button>
              <span type="text" size="mini" v-else style="color:#ddd">消费详情</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
     <el-pagination  background  layout="total,prev, pager, next"  :total="total" :current-page='currentPage'  :page-size="params.perPage"  @current-change="handleCurrentChange"></el-pagination>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .cards{
    // background: #fff;
    // padding:20px;
    .margin{
      margin:20px 0;
    }
    .line{
      text-align: center;
    }
     .pagination{
      margin-top:20px;
      float: right;
    }
    table
      td{
        text-align: center;
      }
  }
</style>

<script>
  export default {
    data() {
      return {
        formInline: {
          code:'',
          status: '',
          type:'',
          startTime: '',
          endTime: '',
        },
        tableData: [],
        params:{
          page:1,
          perPage:10
        },
        currentPage:1,
        total:0
      }
    },
    mounted(){
      var params = {
         page:1,
         perPage:this.params.perPage,
      }
      this.getTickets(params)
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        var params = {
          page:1,
          perPage:this.params.perPage,
          ...this.formInline
        }
        console.log(params)
        this.getTickets(params)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      getTickets(params){
        console.log(params)
        this.$api.operation.getTickets({params})
          .then((res) =>{
            if(res.data.status=='SUCCESS'){
              console.log(res.data.data)
              var pagination = res.data.data.pagination;
              var tickets = res.data.data.tickets;
              this.total = pagination.total;
              this.tableData = tickets;
            }
          })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.params.page=val;
        this.getTickets(this.params)
    },
    }
  }
</script>
