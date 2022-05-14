<template>
  <div>
    <el-form label-width="80px" :model="spuList">
      <!-- 名称 -->
      <el-form-item label="Spu名称">
        <el-input
          placeholder="请填写Spu名称"
          v-model="spuList.spuName"
        ></el-input>
      </el-form-item>
      <!-- 品牌 -->
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spuList.tmId">
          <el-option
            :label="tradeMark.tmName"
            :value="tradeMark.id"
            v-for="tradeMark in tradeMarkList"
            :key="tradeMark.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 描述 -->
      <el-form-item label="Spu描述" props="description">
        <el-input
          placeholder="请填写Spu描述"
          type="textarea"
          rows="4"
          v-model="spuList.description"
        ></el-input>
      </el-form-item>
      <!-- 图片 -->
      <el-form-item label="Spu图片">
        <el-upload
          action="http://39.98.123.211/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImgList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectAttr.length}项未选择`"
          v-model="attrId"
        >
          <el-option
            :label="unSelect.name"
            :value="`${unSelect.id}:${unSelect.name}`"
            v-for="unSelect in unSelectAttr"
            :key="unSelect.id"
          ></el-option>
        </el-select>
        <el-button
          icon="el-icon-plus"
          type="primary"
          style="margin-left: 10px"
          :disabled="!attrId"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table
          stripe
          style="width: 100%; margin-top: 10px"
          border
          :data="spuList.spuSaleAttrList"
        >
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column label="属性名" width="width" prop="saleAttrName">
          </el-table-column>
          <el-table-column label="属性值名称列表" width="width">
            <template v-slot="{ row, $index }">
              <!-- {{row}} -->
              <el-tag
                :key="tag.id"
                v-for="tag in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
                style="margin-left: 5px"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                :ref="$index"
                size="small"
                style="width: 120px"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row, $index)"
                style="margin-left: 5px"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template v-slot="{ $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spuList.spuSaleAttrList.splice($index, 1)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrEditSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      // 存储Spu基本信息
      spuList: {
        category3Id: '',
        description: '',
        tmId: '',
        spuName: '',
        spuImageList: [
          // {
          //   imgName: 'string',
          //   imgUrl: 'string',
          //   spuId: 0
          // }
        ],
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   saleAttrName: 'string',
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       isChecked: 'string',
          //       saleAttrName: 'string',
          //       saleAttrValueName: 'string',
          //       spuId: 0
          //     }
          //   ]
          // }
        ]
      },

      // 存储商品品牌信息
      tradeMarkList: [],
      // 存储spu图片信息
      spuImgList: [],
      // 存储销售属性 最多只有三个
      baseAttrList: [],
      // 存储销售商品id
      attrId: ''
    }
  },
  methods: {
    // 照片移除后的操作
    handleRemove(file, fileList) {
      this.spuImgList = fileList
    },
    // 照片预览的操作
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 照片成功收集后的操作
    handleSuccess(res, file, fileList) {
      this.spuImgList = fileList
    },
    // 添加商品属性按钮点击事件
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrId.split(':')
      const newSaleAttrList = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      }
      this.spuList.spuSaleAttrList.push(newSaleAttrList)
    },
    // 点击按钮显示input框
    showInput(row, index) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
      row.inputVisible = true
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 光标移除显示按钮
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row

      if (row.inputValue.trim() === '') {
        this.$message.info('属性值内容不能为空')
        return
      }
      // let result = row.spuSaleAttrValueList.some(item => {
      //   console.log(inputValue)
      //   inputValue === item.saleAttrValueName
      // })
      // console.log(result)
      // if (result) {
      //   return
      // }
      let newAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue }
      row.spuSaleAttrValueList.push(newAttrValue)
      row.inputVisible = false
    },
    // 发送添加或修改数据
    async addOrEditSpu() {
      // 将图片信息转存到spuList中，统筹发送数据
      this.spuList.spuImageList = this.spuImgList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url
        }
      })
      const result = await this.$http.spu.addOrEditSpuData(this.spuList)
      if (result.data.code === 200) {
        this.$message.success('数据更新成功')
        this.$emit('changeShow', { toggleShow: 0, flag: this.spuList.id ? '修改' : '保存' })
      }
    },
    // 添加属性时获取数据
    async getAddSpuData(id) {
      this.spuList.category3Id = id
      // 获取商品品牌信息
      const { data: tradeMarkRes } = await this.$http.spu.getTradeMarkData()
      if (tradeMarkRes.code === 200) {
        this.tradeMarkList = tradeMarkRes.data
      } else {
        this.$message.error('商品品牌信息获取失败')
      }
      // 获取平台所有销售属性 最多只有三个
      const { data: baseAttrRes } = await this.$http.spu.getBaseAttr()
      if (baseAttrRes.code === 200) {
        this.baseAttrList = baseAttrRes.data
      } else {
        this.$message.error('平台销售属性信息获取失败')
      }
    },
    // 取消按钮
    cancel() {
      this.$emit('changeShow', { toggleShow: 0, flag: '' })
      Object.assign(this._data, this.$options.data())
    },
    // 发送请求获取数据
    async getInitDate(spu) {
      // 获取Spu基本信息
      const { data: spuRes } = await this.$http.spu.getSpuData(spu.id)
      if (spuRes.code === 200) {
        this.spuList = spuRes.data
      } else {
        this.$message.error('spu基本信息获取失败')
      }
      // 获取商品品牌信息
      const { data: tradeMarkRes } = await this.$http.spu.getTradeMarkData()
      if (tradeMarkRes.code === 200) {
        this.tradeMarkList = tradeMarkRes.data
      } else {
        this.$message.error('商品品牌信息获取失败')
      }
      // 获取spu图片信息
      const { data: spuImgRes } = await this.$http.spu.getSpuImg(spu.id)
      if (spuImgRes.code === 200) {
        const list = spuImgRes.data
        list.forEach((item) => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImgList = list
      } else {
        this.$message.error('spu图片信息获取失败')
      }
      // 获取平台所有销售属性 最多只有三个
      const { data: baseAttrRes } = await this.$http.spu.getBaseAttr()
      if (baseAttrRes.code === 200) {
        this.baseAttrList = baseAttrRes.data
      } else {
        this.$message.error('平台销售属性信息获取失败')
      }
    }
  },
  computed: {
    // 计算还剩多少商品属性没有被选择
    unSelectAttr() {
      const result = this.baseAttrList.filter((item) => {
        return this.spuList.spuSaleAttrList.every((item1) => {
          return item.name !== item1.saleAttrName
        })
      })
      return result
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
