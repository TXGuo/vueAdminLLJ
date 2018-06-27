<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="全部门店">
                <div class="wrap">
                    <div class="block">
                        <el-button type="primary" @click="jump(1)" icon="el-icon-circle-plus">
                            添加门店
                        </el-button>
                        <el-button type="success" @click="jump(2)">
                            编辑
                        </el-button>
                        <el-button type="danger" @click="del">
                            删除
                        </el-button>
                        <!--<router-link to="/store/checkQrcode">-->
                            <!--ddd-->
                        <!--</router-link>-->
                    </div>
                    <div>
                        <el-form :inline="true" ref="formInline" :model="formInline" :rules="rules"
                                 class="demo-form-inline">
                            <el-form-item label="活动时间:">
                                <el-col :span="11">
                                    <el-date-picker
                                            :clearable="true"
                                            value-format="timestamp"
                                            v-model="formInline.startTime"
                                            type="datetime"
                                            placeholder="选择日期"
                                                    style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line" :span="2" style="text-align: center">-</el-col>
                                <el-col :span="11">
                                    <el-date-picker
                                            value-format="timestamp"
                                            :clearable="true"
                                            v-model="formInline.endTime"
                                            type="datetime"
                                            placeholder="选择时间"
                                                    style="width: 100%;"></el-date-picker>
                                </el-col>
                            </el-form-item>

                            <el-form-item label="按关键字:">
                                <el-input v-model="formInline.name" placeholder="请输入门店名称/门店ID"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="selectData('formInline')">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <el-table border align="center"
                              ref="multipleTable"
                              :data="tableData3"
                              tooltip-effect="dark"
                              class="store-list"
                              style="width: 100%;overflow: visible"
                              @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection">
                        </el-table-column>
                        <el-table-column
                                prop="id"
                                label="门店ID"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="createTime"
                                label="创建时间"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                label="门店地址"
                                :formatter="formatRole"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="门店名称"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="门店类型"
                                :formatter="formType"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="ownerName"
                                label="门店负责人"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="phone"
                                label="负责人电话"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="deviceCount"
                                label="设备数量"
                                align="center">
                        </el-table-column>
                        <el-table-column align="center" label="门店充值二维码" style="overflow: visible">
                            <template slot-scope="scope">
                                <div v-if="scope.row.qrcode">
                                    <span @mouseover="showQrCode(scope.$index,scope.row.qrcode)" class="qr-code-title">店铺二维码</span>
                                    <canvas id="canvas" class="code"></canvas>
                                    <br>
                                    <!--<router-link to="/store/drawQrCode">-->
                                    <span class="create-qr-code" @click="jumpDrawHtml(scope.row.id,scope.row.qrcode)">重新生成</span>
                                    <!--</router-link>-->
                                </div>
                                <div v-else>
                                    <canvas id="canvas" class="code"></canvas>
                                    <span class="create-qr-code" @click="jumpDrawHtml(scope.row.id,0)">生成二维码</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <br>
                <!--<Pagination :metadata="pagination" @paginated="paginated"></Pagination>-->
            </el-tab-pane>
        </el-tabs>
        <div>
            <!--<canvas id="canvas" width="200" height="200"></canvas>-->
        </div>
    </div>
</template>


<script>
  import Vue from 'vue'
  // import QRCode from 'qrcode'
  // Vue.use(QRCode)
  // import Pagination from '../../components/ui/Pagination' //分页组件
  export default {
    data() {
      return {
        codes:'',
        pagination: {},
        timeStart: null,
        timeEnd: null,
        params: {
          page: 1,
          perpage: 10
        },
        params1: {},
        tableData3: [],
        multipleSelection: [],
        rules: {
          phoneNumber: [
            {
              pattern: /^1(3|4|5|7|8)\d{9}$/,
              message: '手机号码格式有误'
            }
          ],
        },
        formInline: {//输入框组件需要的变量
          startTime: '',
          endTime: '',
          name: ''
        },
      }
    },

    methods: {
      userEdit(event) { // 跳转到用户编辑页面 id=0 新增 id!=0 编辑
        this.$router.push('/client/addUser/' + event.id);
      },
      loadData(page) {
        if (page) {
          this.params.page = page
        }
        if (!(JSON.stringify(this.params1) == "{}")) {//搜索条件拼接
          this.params = Object.assign(this.params, this.params1);
        }
        this.$api.store.getList({params: this.params}).then((data) => {
          let res = data.data;
          if (res.status === "SUCCESS") {
            let users = res.data.stores;
            this.tableData3 = users;
            this.pagination = res.data.pagination
          } else {
            console.log('出错了')
          }
        }).catch(() => {
          console.log('HTTP出错了1111')
        })
      },
      paginated(page) {
        this.loadData(page)
      },
      selectData(selectData) { //查询条件
        var startTime = this.formInline.startTime,
            endTime = this.formInline.endTime,
            val = this.formInline.name;

        if(startTime&&endTime){
          if(new Date(startTime).getTime()>new Date(endTime).getTime()){
            this.$message({
              message:"结束日期不能大于开始日期",
              type:'error'
            })
            return false;
          }
        }
        let reg = /^[0-9]$/;
        this.params1={
          startTime:startTime,
          endTime:endTime,
        }
        if(reg.test(val)){
          this.params1.id=val
        }else{
          this.params1.name=val
        }
        this.loadData();
      },
      jump(index) {//跳转到门店新增页面 index:1 门店编辑页面 index:2 权限管理页面
        var url = null;
        if (index == 1) {
          url = '/store/edit/0';
        } else if (index == 2) {
          let arr = this.multipleSelection;
          if (!arr.length || arr.length > 1) {
            this.prompt('请您选择一个门店,进行操作', 'warning');
            return;
          }
          url = '/store/edit/' + arr[0];
        }
        this.$router.push(url);
      },
      del(){
        let arr = this.multipleSelection;
        if (!arr.length || arr.length > 1) {
          this.prompt('请您选择一个门店,进行删除操作', 'warning');
          return;
        }
        var _this = this;
        this.toast("删除操作将不可恢复！确定要执行删除操作？", '提示', 'warning', () => {
          _this.$api.store.del(arr[0]).then((data)=>{
              var res = data.data;
              if(res.status === "SUCCESS"){
                _this.loadData()
              }
            }).catch(()=>{})
        }, () => {
          // alert(111)
        })

      },
      handleSelectionChange(val) {//table复选框事件
        this.multipleSelection = [];
        for (let i = 0, j = val.length; i < j; i++) {
          let id = val[i].id;
          this.multipleSelection.push(id)
        }
      },
      prompt(message, type) {//信息公共弹框
        this.$message({
          message: message,
          type: type,
          center: true,
          duration: 1500
        });
      },
      toast(content, title, type, successCallback, errorCallback) {
        this.$confirm(content, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: type
        }).then(successCallback).catch(errorCallback);
      },
      formatRole(row, column) {
        return row.province + row.city + row.region + row.detail;
      },
      formType(row){
        switch (row.type){
          case 0:
            row.type = "自营"
            break;
          case 1:
            row.type = "合伙"
            break;
          case 2:
            row.type = "临时合伙"
            break;
        }
        return row.type;
      },
      useqrcode (index,code) {
        // var canvas = document.querySelectorAll('.code')[index];
        // for(let i = 0;i<canvas.length;i++){
        //   QRCode.toCanvas(canvas, code, function (error) {
        //     if (error) console.error(error)
        //   })
        // }
      },
      showQrCode(index,code){
        // this.useqrcode(index,code)
      },
      jumpDrawHtml(id,code){
        console.log(id,code)
        if(!id&&code){
          this.$message({
            message: '参数丢失了',
            type:'warning'
          })
          return;
        }
        this.$router.push({name:'qrcode', params:{ id:id, qrcode:code}})
      }
    },
    mounted() {
      this.loadData();
      // console.log(this.$router)
    },
    components: {
     // Pagination
    },
  }
</script>

<style lang="scss" type="text/scss">
    .store-list .el-table__body-wrapper.is-scrolling-none {
        overflow: visible;
    }

    .code {
        position: absolute;
        width: 100px!important;
        height: 100px!important;
        left: 50%;
        margin-left: -50px;
        top:-100px;
        display: none;
        cursor: pointer;
        border: 1px solid #999;
    }
    .create-qr-code{
        cursor: pointer;
    }
    .qr-code-title{
        color: blue;
        cursor: pointer;
    }
    .qr-code-title:hover + canvas{
        display: block;
    }
</style>
