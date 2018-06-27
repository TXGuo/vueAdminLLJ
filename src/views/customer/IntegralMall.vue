<template>
    <div>
        <div class="wrap">
            <el-tabs type="border-card">
                <el-tab-pane label="全部商品">
                    <div class="block">
                        <el-button type="primary" @click="jump(1)" icon="el-icon-circle-plus">
                            新建商品
                        </el-button>
                        <el-button @click="clickHandle(1)" type="warning">
                            编辑
                        </el-button>
                        <el-button @click="clickHandle(2)" type="success">
                            上线
                        </el-button>
                        <el-button @click="clickHandle(3)" type="danger">
                            下架
                        </el-button>
                    </div>
                    <!--搜索表单-->
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="商品：">
                            <el-input v-model="formInline.user" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="状态：">
                            <el-select v-model="formInline.user" placeholder="全部">
                                <el-option
                                        v-for="item in ['全部','上线','下架']"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-button style="float: right">
                        导出Excel
                    </el-button>
                    <br>
                    <br>
                    <!--全部商品表格-->
                    <el-table border align="center"
                              ref="multipleTable"
                              :data="tableData.table1"
                              tooltip-effect="dark"
                              style="width: 100%"
                              @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection">
                        </el-table-column>
                        <el-table-column
                                prop="id"
                                label="商品ID"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                label="创建时间"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="商品名称"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="sImg"
                                label="缩略图"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="registerDate"
                                label="兑换积分"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="状态"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="power"
                                label="兑换方式"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="department"
                                label="库存"
                                align="center">
                        </el-table-column>
                    </el-table>
                    <br>
                    <Pagination :metadata="pagination" @paginated="paginated"></Pagination>
                </el-tab-pane>
                <el-tab-pane label="订单管理">
                    <!--搜索表单-->
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="昵称/单号：">
                            <el-input style="width: 220px" v-model="formInline.user"
                                      placeholder="请输入兑换用户昵称或快递单号"></el-input>
                        </el-form-item>
                        <el-form-item label="状态：">
                            <el-select v-model="formInline.user" placeholder="根据发货状态选择">
                                <el-option
                                        v-for="item in ['未发货','发货']"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-button style="float: right">
                        导出Excel
                    </el-button>
                    <br><br>
                    <!--全部商品表格-->
                    <el-table border align="center"
                              ref="multipleTable"
                              :data="tableData.table2"
                              tooltip-effect="dark"
                              style="width: 100%"
                              @selection-change="handleSelectionChange">
                        <el-table-column
                                prop="id"
                                label="序号"
                                align="center"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="userId"
                                label="兑换用户ID"
                                align="center"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="userName"
                                label="兑换用户昵称"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="shopId"
                                label="兑换商品ID"
                                align="center"
                                width="70">
                        </el-table-column>
                        <el-table-column
                                prop="shopType"
                                label="商品类型"
                                align="center"
                                width="70">
                        </el-table-column>
                        <el-table-column
                                prop="shopName"
                                label="商品名称"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="shopPrice"
                                label="兑换价格"
                                align="center"
                                width="70">
                        </el-table-column>
                        <el-table-column
                                prop="buyType"
                                label="兑换方式"
                                align="center"
                                width="70">
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                label="兑换时间"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="receiver"
                                label="收货人"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="phone"
                                label="联系电话">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="收货地址">
                        </el-table-column>
                        <el-table-column
                                prop="registerDate"
                                label="快递公司"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="运单编号"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                align="center"
                                width="120"
                                style="height: 100%">
                            <template slot-scope="scope">
                                <el-button type="primary" class="fa fa-truck" size="small"> 发 货</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>
                    <!--<Pagination :metadata="pagination" @paginated="paginated"></Pagination>-->
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style scoped lang="scss" type="text/scss">
    .title {
        font-size: 24px;
        text-align: center;
    }

    .el-table td.is-hidden {
        display: block !important;
    }

    .filters {
        padding-bottom: 20px;
        input {
            min-height: 40px;
            width: 300px;
            margin-right: 10px;
        }

        button {
            margin-left: 10px;
            margin-top: 4px;
        }
    }
</style>

<script>
  // import Pagination from '../../components/ui/Pagination' //分页组件

  export default {
    data() {
      return {
        tableData4: [
          {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-08',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-06',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-07',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }
          ],
        pagination: {"total": 300, "page": 1, "perPage": 20, "hasNext": false},
        timeStart: null,
        timeEnd: null,
        products: null,
        formInline: {//输入框组件需要的变量
          user: '',
          userId: '',
          phone: ''
        },
        tableData: {
          table1: [
            {//tab表格数据 全部商品数据
              id: '00002',
              date: '2018-05-30 12:20:35',
              name: '长草颜团子',
              sImg: '',
              registerDate: "2000",
              status: "在售",
              power: "自取",
              department: "10"
            }, {//
              id: '00004',
              date: '2018-05-30 12:20:35',
              name: '蜗牛旱獭',
              sImg: '',
              registerDate: "5000",
              status: "在售",
              power: "邮寄",
              department: "5"
            }],
          table2: [
            {//tab表格数据 全部商品数据
              id: '465',
              userId: '465',
              userName: 'lanmeixinyu',
              shopId: '3',
              shopType: '实物商品',
              shopName: '长草颜团子自拍杆',
              shopPrice: '2000',
              buyType: '线上兑换',
              date: '2018-05-30 12:20:35',
              receiver: 'xxxx',
              phone: '13512341234',
              address: '北京市北京市西城区笤帚胡同',
              registerDate: "未上传",
              status: "无",
            }, {//
              id: '464',
              userId: '464',
              userName: 'lanmeixinyu',
              shopId: '3',
              shopType: '实物商品',
              shopName: '长草颜团子自拍杆',
              shopPrice: '2000',
              buyType: '线上兑换',
              date: '2018-05-30 12:20:35',
              receiver: 'xxxx',
              phone: '13512341234',
              address: '北京市北京市西城区笤帚胡同',
              registerDate: "未上传",
              status: "无",
            }]
        },
        multipleSelection: []
      }
    },

    methods: {
      paginated(page) {
        // alert("当前页码" + page)
        this.pagination.page = page
        console.log(page)
      },
      refreshList(selectData) { //查询条件
        console.log("查询条件为 " + selectData)
      },
      jump(index) {//跳转到新增用户页面 index:1 新增用户页面 index: 权限管理页面

        this.$router.push('/customer/addGoods');
      },
      handleSelectionChange(val) {//table复选框事件
        this.multipleSelection = [];
        for (let i = 0, j = val.length; i < j; i++) {
          let id = val[i].id;
          this.multipleSelection.push(id)
        }
        console.log(this.multipleSelection)
      },
      clickHandle(status) {//顶部按钮点击事件 1=编辑 2=上线 3=下线
        switch (status) {
          case 1:
            this.$router.push('addGoods')
            break;
          case 2:
            break;
          case 3:
            break;
        }
      }
    },
    mounted() {
      console.log(this.$router)
    },
    components: {
      // Pagination
    }
  }
</script>
