<template>
<div class='operative'>
 <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="待初始化设备" name="A">
      <!-- <container :activeName="activeName" :input="input" :value="value" :value2="value2" :options="options" :tableData="tableData" :tabIdx='0' :currentPage='currentPage'></container> -->
      <container  :activeName='activeName' :tabIdx='0'></container>
    </el-tab-pane>
    <el-tab-pane label="运行中设备" name="B">
      <container :activeName='activeName' :tabIdx='1'></container>
    </el-tab-pane>
  </el-tabs>
</div>

</template>
<style scoped lang="scss">
.operative {

}
</style>

<script>
import  container from "./container"

export default {
  data() {
    return {
      activeName: "A",
    };
  },
  components:{
    container
  },
  // mounted(){
  //   this.$api.equipment.get({params:this.params})
  //   .then((res) =>{
  //       if(res.data.status=='SUCCESS'){
  //         console.log(res.data.data)
  //         var pagination = res.data.data.pagination; //分页相关信息
  //         var lists =  res.data.data.devices; //列表
  //       }
  //   })

  // },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },

  }
};
</script>
