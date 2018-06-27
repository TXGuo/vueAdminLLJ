<template>
  <div class="cardDetails">
    <el-row>
      <el-col :span="2">
        <span>卡券余额：1500</span>
      </el-col>
      <el-col :span="2">
        <span>抓物：10</span>
      </el-col>
       <el-col :span="2">
        <span>状态：正常</span>
      </el-col>
    </el-row>
    <h2>卡券消费记录</h2>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="按消费时间">
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
      <el-form-item label="按门店">
        <!-- <el-select v-model="formInline.storeId" placeholder="门店">
          <el-option label="全部" :value="0"></el-option>
          <el-option label="店铺1" :value="1"></el-option>
          <el-option label="店铺2" :value="2"></el-option>
        </el-select> -->
         <el-select v-model="formInline.storeId" placeholder="请选择">
            <el-option
              v-for="item in StoreItem"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="table">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column  prop="ID" label="序号" width="50"> </el-table-column>
        <el-table-column prop="consumerTime" label="消费时间" width="180">  </el-table-column>
        <el-table-column prop="storeName" label="所在门店" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="deviceId" label="操作设备" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="coin" label="消费金额" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="productName" label="抓物名称" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="status" label="抓取状态" show-overflow-tooltip> </el-table-column>
      </el-table>
    </div>
     <div class="pagination">
     <el-pagination  background  layout="total,prev, pager, next"  :total="total" :current-page='currentPage'  :page-size="params.perPage"  @current-change="handleCurrentChange"></el-pagination>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .cardDetails{
    // background: #fff;
    // padding:20px;
    h2{
      font-weight: bold;
      margin:20px 0;
    }
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
  }
</style>
<script>
  export default {
    data() {
      return {
        formInline: {
          storeId: '',
          startTime:'',
          endTime:''
        },
        StoreItem:[],
        tableData: [],
        id:'',
        uid:'',
        currentPage:1,
        params:{
          page:1,
          perPage:10
        },
        total:0
      }
    },
    mounted(){
      var q = this.$route.query;
      this.id = q.id;
      this.uid = q.uid;
      this.ticketsDetail(this.params)
      this.getStoreLists(this.params)
    },
    methods: {
      onSubmit() {
         var params = {
           ...this.params,
           ...this.formInline
         }
         console.log(params)
         this.ticketsDetail(params)
      },
      ticketsDetail(params){
        this.$api.operation.ticketsDetail(this.id,this.uid,{params})
          .then((res) =>{
            console.log(res)
            if(res.data.status=='SUCCESS'){
              console.log(res.data.data)
              var pagination = res.data.data.pagination;
              var tickets = res.data.data.ticketConsumRecords;
              this.total = pagination.total;
              this.tableData = tickets;
            }
          })
      },
       handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.params.page = val;
        this.ticketsDetail(this.params)
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
