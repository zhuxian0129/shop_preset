import request from './request';

export default {
  login(data){
    return request({ url: `/api/private/v1/login`, method: 'post', data})
  },
  loginOut(){
    return request({ url: ``, method: 'post'})
  },
  menus(){
    return request({ url: `/api/private/v1/menus`, method: 'get' })
  },
  userList(data){
    return request({ url: `/api/private/v1/users?pagenum=${data.pagenum}&pagesize=${data.pagesize}&query=${data.query}`, method: 'get' })
  },
  mgStateChange(data){
    return request({ url: `/api/private/v1/users/${data.id}/state/${!data.mg_state}`, method: 'put'})
  },
  addUser(data){
    return request({ url: `/api/private/v1/users`, method: 'post', data})
  }
}
