<template>
  <a-card title="待处理数据">
    <a-row>
      <a-col>
        共
        <span style="color:red">1000条</span>
      </a-col>
    </a-row>
    <a-row style="margin-top:10px">
      <a-col>
        <a-range-picker
          format="YYYY-MM-DD HH:mm:ss"
          @change="changeDate"
          :ranges="{ '今天': [moment(), moment()], '昨天': [moment().subtract('days', 1), moment()], '近七天': [moment().subtract('days', 7),moment()], '近30天':[moment().subtract('days', 30),moment()]}"
        />
        <a-button type="primary" style="margin-left:10px" @click="pull">拉取</a-button>
      </a-col>
    </a-row>
    <a-divider></a-divider>
    <a-form layout="inline">
      <a-row>
        <a-col :span="12">
          <a-form-item label="发布时间">
            <a-radio-group v-model="form.orderBy">
              <a-radio value>全部</a-radio>
              <a-radio :value="1">时间倒序</a-radio>
              <a-radio :value="2">时间正序</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="媒体属性">
            <a-radio-group v-model="form.mediaAttr">
              <a-radio value>全部</a-radio>
              <a-radio :value="1">用户层面</a-radio>
              <a-radio :value="2">新闻层面</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="情感状态">
            <a-radio-group v-model="form.feel">
              <a-radio value>全部</a-radio>
              <a-radio :value="1">正面</a-radio>
              <a-radio :value="2">负面</a-radio>
              <a-radio :value="3">中性</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="内容搜索">
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
        </a-col>
        <a-col :span="24">
          <a-form-item label="网络类别">
            <a-select
              mode="multiple"
              style="min-width: 150px"
              v-model="form.networkCategory"
              aria-placeholder="请选择网络类别"
            >
              <a-select-option
                v-for="(item,index) in netWorkList"
                :key="index"
                :value="item.value"
              >{{item.key}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-row style="margin-top:10px">
      <a-button type="primary" @click="getlist">筛选</a-button>
      <a-button style="margin-left:10px">重置</a-button>
    </a-row>
    <a-divider></a-divider>
    <a-row>
      <a-button type="primary" @click="editBatch">批量编辑</a-button>
      <a-button style="margin-left:10px" @click="deleteAll">批量删除</a-button>
    </a-row>
    <a-table
      ref="table"
      bordered
      size="middle"
      rowKey="hash_code"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="pagination"
      :rowSelection="rowSelection"
      @change="handleTableChange"
    >
      <span slot="news_title" slot-scope="text">
        <j-ellipsis :value="text" :length="10" />
      </span>
      <span slot="news_url" slot-scope="text">
        <j-ellipsis :value="text" :length="15" />
      </span>
      <span slot="simhashCount" slot-scope="text, record">
        <a @click="checkSimhash(record)">查看</a>
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                <a>删除</a>
              </a-popconfirm>
            </a-menu-item>
            <a-menu-item>
              <a @click="disposeMsg(record)">历史</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="checkDetails(record)">详情</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </a-table>

    <a-modal
      title="详情"
      :visible="visibleDetail"
      @ok="visibleDetail=false"
      @cancel="visibleDetail=false"
    >
      <p>标题：{{detailObj.news_title}}</p>
      <p>
        链接：
        <a :href="detailObj.news_url" target="_blank">{{detailObj.news_url}}</a>
      </p>
      <p>数据录入时间：{{detailObj.create_datetime}}</p>
      <p>最近编辑时间：{{detailObj.handle_datetime == '1970-01-01 00:00:00'?'暂无编辑':detailObj.handle_datetime}}</p>
      <p>文章发布时间：{{detailObj.news_posttime}}</p>
    </a-modal>

    <Simhash ref="modalForm" :record="record" :carList="carList"></Simhash>
    <Editnews ref="modalEdit" :carList="carList" @refresh="getlist"></Editnews>
  </a-card>
</template>
<script>
import { pullData, getDataList, batchdel, cartypeListbyid, handledMsgFf } from '@/api/newpage'
import moment from 'moment'
import { fail } from 'assert'
import JEllipsis from '@/components/jeecg/JEllipsis'
import Simhash from '../component/simhash'
import Editnews from '../component/edit'
export default {
  components: {
    JEllipsis,
    Simhash,
    Editnews
  },
  data() {
    return {
      visibleDetail: false,
      editVisible: false,
      carList: [],
      record: {},
      program: {},
      form: {
        isHandled: '0',
        feel: '',
        orderBy: '',
        mediaAttr: '',
        is_handled: '',
        isPublished: '',
        startTime: '',
        endTime: '',
        networkCategory: [],
        news_content: '',
        news_title: '',
        app_name: '',
        question_level: '',
        news_author: '',
        auto_brand: '',
        state: '1',
        page: 1,
        limit: 10
      },
      netWorkList: [
        {
          key: '其他',
          value: 0
        },
        {
          key: '微信',
          value: 1
        },
        {
          key: '客户端',
          value: 2
        },
        {
          key: '网页',
          value: 3
        },
        {
          key: '微博',
          value: 4
        },
        {
          key: '论坛',
          value: 5
        },
        {
          key: '视频',
          value: 6
        },
        {
          key: '口碑',
          value: 7
        },
        {
          key: '问答',
          value: 8
        },
        {
          key: '自媒体',
          value: 9
        },
        {
          key: '投诉',
          value: 10
        }
      ],
      columns: [
        {
          title: '标题',
          align: 'center',
          dataIndex: 'news_title',
          scopedSlots: { customRender: 'news_title' }
        },
        {
          title: '链接',
          align: 'center',
          dataIndex: 'news_url',
          scopedSlots: { customRender: 'news_url' }
        },
        {
          title: '相似文章',
          align: 'center',
          dataIndex: 'simhashCount',
          scopedSlots: { customRender: 'simhashCount' }
        },
        {
          title: '一级分类',
          align: 'center',
          dataIndex: 'question_level'
        },
        {
          title: '网络类别',
          align: 'center',
          dataIndex: 'media_type_final'
        },
        {
          title: '网媒来源',
          align: 'center',
          dataIndex: 'app_name_final'
        },
        {
          title: '形式判断',
          align: 'center',
          dataIndex: 'feel_tag'
        },
        {
          title: '车型',
          align: 'center',
          dataIndex: 'auto_brand'
        },
        {
          title: '发布者',
          align: 'center',
          dataIndex: 'news_author_final'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center'
        }
      ],
      dataSource: [],
      pagination: {
        total: 0,
        pageSize: 10,
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true
      },
      ids: [],
      detailObj: {}
    }
  },
  watch: {
    form: {
      handler(newValue) {
        // this.getNetLit()
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
        // this.getlist()
      },
      deep: true
    }
  },
  mounted() {
    this.getCarlist()
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          let arr = []
          for (let i = 0; i < selectedRows.length; i++) {
            arr.push(selectedRows[i].hash_code)
          }
          this.ids = arr
        }
      }
    }
  },
  methods: {
    //拉取数据
    pull() {
      pullData({
        startTime: this.program.startTime,
        endTime: this.program.endTime
      }).then(res => {
        if (res.code == '200' || res.msg == 'success') {
          this.$message.success(res.info)
          this.getlist()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //日期选择器
    changeDate(dates, dateStrings) {
      this.program.startTime = dateStrings[0]
      this.program.endTime = dateStrings[1]
    },
    //查询表格
    getlist() {
      this.form.isHandled = '0'
      let obj = Object.assign({}, this.form)
      getDataList(obj).then(res => {
        this.dataSource = res.list
        if (res.count) {
          this.pagination.total = res.count
        }
        this.loading = false
      })
    },
    //查看相似文章
    checkSimhash(record) {
      this.$refs.modalForm.getlist(record, this.form)
    },
    //编辑
    handleEdit(record) {
      // this.editVisible = true
      // this.record = Object.assign({}, record)
      this.$refs.modalEdit.show(record)
    },
    //批量编辑
    editBatch() {
      if (this.ids.length < 1) {
        this.$message.warning('请至少选择一条数据进行批量操作！')
      } else {
        this.$refs.modalEdit.show({}, this.ids)
      }
    },
    //删除新闻
    handleDelete(record) {
      let arr = []
      arr.push(record.hash_code)
      let obj = {
        data: arr
      }
      batchdel(obj).then(res => {
        if (res.code == 200) {
          this.$message.success('删除成功！')
          this.loading = true
          this.getlist()
          // this.sameOrder()
          // this.simhash(this.simHashForm)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //批量删除
    deleteAll() {
      if (this.ids.length < 1) {
        this.$message.warning('请选择至少删除一项！')
        return
      }
      const that = this
      that.$confirm({
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
            if (res.code == '200' || res.msg == 'success') {
              that.$message.success('删除成功')
            } else {
              that.$message.error(res.msg)
            }
          })
        }
      })
    },
    //历史判断
    disposeMsg(record) {
      handledMsgFf({
        sim_hash: record.hash_code
      }).then(res => {
        if (res.code == '200' || res.msg == 'success') {
          console.log('成功')
        } else {
          console.log(res.msg)
          //this.$message.error(res.msg)
        }

        console.log(!res.list)
        if (res.list.length > 0) {
          this.handelVisible = true
          this.handelMsg = res.list[0]
        } else {
          this.$message.warning('该条暂无处理信息')
        }
      })
    },
    //查看详情
    checkDetails(record) {
      this.visibleDetail = true
      this.detailObj = Object.assign({}, record)
    },
    //切换分页
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination)
      this.form.page = pagination.current
      this.form.limit = pagination.pageSize
      this.getlist()
    },
    //获取车型列表
    getCarlist() {
      cartypeListbyid().then(res => {
        this.carList = res.list
      })
    },
    moment
  }
}
</script>
<style scoped>
</style>