// 接口的统一管理
import request from './axios'
// import Mockrequest from './mock'

// 用户登录 post
export const login = (data) =>
  request({
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })

// 获取用户信息
export const userInfo = (token) =>
  request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })

// 用户登出
export const logout = () =>
  request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
