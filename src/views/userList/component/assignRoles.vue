<template>
  <el-dialog
    title="角色分配"
    :visible="visible"
    @close="cancel">
    <p>当前用户：{{ userinfo.username }}</p>
    <p>当前角色：{{ userinfo.role_name }}</p>
    <p>分配角色
      <el-select v-model="selectRole" collapse-tags :loading="loading"
        style="margin-left: 20px;" placeholder="请选择">
        <el-option v-for="item in roleList" :key="item.id" :label="item.roleName"
                   :value="item.id">
        </el-option>
      </el-select>
    </p>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="confirm" :loading="submitLoading">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'assignRoles',
  props: {
    visible: Boolean,
    userinfo: {
      type: Object,
      default: () => {}
    }
  },
  data(){
    return {
      roleList: [],
      selectRole: '',
      loading: false,
      submitLoading: false
    }
  },
  methods: {
    cancel() {
      this.selectRole = ''
      this.$emit('cancel')
    },
    confirm() {
      if(!this.selectRole){
        return this.$message.error('请选择要分配的角色')
      }
      // console.log(this.$api)
      this.submitLoading = true
      // console.log(this.userinfo.id, this.selectRole)
      this.$api.assignRole(this.userinfo.id, this.selectRole).then(() => {
          this.$message.success('分配角色成功')
          this.$emit('confirm')
        }).finally(() => {
          this.submitLoading = false
      })
    },
    getRoleList() { // 获取所有角色列表
      this.loading = true
      this.$api.roleList()
        .then(res => {
          this.roleList = res
        }).finally(() => {
          this.loading = false
      })
    }
  },
  created() {
    this.getRoleList()
  }
}
</script>

<style scoped>

</style>
