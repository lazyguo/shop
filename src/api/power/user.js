import request from '../axios'

// 获取用户列表信息
export const getUser = (page, limit, searchObj) =>
  request({
    url: `/admin/acl/user/${page}/${limit}`,
    method: 'get',
    params: searchObj
  })
  // 添加用户 /admin/acl/user/save
export const addUser = (data) =>
  request({
    url: '/admin/acl/user/save',
    method: 'post',
    data
  })
  // 修改用户信息 /admin/acl/user/update
export const editUser = (data) =>
  request({
    url: '/admin/acl/user/update',
    method: 'put',
    data
  })
  // 删除用户功能 /admin/acl/user/remove/{id}
export const deleteUser = (id) =>
  request({
    url: `/admin/acl/user/remove/${id}`,
    method: 'delete'
  })
  // 获取分配用户 /admin/acl/user/get/{id}
export const getRole = (userId) =>
  request({
    url: `/admin/acl/user/toAssign/${userId}`,
    method: 'get'
  })
  // 删除多个用户 /admin/acl/user/batchRemove
export const removeAll = (data) =>
  request({
    url: '/admin/acl/user/batchRemove',
    method: 'delete',
    data
  })
