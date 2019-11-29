<template>
  <div>
    <a-row :gutter="10" style="margin-top:5px">
      <a-col :span="14">
        <a-card title="新闻列表" id="left">
          <a-form layout="inline" class="top">
            <a-row>
              <a-col :span="8">
                <a-form-item label="项目名称" :labelCol="{span: 8}" :wrapperCol="{span: 15}">
                  <a-select v-model="queryParam.projectId" @change="changeP">
                    <a-select-option
                      :value="item.id"
                      v-for="(item, index) in projectList"
                      :key="index"
                    >{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="任务名称" :labelCol="{span: 8}" :wrapperCol="{span: 15}">
                  <a-select v-model="queryParam.taskId" @change="changeTask">
                    <a-select-option
                      :value="item.id"
                      v-for="(item, index) in taskList"
                      :key="index"
                    >{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="批次号" :labelCol="{span: 8}" :wrapperCol="{span: 15}">
                  <!-- <a-input v-model="queryParam.batch" /> -->
                  <a-select v-model="queryParam.batch" allowClear>
                    <a-select-option
                      :value="item.name"
                      v-for="(item, index) in batchList"
                      :key="index"
                    >{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row v-show="toggleSearchStatus">
              <a-col :span="8">
                <a-form-item label="新闻名称" :labelCol="{span: 8}" :wrapperCol="{span: 15}">
                  <a-input v-model="queryParam.title" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="车型名称" :labelCol="{span: 8}" :wrapperCol="{span: 15}">
                  <!-- <a-select v-model="queryParam.produceName" allowClear>
                    <a-select-option
                      :value="item.produceName"
                      v-for="(item, index) in produceList"
                      :key="index"
                    >{{ item.produceName }}</a-select-option>
                  </a-select>-->
                  <a-select showSearch allowClear v-model="queryParam.produceName">
                    <a-select-option
                      :value="item.produceName"
                      v-for="(item, index) in produceList"
                      :key="index+'i'"
                    >{{ item.produceName }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="场景名称" :labelCol="{span: 8}" :wrapperCol="{span: 15}">
                  <a-select showSearch v-model="queryParam.scene" allowClear>
                    <a-select-option
                      :value="item.sceneName"
                      v-for="(item, index) in sceneList"
                      :key="index"
                    >{{ item.sceneName }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="执行状态" :labelCol="{span: 8}" :wrapperCol="{span: 15}">
                  <a-select v-model="queryParam.status">
                    <a-select-option
                      :value="item.value"
                      v-for="(item, index) in stateList"
                      :key="index"
                    >{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="16">
                <a-form-item label="起始时间" :labelCol="{span: 4}" :wrapperCol="{span: 15}">
                  <a-range-picker
                    @change="onChange"
                    v-model="timeDate"
                    :defaultValue="[moment(), moment()]"
                  ></a-range-picker>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row style="margin-top:10px;margin-bottom:10px;">
              <a-col>
                <span style="overflow: hidden;" class="table-page-search-submitButtons">
                  <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                  <a-button
                    type="primary"
                    @click="searchReset"
                    style="margin-left: 3px"
                    icon="reload"
                  >重置</a-button>
                  <a-dropdown>
                    <a-menu slot="overlay">
                      <a-menu-item key="3">
                        <a-button type="primary" style="width:100px" @click="add" icon="import">单条导入</a-button>
                      </a-menu-item>
                      <a-menu-item key="1">
                        <a-button
                          type="primary"
                          style="width:100px"
                          @click="bulkImport"
                          icon="import"
                        >批量导入</a-button>
                        <!-- <a-upload
                          name="file"
                          :showUploadList="false"
                          :multiple="false"
                          :headers="tokenHeader"
                          :action="importExcelUrl"
                          :data="updata"
                          @change="handleImportExcel"
                        >
                          <a-button type="primary" style="width:100px" icon="import">批量导入</a-button>
                        </a-upload>-->
                      </a-menu-item>
                      <a-menu-item key="2">
                        <a-button
                          type="primary"
                          style="width:100px"
                          icon="download"
                          @click="exportTemp"
                        >下载模板</a-button>
                      </a-menu-item>
                    </a-menu>
                    <a-button type="primary" icon="import" style="margin-left: 3px">导入</a-button>
                  </a-dropdown>

                  <a-button
                    type="primary"
                    style="margin-left: 3px"
                    icon="download"
                    @click="exportList"
                  >导出</a-button>
                  <!-- <a-button style="margin-left: 3px" type="primary" @click="add">添加</a-button>

                  <a-button style="margin-left: 3px" type="primary" @click="searchQuery">批次合并</a-button>
                  <a-button style="margin-left: 3px" type="primary" @click="batchDelete">批量删除</a-button>-->
                  <a-button
                    style="margin-left: 3px"
                    type="primary"
                    @click="batchAction"
                  >{{!showBatchAction?'批量操作':'单条操作'}}</a-button>

                  <a-button
                    style="margin-left: 3px"
                    type="primary"
                    @click="refresh(20)"
                    v-if="showBatchAction"
                  >生成话术</a-button>

                  <a @click="handleToggleSearch" style="margin-left: 8px">
                    {{ toggleSearchStatus ? '收起' : '展开' }}
                    <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
                  </a>
                </span>
              </a-col>
            </a-row>
          </a-form>

          <a-table
            style="wordBreak: break-all"
            ref="table"
            rowKey="id"
            id="newsTable"
            :columns="columns"
            :dataSource="dataSource"
            :pagination="ipagination"
            @change="handleTableChange"
            :loading="loading"
            bordered
            :scroll="{ y: heightL }"
            :rowClassName="addrowClass"
            :rowSelection="newsRowSelect"
          >
            <div :style="ellipsis" slot="url" slot-scope="text, record">
              <a-tooltip placement="topLeft">
                <template slot="title">
                  <span>{{ record.url }}</span>
                </template>
                <a :href="record.url" target="_Blank">{{ text }}</a>
              </a-tooltip>
            </div>
            <div :style="ellipsis" slot="titles" slot-scope="text">
              <a-tooltip placement="topLeft">
                <template slot="title">{{ text }}</template>
                {{ text }}
              </a-tooltip>
            </div>
            <!-- <span slot="titles" slot-scope="text, record">
              <j-ellipsis :value="text" :length="12" />
            </span>-->

            <span slot="status" slot-scope="text, record">{{ getState(record.status) }}</span>
            <span slot="operation" slot-scope="text, record">
              <a @click="handleEdit(record)">编辑</a>
              <a @click="checktRick(record)" v-if="!showBatchAction" style="margin-left: 8px">话术</a>
              <a-popconfirm
                title="确定删除吗?"
                style="margin-left: 8px"
                @confirm="() =>handleDelete(record.id)"
              >
                <a>删除</a>
              </a-popconfirm>
            </span>
          </a-table>
        </a-card>
      </a-col>
      <a-col :span="10">
        <a-card title="话术" id="right">
          <a-row style="margin-bottom: 10px">
            <a-col>
              <span style="display: flex;" class="table-page-search-submitButtons">
                <!-- <a-button type="primary" @click="issue">发布</a-button> -->
                <a-dropdown style="margin-left:5px">
                  <a-menu slot="overlay">
                    <a-menu-item key="1">
                      <a-button type="primary" style="width:75px" @click="refresh(20)">20条</a-button>
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a-button type="primary" style="width:75px" @click="refresh(100)">100条</a-button>
                    </a-menu-item>
                    <a-menu-item key="3">
                      <a-button type="primary" style="width:75px" @click="refresh(200)">200条</a-button>
                    </a-menu-item>
                  </a-menu>
                  <a-button type="primary">刷新</a-button>
                </a-dropdown>
                <a-button
                  style="margin-left: 3px"
                  type="primary"
                  v-if="showBatchAction"
                  @click="getverbalTrick"
                >分配话术量</a-button>
                <a-progress
                  style="margin-left:5px;margin-top:5px;width:200px"
                  v-if="showProgress"
                  :percent="percent"
                  :strokeWidth="10"
                />
              </span>
            </a-col>
          </a-row>

          <a-table
            :columns="columns2"
            :dataSource="tabledata2"
            bordered
            rowKey="id"
            :scroll="{ y: heightR }"
            :rowSelection="rowSelection"
            :hideDefaultSelections="true"
            :pagination="false"
          >
            <template v-for="col in ['contents']" :slot="col" slot-scope="text, record">
              <div :key="col">
                <a-input
                  v-if="record.editable"
                  style="margin: -5px 0"
                  :value="text"
                  @change="e => handleChange(e.target.value, record.id, col)"
                />
                <template v-else>{{ text }}</template>
              </div>
            </template>
            <template slot="operation" slot-scope="text, record">
              <div class="editable-row-operations">
                <!-- <span v-if="record.editable">
                  <a @click="() => save(record.id)">保存</a>
                </span>-->
                <span>
                  <a @click="() => edit(record)">修改</a>
                </span>
              </div>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
    <a-modal
      title="修改话术"
      :visible="changeBatchvisible"
      @cancel="changeBatchCancel"
      @ok="changeBatchOk"
    >
      <a-form>
        <a-form-item label="话术内容" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-textarea :rows="4" v-model="newBatch" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal title="选择话术" :visible="batchvisible" @cancel="batchCancel" @ok="batchOk">
      <a-form>
        <a-form-item label="新闻话术量：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select v-model="batchNumber">
            <a-select-option :value="2">2条</a-select-option>
            <a-select-option :value="3">3条</a-select-option>
            <a-select-option :value="4">4条</a-select-option>
            <a-select-option :value="5">5条</a-select-option>
            <a-select-option :value="6">6条</a-select-option>
            <a-select-option :value="7">7条</a-select-option>
            <a-select-option :value="8">8条</a-select-option>
            <a-select-option :value="9">9条</a-select-option>
            <a-select-option :value="10">10条</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      :title="modalTest"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-spin :spinning="isCheck">
        <a-form :form="form">
          <a-form-item label="新建批次：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
            <a-radio-group name="radioGroup" :defaultValue="1" v-model="showBatch">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="2">否</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            v-if="showBatch==2"
            label="选择批次："
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-select v-model="addform.batch">
              <a-select-option
                :value="item.name"
                v-for="(item, index) in batchList"
                :key="index"
              >{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            v-if="!showBulk"
            label="新闻链接："
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-input v-model="addform.newsLink" />
          </a-form-item>
          <a-form-item
            v-if="!showBulk"
            label="新闻标题："
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-input v-model="addform.newsTitle" />
          </a-form-item>
          <a-form-item
            v-if="!showBulk"
            label="所属车型："
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-select v-model="addform.newsProduce" showSearch>
              <a-select-option
                :value="item.produceName"
                v-for="(item, index) in produceList"
                :key="index+'i'"
              >{{ item.produceName }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            v-if="!showBulk"
            label="所属场景："
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 18 }"
          >
            <a-select v-model="addform.newsScene" showSearch>
              <a-select-option
                :value="item.sceneName"
                v-for="(item, index) in sceneList"
                :key="index+'i'"
              >{{ item.sceneName }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-spin>
      <template slot="footer">
        <a-button type="primary" v-if="!showBulk" @click="checkUrl" :disabled='modalTest=="编辑新闻"'>识别</a-button>
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" v-if="!showBulk" type="primary" @click="handleOk">确定</a-button>
        <a-upload
          name="file"
          :showUploadList="false"
          :multiple="false"
          :headers="tokenHeader"
          :action="importExcelUrl"
          :data="updata"
          @change="importExcel"
          :beforeUpload="beforeUp"
        >
          <a-button key="submit" style="margin-left:5px" type="primary" v-if="showBulk">导入</a-button>
        </a-upload>
      </template>
    </a-modal>

    <!-- <div class="dialog" v-if="isCheck">
      <div class="dialogCenter">
        <a-spin />
        <br />识别中...
      </div>
    </div>-->
  </div>
</template>
<script>
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JEllipsis from '@/components/jeecg/JEllipsis'
import moment from 'moment'
import {
  addNews,
  deleteNews,
  editNews,
  sceneQueryList,
  produceQueryList,
  getCorpusList,
  corpusChange,
  insertcorpus,
  deletecorpus,
  doSpiderAi,
  aiProjectPlist,
  gettaskListByid,
  deleteNewsBatch,
  getbatchList,
  addBatch,
  batchInsertNewsCorpus,
  loginOther
} from '@/api/comment'
import Vue from 'vue'
import { ACCESS_TOKEN } from "@/store/mutation-types"
export default {
  name: 'DictList',
  mixins: [JeecgListMixin],
  components: {
    JEllipsis
  },
  data() {
    return {
      beginSearch: false,
      batchChooseRecord: {},
      newBatch: '',
      changeBatchvisible: false,
      isCheck: false,
      showProgress: false,
      updata: {
        batchId: ''
      },
      toggleSearchStatus: true,
      showBatch: 1,
      percent: 0,
      newsId: '',
      dateFormat: 'YYYY-MM-DD',
      visible: false,
      modalTest: '添加新闻',
      timeDate: [moment().subtract('days', 6), moment()],
      queryParam: {
        produceName: '',
        status: '3',
        title: '',
        startTime: moment()
          .subtract('days', 6)
          .format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        projectId: '',
        scene: '',
        taskId: '',
        batch: '',
        bak1: '',
        bak2: ''
      },
      projectId: '',
      projectList: [],
      produceList: [],
      sceneList: [],
      taskList: [],
      stateList: [
        {
          value: '',
          name: '全部'
        },
        {
          value: '2',
          name: '待识别'
        },
        {
          value: '3',
          name: '已识别'
        },
        {
          value: '4',
          name: '待发布'
        },
        {
          value: '5',
          name: '已发布'
        }
      ],
      addform: {
        newsLink: '',
        newsTitle: '',
        newsProduce: '',
        newsScene: ''
      },
      confirmLoading: false,
      form: {},
      cacheData: [],
      product: 'cs',
      state: 'all',
      title: '',
      columns: [
        {
          title: '链接',
          dataIndex: 'url',
          scopedSlots: { customRender: 'url' },
          width: '25%'
        },
        {
          title: '标题',
          dataIndex: 'title',
          scopedSlots: { customRender: 'titles' },
          width: '25%'
        },
        {
          title: '车型',
          dataIndex: 'produce_name',
          scopedSlots: { customRender: 'produce_name' },
          width: '10%'
        },
        {
          title: '场景',
          dataIndex: 'scene',
          scopedSlots: { customRender: 'scene' },
          width: '10%'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          width: '10%'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      columns2: [
        {
          title: '话术内容',
          dataIndex: 'contents',
          scopedSlots: { customRender: 'contents' }
        },
        {
          title: '标签',
          dataIndex: 'dim2',
          scopedSlots: { customRender: 'dim2' },
          width: 70
        },
        {
          title: '频次',
          dataIndex: 'bak1',
          scopedSlots: { customRender: 'bak1' },
          width: 40
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 50
        }
      ],
      tabledata2: [],
      url: {
        list: 'http://39.97.240.97:8080/AIRW/pdnews/pdNews/list',
        exportXlsUrl: 'http://39.97.240.97:8080/AIRW/pdnews/pdNews/exportXls',
        importExcelUrl: 'http://39.97.240.97:8080/AIRW/pdnews/pdNews/importExcel',
        exportTempUrl: 'http://39.97.240.97:8080/AIRW/pdnews/pdNews/importTemp'
      },
      id: '',
      ids: '',
      chooseRecord: {},
      heightR: 0,
      heightL: 0,
      selectedRowKeysL: [],
      selectedRowsL: [],
      selectedRows: [],
      selectedRowKeys: [],
      h2: 0,
      ellipsis: {
        width: '178px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      },
      size: 20,
      batchList: [],
      showBulk: false,
      batchvisible: false,
      batchNumber: 2,

      allselectRowKeys: [],
      showBatchAction: false,
      ipagination:{
        showQuickJumper: false
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      // return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      return 'http://39.97.240.97:8080/AIRW/pdnews/pdNews/importExcel'
    },
    newsRowSelect() {
      const { selectedRowKeysL } = this
      if (this.showBatchAction) {
        return {
          selectedRowKeys: selectedRowKeysL,
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRows)
            if (this.selectedRowsL.length > 0 && selectedRows.length != 0) {
              if (
                selectedRows[selectedRows.length - 1].produce_name != this.selectedRowsL[0].produce_name ||
                selectedRows[selectedRows.length - 1].scene != this.selectedRowsL[0].scene
              ) {
                this.$message.error('请选择同一车型，同一场景下新闻！')
              } else {
                let str = ''
                selectedRowKeys.map((item, index) => {
                  str = str + item + ','
                })
                this.ids = str.substring(str.length - 1, 1)
                this.selectedRowKeysL = selectedRowKeys
                this.selectedRowsL = selectedRows
              }
            } else {
              let str = ''
              selectedRowKeys.map((item, index) => {
                str = str + item + ','
              })
              this.ids = str.substring(str.length - 1, 1)
              this.selectedRowKeysL = selectedRowKeys
              this.selectedRowsL = selectedRows
            }
          }
        }
      } else {
        return null
      }
    },
    rowSelection() {
      const { selectedRowKeys } = this
      return {
        selectedRowKeys,
        columnTitle: !this.showBatchAction ? ' ' : '',
        onSelect: (record, selected, selectedRows, nativeEvent) => {
          this.selectedRows = selectedRows
          if (!this.showBatchAction) {
            if (selected) {
              insertcorpus({
                corpus: record.contents,
                corpusId: record.id,
                newsId: this.chooseRecord.id
              }).then(res => {
                if (res == 'ok') {
                  this.$message.success('添加话术成功！')
                }
              })
            } else {
              deletecorpus({
                corpusId: record.id,
                newsId: this.chooseRecord.id
              }).then(res => {
                if (res == 'ok') {
                  this.$message.success('删除话术成功！')
                }
              })
            }
          }

          // if (this.selectedRowsL.length < 2) {
          //   if (!selected && this.allselectRowKeys.indexOf(record.id) > -1) {
          //     deletecorpus({
          //       corpusId: record.id,
          //       newsId: this.chooseRecord.id
          //     }).then(res => {
          //       if (res == 'ok') {
          //         this.$message.success('删除话术成功！')
          //         this.allselectRowKeys = this.allselectRowKeys.filter(function(value) {
          //           return value != record.id
          //         })
          //       }
          //     })
          //   }
          // }
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          this.selectedRows = selectedRows
        },
        onChange: selectedRowKeys => {
          this.selectedRowKeys = selectedRowKeys
        }
      }
    }
  },
  watch: {
    dataSource: function() {
      this.chooseRecord = {}
    }
  },
  beforeRouteEnter: (to,from,next) =>{
    loginOther({
      username: 'demo',
      password: '123456'
    }).then(res => {
      Vue.ls.set(ACCESS_TOKEN, res.result.token, 7 * 24 * 60 * 60 * 1000)
      next()
    })
  },
  mounted() {
    this.cacheData = this.tabledata2.map(item => ({ ...item }))
    this.getallprojectList()
    this.ellipsis.width = 0.2 * document.getElementById('newsTable').clientWidth - 15 + 'px'
    var h1 = document.getElementsByTagName('body')[0].clientHeight
    var h2 = document.getElementsByClassName('top')[0].clientHeight
    document.getElementById('left').style.height = h1 - 105 + 'px'
    document.getElementById('right').style.height = h1 - 105 + 'px'
    this.heightR = h1 - 105 - 150
    this.heightL = h1 - 105 - h2 - 150
    this.h2 = h2
  },
  methods: {
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    batchAction() {
      this.selectedRows = []
      this.selectedRowsL = []
      this.selectedRowKeys = []
      this.selectedRowKeysL = []
      setTimeout(() => {
        this.showBatchAction = !this.showBatchAction
      }, 100)

      console.log(this.selectedRowsL)
      this.tabledata2 = []
      this.chooseRecord = {}
    },
    searchQuery() {
      this.selectedRowKeysL = []
      this.selectedRowsL = []
      this.selectedRows = []
      this.selectedRowKeys = []
      this.tabledata2 = []
      this.loadData()
    },
    importExcel(info) {
      this.visible = false
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.success) {
          this.$message.success(`${info.file.name} 文件上传成功`)
          this.loadData()
        } else {
          this.$message.error(`${info.file.name} ${info.file.response.message}.`)
        }
      } else if (info.file.status === 'error') {
        this.$message.error(`文件上传失败: ${info.file.msg} `)
      }
    },

    getverbalTrick() {
      if (this.selectedRowKeysL.length > 0 && this.selectedRowKeys.length > 0) {
        this.batchvisible = true
        this.batchNumber = 2
      } else {
        this.$message.warning('请至少选择一项新闻和一条话术！')
      }
    },
    batchOk() {
      this.batchvisible = false
      let newArr = []

      for (let index = 0; index < this.selectedRows.length; index++) {
        newArr.push({
          corpusId: this.selectedRows[index].id,
          corpus: this.selectedRows[index].contents
        })
      }
      let idArr = []
      for (let i = 0; i < this.selectedRowsL.length; i++) {
        idArr.push(this.selectedRowsL[i].id)
      }
      batchInsertNewsCorpus({
        eachNum: this.batchNumber,
        ids: idArr,
        corpuzs: newArr
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.tabledata2 = []
          this.$message.success(res.message)
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    batchCancel() {
      this.batchvisible = false
    },
    //获取批次列表
    getbatchList(id) {
      getbatchList({
        taskId: id
      }).then(res => {
        this.batchList = res.result
      })
    },

    //展开搜索框
    handleToggleSearch() {
      this.toggleSearchStatus = !this.toggleSearchStatus
      let newArr = JSON.parse(JSON.stringify(this.dataSource))
      var h1 = document.getElementsByTagName('body')[0].clientHeight
      if (!this.toggleSearchStatus) {
        this.heightL = h1 - 105 - 150 - this.h2
      } else {
        this.heightL = h1 - 105 - 150 - this.h2 - 78
      }
      this.loadData()
    },
    //批量删除新闻
    batchDelete() {
      const that = this
      if (!that.ids) {
        that.$message.warning('请选择需要删除的新闻！')
      } else {
        deleteNewsBatch({
          ids: this.ids
        }).then(res => {
          that.$message.success(res.message)
          that.loadData()
        })
      }
    },
    checkUrl() {
      let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)/
      console.log(reg.test(this.addform.newsLink))
      if (!this.addform.newsLink || !reg.test(this.addform.newsLink)) {
        this.$message.warning('请输入正确的新闻链接！')
        return
      }

      this.isCheck = true
      doSpiderAi({
        url: this.addform.newsLink
      }).then(res => {
        console.log(res)
        if (res.success == false) {
          this.$message.warning('服务器异常，请稍后再试')
          this.addform.newsProduce = ''
          this.addform.newsScene = ''
          this.addform.newsTitle = ''
        } else {
          this.addform.newsProduce = res.produceName
          this.addform.newsScene = res.scene
          this.addform.newsTitle = res.title
        }
        this.isCheck = false
      })
    },
    exportTemp() {
      this.handleExportTemp('新闻列表模板')
    },
    getQueryParams() {
      this.queryParam.bak1 = this.queryParam.projectId
      this.queryParam.bak2 = this.queryParam.taskId
      var param = Object.assign({}, this.queryParam, this.isorter)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      return filterObj(param)
    },
    exportList() {
      // console.log(this.selectedRowsL)
      // if (!this.showBatchAction) {
      //   if (this.tabledata2.length < 1) {
      //     this.$message.warning('请先点击表格内话术按钮生成话术后进行导出！')
      //   } else {
      //     this.handleExportXls('新闻列表')
      //   }
      // } else {
      //   if (this.selectedRowsL.length > 0) {
      //     for (let index = 0; index < this.selectedRowsL.length; index++) {
      //     if (this.selectedRowsL[index].status == '4' || this.selectedRowsL[index].status == '5') {
      //       this.handleExportXls('新闻列表')
      //     } else {
      //       this.$message.warning('请选择状态为‘待下载’或‘已下载’')
      //     }
      //   }
      //   } else {
      //     this.$message.warning('请至少选择一项新闻进行导出！')
      //   }
      // }
      if (this.queryParam.status === '4' || this.queryParam.status === '5') {
        this.handleExportXls('新闻列表')
      } else {
        this.$message.warning('请选择状态为‘待发布’或‘已发布’')
      }
    },
    addrowClass(record) {
      return record.id === this.chooseRecord.id ? 'clickRowStyl' : ''
    },
    moment,
    onChange(dates, dateStrings) {
      this.queryParam.startTime = dateStrings[0]
      this.queryParam.endTime = dateStrings[1]
    },
    getState(state) {
      let x
      switch (state) {
        case '1':
          x = '待识别'
          break
        case '2':
          x = '待识别'
          break
        case '3':
          x = '已识别'
          break
        case '4':
          x = '待发布'
          break
        case '5':
          x = '已发布'
          break
      }
      return x
    },
    changeP() {
      this.getsceneQueryList(this.projectId)
      this.getproduceQueryList(this.projectId)
      this.getTaskListByProJectId(this.queryParam.projectId)
    },
    changeTask() {
      this.getbatchList(this.queryParam.taskId)
    },
    getTaskListByProJectId(id) {
      gettaskListByid({ projectId: id }).then(res => {
        if (res.success) {
          this.taskList = res.result
          this.queryParam.taskId = res.result[0].id
          this.queryParam.bak2 = res.result[0].id
          this.getbatchList(res.result[0].id)
          if (this.beginSearch) {
            this.loadData()
            this.beginSearch = false
          }
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    //生成话术
    checktRick(record) {
      this.showProgress = true
      if (!this.showBatchAction) {
        this.selectedRowKeysL = []
        this.selectedRowKeysL.push(record.id)
      }
      this.percent = 0
      let percentAdd = setInterval(() => {
        if (this.percent < 100) {
          this.percent += 20
        } else {
          clearInterval(percentAdd)
        }
      }, 500)
      this.chooseRecord = record
      getCorpusList({
        newsId: this.selectedRowsL.length > 0 && this.showBatchAction ? 0 : record.id,
        scene: record.scene,
        produceName: record.produce_name,
        size: this.size,
        type: this.selectedRowsL.length > 0 && this.showBatchAction ? 0 : 1
      }).then(res => {
        setTimeout(() => {
          this.percent = 100
          this.showProgress = false
          clearInterval(percentAdd)
        }, 1500)
        this.tabledata2 = res.corpusList
        this.selectedRowKeys = []
        for (let index = 0; index < res.corpusList.length; index++) {
          if (res.corpusList[index].bak5 == '1') {
            this.selectedRowKeys.push(res.corpusList[index].id)
            this.allselectRowKeys.push(res.corpusList[index].id)
          }
        }
      })
    },

    getproduceQueryList(id) {
      produceQueryList({ projectId: id }).then(res => {
        if (res.success) {
          this.produceList = res.result
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    getsceneQueryList(id) {
      sceneQueryList({ projectId: id }).then(res => {
        if (res.success) {
          this.sceneList = res.result
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    handleEdit(record) {
      this.visible = true
      this.addform.newsTitle = record.title
      this.addform.newsLink = record.url
      this.addform.newsProduce = record.produce_name
      this.addform.newsScene = record.scene
      this.id = record.id
      this.modalTest = '编辑新闻'
      if (record.batch) {
        this.showBatch = 2
        this.addform.batch = record.batch.toString()
      } else {
        this.showBatch = 1
        this.addform.batch = ''
      }
    },
    //刷新
    refresh(size) {
      this.size = size
      console.log(this.showBatchAction)
      if (this.showBatchAction) {
        if (this.selectedRowsL.length < 1) {
          this.$message.warning('请至少选择一条新闻！')
        } else {
          for (let i = 0; i < this.selectedRowsL.length; i++) {
            if (
              this.selectedRowsL[i].produce_name != this.selectedRowsL[0].produce_name ||
              this.selectedRowsL[i].scene != this.selectedRowsL[0].scene
            ) {
              this.$message.warning('请选择同一车型，同一场景下新闻！')
              return
            }
          }
          this.checktRick(this.selectedRowsL[0])
        }
      } else {
        if (this.chooseRecord.id) {
          this.checktRick(this.chooseRecord)
        } else {
          this.$message.warning('请点击右侧表格话术选择一条新闻生成话术！')
        }
      }
    },
    //发布
    issue() {
      this.$message.success('功能开发中，敬请期待！')
    },
    //删除项目
    handleDelete(id) {
      const that = this
      let obj = {
        id: id
      }
      let result = deleteNews(obj)
      result.then(res => {
        if (res.success) {
          that.$message.success(res.message)
          that.loadData()
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    getallprojectList() {
      this.beginSearch = true
      aiProjectPlist().then(res => {
        if (res.success) {
          this.projectList = res.result
          this.queryParam.projectId = res.result[0].id
          this.queryParam.bak1 = res.result[0].id
          this.getsceneQueryList(res.result[0].id)
          this.getproduceQueryList(res.result[0].id)
          this.getTaskListByProJectId(res.result[0].id)
        } else {
          this.projectList = []
        }
      })
    },

    add() {
      this.modalTest = '添加新闻'
      this.visible = true
      this.addform.newsTitle = ''
      this.addform.newsLink = ''
      this.addform.newsProduce = ''
      this.addform.newsScene = ''
      this.showBatch = 1
      this.id = ''
      this.showBulk = false
    },
    addList() {},
    handleChange(value, key, column) {
      console.log(value, key, column)
      const newData = [...this.tabledata2]
      const target = newData.filter(item => key == item.id)[0]
      console.log(target)
      if (target) {
        target[column] = value
        this.tabledata2 = newData
      }
    },
    edit(record) {
      this.changeBatchvisible = true
      this.newBatch = record.contents
      this.batchChooseRecord = record
      // const newData = [...this.tabledata2]
      // const target = newData.filter(item => key == item.id)[0]
      // console.log(target)
      // if (target) {
      //   target.editable = true
      //   this.tabledata2 = newData
      // }
    },
    // @cancel="changeBatchCancel"
    //   @ok="changeBatchOk"
    changeBatchOk() {
      let changeObj = {
        newsId: this.chooseRecord.id,
        dim2: this.batchChooseRecord.dim2,
        produceName: this.chooseRecord.produce_name,
        corpus: this.newBatch
      }
      corpusChange(changeObj).then(res => {
        if (res == 'ok') {
          this.$message.success('修改成功')
          this.changeBatchvisible = false
          this.checktRick(this.chooseRecord)
        } else {
          this.$message.warning('修改成功')
        }
      })
    },
    changeBatchCancel() {
      this.newBatch = ''
      this.changeBatchvisible = false
    },
    cancel(key) {
      const newData = [...this.tabledata2]
      const target = newData.filter(item => key == item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key == item.key)[0])
        delete target.editable
        this.tabledata2 = this.cacheData
      }
    },
    //批量导入新闻
    bulkImport() {
      this.showBulk = true
      this.visible = true
      this.showBatch = 1
      this.modalTest = '批量导入新闻'
    },

    beforeUp(file, fileList) {
      const that = this
      that.updata.bak1 = this.queryParam.projectId
      that.updata.bak2 = this.queryParam.taskId
      return new Promise(function(reslove, reject) {
        if (that.showBatch == 1) {
          addBatch({
            status: '1',
            taskId: that.queryParam.taskId
          }).then(res => {
            that.updata.batchId = res.result.name
            reslove(file)
          })
        } else {
          that.updata.batchId = that.addform.batch
          reslove(file)
        }
      })
    },

    //导入之后

    //添加新闻
    handleOk() {
      if (this.showBatch == 1) {
        addBatch({
          status: '1',
          taskId: this.queryParam.taskId
        }).then(res => {
          this.addform.batch = res.result.name
          const that = this
          if (!this.addform.newsLink) {
            that.$message.warning('请输入新闻链接！')
            return
          }
          let formData = {
            url: this.addform.newsLink,
            title: this.addform.newsTitle,
            produceName: this.addform.newsProduce,
            scene: this.addform.newsScene,
            batch: this.addform.batch,
            bak1: this.queryParam.projectId,
            bak2: this.queryParam.taskId
          }
          let obj
          if (!this.id) {
            obj = addNews(formData)
          } else {
            formData.id = this.id
            obj = editNews(formData)
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
              this.produceName = ''
              this.proId = ''
              this.visible = false
            })
        })
      } else {
        const that = this
        if (!this.addform.newsLink) {
          that.$message.warning('请输入新闻链接！')
          return
        }
        let formData = {
          url: this.addform.newsLink,
          title: this.addform.newsTitle,
          produceName: this.addform.newsProduce,
          scene: this.addform.newsScene,
          batch: this.addform.batch
        }
        let obj
        if (!this.id) {
          obj = addNews(formData)
        } else {
          formData.id = this.id
          obj = editNews(formData)
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
            this.produceName = ''
            this.proId = ''
            this.visible = false
          })
      }
    },
    handleCancel() {
      this.produceName = ''
      this.proId = ''
      this.visible = false
    },
    searchReset() {
      var that = this
      that.queryParam.produceName = ''
      that.queryParam.title = ''
      that.queryParam.scene = ''
      that.queryParam.status = '3'
      that.queryParam.batch = ''
      that.timeDate = [that.moment().subtract('days', 6), that.moment()]
      that.queryParam.startTime = that
        .moment()
        .subtract('days', 6)
        .format('YYYY-MM-DD')
      that.queryParam.endTime = that.moment().format('YYYY-MM-DD')
      this.tabledata2 = []
      that.loadData()
    }
  }
}
</script>

<style scoped>
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
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
.ant-form-inline .ant-form-item {
  width: 100%;
}
.clickRowStyl {
  background: #c1e7fd;
}
#left .ant-card-body {
  padding-bottom: 8px !important;
}
#right .ant-card-body {
  padding-bottom: 8px !important;
}
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 999999;
  background: rgba(0, 0, 0, 0.65);
}
.dialogCenter {
  width: 300px;
  height: 150px;
  text-align: center;
  margin: 150px auto;
  background: white;
  padding-top: 40px;
  border-radius: 3px;
  font-size: 18px;
}
</style>
