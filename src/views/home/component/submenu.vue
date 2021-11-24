<template>
  <div>
    <el-menu unique-opened :default-active="this.$router.currentRoute.path" class="el-menu-vertical-demo"
      background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
      <template v-for="(item,index) in menuList">
        <el-submenu :index="item.path" :key="item.id">
          <template slot="title">
            <i :class="icon[index]"></i>
            <span>{{ item.authName }}</span>
          </template>
          <template v-if="item.children.length">
            <el-menu-item v-for="(tItem,tIndex) in item.children" :key="tItem.id" :index="'/' + tItem.path" @click="handleOpen(item,tIndex)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ tItem.authName }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'menuList',
  props: {
    menuList: {
      default: [],
    }
  },
  data() {
    return {
      isCollapse: true,
      icon: ['el-icon-user-solid', 'el-icon-setting', 'el-icon-more-outline', 'el-icon-goods', 'el-icon-notebook-1'],
      active: this.$router.currentRoute.path.length > 1 ? this.$router.currentRoute.path : ''
    }
  },
  watch: {
    $route(val) {
      this.active = val.path
    }
  },
  methods: {
    handleOpen(item, index) {
      this.$emit('handleClick', item)
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /*min-height: 400px;*/
}

.el-menu-vertical-demo {
  width: 64px;
  /*min-height: 400px;*/
}
</style>
