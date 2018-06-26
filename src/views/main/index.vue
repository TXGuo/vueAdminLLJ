<template>
  <div>
    <!--<div id="title">用户中心</div>-->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  mounted(){
    console.log(this)
  }
}
</script>
<style scoped lang="scss">
#title{
  font-size:16px;
  font-weight:bold;
}
</style>
