import request from '../axios'

// 获取sku列表
export const getSku = (page, limit) =>
  request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get'
  })
// 上架商品 /admin/product/onSale/{skuId}
export const onSkuSale = (skuId) =>
  request({
    url: `/admin/product/onSale/${skuId}`,
    method: 'get'
  })
// 下架商品
export const downSkuSale = (skuId) =>
  request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'get'
  })
// 删除sku商品 /admin/product/deleteSku/{skuId}
export const deleteSkuSale = (skuId) =>
  request({
    url: `/admin/product/deleteSku/${skuId}`,
    method: 'delete'
  })
  // 获取sku数据信息 /admin/product/getSkuById/{skuId}
export const getSkuData = (skuId) =>
  request({
    url: `/admin/product/getSkuById/${skuId}`,
    method: 'get'
  })
