<template>
  <a-card :bordered="false">
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <!-- <a-button
        @click="batchDel"
        style="margin-left:8px"
        v-if="selectedRowKeys.length > 0"
        ghost
        type="primary"
        icon="delete"
      >批量删除</a-button>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        :columns="columns"
        size="middle"
        :pagination="false"
        :dataSource="dataSource"
        :loading="loading"
        rowKey="id"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
        <!-- 字符串超长截取省略号显示 -->
        <span slot="path" slot-scope="text, record">
          <j-ellipsis :value="text" :length="25" />
        </span>
        <!-- 字符串超长截取省略号显示-->
        <span slot="component" slot-scope="text, record">
          <j-ellipsis :value="text" />
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <permission-modal ref="modalForm" @ok="modalFormOk"></permission-modal>
    <!-- <permission-data-rule-list ref="PermissionDataRuleList" @ok="modalFormOk"></permission-data-rule-list> -->
  </a-card>
</template>

<script>
import PermissionModal from './modules/PermissionModal'
import { getPermissionList } from '@/api/api'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
// import PermissionDataRuleList from './PermissionDataRuleList'
import JEllipsis from '@/components/jeecg/JEllipsis'
import { authList, deletePermission } from '@/api/newpage'

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType',
    key: 'menuType',
    customRender: function(text) {
      if (text == 0) {
        return '菜单'
      } else if (text == 1) {
        return '菜单'
      } else if (text == 2) {
        return '按钮'
      } else {
        return text
      }
    }
  },
  {
    title: 'icon',
    dataIndex: 'icon',
    key: 'icon'
  },
  {
    title: '组件',
    dataIndex: 'component',
    key: 'component',
    scopedSlots: { customRender: 'component' }
  },
  {
    title: '路径',
    dataIndex: 'path',
    key: 'path',
    scopedSlots: { customRender: 'path' }
  },
  {
    title: '排序',
    dataIndex: 'sortNo',
    key: 'sortNo'
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center',
    width: 150
  }
]

export default {
  name: 'PermissionList',
  mixins: [JeecgListMixin],
  components: {
    PermissionModal,
    JEllipsis
  },
  data() {
    return {
      description: '这是菜单管理页面',
      columns: columns,
      loading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      authList().then(res => {
        this.dataSource = res.list
      })
    },
    modalFormOk() {
      this.getList()
    },
    handleDelete(id) {
      deletePermission({id: id}).then(res => {
        if (res.msg == 'success') {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.warring('删除失败')
        }
      })
    },
    loadData() {
      // this.dataSource = []
      // getPermissionList().then(res => {
      //   if (res.success) {
      //     console.log(res.result)
      //     this.dataSource = res.result
      //   }
      // })
    }
    // 打开数据规则编辑
    // handleDataRule(record) {
    //   this.$refs.PermissionDataRuleList.edit(record)
    // }
  }
}
</script>
<style scoped>
@import '../../assets/less/common.css';
</style>