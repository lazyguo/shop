import request from '../axios'

/*
  获取权限(菜单/功能)列表
  */
export const getPermissionList = () =>
  request({
    url: '/admin/acl/permission',
    method: 'get'
  })

/*
  删除一个权限项
  */
export const removePermission = (id) =>
  request({
    url: `/admin/acl/permission/remove/${id}`,
    method: 'delete'
  })

/*
  保存一个权限项
  */
export const addPermission = (permission) =>
  request({
    url: '/admin/acl/permission/save',
    method: 'post',
    data: permission
  })

/*
  更新一个权限项
  */
export const updatePermission = (permission) =>
  request({
    url: '/admin/acl/permission/update',
    method: 'put',
    data: permission
  })

/*
  查看某个角色的权限列表
  */
export const toAssign = (roleId) =>
  request({
    url: `/admin/acl/permission/toAssign/${roleId}`,
    method: 'get'
  })

/*
  给某个角色授权
  */
export const doAssign = (roleId, permissionId) =>
  request({
    url: '/admin/acl/permission/doAssign',
    method: 'post',
    params: { roleId, permissionId }
  })
