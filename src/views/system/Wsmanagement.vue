<template>
  <a-card :bordered="false">

    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="12">
          <a-col :md="7" :sm="8">
            <a-form-item label="项目名称" :labelCol="{span: 6}" :wrapperCol="{span: 14, offset: 1}">
              <a-input placeholder="请输入项目名称" v-model="queryParam.dictName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a-button type="primary" @click="addList" icon="plus" style="margin-left: 8px">添加</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
      <a-table
        ref="table"
        rowKey="id"
        size="middle"
        border
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">
            <a-icon type="edit"/>
            编辑
          </a>
          <a-divider type="vertical"/>
          <a @click="editDictItem(record)"><a-icon type="setting"/> 字典配置</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除吗?" @confirm="() =>handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>

    </div>
  </a-card>
</template>

<script>
  import { filterObj } from '@/utils/util';
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "DictList",
    mixins:[JeecgListMixin],
    data() {
      return {
        description: '这是项目管理页面',
        visible: false,
        // 查询条件
        queryParam: {
          dictCode: "",
          dictName: "",
        },
        // 表头
        columns: [
          {
            title: '项目名称',
            align: "center",
            dataIndex: 'dictName',
          },
          {
            title: '创建时间',
            align: "center",
            dataIndex: 'description',
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }
        ],
        dict: "",
        labelCol: {
          xs: {span: 8},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 16},
          sm: {span: 19},
        },
        url: {
          list: "/project/aiProject/list",
          delete: "/sys/dict/delete",
          exportXlsUrl: "sys/dict/exportXls",
          importExcelUrl: "sys/dict/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      getQueryParams() {
        var param = Object.assign({}, this.queryParam, this.isorter);
        param.field = this.getQueryField();
        param.pageNo = this.ipagination.current;
        param.pageSize = this.ipagination.pageSize;
        return filterObj(param);
      },
      //取消选择
      cancelDict() {
        this.dict = "";
        this.visible = false;
        this.loadData();
      },
      //编辑字典数据
      editDictItem(record) {
        this.$refs.dictItemList.edit(record);
      },
      // 重置字典类型搜索框的内容
      searchReset() {
        var that = this;
        that.queryParam.dictName = "";
        that.queryParam.dictCode = "";
        that.loadData(this.ipagination.current);
      },
    },
    watch: {
      openKeys(val) {
        console.log('openKeys', val)
      },
    },
  }
</script>
<style scoped>
  @import '~@assets/less/common.css'
</style>