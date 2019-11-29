<template>
  <div id="components-layout-demo-basic">
    <a-layout class="listDiv">
      <a-layout-header style="height: 70px;">
        <div style="margin-bottom: 10px;margin-top: 10px">
          <a
            class="daochu"
            @click="editAdd"
            style="font-weight: bold;color: #ffffff;background: #0080FF;border-radius: 2px; padding: 10px 15px;margin-bottom:20px;margin-left: 20px;"
          >新增标签</a>
        </div>
        <div
          class="serchKuang"
          style="    margin-bottom: 10px;
    margin-top: 10px;
    position: relative;
    left: 500px;
    bottom: 60px;"
        >
          <a-form :form="form">
            <a-form-item
              :label-col="formItemLayoutSerch.labelCol"
              :wrapper-col="formItemLayoutSerch.wrapperCol"
              label="标签类型"
            >
              <a-select v-model="bqDataSS.type" @change="suizhiSS">
                <a-select-option value>全部</a-select-option>
                <a-select-option value="1">车型</a-select-option>
                <a-select-option value="2">一级标签</a-select-option>
                <a-select-option value="3">网媒类别</a-select-option>
                <a-select-option value="4">网络来源</a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </div>
      </a-layout-header>
      <a-layout-content>
        <a-table
          :columns="columns"
          :dataSource="data"
          :pagination="pagination"
          @change="handleTableChange"
          rowKey="id"
          key="index"
        >
          <span slot="action" slot-scope="text, record">
            <a class="edit" @click="edit(record)" style="margin-left: 15px;">编辑</a>
            <a-popconfirm
              title="确定删除吗?"
              @confirm="() => handleRealDel(record)"
              style="margin-left: 20px;"
            >
              <a class="delBtn">删除</a>
            </a-popconfirm>
          </span>
        </a-table>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
    <a-modal title="新增标签" v-model="addBiaoqian" @ok="handleOk" :width="800">
      <a-form :form="form">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="标签类型"
          required="required"
        >
          <a-select v-model="bqData.type" @change="suizhiGB">
            <a-select-option value="1">车型</a-select-option>
            <a-select-option value="2">一级标签</a-select-option>
            <a-select-option value="3">网媒类别</a-select-option>
            <a-select-option value="4">网络来源</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="所属品牌"
          required="required"
          v-if="bqData.type == '1'"
        >
          <a-col :span="35">
            <a-input placeholder="请输入所属品牌" v-model="bqData.carBrand" />
          </a-col>
        </a-form-item>

        <template>
          <a-form :form="form" @submit="handleOk" style="margin-left: 75px;">
            <a-form-item
              v-for="(k, index) in form.getFieldValue('keys')"
              :key="k"
              v-bind="index === 0 ? formItemLayoutBiaoqian : formItemLayoutWithOutLabel"
              :label="index === 0 ? '标签名称' : ''"
              :required="false"
            >
              <a-input
                v-decorator="[
				          `names[${k}]`,
				          {
				            validateTrigger: ['change', 'blur'],
				            rules: [
				              {
				                required: true,
				                whitespace: true,
				                message: '请输入标签名称！',
				              },
				            ],
				          },
				        ]"
                placeholder="请输入标签名称"
                style="width: 55.7%; margin-right: 8px"
              />
              <a-icon
                v-if="form.getFieldValue('keys').length > 1"
                class="dynamic-delete-button"
                type="minus-circle-o"
                :disabled="form.getFieldValue('keys').length === 1"
                @click="() => remove(k)"
              />
            </a-form-item>
            <a-form-item v-bind="formItemLayoutWithOutLabel">
              <a-button type="dashed" style="width: 55.7%" @click="add">
                <a-icon type="plus" />添加标签
              </a-button>
            </a-form-item>
          </a-form>
        </template>
      </a-form>
    </a-modal>

    <a-modal title="修改标签" v-model="editBiaoqian" @ok="handleEditOk" :width="800">
      <a-form :form="form">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="标签类型"
          required="required"
        >
          <a-select v-model="bqDataEdit.type" @change="suizhiGB">
            <a-select-option value="1">车型</a-select-option>
            <a-select-option value="2">一级标签</a-select-option>
            <a-select-option value="3">网媒类别</a-select-option>
            <a-select-option value="4">网络来源</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="所属品牌"
          required="required"
          v-if="bqDataEdit.type == '1'"
        >
          <a-col :span="35">
            <a-input placeholder="请输入所属品牌" v-model="bqDataEdit.carBrand" />
          </a-col>
        </a-form-item>

        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="标签名称"
          required="required"
        >
          <a-col :span="35">
            <a-input v-model="bqDataEdit.title" />
          </a-col>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
/*import '~@/styles/theme/variables.less';*/
import {
  schemeDel,
  getFenpeiList,
  downloadExcel,
  itemEdit,
  itemWlist,
  schemetypeEdit,
  postActionJC,
  schemeRealDel,
  schemetypeSelectlist,
  biaoqianList,
  biaoqianAdd,
  biaoqianEdit,
  biaoqianDelete
} from '@/api/newpage'
import imgUrl from '../../static/img/监测词组.png'
import $ from 'jquery'
const columns = [
  {
    title: '标签ID',
    dataIndex: 'id'
  },
  {
    title: '标签名称',
    dataIndex: 'title'
  },
  {
    title: '标签类型',
    dataIndex: 'typeName'
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center'
  }
]
let id = 0
//import moment from 'moment'
export default {
  data() {
    return {
      bqData: {
        type: '1',
        carBrand: '',
        title: []
      },
      bqDataSS: {
        type: '',
        page: 1,
        limit: 10
      },
      bqDataEdit: {
        type: '',
        carBrand: '',
        title: []
      },
      editBiaoqian: false,
      addBiaoqian: false,
      tags: [],
      inputVisible: false,
      inputValue: '',
      required: true,
      items: [],
      visible: false,
      visible_list: false,
      opop: '',
      copytest: '',
      visible_look: false,
      formItemLayoutSerch: {
        labelCol: { span: 3 },
        wrapperCol: { span: 5 }
      },
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 10 }
      },
      formItemLayoutBiaoqian: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      },
      value: '',
      indeterminate: true,
      checkAll: false,
      data: [],
      datalist: [],
      columns,
      // selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      pagination: {
        pageSize: 10,
        total: 1,
        showTotal: () => {}
      },
      foo: {
        type: '',
        page: 1,
        limit: 10
      },
      fooPOP: {
        category: '1'
      },
      form3: {
        type: '2',
        wordsList: [
          {
            name: '',
            list: [
              {
                keyWord: ''
              }
            ]
          }
        ]
      },
      jsonRecord: {
        keywords: [
          {
            name: '',
            list: [
              {
                keyWord: ''
              }
            ]
          }
        ]
      },
      push: {
        id: ''
      },
      Wid: '',
      editform: {},
      jsonData: {},
      editSave: {} /*,
      goStatus:'',*/
    }
  },
  mounted() {
    this.biaoqianList()
    this.getFenpeiList()
    //this.goStatus = '1'
    localStorage.setItem('goStatus', '1')
    /*localStorage.setItem('editRecord','')*/
    this.getList()
    this.getListC()
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'dynamic_form_item' })
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
  },
  methods: {
    suizhiSS(e) {
      console.log(e)
      this.bqDataSS.type = e
      this.biaoqianList()
    },
    suizhiGB(e) {
      console.log(e)
      this.bqDataEdit.type = e
    },
    remove(k) {
      const { form } = this
      // can use data-binding to get
      const keys = form.getFieldValue('keys')
      // We need at least one passenger
      if (keys.length === 1) {
        return
      }

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k)
      })
    },

    add() {
      const { form } = this
      // can use data-binding to get
      const keys = form.getFieldValue('keys')
      const nextKeys = keys.concat(id++)
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys
      })
    },

    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleCloseC(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag)
      console.log(tags)
      this.tags = tags
      console.log(tags)
    },
    showInputC() {
      this.inputVisible = true
      this.$nextTick(function() {
        this.$refs.input.focus()
      })
      console.log(this.inputValue)
    },
    handleInputChangeC(e) {
      this.inputValue = e.target.value
      console.log(this.inputValue)
    },
    handleInputConfirmC() {
      const inputValue = this.inputValue
      let tags = this.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      console.log(tags)
      console.log(this.tags)

      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: ''
      })
      console.log(this.inputValue)
    },
    deleteKeyWord(index) {
      this.form3.wordsList.splice(index, 1)
      this.$forceUpdate()
    },
    addWordsList() {
      this.form3.wordsList.push({
        name: '',
        list: [
          {
            keyWord: ''
          }
        ]
      })
      this.$forceUpdate()
    },
    addKeyWord(index) {
      this.form3.wordsList[index].list.push({
        keyWord: ''
      })
      this.$forceUpdate()
    },
    readuceKey(index, ind) {
      console.log(index, ind)
      this.form3.wordsList[index].list.splice(ind, 1)
      this.$forceUpdate()
    },
    showModal() {
      this.visible = true
    },
    getList() {
      schemetypeSelectlist(this.fooPOP).then(res => {
        console.log(res)
        this.items = res.list
      })
    },
    getListC() {
      schemetypeSelectlist(this.form3).then(res => {
        console.log(res)
        this.items = res.list
      })
    },
    schemetypeEdit() {
      schemetypeEdit(this.fooPOP).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('方案类型添加成功')
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleOk(e) {
      console.log(e)
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)

          this.bqData.title = values.names

          console.log(this.bqData)

          var nary = values.names.sort()
          this.trimSpace(nary)
          console.log(this.trimSpace(nary))
          for (var i = 0; i < values.names.length; i++) {
            if (nary[i] == nary[i + 1]) {
              alert('包含重复标签：' + nary[i])
              return false
            }
          }

          biaoqianAdd(this.bqData).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message.success('标签添加成功')
              this.addBiaoqian = false
              this.biaoqianList()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })

      this.$forceUpdate()
    },

    handleEditOk(e) {
      console.log(e)

      biaoqianEdit(this.bqDataEdit).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('标签修改成功')
          this.editBiaoqian = false
          this.biaoqianList()
        } else {
          this.$message.error(res.msg)
        }
      })

      this.$forceUpdate()
    },

    trimSpace(array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] == ' ' || array[i] == null || typeof array[i] == 'undefined') {
          array.splice(i, 1)
          i = i - 1
        }
      }
      return array
    },
    editAdd() {
      this.addBiaoqian = true
    },
    getFenpeiList() {
      getFenpeiList().then(res => {
        console.log(res)
        this.datalist = res.list
        console.log(this.datalist)
      })
    },
    godataClean() {
      this.$router.push({ name: 'dataC-dataClean' })
    },
    goitemAdd() {
      this.$router.push({ name: 'dataC-itemAdd' })
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    biaoqianList() {
      biaoqianList(this.bqDataSS).then(res => {
        console.log(res)
        this.data = res.list
        if (res.count) {
          this.pagination.total = res.count
          console.log(res.count)
        }
        this.pagination.showTotal = () => this.pagination.total
      })
    },
    onDelete() {},
    handleEdit(record) {},
    edit(record) {
      console.log(record)
      this.editBiaoqian = true
      this.bqDataEdit.type = record.type.toString()
      /*if(this.bqData.type == 1){
	        	this.bqData.type = "车型"
	        }else if(this.bqData.type == 2){
	        	this.bqData.type = "一级标签"
	        }else if(this.bqData.type == 3){
	        	this.bqData.type = "网媒类别"
	        }else if(this.bqData.type == 4){
	        	this.bqData.type = "网络来源"
	        }*/
      this.bqDataEdit.title = record.title
      this.bqDataEdit.carBrand = record.carBrand
      this.bqDataEdit.id = record.id
    },
    handleTableChange(pagination, filters, sorter) {
      this.bqDataSS.page = pagination.current
      this.biaoqianList()
    },
    handleRealDel(record) {
      var parm = {
        id: record.id
      }
      biaoqianDelete(parm).then(res => {
        console.log(res)
        if (res.msg == 'success') {
          this.$message.success('操作成功')
        } else {
          this.$message.error(res.msg)
        }
        this.biaoqianList()
      })
    }
  }
}
</script>
<style scoped>
/*	.ant-col-2,.ant-form-item-label{
	width: 16.333333% !important;
	}*/
/* #components-layout-demo-basic {
  text-align: center;
} */
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  /*  background: #7dbcea; */
  /*color: #fff;*/
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
  background: #fff;
  height: auto;
  line-height: auto;
}
.dxTitle {
  display: inline-block;
  width: 80px;
}
.ant-row {
  /*height: 46px;*/
  line-height: 46px;
  /* border-bottom: 1px solid;*/
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  text-align: center;
}
/* .delBtn{
    width: 70px;
    display: inline-block;
    height: 33px;
    background: #f93b14;
    line-height: 32px;
    color: #efeff4;
    font-weight: bold;
    font-size: 18px;
    border-radius: 7px;
}  */
.dxTitle2 {
  display: inline-block;
  width: 80px;
  float: left;
  height: 26px;
  line-height: 26px;
}
.actionCss1 {
  display: none;
}
.content {
  box-sizing: border-box;
  max-width: 520px;
  padding: 15px 15px 5px;
  font-size: 12px;
  background: #fff5ee;
  border: 1px solid #ff8121;
}
.result {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  padding: 0px 30px 0px 10px;
  margin-right: 20px;
  color: #064593;
  background: #ebf0f7;
  border: 1px solid #064593;
  border-radius: 1px;
  margin-bottom: 8px;
}
.keyWordlist {
  position: relative;
}
.readuceKey {
  position: absolute;
  right: 10px;
  color: red;
  cursor: pointer;
  font-size: 16px;
}
.closeBtn {
  position: absolute;
  top: -10px;
  right: 6px;
  color: #e52e45;
  font-size: 12px;
  cursor: pointer;
  display: block;
}
.ant-tag:nth-child(1) {
  display: none;
}
/*.dxTitle {
  display: inline-block;
  width: 80px;
  float: left;
  height: 26px;
  line-height: 26px;
}*/
.dxMo {
  color: red;
  line-height: 26px;
  margin-left: 5px;
}
.jianceArr_img {
  width: 520px;
  margin-left: 100px;
}
.editDiv {
  display: none;
}
.listDiv {
  display: block;
}

.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>