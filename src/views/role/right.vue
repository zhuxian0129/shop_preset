<template>
  <div>
    <el-table :loading="loading" :data="rightList" border stripe style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="authName" label="权限说明">
      </el-table-column>
      <el-table-column prop="path" label="对应访问路径">
      </el-table-column>
      <el-table-column prop="level" label="权限层级">
        <template slot-scope="scope">
          <el-button v-if="scope.row.level === '0'" type="primary" plain>{{ level[scope.row.level] }}</el-button>
          <el-button v-else-if="scope.row.level === '1'" type="success" plain>{{ level[scope.row.level] }}</el-button>
          <el-button v-else type="warning" plain>{{ level[scope.row.level] }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      rightList: [],
      loading: false,
      level: ['一级', '二级', '三级']
    }
  },
  methods: {
    getList(){
      this.loading = true
      this.$api.rightList('list')
        .then(res => {
          this.rightList = res
        }).finally(() => {
          this.loading = false
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped>

</style>
