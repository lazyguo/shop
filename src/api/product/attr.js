import request from '../axios'

// 获取商品分类一级列表
export const getAttr1 = () =>
  request({
    url: '/admin/product/getCategory1',
    method: 'get'
  })
// 获取商品分类二级列表
export const getAttr2 = (category1Id) =>
  request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get'
  })
// 获取商品分类三级列表
export const getAttr3 = (category2Id) =>
  request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get'
  })
// 获取第三级商品信息
export const getAttrInfoList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
  // 添加|修改商品属性值
export const getAddAttr = (data) => request({
  url: '/admin/product/saveAttrInfo',
  method: 'post',
  data
})
// 删除商品属性
export const removeAttrInfo = (attrId) => request({
  url: `/admin/product/deleteAttr/${attrId}`,
  methods: 'delete'
})
