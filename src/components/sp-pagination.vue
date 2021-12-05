<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[2, 4, 10, 15]"
    :page-size="100"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>

<script>
export default {
  name: 'pagination',
  props:{
    currentPage: {
      default: 1,
      type: Number
    },
    total:{
      default: 0,
      type: Number
    },
    pageSize: {
      default: 10,
      type: Number
    }
  },
  methods: {
    handleSizeChange(val1) {
      console.log(val1);
      this.$emit('sizeChange',)
    },
    handleCurrentChange(val1) {
      console.log(val1);
    }
  }
}
</script>

<style scoped>

</style>
