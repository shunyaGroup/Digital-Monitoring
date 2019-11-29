<template>
  <a-card :bordered="false">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="12">
          <a-col :md="7" :sm="8">
            <a-form-item label="项目名称" :labelCol="{span: 6}" :wrapperCol="{span: 14, offset: 1}">
              <a-select v-model="queryParam.projectId" allowClear>
                <a-select-option
                  :value="item.id"
                  v-for="(item, index) in proList"
                  :key="index"
                >{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8">
            <a-form-item label="场景名称" :labelCol="{span: 6}" :wrapperCol="{span: 14, offset: 1}">
              <a-input v-model="queryParam.sceneName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
              <a-button type="primary" @click="add" icon="plus" style="margin-left: 8px">添加</a-button>
              <!-- <a-button
                type="primary"
                @click="deleteBtn"
                icon="delete"
                style="margin-left: 8px"
              >删除</a-button>-->
            </span>
          </a-col>
        </a-row>
      </a-form>
      <a-table
        ref="table"
        rowKey="id"
        size="middle"
        :rowSelection="rowSelection"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">
            <a-icon type="edit" />编辑
          </a>
          <a-popconfirm title="确定删除吗?" @confirm="() =>handleDelete(record.id)">
            <a style="margin-left:10px">
              <a-icon type="delete" />删除
            </a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <a-modal
      :title="modalTest"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item label="场景名称：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="sName" />
        </a-form-item>
        <a-form-item label="所属项目：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select v-model="proId">
            <a-select-option
              :value="item.id"
              v-for="(item, index) in proList"
              :key="index"
            >{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { addScene, deleteScene, allprojectList, editScene, deleteSceneBatch } from '@/api/api'
export default {
  name: 'DictList',
  mixins: [JeecgListMixin],
  data() {
    return {
      proList: [],
      sName: '',
      proId: '',
      description: '这是场景管理页面',
      visible: false,
      // 查询条件
      queryParam: {
        sceneName: '',
        projectId: ''
      },
      // 表头
      columns: [
        {
          title: '场景名称',
          align: 'center',
          dataIndex: 'sceneName'
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dict: '',
      labelCol: {
        xs: { span: 8 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 19 }
      },
      url: {
        list: '/scene/aiScene/list',
        // delete: '/scene/aiScene/delete',
        edit: '/project/aiProject/edit'
        // exportXlsUrl: 'sys/dict/exportXls',
        // importExcelUrl: 'sys/dict/importExcel'
      },
      modalTest: '添加场景',
      id: '',
      confirmLoading: false,
      form: {},
      defaultId: '',
      ids: ''
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
    rowSelection() {
      const { selectedRowKeys } = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.ids = `${selectedRowKeys}`
        }
      }
    }
  },
  mounted() {
    this.getproList()
  },
  methods: {
    getproList() {
      allprojectList().then(res => {
        if (res.success) {
          this.proList = res.result
          this.queryParam.projectId = res.result[0].id
          this.defaultId = res.result[0].id
        } else {
          this.proList = []
        }
      })
    },
    add() {
      this.visible = true
      this.modalTest = '添加场景'
      this.sName = ''
      this.proId = this.defaultId
    },
    getQueryParams() {
      var param = Object.assign({}, this.queryParam, this.isorter)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      return filterObj(param)
    },
    handleEdit(record) {
      this.visible = true
      this.sName = record.sceneName
      this.proId = record.projectId
      this.id = record.id
      this.modalTest = '编辑场景'
    },
    // 重置搜索框的内容
    searchReset() {
      var that = this
      that.queryParam.sceneName = ''
      that.queryParam.projectId = ''
      that.loadData(this.ipagination.current)
    },
    //添加项目
    handleOk() {
      const that = this
      if (!this.sName) {
        that.$message.warning('请输入场景名称')
        return
      }
      if (!this.proId) {
        that.$message.warning('请选择所属项目')
        return
      }

      let formData = {
        sceneName: this.sName,
        projectId: this.proId
      }
      let obj
      if (!this.id) {
        obj = addScene(formData)
      } else {
        formData.id = this.id
        obj = editScene(formData)
      }
      obj
        .then(res => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
          } else {
            that.$message.warning(res.message)
          }
        })
        .finally(() => {
          this.sceneName = ''
          this.projectId = ''
          this.visible = false
        })
    },
    handleCancel() {
      this.sceneName = ''
      this.projectId = ''
      this.visible = false
    },
    //删除项目
    handleDelete(id) {
      const that = this
      let obj = {
        id: id
      }
      let result = deleteScene(obj)
      result.then(res => {
        if (res.success) {
          that.$message.success(res.message)
          that.loadData()
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    //批量删除
    deleteBtn() {
      const that = this
      if (!this.ids) {
        this.$message.warning('请选择需要删除的场景！')
        return
      }
      this.$confirm({
        title: '批量删除',
        content: '是否确定删除选中场景',
        onOk() {
          let obj = {
            ids: that.ids
          }
          let result = deleteSceneBatch(obj)
          result.then(res => {
            if (res.success) {
              that.$message.success(res.message)
              that.loadData()
            } else {
              that.$message.warning(res.message)
            }
          })
        },
        onCancel() {}
      })
    }
  },
  watch: {
    openKeys(val) {
      console.log('openKeys', val)
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.css';
</style>