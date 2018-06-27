<template>
<div class='con'>
  <ul>
    <li>
      <span class="lf">设备</span>
      <div class="lf">
        <el-input v-model="DeviceId" :placeholder="activeName=='A'?'请输入设备ID':'请输入设备ID或名称'"></el-input>
      </div>
    </li>
    <li>
      <span class="lf">设备类型</span>
      <div class="lf">
        <el-select v-model="Type" placeholder="请选择">
          <el-option  label="全部" value=""> </el-option>
          <el-option
            v-for="item in TypeItem"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
      </div>
    </li>
    <li>
      <span class="lf">所属门店</span>
      <div class="lf">
        <el-select v-model="store" placeholder="请选择">
          <el-option  label="全部" value=""> </el-option>
          <el-option
            v-for="item in StoreItem"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
      </div>
    </li>
    <li>
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </li>
  </ul>
  <el-row>
    <el-button type="primary" @click="to(checked)">{{tabIdx==0?"初始化设置":"编辑"}}</el-button>
    <el-button type="success" @click="deleteDevice">删除</el-button>
  </el-row>
  <div class="table">
    <el-table ref="multipleTable" :data="tableData" border align="center" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
     <el-table-column  prop="Id" width="55" align="center">
        <template slot-scope="scope">
         <el-radio v-model="radio" :label="scope.row.DeviceId" @change="change(scope.row)" >{{''}}</el-radio>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="DeviceId" label="设备主板ID" width="120"> </el-table-column>
      <el-table-column align="center" prop="Type" label="设备类型" width="120">  </el-table-column>
      <el-table-column align="center" prop="Store" label="设备所属门店" show-overflow-tooltip> </el-table-column>
      <el-table-column align="center" prop="Name" label="自定义名称" show-overflow-tooltip>
        <template slot-scope="scope">
            <span>{{scope.row.Name == ''? '/' : scope.row.Name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="MaxPower" label="强抓力" show-overflow-tooltip>
        <template slot-scope="scope">
            <span>{{scope.row.MaxPower == 0? '/' : scope.row.MaxPower}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="MinPower" label="弱抓力" show-overflow-tooltip>
        <template slot-scope="scope">
            <span>{{scope.row.MinPower == 0? '/' : scope.row.MinPower}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="ClawType" label="设备爪型" show-overflow-tooltip>
        <template slot-scope="scope">
            <span>{{scope.row.ClawType == '' ? '/' : scope.row.ClawType}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="PriceThreshold" label="设备启动币数" show-overflow-tooltip>
        <template slot-scope="scope">
            <span>{{scope.row.PriceThreshold == 0 ? '/' : scope.row.PriceThreshold}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="ProductId" label="景品绑定" show-overflow-tooltip>
        <template slot-scope="scope">
            <span>{{scope.row.ProductId == 0 ? '/' : scope.row.ProductId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="Probability" label="抓取概率" show-overflow-tooltip>
        <template slot-scope="scope">
            <span>{{scope.row.Probability == 0 ? '/' : scope.row.Probability}}</span>
        </template>

      </el-table-column>
    </el-table>
  </div>
  <div class="pagination">
    <el-pagination  background  layout="total,prev, pager, next"  :total="total" :current-page='currentPage'  :page-size="params.perpage"  @current-change="handleCurrentChange"></el-pagination>
  </div>
</div>

</template>

<style scoped lang="scss">
.con {
  .lf {
    float: left;
    margin-right: 10px;
  }
  ul {
    overflow: hidden;
    margin: 20px 0;
    li {
      float: left;
      line-height: 32px;
      margin-right: 20px;
    }
  }
  div.table {
    margin: 20px 0;
  }
  .pagination {
    margin-top: 20px;
    float: right;
  }
}
</style>

<script>
export default {
  props: ["activeName", "tabIdx"],
  data() {
    return {
      DeviceId: "",
      Type: "",
      radio: 0,
      checked: -1,
      TypeItem: [
        {
          value: 1,
          label: "标准机"
        },
        {
          value: 2,
          label: "迷你机"
        },
        {
          value: 3,
          label: "双人机"
        },
        {
          value: 4,
          label: "大爪机"
        }
      ],
      StoreItem: [],
      store: "",
      tableData: [],
      currentPage: 1,
      total: 0,
      params: {
        page: 1,
        perpage: 10,
        status: 1
      },
      multipleSelection: []
    };
  },
  mounted() {
    if (this.activeName == "A") {
      //  console.log(this.params)
      this.getDeviceList(this.params);
    }
    var params = {
      page: 1,
      perpage: 10
    };
    this.getStoreLists(params);
  },
  methods: {
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // },
    getStoreLists(params) {
      //获取店铺信息
      this.$api.store.getList({ params }).then(res => {
        //  console.log(res.data)
        if (res.data.status == "SUCCESS") {
          //     console.log(res.data.data.store)
          var StoreItem = res.data.data.stores;
          console.log("----------");
          //this.StoreItem =
          for (let i in StoreItem) {
            StoreItem[i].value = StoreItem[i].id;
            StoreItem[i].label = StoreItem[i].name;
          }
          this.StoreItem.push(...StoreItem);
        }
      });
    },
    deleteDevice() {
      console.log(this.checked);
      if (this.checked == -1) {
        this.$message({
          type: "warning",
          message: "请选择要删除的设备"
        });
        return
      }
      this.$confirm("删除该设备?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.equipment.delete(this.checked).then(res => {
            console.log(res);
            if (res.data.status == "SUCCESS") {
              console.log(this.params);
              this.getDeviceList(this.params);
              this.$message({
                type: "success",
                message: "删除成功"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    change(item) {
      // console.log(item)
      this.multipleSelection = item;
      this.checked = item.Id;
      // console.log(this.checked)

      // this.$emit('bindVal',val);
    },
    getDeviceList(params) {
      this.$api.equipment.get({ params }).then(res => {
        if (res.data.status == "SUCCESS") {
          // console.log(res.data.data)
          this.tableData = [];
          var pagination = res.data.data.pagination; //分页相关信息
          var lists = res.data.data.devices; //列表
          this.total = pagination.total;
          this.tableData.push(...lists);
          //  console.log(this.tableData)
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.params.page = val;
      this.params.status = this.activeName == "A" ? 1 : 2;
      this.getDeviceList(this.params);
    },
    search() {
      var params = {
        page: 1,
        perpage: this.params.perpage,
        status: this.activeName == "A" ? 1 : 2,
        type: this.Type,
        store: this.store
      };
      isNaN(parseInt(this.DeviceId)) == true
        ? (params.name = this.DeviceId)
        : (params.deviceId = this.DeviceId);
      console.log(params);
      this.getDeviceList(params);
      console.log(params);
    },
    to(id) {
      console.log(this.multipleSelection);
      if (this.multipleSelection.length != 0) {
        this.$router.push({
          path: "./init:" + id,
          query: {
            ...this.multipleSelection
          }
        });
      } else {
        this.$message({
          message: "请选择设备",
          type: "warning"
        });
      }
    }
  },
  watch: {
    activeName(val, val2) {
      console.log(val, val2);
      if (val == "A") {
        this.params.status = 1;
        this.getDeviceList(this.params);
      } else {
        this.params.status = 2;
        this.getDeviceList(this.params);
      }
    }
  }
};
</script>
