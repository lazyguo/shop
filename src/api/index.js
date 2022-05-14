// 将商品管理的接口统一暴露
import * as tradeMark from './product/tradeMark'
import * as attr from './product/attr'
import * as sku from './product/sku'
import * as spu from './product/spu'
import * as user from './power/user'
import * as role from './power/role'
import * as menu from './power/menu'

export default {
  tradeMark,
  attr,
  sku,
  spu,
  user,
  role,
  menu
}
