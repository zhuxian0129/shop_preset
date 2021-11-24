<template>
  <div class="contain">
    <div class="left">
      <img src="~@/assets/img/headerLogo.png" width="80" height="40" />
      <div>
        <span>电商后台管理系统</span>
      </div>
    </div>
    <div class="right">
      <el-button type="info" @click="signOut">退出登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  methods: {
    signOut () {
      window.sessionStorage.clear()
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped lang="scss">
.contain{
  height: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  .left{
    display: flex;
    align-items: center;
    div{
      margin-left: 15px;
    }
  }
}
</style>
