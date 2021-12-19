<template>
  <el-dialog title="分配权限" :visible="visible" :loading="loading" @close="cancel">
    <el-tree ref="tree" :props="defaultProps" :data="tree" show-checkbox
             node-key="id" default-expand-all :default-checked-keys="rights ? rights.list : []">
    </el-tree>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="editRight">确 定</el-button>
  </span>
  </el-dialog>

</template>

<script>
export default {
  name: 'editRole',
  props:{
    visible: {
      default: false,
      type:Boolean
    },
    existRight:{
      type: Object,
      default:function(){
        return {}
      }
    }
  },
  data(){
    return {
      tree:[],
      loading: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  computed: {
    rights(){
      const list = []
      if(!this.existRight.children) return
      else {
        this.existRight.children.map(item => {
          item.children.map(it => {
            it.children.map(i => {
              list.push(i.id)
            })
          })
        })
        return {
          id: this.existRight.id,
          list
        }
      }
    }
  },
  methods: {
    getTree(){
      this.loading = true
      this.$api.rightList('tree')
        .then(res => {
          this.tree = res
        }).finally(() => {
          this.loading = false
      })
    },
    editRight(){
      let rights = []
      rights = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      this.$api.manageRoles(this.rights.id, rights.join())
        .then(res => {
          this.$message.success('操作成功')
          this.$emit('callback', 'success')
        })
    },
    cancel(){
      this.$refs.tree.setCheckedKeys([])
      this.$emit('callback')
    }
  },
  created() {
    this.getTree()
  }
}
</script>

<style scoped>

</style>
