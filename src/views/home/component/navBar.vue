<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>{{ list.name }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ list.authName }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

</template>

<script>
export default {
  name: 'navBar',
  props: {
    list: {
      default: Object
    }
  }
}
</script>

<style scoped>

</style>
