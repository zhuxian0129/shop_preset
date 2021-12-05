<template>
  <div>
    <el-input placeholder="请输入内容" v-model="params.query" clearable style="width: 280px">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <el-button style="margin-left: 12px;" type="primary" @click="openUser">添加用户</el-button>
    <el-table :loading="loading" :data="userList" border style="width: 100%; margin-top: 10px;" stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="username" label="角色"></el-table-column>
      <el-table-column prop="role_name" label="用户名"></el-table-column>
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
                     @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete"
                     @click="handleDelete(scope.$index, scope.row)"></el-button>
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button size="mini" type="warning" icon="el-icon-setting"
                       @click="handleDelete(scope.$index, scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 10px;" @size-change="sizeChange" @current-change="currentChange"
                   :current-page="params.pagenum" :page-sizes="[2, 4, 10, 15]" :page-size="2"
                   layout="total, sizes, prev, pager, next, jumper" :total="params.total">
    </el-pagination>
    <add-user :visible="visible" @cancel="visible = false" :form="form" @confirm="confirmAddUser"></add-user>
    <!--    <sp-pagination :total="params.total" :page-size="params.pagesize"-->
    <!--      :current-page="params.pagenum" @sizeChange="sizeChange" @currentChange="currentChange"></sp-pagination>-->
  </div>
</template>

<script>
import addUser from './component/addUser';

export default {
  name: 'userList',
  components: { addUser },
  data() {
    return {
      params: {
        pagenum: 1,
        pagesize: 2,
        query: '',
        total: 0
      },
      userList: [],
      form: {
        username: '',
        email: '',
        mobile: '',
        password: ''
      },
      loading: false,
      visible: false
    }
  },
  methods: {
    search() {
      const param = this.params
      this.loading = true
      this.$api.userList(param)
      .then(res => {
        this.userList = res.users
        this.params.total = res.total
        this.params.query = ''
      }).finally(() => {
        this.loading = true
      })
    },
    openUser(data){
      this.form = {
        username: data ? data.username : '',
        mobile: data ? data.mobile : '',
        email: data ? data.email : '',
        password: data ? data.password : ''
      }
      console.log(this.form)
      this.visible = true
    },
    handleEdit(index, data) {
      console.log(index, data)
    },
    handleDelete() {

    },
    sizeChange(n) { // 切换一页显示条数的时候触发
      this.params.pagesize = n
      this.search()
    },
    currentChange(n) { // 切换页码数的时候触发
      this.params.pagenum = n
      this.search()
    },
    statusChange(row) {
      this.$api.mgStateChange(row)
      .then(res => {
        this.search()
        this.$message.success('更新状态成功')
      })
    },
    confirmAddUser(){
      console.log(14)
      // this.$api
    },
    cancel(){
      this.visible = true
    }
  },
  created() {
    this.search()
  }
}
</script>

<style scoped>
</style>
