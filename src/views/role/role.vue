<template>
  <div>
    <el-button type="primary">添加角色</el-button>
    <el-table :data="roleList" border stripe style="margin-top: 15px;"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row v-for="(one,oneIndex) in props.row.children" :key="one.id"
              :class="['bdbottom', oneIndex === 0 ? 'bdtop' : '', 'vcenter']">
            <!--     一级权限       -->
            <el-col :span="5">
              <el-tag @close="deleteRight(props.row, one.id)" closable>{{ one.authName }}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span="19">
              <el-row :class="[twoIndex === 0 ? '' : 'bdtop', 'vcenter']" v-for="(two, twoIndex) in one.children" :key="two.id">
                <el-col :span="6">
                  <el-tag @close="deleteRight(props.row, two.id)" closable type="success">{{ two.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="18">
                  <el-tag v-for="(three) in two.children" :key="three.id"
                          closable type="warning" @close="deleteRight(props.row, three.id)">
                    {{ three.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName">
      </el-table-column>
      <el-table-column label="角色描述" prop="roleDesc">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit"
                     @click="aa(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"
                     @click="aa(scope.row.id)">删除</el-button>
          <el-button size="mini" type="warning" icon="el-icon-setting"
                     @click="openAssignRoles(scope.row)">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-role :visible="visible" @callback="cancel" :existRight="existRight"></edit-role>
  </div>
</template>

<script>
import editRole from './components/editRole';
export default {
  name: 'role',
  components: { editRole },
  data(){
    return {
      roleList: [],
      loading: false,
      visible: false,
      id: undefined,
      existRight:{}
    }
  },
  methods: {
    getRoleList(){
      this.loading = true
      this.$api.roleList()
        .then(res => {
          this.roleList = res
        }).finally(() => {
          this.loading = false
      })
    },
    deleteRight(row,rightId){
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteRole(row.id, rightId)
        .then((res) => {
          row.children = res
          this.$message.success('删除成功')
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      });
    },
    openAssignRoles(row){
      this.existRight = row
      this.visible = true
    },
    cancel(type) {
      if(type){
        this.getRoleList()
      }
      this.visible = false
    }
  },
  created() {
    this.getRoleList()
  }
}
</script>

<style scoped>
.el-tag{
  margin: 7px;
}
.bdtop{
  border-top: 1px solid #eee;
}
.bdbottom{
  border-bottom: 1px solid #eee;
}
.vcenter{
  display: flex;
  align-items: center;
}
</style>
