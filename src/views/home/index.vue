<template>
  <div>
    <el-container class="home-container">
      <!--  头部  -->
      <el-header>
        <Header/>
      </el-header>
      <el-container v-loading="fullscreenLoading">
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <sub-menu :menuList="submenu" @handleClick="setNavBar"></sub-menu>
        </el-aside>
        <!--    右侧主体区域    -->
        <el-main>
          <nav-bar :list="breadcrumbList"></nav-bar>
          <br>
          <router-view></router-view>
          <router-link to="/home"></router-link>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './component/header'
import subMenu from './component/submenu'
import navBar from './component/navBar';

export default {
  name: 'index',
  components: {
    Header,
    subMenu,
    navBar
  },
  data() {
    return {
      submenu: [],
      fullscreenLoading: false,
      breadcrumbList: {}
    }
  },
  methods: {
    getList() {
      this.fullscreenLoading = true
      this.$api.menus()
      .then(res => {
        this.submenu = res
        this.setNavBar(res)
      }).finally(() => {
        this.fullscreenLoading = false
      })
    },
    setNavBar(list) {
      const name = this.$router.currentRoute.path
      if(name){
        if(list instanceof Array) {
          list.forEach(item => {
            item.children.forEach(it => {
              if (name.includes(it.path)) {
                this.breadcrumbList = {
                  ...it,
                  name: item.authName
                }
              }
            })
          })
        }else {
          list.children.forEach(it => {
            if (name.includes(it.path)) {
              this.breadcrumbList = {
                ...it,
                name: list.authName
              }
            }
          })
        }
      }
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped lang="scss">
.home-container {
  height: 100vh;
}

.el-header {
  background-color: $primary_color;
}

.el-aside {
  background-color: $primary_color;
  opacity: 0.6;
  //color: #FFFFFF;
  //text-align: center;
  overflow-y: auto;
}
</style>
