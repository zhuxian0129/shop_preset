<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="~@/assets/img/login_logo.jpeg" alt="">
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login_form">
        <el-form-item prop="name">
          <el-input v-model.trim="ruleForm.username" prefix-icon="el-icon-user">
          </el-input>
        </el-form-item>
        <el-form-item prop="region">
          <el-input type="password" v-model.trim="ruleForm.password" prefix-icon="el-icon-lock">
          </el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.login(this.ruleForm).then(res => {
            console.log(res)
            window.sessionStorage.setItem('token', res.token)
            this.$router.push('/home')
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped lang="scss">
.login_container {
  position: relative;
  height: 100vh;
  min-height: 540px;

  .login_box {
    width: 450px;
    height: 300px;
    background-color: $primary_color;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      border: 1px solid gray;
      overflow: hidden;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .login_form{
      margin: 70px 0 0 0;
      padding: 20px;
      .btn{
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
