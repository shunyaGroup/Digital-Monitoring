<template>
  <a-modal title="修改" :visible="visible" @ok="handleOk" @cancel="handleCancel">
    <a-form :form="changeform">
      <a-form-item label="一级标签修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-select v-model="changeform.question_level" allowClear>
          <a-select-option value="产品正面信息">产品正面信息</a-select-option>
          <a-select-option value="产品质量问题">产品质量问题</a-select-option>
          <a-select-option value="产品力吐槽">产品力吐槽</a-select-option>
          <a-select-option value="产品设计问题">产品设计问题</a-select-option>
          <a-select-option value="重大事件">重大事件</a-select-option>
          <a-select-option value="外观抄袭">外观抄袭</a-select-option>
          <a-select-option value="品牌战略">品牌战略</a-select-option>
          <a-select-option value="市场策略">市场策略</a-select-option>
          <a-select-option value="领导人相关">领导人相关</a-select-option>
          <a-select-option value="品牌活动">品牌活动</a-select-option>
          <a-select-option value="销量问题">销量问题</a-select-option>
          <a-select-option value="销量信息">销量信息</a-select-option>
          <a-select-option value="用户体验">用户体验</a-select-option>
          <a-select-option value="投诉盘点">投诉盘点</a-select-option>
          <a-select-option value="售后服务问题">售后服务问题</a-select-option>
          <a-select-option value="疑似黑车">疑似黑车</a-select-option>
          <a-select-option value="其他">其他</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="网媒类别修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-input v-model="changeform.media_type_final" />
      </a-form-item>
      <a-form-item label="网络来源修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-input v-model="changeform.app_name_final" />
      </a-form-item>
      <a-form-item label="发布者修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-input v-model="changeform.news_author_final" />
      </a-form-item>
      <a-form-item label="车型修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-select v-model="changeform.auto_brand" allowClear>
          <a-select-option
            v-for="(item,index) in carList"
            :key="index"
            :value="item.car_type"
          >{{item.car_type}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="修改调性" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-select v-model="changeform.feel_tag" allowClear>
          <a-select-option value="正面">正面</a-select-option>
          <a-select-option value="负面">负面</a-select-option>
          <a-select-option value="中性">中性</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { batchupdate } from '@/api/newpage'

export default {
  name: 'edit',
  props: {
    carList: Array
  },
  data() {
    return {
      visible: false,
      changeform: {},
      ids: ''
    }
  },
  created() {},
  methods: {
    show(record, ids) {
      this.changeform = Object.assign({}, record)
      this.visible = true
      this.ids = ids
    },
    //提交修改
    handleOk() {
      let obj = Object.assign({}, this.changeform)
      if (!this.changeform.hash_code) {
        obj.hash_code = this.ids
      } else {
        let hash_codeArr = []
        hash_codeArr.push(this.changeform.hash_code)
        obj.hash_code = hash_codeArr
      }
      let newObj = {
        data: JSON.stringify(obj)
      }
      batchupdate(newObj).then(res => {
        this.visible = false
        if (res.code == '200') {
          this.$emit('refresh')
          this.$message.success('编辑成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //取消
    handleCancel() {
      this.visible = false
    }
  }
}
</script>