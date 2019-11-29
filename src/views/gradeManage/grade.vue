<template>
  <a-card :bordered="false">
    <a-table
      ref="table"
      bordered
      size="middle"
      rowKey="id"
      :columns="columns"
      :dataSource="dataSource"
      :loading="loading"
      @change="handleTableChange"
      :pagination="pagination"
    >
      <template slot="scoreImg" slot-scope="text">
        <a-rate :defaultValue="text" allowHalf disabled />
      </template>
      <span slot="action" slot-scope="text, record" v-if="record.user_id">
        <a @click="getDetail(record)">详情</a>
      </span>
    </a-table>

    <a-modal title="详情" v-model="visible" :width="1200">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">关闭</a-button>
      </template>
      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="detailColumns"
        :dataSource="detailData"
        :loading="detailLoading"
        @change="detailhandleTableChange"
        :pagination="detailPagination"
      >
        <span slot="errorInfoStr" slot-scope="text">
          <span v-html="text"></span>
        </span>
      </a-table>
    </a-modal>
  </a-card>
</template>
<script>
import { getPerformanceList, getPerformanceDetail } from '@/api/newpage'
export default {
  data() {
    return {
      visible: false,
      dataSource: [],
      detailData: [],
      detailLoading: false,
      loading: true,
      detailPagination: {
        pageSize: 5,
        current: 1,
        total: 0,
        showTotal: () => {}
      },
      pagination: {
        pageSize: 5,
        current: 1,
        total: 0
      },
      columns: [
        {
          title: '日期',
          align: 'left',
          dataIndex: 'date'
        },
        {
          title: '处理账号数',
          align: 'left',
          dataIndex: 'userCount'
        },
        {
          title: '清洗账号',
          align: 'left',
          dataIndex: 'mobile'
        },
        {
          title: '总数',
          align: 'center',
          dataIndex: 'total'
        },
        {
          title: '评分',
          align: 'center',
          dataIndex: 'score'
        },
        {
          title: '星级',
          align: 'center',
          dataIndex: 'scoreImg',
          scopedSlots: { customRender: 'scoreImg' }
        },
        {
          title: '错误数',
          align: 'center',
          dataIndex: 'errorTotal'
        },
        {
          title: '错误率',
          align: 'center',
          dataIndex: 'errorRate'
        },
        {
          title: '操作',
          align: 'center',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      detailColumns: [
        {
          title: '审核账号',
          align: 'center',
          dataIndex: 'checkUserId'
        },
        {
          title: '企业名称',
          align: 'center',
          dataIndex: 'enterprise_id'
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createDateTime'
        },
        {
          title: '错误字段数',
          align: 'center',
          dataIndex: 'errorFieldCount'
        },
        {
          title: '总字段数',
          align: 'center',
          dataIndex: 'clearFieldCount'
        },
        {
          title: '错误率',
          align: 'center',
          dataIndex: 'errorRate'
        },
        {
          title: '得分',
          align: 'center',
          dataIndex: 'score'
        },
        {
          title: '修正信息',
          align: 'center',
          dataIndex: 'errorInfoStr',
          scopedSlots: { customRender: 'errorInfoStr' }
        }
      ],
      record: {}
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    handleCancel() {
      this.visible = false
    },
    getDetail(record) {
      this.visible = true
      this.record = record
      this.detailLoading = true
      let obj = {
        page: this.detailPagination.current,
        limit: this.detailPagination.pageSize,
        date: record.date,
        user_id: record.user_id
      }
      getPerformanceDetail(obj).then(res => {
        this.detailLoading = false
        if (res.msg == 'success') {
          this.detailData = res.list
          this.detailPagination.total = res.count
        } else {
          this.detailData = []
        }
      })
    },
    detailhandleTableChange(pagination) {
      this.detailPagination = pagination
      this.getDetail(this.record)
    },
    handleTableChange(pagination) {
      this.pagination = pagination
      this.getList()
    },
    getList() {
      let obj = {
        page: this.pagination.current,
        limit: this.pagination.pageSize
      }
      getPerformanceList(obj).then(res => {
        this.loading = false
        if (res.msg == 'success') {
          this.dataSource = res.list
          this.pagination.total = res.count
        } else {
          this.dataSource = []
        }
      })
    }
  }
}
</script>
