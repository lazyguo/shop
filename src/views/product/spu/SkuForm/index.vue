<template>
  <div>
    <el-form ref="form" label-width="80px" :model="skuList">
      <!-- spu名称 -->
      <el-form-item label="SPU名称"> {{ spuList.spuName }} </el-form-item>
      <!-- sku名称 -->
      <el-form-item label="SKU名称">
        <el-input placeholder="sku名称" v-model="skuList.skuName"></el-input>
      </el-form-item>
      <!-- 价格 -->
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" v-model="skuList.price"></el-input>
      </el-form-item>
      <!-- 重量 -->
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuList.weight"></el-input>
      </el-form-item>
      <!-- 规格描述 -->
      <el-form-item label="规格描述">
        <el-input type="textarea" v-model="skuList.skuDesc"></el-input>
      </el-form-item>
      <!-- 平台属性 -->
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item
            :label="attr.attrName"
            v-for="attr in attrInfoList"
            :key="attr.id"
          >
            <el-select placeholder="请选择" v-model="attr.attrAndId">
              <el-option
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <el-form>
          <el-form-item
            :label="saleAttr.saleAttrName"
            v-for="saleAttr in spuAttrList"
            :key="saleAttr.id"
          >
            <el-select placeholder="请选择" v-model="saleAttr.saleAttrAndId">
              <el-option
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
                v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 图片列表 -->
      <el-form-item label="图片列表">
        <el-table
          stripe
          style="width: 100%"
          border
          :data="spuImgList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            prop="date"
            label="日期"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="spuImgList" label="图片" width="width">
            <template v-slot="{ row }">
              <img :src="row.imgUrl" alt="" style="width: 100%; height: 100%" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button
                type="primary"
                v-if="row.isDefault === 0"
                @click="changeDefault(row)"
                >添加默认</el-button
              >
              <el-button type="success" v-else @click="unDefault(row)"
                >默认</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSkuData">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      spuImgList: [],
      spuAttrList: [],
      attrInfoList: [],
      skuList: {
        category3Id: 0,
        price: 0,
        spuId: 0,
        tmId: 0,
        weight: '',
        skuDefaultImg: '',
        skuDesc: '',
        skuName: '',
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   attrName: 'string',
          //   id: 0,
          //   skuId: 0,
          //   valueId: 0,
          //   valueName: 'string'
          // }
        ],

        skuImageList: [
          // {
          //   id: 0,
          //   imgName: 'string',
          //   imgUrl: 'string',
          //   isDefault: 'string',
          //   skuId: 0,
          //   spuImgId: 0
          // }
        ],

        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: 'string',
          //   saleAttrValueId: 0,
          //   saleAttrValueName: 'string',
          //   skuId: 0,
          //   spuId: 0
          // }
        ]
      },
      spuList: {},
      // 另外储存图片数据
      imgList: []
    }
  },
  methods: {
    // 获取基本数据
    async getSkuData(categoryId1, categoryId2, row) {
      this.spuList = row
      this.skuList.category3Id = row.category3Id
      this.skuList.tmId = row.tmId
      this.skuList.spuId = row.id
      // 获取spu图片信息
      const { data: spuImgRes } = await this.$http.spu.getSpuImage(row.id)
      if (spuImgRes.code === 200) {
        let list = spuImgRes.data
        list.forEach((item) => {
          item.isDefault = 0
        })
        this.spuImgList = list
      } else {
        this.$message.error('spu图片信息获取失败')
      }
      // 获取spu商品属性值信息
      const { data: spuAttrRes } = await this.$http.spu.getSpuAttr(row.id)
      if (spuAttrRes.code === 200) {
        this.spuAttrList = spuAttrRes.data
      } else {
        this.$message.error('spu商品信息获取失败')
      }
      // 获取商品基础信息
      const { data: attrInfoRes } = await this.$http.spu.getAttrInfo(
        categoryId1,
        categoryId2,
        row.category3Id
      )
      if (attrInfoRes.code === 200) {
        this.attrInfoList = attrInfoRes.data
      } else {
        this.$message.error('获取商品基础信息获取失败')
      }
    },
    // 图片复选框点击事件
    handleSelectionChange(data) {
      this.imgList = data
    },
    // 是否选择该图片为默认
    changeDefault(row) {
      this.spuImgList.forEach((item) => {
        item.isDefault = 0
      })
      row.isDefault = 1
      // 设置图片默认信息
      this.skuList.skuDefaultImg = row.imgUrl
    },
    // 切换图片为非默认
    unDefault(row) {
      row.isDefault = 0
    },
    // 取消按钮
    cancel() {
      this.$emit('changeToggleShow', 0)
      Object.assign(this._data, this.$options.data())
    },
    // 保存按钮
    async saveSkuData() {
      const { attrInfoList, spuAttrList, skuList, imgList } = this
      // 商品属性值id重构
      skuList.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrAndId) {
          const [attrId, valueId] = item.attrAndId.split(':')
          prev.push({ attrId, valueId })
        }
        return prev
      }, [])
      // 商品基本属性id重构
      skuList.skuSaleAttrValueList = spuAttrList.reduce((prev, item) => {
        if (item.saleAttrAndId) {
          const [saleAttrId, saleAttrValueId] = item.saleAttrAndId.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])
      // 重构图片属性
      skuList.skuImageList = imgList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.spuImgId
        }
      })
      let { data: res } = await this.$http.spu.saveSkuData(this.spuList)
      if (res.code === 200) {
        this.$message.success('添加sku信息成功')
        this.$emit('changeToggleShow', 0)
      } else {
        this.$message.error('添加sku信息失败')
      }
    }
  }
}
</script>

<style></style>
