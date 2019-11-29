<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="12">
            <a-form-item label="企业名称">
              <a-input placeholder="请输入企业名称查询" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="14">
            <a-form-item label="起始时间">
              <a-range-picker v-model="queryParam.timeDate"></a-range-picker>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="12">
            <a-form-item label="手机号">
              <a-input placeholder="请输入手机号查询" v-model="queryParam.mobile"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px">
      <a-button @click="handleAdd" type="primary" icon="plus">添加企业</a-button>
      <a-button @click="getList" type="primary" icon="plus">查询企业</a-button>
    </div>

    <!-- table区域-begin -->
    <!-- <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
    </div>-->

    <a-table
      ref="table"
      bordered
      size="middle"
      rowKey="id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)" style="margin-right:10px">编辑</a>
        <a @click="changeMsg(record)" style="margin-right:10px">修改企业信息</a>
        <a-popconfirm title="确定修改状态?" @confirm="() => onDelete(record.id)">
          <a href="javascript:;">修改状态</a>
        </a-popconfirm>
      </template>
    </a-table>

    <a-modal
      :title="modalTest"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item label="社会信用代码" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="form.credit_code" />
        </a-form-item>
        <a-form-item label="企业名称：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="form.name" />
        </a-form-item>
        <a-form-item label="英文简称：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="form.enterprise_sc" :disabled="disabled" />
        </a-form-item>
        <a-form-item label="中文简称：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="form.simple_name" />
        </a-form-item>
        <a-form-item label="企业抬头：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="form.head_info" />
        </a-form-item>
        <a-form-item label="企业联系人：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="form.contact_name" />
        </a-form-item>
        <a-form-item label="联系人电话：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="form.mobile" />
        </a-form-item>
        <a-form-item label="联系人邮箱：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="form.email" />
        </a-form-item>
        <a-form-item label="头像" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-upload
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :action="uploadAction"
            :data="{'isup':1}"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img
              v-if="upform.logo"
              :src="upform.logo"
              alt="头像"
              style="height:104px;max-width:300px"
            />
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>
        <!-- <a-form-item label="联系人描述：" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-textarea
            v-model="form.enterprise_sc"
            :autosize="{ minRows: 2, maxRows: 6 }"
            :disabled="disable"
          />
        </a-form-item> -->
      </a-form>
    </a-modal>

    <a-modal title="上传企业信息" :visible="upvisible" @ok="upMsg" @cancel="cancelMsg">
      <a-form :form="upform">
        <a-form-item label="标题" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="upform.title" />
        </a-form-item>
        <!-- <a-form-item label="头像" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="upform.logo" />
        </a-form-item>-->
        <!--<a-form-item label="头像" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-upload
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :action="uploadAction"
            :data="{'isup':1}"
            :headers="headers"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img
              v-if="upform.logo"
              :src="upform.logo"
              alt="头像"
              style="height:104px;max-width:300px"
            />
            <div v-else>
              <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item>-->
        <a-form-item label="关键词" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="upform.keywords" />
        </a-form-item>
        <a-form-item label="描述" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="upform.description" />
        </a-form-item>
        <a-form-item label="版本" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="upform.copyright" />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import { getCompanyList, editCompany, esedit,editCompanyADD } from '@/api/newpage'
import { ACCESS_NTOKEN } from '@/store/mutation-types'
import { truncate } from 'fs'
import Vue from 'vue'
export default {
  name: 'UserList',
  data() {
    return {
    	rukou:'',
    	disabled:true,
      description: '这是企业列表页面',
      modalTest: '添加企业',
      visible: false,
      disable: false,
      upvisible: false,
      queryParam: {
        name: '',
        addTimeStart: '',
        addTimeEnd: '',
        page: 1,
        limit: 10,
        mobile: ''
      },
      columns: [
        {
          title: '企业名称',
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: '添加时间',
          align: 'center',
          dataIndex: 'add_time'
        },
        {
          title: '联系方式',
          align: 'center',
          width: 120,
          dataIndex: 'mobile'
        },

        {
          title: '状态',
          align: 'center',
          dataIndex: 'status'
        },
        {
          title: '邮箱',
          align: 'center',
          width: 180,
          dataIndex: 'email'
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
        total: 1
      },
      loading: false,
      form: {},
      upform: {
        title: '',
        logo: '',
        keywords: '',
        description: '',
        copyright: ''
      },
      confirmLoading: false,
      id: '',
      uploadAction: 'http://39.97.241.172/admin/upload/img',
      uploadLoading: false,
      headers: {}
    }
  },
  mounted() {
    this.getList()
  },
  created() {
    const token = Vue.ls.get(ACCESS_NTOKEN)
    console.log(token)
    this.headers = { token: token }
  },
  methods: {
    handleAdd() {
			this.rukou = "add"
      this.visible = true
      this.disable = false
      this.disabled = false
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
        email: this.form.email,
        enterprise_sc: this.form.enterprise_sc,
        simple_name:this.form.enterprise_sc,
        logo:this.upform.logo
      }
      if (this.form.id) {
        obj.id = this.form.id
      }
      
      if(this.rukou == "add"){
		      	editCompanyADD(obj).then(res => {
		        if (res.code == 200) {	
		          this.getList()
		          this.visible = false
		        } else {
		          this.$message.warning(res.msg)
		        }
		      })
      }else if(this.rukou == "edit"){
      			editCompany(obj).then(res => {
			        if (res.code == 200) {	
			          this.getList()
			          this.visible = false
			        } else {
			          this.$message.warning(res.msg)
			        }
			      })
      }
      
       
    },
    handleCancel() {
      this.visible = false
      this.form = {}
    },
    handleEdit(record) {
    	this.rukou = "edit"
      this.form = record
      this.visible = true
      this.disable = true
      this.disabled = true
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
    }
  }
}
</script>
<style scoped>
/** Button按钮间距 */
.ant-btn {
  margin-left: 3px;
}
.ant-card-body {
  margin-bottom: 18px;
}

.table-operator button {
  margin-bottom: 18px;
  margin-right: 5px;
}

.ant-table-tbody .ant-table-row td {
  padding-top: 15px;
  padding-bottom: 15px;
}

.anty-row-operator button {
  margin: 0 5px;
}

.ant-btn-danger {
  background-color: #ffffff;
}

.ant-modal-cust-warp {
  height: 100%;
}

.ant-modal-cust-warp .ant-modal-body {
  height: calc(100% - 110px) !important;
  overflow-y: auto;
}

.ant-modal-cust-warp .ant-modal-content {
  height: 90% !important;
  overflow-y: hidden;
}

.anty-img-wrap {
  height: 25px;
  position: relative;
}

.anty-img-wrap > img {
  max-height: 100%;
}
.ant-form-item {
  margin-bottom: 10px;
}
</style>