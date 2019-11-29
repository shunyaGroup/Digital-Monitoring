<template>
  <a-modal title="相似文章" v-model="visible" okText="完成" width="1200px" :footer="null">
    <div class="btns">
      <a @click="editBatch">批量操作</a>
      <a @click="deleteAll" style="margin-left:10px">批量删除</a>
    </div>
    <a-table
      ref="table"
      bordered
      size="middle"
      rowKey="hash_code"
      :columns="columns"
      :dataSource="dataSource"
      :scroll="{ y: 350 }"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :rowSelection="rowSelection"
    >
      <span slot="news_title" slot-scope="text">
        <j-ellipsis :value="text" :length="10" />
      </span>
      <span slot="news_url" slot-scope="text">
        <j-ellipsis :value="text" :length="20" />
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
    <Editnews ref="modalEdit" :carList="carList" @refresh="getlist"></Editnews>
  </a-modal>
</template>

<script>
import { checkSimhash } from '@/api/newpage'
import JEllipsis from '@/components/jeecg/JEllipsis'
import Editnews from '../component/edit'
export default {
  name: 'Simhash',
  props: {
    simHash: String,
    form: Object,
    carList: Array
  },
  components: {
    JEllipsis,
    Editnews
  },
  data() {
    return {
      visible: false,
      columns: [
        {
          title: '标题',
          align: 'center',
          dataIndex: 'news_title',
          scopedSlots: { customRender: 'news_title' },
          width: '180px'
        },
        {
          title: '链接',
          align: 'center',
          dataIndex: 'news_url',
          scopedSlots: { customRender: 'news_url' },
          width: '180px'
        },
        {
          title: '一级分类',
          align: 'center',
          dataIndex: 'question_level',
          width: '120px'
        },
        {
          title: '网络类别',
          align: 'center',
          dataIndex: 'media_type_final',
          width: '100px'
        },
        {
          title: '网媒来源',
          align: 'center',
          dataIndex: 'app_name_final',
          width: '100px'
        },
        {
          title: '形式判断',
          align: 'center',
          dataIndex: 'feel_tag',
          width: '80px'
        },
        {
          title: '车型',
          align: 'center',
          dataIndex: 'auto_brand',
          width: '100px'
        },
        {
          title: '发布者',
          align: 'center',
          dataIndex: 'news_author_final',
          width: '80px'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center'
        }
      ],
      dataSource: [],
      loading: false,
      pagination: {
        total: 0,
        pageSize: 50,
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true
      },
      limit: 10,
      page: 1,
      ids: [],
    }
  },
  created() {},
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
    //获取相似文章列表
    getlist(record, from) {
      this.visible = true
      let obj = Object.assign({}, from)
      obj.simHash = record.sim_hash
      obj.limit = this.limit
      obj.page = this.page
      checkSimhash(obj).then(res => {
        if (res.msg == 'success') {
          this.dataSource = res.list
          this.loading = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //切换分页
    handleTableChange(pagination, filters, sorter) {
      this.page = pagination.current
      this.limit = pagination.pageSize
      this.getlist()
    },
    //批量编辑
    editBatch() {
      if (this.ids.length < 1) {
        this.$message.warning('请至少选择一条数据进行批量操作！')
      } else {
        this.$refs.modalEdit.show({}, this.ids)
      }
    },
    deleteAll() {
      
    }
  }
}
</script>
<style>
.ant-modal {
  top: 45px;
}
</style>