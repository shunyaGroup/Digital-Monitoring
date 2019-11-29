<template>
  <a-card :bordered="false" title="负面信息汇总">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="12">
          <a-form-item label="发布时间" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-range-picker
              format="YYYY-MM-DD HH:mm:ss"
              :ranges="{ '今天': [moment(), moment()], '昨天': [moment().subtract('days', 1), moment()], '近七天': [moment().subtract('days', 7),moment()], '近30天':[moment().subtract('days', 30),moment()]}"
              @change="changeDate"
            />
          </a-form-item>
          <!-- <a-form-item label="媒体属性" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-radio-group v-model="form.mediaAttr">
              <a-radio value>全部</a-radio>
              <a-radio :value="1">用户层面</a-radio>
              <a-radio :value="2">新闻层面</a-radio>
            </a-radio-group>
          </a-form-item> -->
          <a-form-item label="处理情况" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-radio-group v-model="form.is_handled">
              <a-radio value>全部</a-radio>
              <a-radio :value="0">未处理</a-radio>
              <a-radio :value="1">已处理</a-radio>
            </a-radio-group>
          </a-form-item>
          <!-- <a-form-item label="发布情况" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-radio-group v-model="form.isPublished">
              <a-radio :value="0">未发布</a-radio>
              <a-radio :value="1">已发布</a-radio>
            </a-radio-group>
          </a-form-item>
           -->
         <!--  <a-form-item label="通报情况" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
           <a-radio-group v-model="form.isPublished">
             <a-radio :value="0">未发布</a-radio>
             <a-radio :value="1">已发布</a-radio>
           </a-radio-group>
         </a-form-item> -->

          <a-form-item label="网络类别" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-checkbox
              :indeterminate="indeterminate"
              :checked="checkAll"
              @change="onCheckAllChange"
            >全部</a-checkbox>
            <a-checkbox-group v-model="form.checkboxgroup">
              <a-checkbox
                :checked="true"
                v-for="(item,index) in netWorkList"
                :key="index"
                :value="item.value"
              >{{item.key}}({{item.count}})</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item label="内容搜索" :labelCol="{span: 2}" :wrapperCol="{span: 10}">
            <a-input v-model="form.content">
              <a-select slot="addonBefore" style="width: 100px" v-model="form.test">
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
    <a-table
      ref="table"
      bordered
      size="middle"
      rowKey="hash_code"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :rowSelection="rowSelection"
      :scroll="{ x: 1800, y: 600 }"
    >
      <template
        slot="handle_datetime"
        slot-scope="text, record"
      >{{text=='1970-01-01 00:00:00'?'':text}}</template>
      <template slot="news_url" slot-scope="text, record">
        <a :href="text" style="word-break:break-all">{{text}}</a>
      </template>

      <span slot="simhashCount" slot-scope="text, record">
        <a @click="checkSimhash(record)">{{text}}</a>
      </span>

    </a-table>
    
  </a-card>
</template>
<script>
import { badAllList,badAllnetwork } from '@/api/newpage'
import moment from 'moment'

export default {
  data() {
    return {
      modalTest: '',
      changeform: {},
      changeType: '',
      value: 1,
      indeterminate: false,
      checkAll: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      visible: false,
      pagination: {
        pageSize: 50,
        total: 1
      },
      form: {
        // orderBy: '',
        // mediaAttr: '',
        // is_handled: '',
        is_handled:'',
        //news_title:''，
        startTime: '',
        endTime: '',
        checkboxgroup: [],
        //networkCategory: '',
        //test: '1',
        //news_content: '',
        //content: '',
        page: 1,
        limit: 50
      },
      netWorkList: [],
      allCheckList: [],
      columns: [
        {
          title: '一级分类',
          align: 'center',
          dataIndex: 'question_level',
          width: 150
        },
        {
          title: '形式判断',
          align: 'center',
          dataIndex: 'feel_tag',
          width: 100
        },
        {
          title: '网络类别',
          align: 'center',
          dataIndex: 'media_type_final',
          width: 100
        },
        {
          title: '网媒来源',
          align: 'center',
          dataIndex: 'app_name_final',
          width: 100
        },
        {
          title: '发布者',
          align: 'center',
          dataIndex: 'news_author_final',
          width: 100
        },
        {
          title: '标题',
          align: 'center',
          dataIndex: 'news_title'
        },
        {
          title: '链接',
          align: 'center',
          dataIndex: 'news_url',
          scopedSlots: { customRender: 'news_url' },
          width: 280
        },
        {
          title: '车型',
          align: 'center',
          dataIndex: 'auto_brand',
          width: 100
        },
        {
          title: '发布时间',
          align: 'center',
          dataIndex: 'news_posttime',
          width: 100
        },
        {
          title: '相似文章',
          align: 'center',
          dataIndex: 'simhashCount',
          scopedSlots: { customRender: 'sim_hash' },
          width: 80
        }
      ],
      dataSource: [],
      ids: '',
      carList: []
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
        this.getNetLit()
        delete this.form.news_content
        delete this.form.news_title
        delete this.form.app_name
        delete this.form.question_level
        delete this.form.news_author
        delete this.form.auto_brand
        if (newValue.test == '1') {
          this.form.news_content = this.form.content
        } else if (newValue.test == '2') {
          this.form.news_title = this.form.content
        } else if (newValue.test == '3') {
          this.form.app_name = this.form.content
        } else if (newValue.test == '4') {
          this.form.question_level = this.form.content
        } else if (newValue.test == '5') {
          this.form.news_author = this.form.content
        } else if (newValue.test == '6') {
          this.form.auto_brand = this.form.content
        }
        this.getlist()
      },
      deep: true
    }
  },
  mounted() {
    this.badAllListFn()
    //this.getcarlist()
    //this.getlist()
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this

      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.ids = selectedRowKeys
        }
      }
    }
  },
  methods: {
    badAllListFn() {
      let obj = this.form
      badAllList(obj).then(res => {
        console.log(res)
        this.dataSource = res.list
        if (res.count) {
          this.pagination.total = res.count
        }
        this.loading = false
        
      })
    },
    badAllnetworkFn() {
      let obj = this.form
      badAllnetwork(obj).then(res => {
        console.log(res)
        this.dataSource = res.list
        if (res.count) {
          this.pagination.total = res.count
        }
        this.loading = false
        
      })
    },
    getNetLit() {
      let obj = this.form
      badAllnetwork(obj).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.netWorkList = res.list
          for (let index = 0; index < res.list.length; index++) {
            this.allCheckList.push(res.list[index].value)
          }
        }
      })
    },
    //查看相似文章
    checkSimhash(record){
      simhash({
        simHash: record.hash_code
      }).then(res=>{
        this.dataSource = res.list
        this.loading = false
        this.pagination.pageSize = 100000
      })
    },
    //清洗完成
    cleanData() {
      addtime().then(res => {
        console.log(res)
      })
    },
    upData() {
      this.$confirm({
        title: '发布',
        content: '是否确定发布?',
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk() {
          batchpublish().then(res => {
            console.log(res)
          })
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    deleteAll() {
      if (!this.ids) {
        this.$message.warning('请选择至少删除一项！')
        return
      }
      const that = this
      this.$confirm({
        title: '删除',
        content: '是否确定删除选中项?',
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk() {
          let obj = {
            data: that.ids
          }
          batchdel(obj).then(res => {
            that.getlist()
          })
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    getcarlist() {
      carlist().then(res => {
        console.log(res)
        this.carList = res.list
      })
    },
    changeList() {
      if (!this.ids) {
        this.$message.warning('请选择修改内容！')
        return
      }
      this.changeform = {}
      this.visible = true
    },
    handleTableChange(pagination, filters, sorter) {
      this.form.page = pagination.current
      this.getList()
    },
    onCheckAllChange(e) {
      this.form.checkboxgroup = e.target.checked ? this.allCheckList : []
      this.indeterminate = false
      this.checkAll = e.target.checked
    },
    oncheckChange() {},
    getlist() {
      let obj = this.form
      getSentimentList(obj).then(res => {
        console.log(res)
        this.dataSource = res.list
        if (res.count) {
          this.pagination.total = res.count
        }
        this.loading = false
        
      })
    },
    onDelete(key) {},
    handleEdit(record) {
      this.changeform = record
      console.log(record.media_type)
      this.visible = true
      this.disable = true
    },
    handleDelete(record) {
      let arr = []
      arr.push(record.hash_code)
      let obj = {
        data: arr
      }
      batchdel(obj).then(res => {
        this.getlist()
      })
    },
    changeMsg(record) {},
    onChange(e) {
      console.log('radio checked', e.target.value)
    },
    start() {
      this.loading = true
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
      let obj = this.changeform
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
        console.log(res)
        this.visible = false
        this.getlist()
      })
    },
    handleCancel(e) {
      this.visible = false
    },
    handleChangeUP(value) {
      console.log(`selected ${value}`)
    },
    changeDate(dates, dateStrings) {
      this.form.startTime = dateStrings[0]
      this.form.endTime = dateStrings[1]
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
.btns {
  margin-bottom: 10px;
}
.btns a {
  margin-left: 8px;
}
</style>