import request from '../axios'

// 获取角色列表
export const getRole = (page, limit, searchKey) =>
  request({
    url: `/admin/acl/role/${page}/${limit}`,
    method: 'get',
    params: searchKey
  })
  // 添加用户 /admin/acl/role/save
export const addRole = (data) =>
  request({
    url: '/admin/acl/role/save',
    method: 'post',
    data
  })
  // 修改用户 /admin/acl/role/update
export const editRole = (data) =>
  request({
    url: '/admin/acl/role/update',
    method: 'put',
    data
  })
  // 删除用户 /admin/acl/role/remove/{id}
export const deleteRole = (id) =>
  request({
    url: `/admin/acl/role/remove/${id}`,
    method: 'delete'
  })
  // 批量删除角色 /admin/acl/role/batchRemove
export const deleteAllRole = (data) =>
  request({
    url: '/admin/acl/role/batchRemove',
    method: 'delete',
    data
  })
