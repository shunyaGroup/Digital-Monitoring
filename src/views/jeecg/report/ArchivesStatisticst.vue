<template>
  <div>
    <a-card>
      <a-form>
        <a-row type="flex" justify="space-around">
          <a-col :span="4">
            <a-form-item label="产品" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
              <a-select v-model="product">
                <a-select-option value="all">全部</a-select-option>
                <a-select-option value="cs">CS15</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="场景" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
              <a-select v-model="sence">
                <a-select-option value="all">全部</a-select-option>
                <a-select-option value="cs">CS15</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
              <a-select v-model="state">
                <a-select-option value="all">全部</a-select-option>
                <a-select-option value="cs">CS15</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="标题" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
              <a-input v-model="title"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="2">
            <a-form-item>
              <a-button type="primary">查询</a-button>
            </a-form-item>
          </a-col>
          <a-col :span="2">
            <a-form-item>
              <a-button type="primary">导入</a-button>
            </a-form-item>
          </a-col>
          <a-col :span="2">
            <a-form-item>
              <a-button type="primary">导出</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-row :gutter="10" style="margin-top:5px">
      <a-col :span="16">
        <a-card title="新闻列表">
          <a-row type="flex" justify="start" style="margin-bottom: 10px">
            <a-col :span="6">
              <a-button type="primary" @click="addList">添加</a-button>
            </a-col>
          </a-row>
          <a-table
            :columns="columns"
            :dataSource="tabledata"
            bordered
            :scroll="{ y: 250 }"
          >
            <template slot="link" slot-scope="text, record, index">
              <a :href="record.link">{{record.link}}</a>
            </template>
            <template slot="operation" slot-scope="text, record, index">
              <div class="editable-row-operations">
                <span>
                  <a @click="() => edit(record.key)">修改</a>
                </span>
                <span>
                  <a @click="() => edit(record.key)">话术</a>
                </span>
                <span>
                  <a @click="() => delete(record.key)">删除</a>
                </span>
              </div>
            </template>
          </a-table>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="话术">
          <a-row type="flex" justify="start" style="margin-bottom: 10px">
            <a-col :span="6">
              <a-button type="primary">发布</a-button>
            </a-col>
            <a-col :span="6">
              <a-button type="primary">刷新</a-button>
            </a-col>
          </a-row>

          <a-table :columns="columns2" :dataSource="tabledata2" bordered :scroll="{ y: 250 }">
            <template
              v-for="col in ['content', 'tag']"
              :slot="col"
              slot-scope="text, record, index"
            >
              <div :key="col">
                <a-input
                  v-if="record.editable"
                  style="margin: -5px 0"
                  :value="text"
                  @change="e => handleChange(e.target.value, index, col)"
                />
                <template v-else>{{text}}</template>
              </div>
            </template>
            <template slot="operation" slot-scope="text, record, index">
              <div class="editable-row-operations">
                <span v-if="record.editable">
                  <a @click="() => save(index)">保存</a>
                  <!-- <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(index)">
                    <a>取消</a>
                  </a-popconfirm> -->
                </span>
                <span v-else>
                  <a @click="() => edit(index)">修改</a>
                </span>
              </div>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cacheData: [],
      product: 'cs',
      sence: 'all',
      state: 'all',
      title: '',
      columns: [
        {
          title: '链接',
          dataIndex: 'link',
          scopedSlots: { customRender: 'link' },
          width: 180
        },
        {
          title: '标题',
          dataIndex: 'title',
          scopedSlots: { customRender: 'title' },
          width: 200
        },
        {
          title: '产品',
          dataIndex: 'product',
          scopedSlots: { customRender: 'product' },
          width: 100
        },
        {
          title: '场景',
          dataIndex: 'sence',
          scopedSlots: { customRender: 'sence' },
          width: 120
        },
        {
          title: '状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'state' },
          width: 75
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 140
        }
      ],
      tabledata: [
        {
          link: 'http30cfdfa/79943317-1.',
          title: '这个新款15样子真心阔以。目没了？',
          product: 'CS1332',
          state: '已下载',
          sence: '产品正面信息',
          key: '1'
        },
        {
          link: 'https://club.au17-1.html',
          title: '这个新款15样子？',
          product: 'CS1332',
          state: '已下载',
          sence: '产品正面信息',
          key: '2'
        },
        {
          link: 'httpsml',
          title: '这个新款15样子',
          product: 'CS1332',
          state: '已下载',
          sence: '产品正面信息',
          key: '3'
        },
        {
          link: 'http30cfdfa/79943317-1.',
          title: '这个新款15样子真心阔以。目没了？',
          product: 'CS1332',
          state: '已下载',
          sence: '产品正面信息',
          key: '4'
        },
        {
          link: 'https://club.au17-1.html',
          title: '这个新款15样子？',
          product: 'CS1332',
          state: '已下载',
          sence: '产品正面信息',
          key: '5'
        },
        {
          link: 'httpsml',
          title: '这个新款15样子',
          product: 'CS1332',
          state: '已下载',
          sence: '产品正面信息',
          key: '6'
        },
        {
          link: 'http30cfdfa/79943317-1.',
          title: '这个新款15样子真心阔以。目没了？',
          product: 'CS1332',
          state: '已下载',
          sence: '产品正面信息',
          key: '7'
        },
        {
          link: 'https://club.au17-1.html',
          title: '这个新款15样子？',
          product: 'CS1332',
          state: '已下载',
          sence: '产品正面信息',
          key: '8'
        },
        {
          link: 'httpsml',
          title: '这个新款15样子',
          product: 'CS1332',
          state: '已下载',
          sence: '产品正面信息',
          key: '9'
        },
        {
          link: 'http30cfdfa/79943317-1.',
          title: '这个新款15样子真心阔以。目没了？15样子真心阔以',
          product: 'CS1332',
          state: '已下载',
          sence: '产品正面信息',
          key: '10'
        },
        {
          link: 'https://club.au17-1.html',
          title: '这个新款15样子？',
          product: 'CS1332',
          state: '已下载',
          sence: '产品正面信息',
          key: '11'
        },
        {
          link: 'httpsml',
          title: '这个新款15样子',
          product: 'CS1332',
          state: '已下载',
          sence: '产品正面信息',
          key: '12'
        }
      ],

      columns2: [
        {
          title: '话术内容',
          dataIndex: 'content',
          scopedSlots: { customRender: 'content' }
        },
        {
          title: '标签',
          dataIndex: 'tag',
          scopedSlots: { customRender: 'tag' },
          width: 80
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 70
        }
      ],
      tabledata2: [
        {
          content: '对于刚买车的人来说价格便宜，配置高，外观干净！ 【1】',
          tag: '配置',
          key: '0',
          id: '111'
        },
        {
          content: '对于刚买车的人来说价格便宜，配置高，外观干净！ 【1】',
          tag: '工艺',
          key: '1',
          id: '111'
        },
        {
          content: '对于刚买车的人',
          tag: '油耗',
          key: '2',
          id: '111'
        },
        {
          content: '置高，外观干净！ 【1】',
          tag: '其他',
          key: '3',
          id: '111'
        },
        {
          content: '对于刚买车的人来说价格便宜，配置高，外观干净！ 【1】',
          tag: '工艺',
          key: '4',
          id: '111'
        },
        {
          content: '对于刚买车的人',
          tag: '油耗',
          key: '5',
          id: '111'
        },
        {
          content: '置高，外观干净！ 【1】',
          tag: '其他',
          key: '6',
          id: '111'
        },
        {
          content: '对于刚买车的人来说价格便宜，配置高，外观干净！ 【1】',
          tag: '工艺',
          key: '7',
          id: '111'
        },
        {
          content: '对于刚买车的人',
          tag: '油耗',
          key: '8',
          id: '111'
        },
        {
          content: '置高，外观干净！ 【1】',
          tag: '其他',
          key: '9',
          id: '111'
        }
      ]
    }
  },
  mounted() {
    this.cacheData = this.tabledata2.map(item => ({ ...item }))

  },
  methods: {
    addList() {},
    handleChange (value, key, column) {
      console.log(value,key,column)
      const newData = [...this.tabledata2]
      const target = newData.filter(item => key == item.key)[0]
      console.log(target)
      if (target) {
        target[column] = value
        this.tabledata2 = newData
      }
    },
    edit (key) {
      const newData = [...this.tabledata2]
      const target = newData.filter(item => key == item.key)[0]
      if (target) {
        target.editable = true
        this.tabledata2 = newData
      }
    },
    save (key) {
      const newData = [...this.tabledata2]
      const target = newData.filter(item => key == item.key)[0]
      if (target) {
        delete target.editable
        this.tabledata2 = newData
        this.cacheData = newData.map(item => ({ ...item }))
      }
    },
    cancel (key) {
      const newData = [...this.tabledata2]
      const target = newData.filter(item => key == item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key == item.key)[0])
        delete target.editable
        this.tabledata2 = this.cacheData
      }
    },
  }
}
</script>

<style scoped>
.editable-row-operations span {
  margin-left: 5px;
}
</style>
<style>
.ant-card-body {
  padding: 10px !important;
}
.ant-card-head {
  min-height: 35px;
}
.ant-card-head-title {
  padding: 5px 0;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 5px 5px;
}
.ant-form-item {
  margin-bottom: 5px;
}
</style>
