<template>
  <!-- <a-drawer
    :title="title"
    :maskClosable="true"
    :width="drawerWidth"
    placement="right"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;"
  >


    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="企业名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select style="width: 100%" v-decorator="[ 'enterprise_id', validatorRules.enterprise_id]" placeholder="请选择企业">
            <a-select-option
              v-for="(item,index) in enterList"
              :key="index"
              :value="item.id"
            >{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>

  </a-drawer>-->

  <a-modal :title="title" :visible="visible" @cancel="handleCancel">
    <template slot="title">
      <div style="width: 100%;">
        <span>{{ title }}</span>
        <span
          style="display:inline-block;width:calc(100% - 51px);padding-right:10px;text-align: right"
        >
          <a-button @click="toggleScreen" icon="appstore" style="height:20px;width:20px;border:0px"></a-button>
        </span>
      </div>
    </template>

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="手机号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入手机号码" v-decorator="[ 'mobile', validatorRules.mobile]" />
        </a-form-item>

        <a-form-item label="用户账号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入用户账号" v-decorator="[ 'user_name', validatorRules.username]" />
        </a-form-item>
        <a-form-item label="真实姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入真实姓名" v-decorator="[ 'true_name', validatorRules.true_name]" />
        </a-form-item>

        <template v-if="!model.user_id">
          <a-form-item label="登陆密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              type="password"
              placeholder="请输入登陆密码"
              v-decorator="[ 'password', validatorRules.password]"
            />
          </a-form-item>
        </template>

        <a-form-item label="分配角色" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-tree-select
            style="width: 100%"
            :treeData="treeData"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            treeDefaultExpandAll
            v-decorator="[ 'role_id', validatorRules.role_id]"
            @change="onChange"
          ></a-tree-select>
          <!-- <a-select
            style="width: 100%"
            mode="multiple"
            v-decorator="[ 'enterprise_id', validatorRules.enterprise_id]"
            placeholder="请选择角色"
          >
            <a-select-option
              v-for="(item,index) in enterList"
              :key="index"
              :value="item.id"
            >{{ item.name }}</a-select-option>
          </a-select>-->
        </a-form-item>
      </a-form>
    </a-spin>
    <template slot="footer">
      <div class="drawer-bootom-button" v-show="!disableSubmit">
        <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
          <a-button style="margin-right: .8rem">取消</a-button>
        </a-popconfirm>
        <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">提交</a-button>
      </div>
    </template>
    <!-- <depart-window ref="departWindow" @ok="modalFormOk"></depart-window>
      <div class="drawer-bootom-button" v-show="!disableSubmit">
      <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">提交</a-button>
    </div>-->
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import moment from 'moment'
import Vue from 'vue'
// 引入搜索部门弹出框的组件
import departWindow from './DepartWindow'
import { ACCESS_NTOKEN } from '@/store/mutation-types'
import { getAction, httpAction } from '@/api/manage'
import { addUser, queryUserRole } from '@/api/api'
import { enterpriseList, editUser, getRoleList, addEditUser } from '@/api/newpage'

export default {
  name: 'RoleModal',
  components: {
    departWindow
  },
  data() {
    return {
      roleId: '',
      modalWidth: 800,
      drawerWidth: 700,
      modaltoggleFlag: true,
      confirmDirty: false,
      selectedDepartKeys: [], //保存用户选择部门id
      checkedDepartKeys: [],
      checkedDepartNames: [], // 保存部门的名称 =>title
      checkedDepartNameString: '', // 保存部门的名称 =>title
      userId: '', //保存用户id
      disableSubmit: false,
      userDepartModel: { userId: '', departIdList: [] }, // 保存SysUserDepart的用户部门中间表数据需要的对象
      dateFormat: 'YYYY-MM-DD',
      validatorRules: {
        username: {
          rules: [
            {
              required: true,
              message: '请输入用户账号!'
            }
          ]
        },
        true_name: {
          rules: [
            {
              required: true,
              message: '请输入真实姓名!'
            }
          ]
        },
        password: {
          rules: [
            {
              required: true,
              message: '请输入密码!'
            }
          ]
        },
        mobile: {
          rules: [
            { validator: this.validatePhone },
            {
              required: true,
              message: '请输入手机号!'
            }
          ]
        },
        role_id: {
          rules: [
            {
              required: true,
              message: '请选择角色!'
            }
          ]
        },
        enterprise_id: {
          rules: [
            {
              required: true,
              message: '请选择企业!',
              type: 'array'
            }
          ]
        }
      },
      title: '操作',
      visible: false,
      model: {},
      roleList: [],
      selectedRole: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      uploadLoading: false,
      confirmLoading: false,
      headers: {},
      form: this.$form.createForm(this),
      url: {
        addUDepartIds: '/sys/user/addUDepartIds', // 引入为用户添加部门信息需要的url
        editUDepartIds: '/sys/user/editUDepartIds', // 引入为用户更新部门信息需要的url
        fileUpload: window._CONFIG['domianURL'] + '/sys/common/upload',
        imgerver: window._CONFIG['domianURL'] + '/sys/common/view',
        userWithDepart: '/sys/user/userDepartList' // 引入为指定用户查看部门信息需要的url
      },
      uploadAction: 'http://39.97.241.172/admin/upload/img',
      uploadLoading: false,
      enterList: [],
      treeData: []
    }
  },
  created() {
    const token = Vue.ls.get(ACCESS_NTOKEN)
    this.headers = { token: token }
  },
  mounted() {
    this.getenterpriseList()
    this.getRoleList()
  },
  methods: {
    //获取角色列表
    getRoleList() {
      getRoleList().then(res => {
        this.treeData = res.list
      })
    },
    onChange(value) {
      console.log(value)
      this.roleId = value.toString()
    },
    getenterpriseList() {
      enterpriseList().then(res => {
        this.enterList = res.list
      })
    },
    //窗口最大化切换
    toggleScreen() {
      if (this.modaltoggleFlag) {
        this.modalWidth = window.innerWidth
      } else {
        this.modalWidth = 800
      }
      this.modaltoggleFlag = !this.modaltoggleFlag
    },
    initialRoleList() {},
    loadUserRoles(userid) {
      queryUserRole({ userid: userid }).then(res => {
        if (res.success) {
          this.selectedRole = res.result
        } else {
          console.log(res.message)
        }
      })
    },
    refresh() {
      this.selectedDepartKeys = []
      this.checkedDepartKeys = []
      this.checkedDepartNames = []
      this.checkedDepartNameString = ''
      this.userId = ''
    },
    add() {
      this.refresh()
      this.edit({})
    },
    edit(record) {
      let that = this
      that.checkedDepartNameString = ''
      that.form.resetFields()
      // if (record.hasOwnProperty('user_id')) {
      //   that.loadUserRoles(record.user_id)
      // }
      that.userId = record.user_id

      that.model = Object.assign({}, record)
      console.log(that.model)
      that.model.role_id = that.model.roleId
      that.$nextTick(() => {
        setTimeout(() => {
          that.form.setFieldsValue(
            pick(that.model, 'user_id', 'mobile', 'user_name', 'true_name', 'enterprise_id', 'role_id')
          )
        }, 100)
      })
      that.visible = true
    },
    close() {
      this.$emit('close')
      this.visible = false
      this.disableSubmit = false
      this.selectedRole = []
      this.userDepartModel = {}
      this.checkedDepartNames = []
    },
    moment,
    handleSubmit() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let formData = Object.assign(this.model, values)
          if (that.model.user_id) {
            formData.flag = 'update'
          } else {
            formData.flag = 'insert'
          }
          let obj
          obj = addEditUser(formData)
          obj
            .then(res => {
              if (res.code == 200) {
                if (that.model.user_id) {
                  that.$message.success('修改成功')
                } else {
                  that.$message.success('新增成功')
                }
                that.$emit('ok', res)
              } else {
                that.$message.warning(res.msg)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.checkedDepartNames = []
              that.close()
            })
        }
      })
    },
    handleCancel() {
      this.close()
    },

    validatePhone(rule, value, callback) {
      if (!value || new RegExp(/^1[3|4|5|7|8][0-9]\d{8}$/).test(value)) {
        callback()
      } else {
        callback('请输入正确格式的手机号码!')
      }
    },
    validateUsername(rule, value, callback) {},
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },

    normFile(e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    beforeUpload: function(file) {
      var fileType = file.type
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
        // setTimeout(() => {
        //   this.model.icon = response.list.url
        // }, 100)
        this.$set(this.model, 'icon', response.list.url)
      }
    },

    // 获取用户对应部门弹出框提交给返回的数据
    modalFormOk(formData) {
      this.checkedDepartNames = []
      this.selectedDepartKeys = []
      this.userId = formData.userId
      this.userDepartModel.userId = formData.userId
      for (let i = 0; i < formData.departIdList.length; i++) {
        this.selectedDepartKeys.push(formData.departIdList[i].key)
        this.checkedDepartNames.push(formData.departIdList[i].title)
        this.checkedDepartNameString = this.checkedDepartNames.join(',')
      }
      this.userDepartModel.departIdList = this.selectedDepartKeys
    },
    // 根据屏幕变化,设置抽屉尺寸
    resetScreenSize() {
      let screenWidth = document.body.clientWidth
      if (screenWidth < 500) {
        this.drawerWidth = screenWidth
      } else {
        this.drawerWidth = 700
      }
    }
  }
}
</script>

<style scoped>
.avatar-uploader > .ant-upload {
  width: 104px;
  height: 104px;
}
.ant-upload-select-picture-card i {
  font-size: 49px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.ant-table-tbody .ant-table-row td {
  padding-top: 10px;
  padding-bottom: 10px;
}

.drawer-bootom-button {
  position: absolute;
  bottom: -8px;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  left: 0;
  background: #fff;
  border-radius: 0 0 2px 2px;
}
</style>