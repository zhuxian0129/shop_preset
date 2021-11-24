const submenu = [{
  name: '用户管理',
  icon: 'el-icon-user-solid',
  path: '/user',
  children: [
    {
      path: '/user/aa',
      name: '测试',
      icon: 'el-icon-setting'
    }
  ]
}, {
  name: '权限管理',
  icon: 'el-icon-more-outline',
  path: '/manage',
  children: [{
    name: '角色列表',
    icon: 'el-icon-help',
    path: '/manage/role'
  }, {
    name: '权限列表',
    icon: 'el-icon-help',
    path: '/manage/auth'
  }]
}, {
  name: '商品管理',
  icon: 'el-icon-goods',
  path: '/goods',
  /*children: [
    {
      name: '',
      icon: '',
      path: ''
    }
  ]*/
}, {
  name: '订单管理',
  icon: 'el-icon-notebook-1',
  path: '/order',
  // children: [{
  //   name: '',
  //   icon: '',
  //   path: ''
  // }]
}, {
  name: '数据统计',
  icon: 'el-icon-s-marketing',
  path: '/stat',
  // children: [
  //   {
  //     name: '',
  //     icon: '',
  //     path: '/stat/'
  //   }
  // ]
}]

export default submenu
