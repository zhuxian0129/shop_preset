import axios from 'axios'
import vue from 'vue'
import Router from '@/router'

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8'

const service = axios.create({
  timeout: 90000 // 请求超时时间
})
const vm = new vue({})
service.interceptors.request.use(
  config => {
    let params = null
    if (config.isFromData) {
      params = new FormData()
      for (const key in config.data) {
        if (Array.isArray(config.data[key])) { // 只判断数组为元素不是对象，有需求再扩展判断元素
          for (let i = 0; i < config.data[key].length; i++) {
            params.append(key, config.data[key][i])
          }
        } else {
          params.append(key, config.data[key])
        }
      }
    } else {
      config.headers['Content-Type'] = 'application/json'
      for (const key in config.data) { // 去参数空格
        let str = config.data[key]
        if (typeof str === 'string') {
          config.data[key] = str.replace(/(^\s*)|(\s*$)/g, '')
        } else if (typeof str === 'object') {
          if (Array.isArray(str)) {
            for (let i = 0; i < config.data[key].length; i++) {
              if (typeof config.data[key][i] === 'string') {
                config.data[key][i] = config.data[key][i].replace(/(^\s*)|(\s*$)/g, '')
              } else {
                for (const m in config.data[key][i]) {
                  const e = config.data[key][i][m]
                  if (typeof e === 'string') {
                    config.data[key][i][m] = e.replace(/(^\s*)|(\s*$)/g, '')
                  }
                }
              }
            }
          } else {
            if (config.data[key] !== null) {
              for (const l in config.data[key]) {
                const h = config.data[key][l]
                if (typeof h === 'string') {
                  config.data[key][l] = h.replace(/(^\s*)|(\s*$)/g, '')
                }
              }
            }
          }
        }
      }
      params = JSON.stringify(config.data)
    }
    config.data = params
    return config
  },
  error => {
    Promise.reject(error)
  }
)
service.interceptors.response.use(
  res => {
    // console.log(res)
    if (res.data.meta.status > 300) {
      vm.$message.error(res.data.meta.msg)
      return Promise.reject(res.data.meta.msg)
    }
    return res.data.data
  },
  error => {
    if (error && error.response) {
      if (error.response.config.doNotPromptError) {
        // 自行处理报错
        return Promise.reject(error.response)
      }
      const status = error.response.status
      /*------ 根据返回的状态码，处理报错  -----*/
      if (status === 401) {
        if (error.response.config['errorPass']) {
          vm.$message.error('用户名或密码错误')
          return Promise.reject(error.response)
        } else {
          // store.$commit('setAuthorities', [])
          // store.$commit('Set_userMsg', {})
          Router.replace('login')
          return Promise.reject(error.response)
        }
      } else {
        if (status === 400 || status === 403 || status === 404 || status === 409) {
          if (status === 404 && error.response.config.doNotProcess_404Error) {

          } else {
            vm.$message.error(error.response.data.message)
          }
        } else {
          if (status === 500) {
            const href = window.location.href
            if (href.indexOf('/500') > -1) {
              vm.$message.error('网络异常')
            } else {
              // Router.push('/500')
              vm.$message.error('网络异常')
            }
          } else if (status === 504) {
            vm.$message.error('请求超时')
          } else {
            vm.$message.error('请求超时')
          }
        }
      }
      return Promise.reject(error.response)
    } else {
      return Promise.reject('err')
      //  请求错误 ---
    }
  }
)
export default service
