import request from '../axios'

// 品牌管理
export const getTradeList = (page, limit) =>
  request({
    url: `/admin/product/baseTrademark/${page}/${limit}
    `,
    method: 'get'
  })
// 添加修改商品
export const addEditTrade = (data) => {
  if (data.id) {
    return request({
      url: '/admin/product/baseTrademark/update',
      method: 'put',
      data
    })
  } else {
    return request({
      url: '/admin/product/baseTrademark/save',
      method: 'post',
      data
    })
  }
}
// 删除商品
export const deleteTrade = (id) => {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
  })
}
