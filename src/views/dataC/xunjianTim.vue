<template>

<div id="components-layout-demo-basic">

<a-row>
  <a-col :span="4">
   <span style="line-height:30px"><b>监测方案</b></span>
   <a-button type="primary" style="float:right;margin-right:20px">确定</a-button>
      <a-select
        mode="tags"
        style="width: 220px;margin-top:20px;"
        @change="leftChange"
        placeholder="Tags Mode"
      >
        <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</a-select-option>
      </a-select>
  </a-col>
  <a-col :span="20">
        <a-layout>
      <a-layout-header>
            <!-- <a-row>
              <a-col :span="12">col-12</a-col>
              <a-col :span="12">col-12</a-col>
            </a-row> -->
            <a-row class='headRow'>
                 <span class="dxTitle">发布时间</span>
                 <a-radio-group @change="onChange" v-model="form.time">
                    <a-radio :value="0">全部</a-radio>
                    <a-radio :value="1">今天</a-radio>
                    <a-radio :value="2">昨天</a-radio>
                    <a-radio :value="3">近3天</a-radio>
                    <a-radio :value="4">近7天</a-radio>
                    <a-radio :value="5">近30天</a-radio>
                 </a-radio-group>
            </a-row>
            <a-row class='headRow'>
                  <span class="dxTitle">情感</span>
                  <a-radio-group @change="onChange" v-model="value">
                    <a-radio :value="0">全部</a-radio>
                    <a-radio :value="1">正面</a-radio>
                    <a-radio :value="2">中性</a-radio>
                    <a-radio :value="3">负面</a-radio>
                  </a-radio-group>
            </a-row>
            <a-row class='headRow'>
                  <span class="dxTitle">排序</span>
                  <a-radio-group @change="onChange" v-model="value">
                    <a-radio :value="1">时间降序</a-radio>
                    <a-radio :value="2">时间升序</a-radio>
                    <a-radio :value="3">权重降序</a-radio>
                    <a-radio :value="4">热度降序</a-radio>
                    <a-radio :value="5">关注度降序</a-radio>
                  </a-radio-group>
            </a-row>
            <a-row class='headRow'>
                  <span class="dxTitle">媒体属性</span>
                  <a-radio-group @change="onChange" v-model="value">
                    <a-radio :value="1">全部</a-radio>
                    <a-radio :value="2">新闻层面</a-radio>
                    <a-radio :value="3">用户层面</a-radio>
                  </a-radio-group>
            </a-row>
            <a-row class='headRow'>
                  <span class="dxTitle">处理</span>
                  <a-radio-group @change="onChange" v-model="value">
                    <a-radio :value="1">全部</a-radio>
                    <a-radio :value="2">未处理</a-radio>
                    <a-radio :value="3">已处理</a-radio>
                  </a-radio-group>
            </a-row>
            <a-row class='headRow'>
                  <span class="dxTitle">网络类别</span>
                  <a-checkbox
                    :indeterminate="indeterminate"
                    @change="onCheckAllChange"
                    :checked="checkAll"
                  >
                    全部
                  </a-checkbox>
                  <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChangeMore" />
            </a-row>
      </a-layout-header>
      <a-layout-content>
        <div style="margin-bottom: 16px">
          <a-button
            type="primary"
            @click="start"
            :disabled="!hasSelected"
            :loading="loading"
          >
            Reload
          </a-button>
          <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{`Selected ${selectedRowKeys.length} items`}}
            </template>
          </span>
        </div>
        <!-- <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data" > -->
        <a-table
          ref="table"
          bordered
          size="middle"
          rowKey="id"
          :columns="columns"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
            <template slot="action" slot-scope="text, record">
              <a @click="handleEdit(record)" style="margin-right:10px">通报</a>
              <a @click="">转发</a>
            </template>
        </a-table>
            <a-modal
                :title="modalTest"
                :visible="visible"
                @ok="handleOk"
                :confirmLoading="confirmLoading"
                @cancel="handleCancel"
              >
                <template>
                  生成通报信息
                  <a-textarea class="tongbaoTim" placeholder="" :rows="4"/>
                </template>
            </a-modal>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-col>
</a-row>

</div>
</template>
<script>
//['录入时间', '一级分类', '网媒类别','网媒来源','发布者','标题','链接','车型','形势判断','发布时间','相似文章','关注度','操作']
const plainOptions = ['微信', '微博', '网页','客户端','论坛','视频','口碑','问答','自媒体']
const defaultCheckedList = ['口碑', '客户端']
const columns = [{
                  title: '录入时间',
                  dataIndex: 'name',
                  }, {
                  title: '一级分类',
                  dataIndex: 'age',
                  }, {
                  title: '网媒类别',
                  dataIndex: 'address',
                  },{
                  title: '网媒来源',
                  dataIndex: 'name',
                  }, {
                  title: '发布者',
                  dataIndex: 'age',
                  }, {
                  title: '标题',
                  dataIndex: 'address',
                  },{
                  title: '链接',
                  dataIndex: 'name',
                  }, {
                  title: '车型',
                  dataIndex: 'age',
                  }, {
                  title: '形势判断',
                  dataIndex: 'address',
                  },{
                  title: '发布时间',
                  dataIndex: 'name',
                  }, {
                  title: '相似文章',
                  dataIndex: 'age',
                  }, {
                  title: '关注度',
                  dataIndex: 'address',
                  },{
                  title: '操作',
                  dataIndex: 'action',
                  scopedSlots: { customRender: 'action' },
                  align: 'center'
                  }];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
//import { getList } from '@/api/newpage'
//import moment from 'moment'
export default {
  data () {
    return {
      value: 1,
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      visible:false,
      form: {
        time:''
      }
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    handleAdd() {
      this.visible = true
      this.disable = false
    },
    getList() {
      getCompanyList(this.queryParam).then(res => {
        this.dataSource = res.list
        this.pagination.total = res.count
      })
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination)
      this.queryParam.page = pagination.current
      this.getList()
    },
    onDelete(key) {
      editCompany({
        id: key,
        status: 2
      }).then(res => {
        if (res.code == 200) {
          this.getList()
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    handleOk() {
      let obj = {
        credit_code: this.form.credit_code,
        name: this.form.name,
        head_info: this.form.head_info,
        contact_name: this.form.contact_name,
        mobile: this.form.mobile,
        email: this.form.email
      }
      if (this.form.id) {
        obj.id = this.form.id
      }
      editCompany(obj).then(res => {
        if (res.code == 200) {
          this.getList()
          this.visible = false
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    handleCancel() {
      this.visible = false
      this.form = {}
    },
    handleEdit(record) {
     /* this.form = record*/
      this.visible = true
      this.disable = true
    },
    changeMsg(record) {
      this.upvisible = true
      this.id = record.id
      this.upform.title = record.esetting.title
      this.upform.logo = record.esetting.logo
      this.upform.keywords = record.esetting.keywords
      this.upform.description = record.esetting.description
      this.upform.copyright = record.esetting.copyright
    },
    upMsg() {
      const that = this
      let obj = this.upform
      obj.enterprise_id = this.id
      esedit(obj).then(res => {
        that.getList()
        that.upform = {}
        that.upvisible = false
      })
    },
    cancelMsg() {
      //   this.upform = {}
      this.upvisible = false
    },
    beforeUpload: function(file) {
      var fileType = file.type
      console.log(file)
      if (fileType.indexOf('image') < 0) {
        this.$message.warning('请上传图片')
        return false
      }
      //TODO 验证文件大小
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.uploadLoading = true
        return
      }
      if (info.file.status === 'done') {
        var response = info.file.response
        this.uploadLoading = false
        console.log(response.list.url)
        setTimeout(() => {
          this.upform.logo = response.list.url
        }, 100)
        // this.$set(this.upform,'logo',response.list.url)
      }
    },
    leftChange(value) {
      console.log(`selected ${value}`);
    },
    onChange (e) {
      console.log('radio checked', e.target.value)
    },
    onChangeMore (checkedList) {
      this.indeterminate = !!checkedList.length && (checkedList.length < plainOptions.length)
      this.checkAll = checkedList.length === plainOptions.length
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      })
    },
    start () {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
/*    handleOk(e) {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
      }, 3000);
    },*/
    handleChangeUP(value) {
      console.log(`selected ${value}`);
    },
  },
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
.ant-layout-header{
  height: auto;
  line-height: auto;
}
.dxTitle{
  display: inline-block;
  width: 80px;
}
.headRow{
    height: 46px;
    line-height: 46px;
    border-bottom: 1px solid;
}  
</style>