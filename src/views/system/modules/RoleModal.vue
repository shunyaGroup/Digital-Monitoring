<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
    wrapClassName="ant-modal-cust-warp"
    style="top:5%;height: 85%;overflow-y: hidden"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色名称">
          <a-input
            placeholder="只支持中文汉字，2-6个字，不允许重复"
            v-decorator="[ 'title', validatorRules.roleName]"
          />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色描述">
          <a-input v-decorator="[ 'description', validatorRules.description]" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="父级角色">
          <a-tree-select
            style="width: 100%"
            :treeData="treeData"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            treeDefaultExpandAll
            v-model="model.pid"
          ></a-tree-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
// import { checkRoleCode } from '@/api/api'
import { editRole, getRoleList } from '@/api/newpage'
export default {
  name: 'RoleModal',
  data() {
    return {
      title: '操作',
      visible: false,
      roleDisabled: false,
      treeData: [],
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        roleName: { rules: [{ required: true, message: '请输入角色名称!' }] },
        description: {
          rules: [
            { required: true, message: '请输入角色描述!' },
            {
              validator(rule, values, callback) {
                if (values && values.length > 6) {
                  callback('描述文字最多三十字')
                } else {
                  callback()
                }
              }
            }
          ]
        }
      }
    }
  },
  created() {},
  methods: {
    getRoleList() {
      getRoleList().then(res => {
        this.treeData = res.list
      })
    },
    add() {
      this.edit({})
    },
    edit(record) {
      this.getRoleList()
      this.form.resetFields()
      let newRecord = Object.assign({}, record)
      if (newRecord.pid) {
        newRecord.pid = newRecord.pid.toString()
      } else {
        newRecord.pid = ''
      }
      this.model = Object.assign({}, newRecord)
      this.visible = true

      //编辑页面禁止修改角色编码
      if (this.model.id) {
        this.roleDisabled = true
      } else {
        this.roleDisabled = false
      }
      // this.model.pid = this.model.pid.toString()
      setTimeout(() => {
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'title', 'description', 'pid'))
        })
      }, 100)
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        console.log(err)
        if (!err) {
          that.confirmLoading = true
          let formData = Object.assign(this.model, values)
          formData.roleName = formData.title
          editRole(formData)
            .then(res => {
              if (res.code == 200) {
                if (that.model.id) {
                  that.$message.success('修改成功')
                } else {
                  that.$message.success('添加成功')
                }
                that.$emit('ok')
              } else {
                that.$message.warning(res.msg)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.close()
            })
        }
      })
    },
    handleCancel() {
      this.close()
    }
    // validateRoleCode(rule, value, callback) {
    //   if (/[\u4E00-\u9FA5]/g.test(value)) {
    //     callback('角色编码不可输入汉字!')
    //   }
    // }
  }
}
</script>

<style scoped>
</style>