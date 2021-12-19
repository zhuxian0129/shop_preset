import request from './request';

export default {
  login(data) {
    return request({ url: `/api/private/v1/login`, method: 'post', data })
  },
  loginOut() {
    return request({ url: ``, method: 'post' })
  },
  menus() {
    return request({ url: `/api/private/v1/menus`, method: 'get' })
  },
  userList(data) {
    return request({ url: `/api/private/v1/users?pagenum=${data.pagenum}&pagesize=${data.pagesize}&query=${data.query}` })
  },
  mgStateChange(data) {
    return request({ url: `/api/private/v1/users/${data.id}/state/${!data.mg_state}`, method: 'put' })
  },
  addUser(data) {
    return request({ url: `/api/private/v1/users`, method: 'post', data })
  },
  editUser(data) {
    return request({ url: `/api/private/v1/users/${data.id}`, method: 'put', data })
  },
  deleteUser(id) {
    return request({ url: `/api/private/v1/users/${id}`, method: 'delete' })
  },
  assignRole(userId, roleId) {
    return request({ url: `/api/private/v1/users/${userId}/role`, method: 'put', data: { rid: roleId } })
  },
  rightList(type) {
    return request({ url: `/api/private/v1/rights/${type}`, method: 'get' })
  },
  roleList() {
    return request({ url: `/api/private/v1/roles`, method: 'get' })
  },
  addRole(data) {
    return request({ url: `/api/private/v1/roles`, method: 'post', data })
  },
  editRole(id, data) {
    return request({ url: `/api/private/v1/roles/${id}`, method: 'put', data })
  },
  deleteRole(roleId, rightId) {
    return request({ url: `/api/private/v1/roles/${roleId}/rights/${rightId}`, method: 'delete' })
  },
  manageRoles(roleId, data) { // 为角色授权
    return request({ url: `/api/private/v1/roles/${roleId}/rights`, method: 'post', data: { rids: data } })
  }
}
