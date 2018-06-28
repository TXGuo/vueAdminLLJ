<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">

      <!-- 单个 没有children -->
      <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <i :class="['fa',item.meta.icon]"></i>
          <!--<i v-if="item.children[0].meta&&item.children[0].meta.icon" class="fa" :class="item.children[0].meta.icon"></i>-->
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>

      <!-- submenu -->
      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <i :class="['fa',item.meta.icon]"></i>
          <!--<svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>-->
          <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name" @click.native="toggle(child,item)">
            <el-menu-item :index="item.path+'/'+child.path">
              <!--<i :class="['fa',item.meta.icon]"></i>-->
              <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    toggle(index){
      console.log(index)
    }
  }
}
</script>
<style lang="less" scoped>
  .is-active .el-submenu__title i{
    color:#fff;
  }
</style>
