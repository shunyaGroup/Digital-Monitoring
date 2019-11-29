<template>
  <a-card :bordered="false" title="数据清洗">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="12">
          <a-form-item label="发布时间" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-range-picker
              :ranges="{ '今天': [moment(), moment()], '昨天': [moment().subtract('days', 1), moment()], '近七天': [moment().subtract('days', 7),moment()], '近30天':[moment().subtract('days', 30),moment()]}"
              @change="changeDate"
            />
          </a-form-item>

          <a-form-item label="情感" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-radio-group v-model="form.feel">
              <a-radio value>全部</a-radio>
              <a-radio :value="1">正面</a-radio>
              <a-radio :value="2">中性</a-radio>
              <a-radio :value="3">负面</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="排序" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-radio-group v-model="form.orderBy">
              <a-radio value>全部</a-radio>
              <a-radio :value="1">时间正序</a-radio>
              <a-radio :value="2">时间倒序</a-radio>
              <a-radio :value="3">权重倒序</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="媒体属性" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-radio-group v-model="form.mediaAttr">
              <a-radio value>全部</a-radio>
              <a-radio :value="1">用户层面</a-radio>
              <a-radio :value="2">新闻层面</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="处理情况" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-radio-group v-model="form.is_handled">
              <a-radio value>全部</a-radio>
              <a-radio :value="0">未处理</a-radio>
              <a-radio :value="1">已处理</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="网络类别" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-checkbox
              :indeterminate="indeterminate"
            >全部</a-checkbox>
          </a-form-item>
          <a-form-item label="内容搜索" :labelCol="{span: 2}" :wrapperCol="{span: 10}">
            <a-input v-model="form.test">
              <a-select slot="addonBefore" style="width: 100px">
                <a-select-option value="1">搜内容</a-select-option>
                <a-select-option value="2">搜标题</a-select-option>
                <a-select-option value="3">搜媒体</a-select-option>
                <a-select-option value="4">搜标签</a-select-option>
                <a-select-option value="5">搜发布者</a-select-option>
                <a-select-option value="6">搜车型</a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-row>
      </a-form>
    </div>
  </a-card>
</template>
<script>

import { getSentimentList,getNetwork } from '@/api/newpage'
import moment from 'moment'
export default {
  data() {
    return {
      value: 1,
      indeterminate: true,
      checkAll: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      visible: false,
      form: {
        feel: '',
        orderBy: '',
        mediaAttr: '',
        is_handled: ''
      }
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  watch: {
    form: {
      handler(newValue) {
        console.log(newValue)
        this.getNetLit()
      },
      deep: true
    }
  },
  methods: {
    getNetLit() {
      let obj = this.form
      getNetwork(obj).then(res => {
        console.log(res)
      })
    },
    getlist() {
      let obj = this.form
      getSentimentList(obj).then(res => {
        console.log(res)
      })
    },
    onDelete(key) {},
    handleEdit(record) {
      /*this.form = record*/
      this.visible = true
      this.disable = true
    },
    changeMsg(record) {},
    onChange(e) {
      console.log('radio checked', e.target.value)
    },
    start() {
      this.loading = true
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false
        this.selectedRowKeys = []
      }, 1000)
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.loading = true
      setTimeout(() => {
        this.visible = false
        this.loading = false
      }, 3000)
    },
    handleCancel(e) {
      this.visible = false
    },
    handleChangeUP(value) {
      console.log(`selected ${value}`)
    },
    changeDate(dates, dateStrings) {
      this.form.dateArr = [dateStrings[0], dateStrings[1]]
      console.log('From: ', dates[0], ', to: ', dates[1])
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    },
    moment
  }
}
</script>
<style scoped>
/* #components-layout-demo-basic {
  text-align: center;
} */
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  /*   background: rgb(155, 212, 253); */
  /*   color: #fff; */
  /*   min-height: 120px;
line-height: 120px; */
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
.ant-layout-header {
  height: auto;
  line-height: auto;
}
.dxTitle {
  display: inline-block;
  width: 80px;
}
.headRow {
  height: 46px;
  line-height: 46px;
  border-bottom: 1px solid;
}
</style>