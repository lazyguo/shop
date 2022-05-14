import request from '../axios'

// 获取Spu数据分页列表
export const getSpuList = (page, limit, category3Id) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: { category3Id }
  })
  // 获取Spu的基本信息 /admin/product/getSpuById/{spuId}
export const getSpuData = (spuId) =>
  request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
  })
  // 获取品牌列表数据 /admin/product/baseTrademark/getTrademarkList
export const getTradeMarkData = () =>
  request({
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'get'
  })
  // 获取spu图片数据 /admin/product/spuImageList/{spuId}
export const getSpuImg = (spuId) =>
  request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
// 获取平台所有的销售属性 最多只有三个 /admin/product/baseSaleAttrList
export const getBaseAttr = () =>
  request({
    url: '/admin/product/baseSaleAttrList',
    method: 'get'
  })
  // 添加或修改spu
export const addOrEditSpuData = (data) => {
  if (data.id) {
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'post',
      data
    })
  } else {
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'post',
      data
    })
  }
}
// 删除Spu商品
export const deleteSpuData = (spuId) =>
  request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
  })

// 获取spu商品属性值信息
export function getSpuAttr(spuId) {
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
  })
}
// 获取商品基础信息
export function getAttrInfo(category1Id, category2Id, category3Id) {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}
export function getSpuImage(spuId) {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}
// 保存sku数据
export const saveSkuData = (skuInfo) =>
  request({
    url: '/admin/product/saveSkuInfo',
    method: 'post',
    data: skuInfo
  })
  // 页面展示商品信息
export const showSpuData = (spuId) =>
  request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'get'
  })
