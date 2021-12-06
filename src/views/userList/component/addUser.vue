<template>
  <el-dialog :title="form.id ? '编辑角色' : '新增角色'" :visible="visible" @close="$emit('cancel')">
    <el-form :model="form" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input :disabled="disabled" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item v-if="!form.id" label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'addUser',
  props: {
    visible: {
      default: false,
      type: Boolean
    },
    form: {
      type: Object,
      default: function() {
        return {
          id: '',
          username: '',
          email: '',
          mobile: '',
          password: ''
        }
      }
    }
  },
  data() {
    const mobileExp = (rule, value, callback) => {
      const emailFormat = new RegExp(/^1[3456789]\d{9}$/)
      if (value && !emailFormat.test(value)) {
        callback(new Error('手机号码格式不正确!'));
      } else {
        callback();
      }
    }
    return {
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名长度3-10位', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: mobileExp, message: '请输入正确的手机号码', trigger: ['blur'] }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度6-16位', trigger: 'blur' }]

      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.ruleForm.clearValidate()
        })
      }
    }
  },
  computed: {
    disabled() {
      return this.form.id ? true : false
    }
  },
  methods: {
    confirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          let params = null
          if (this.form.id) {
            params = {
              email: this.form.email,
              id: this.form.id,
              mobile: this.form.mobile
            }
          } else {
            params = this.form
          }
          let $http = this.form.id ? this.$api.editUser : this.$api.addUser
          $http(params).then(res => {
            this.$emit('confirm')
            this.$message.success(this.form.id ? '修改成功' : '新增成功')
          })
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
