import request from './request';

export default {
  login(data){
    return request({ url: `/api/private/v1/login`, method: 'post', data})
  },
  loginOut(){
    return request({ url: ``, method: 'post'})
  }
}
