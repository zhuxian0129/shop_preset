<template>
  <div>
    <el-input placeholder="请输入内容" v-model="params.query" clearable style="width: 280px">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <el-button style="margin-left: 12px;" type="primary" @click="openUser">添加用户</el-button>
    <el-table :loading="loading" :data="userList" border style="width: 100%; margin-top: 10px;" stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mg_state" label="状态">
        <template slot-scope="scope">
          <el-switch :value="scope.row.mg_state" @change="statusChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit"
                     @click="openUser(scope.row)"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"
                     @click="handleDelete(scope.row.id)"></el-button>
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button size="mini" type="warning" icon="el-icon-setting"
                       @click="openRoles(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 10px;" @size-change="sizeChange" @current-change="currentChange"
                   :current-page="params.pagenum" :page-sizes="[2, 4, 10, 15]" :page-size="2"
                   layout="total, sizes, prev, pager, next, jumper" :total="params.total">
    </el-pagination>
    <add-user :visible="visible" @cancel="visible = false" :form="form" @confirm="confirmAddUser"></add-user>
    <assign-roles :visible="visible1" @cancel="visible1 = false" :userinfo="userinfo" @confirm="confirmAssignRole" />
  </div>
</template>

<script>
import addUser from './component/addUser';
import assignRoles from './component/assignRoles';
export default {
  name: 'userList',
  components: { addUser, assignRoles },
  data() {
    return {
      params: {
        pagenum: 1,
        pagesize: 10,
        query: '',
        total: 0
      },
      userList: [], // 用户列表
      form: { // 用户基本信息用
        id: '',
        username: '',
        email: '',
        mobile: '',
        password: ''
      },
      userinfo: { // 用户角色用
        id: '',
        username: '',
        role_name: ''
      },
      loading: false,
      visible: false, // 新增角色
      visible1: false // 分配角色
    }
  },
  methods: {
    search() { // 条件查找
      const param = this.params
      this.loading = true
      this.$api.userList(param).then(res => {
        this.userList = res.users
        this.params.total = res.total
        this.params.query = ''
      }).finally(() => {
        this.loading = true
      })
    },
    openUser(data) { // 打开弹窗
      this.form = {
        id: data ? data.id : '',
        username: data ? data.username : '',
        mobile: data ? data.mobile : '',
        email: data ? data.email : '',
        password: data ? data.password : ''
      }
      this.visible = true
    },
    openRoles(row){ // 用户分配角色
      this.userinfo = {
        id: row.id,
        username: row.username,
        role_name: row.role_name
      }
      this.visible1 = true
    },
    handleDelete(id) { // 删除用户
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteUser(id).then(() => {
            this.search()
            this.$message.success('删除成功')
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    sizeChange(n) { // 切换一页显示条数的时候触发
      this.params.pagesize = n
      this.search()
    },
    currentChange(n) { // 切换页码数的时候触发
      this.params.pagenum = n
      this.search()
    },
    statusChange(row) { // 修改用户状态
      this.$api.mgStateChange(row).then(res => {
        this.search()
        this.$message.success('更新状态成功')
      })
    },
    confirmAddUser(){ // 新增用户通知
      this.visible = false
      this.search()
    },
    confirmAssignRole(){ // 确定角色分配通知
      this.visible1 = false
      this.search()
    }
  },
  created() {
    this.search()
  }
}
</script>

<style scoped>
</style>
