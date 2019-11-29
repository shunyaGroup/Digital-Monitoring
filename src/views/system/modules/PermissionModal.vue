<template>
  <a-modal
    :title="title"
    @cancel="handleCancel"
    @ok="handleOk"
    :visible="visible"
    :confirmLoading="confirmLoading"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="菜单类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-radio-group @change="onChangeMenuType" v-decorator="['menuType',{'initialValue':0}]">
            <a-radio :value="0">一级菜单</a-radio>
            <a-radio :value="1">子菜单</a-radio>
            <a-radio :value="2">按钮/数据权限</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" :label="menuLabel" hasFeedback>
          <a-input
            placeholder="请输入菜单名称"
            v-decorator="[ 'title', validatorRules.title]"
            :readOnly="disableSubmit"
          />
        </a-form-item>

        <a-form-item
          v-show="localMenuType!=0"
          label="上级菜单"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-tree-select
            style="width:100%"
            :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
            :treeData="treeData"
            v-model="model.parentId"
            placeholder="请选择父级菜单"
            :disabled="disableSubmit"
          ></a-tree-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="菜单路径"
          v-show="localMenuType!=2"
        >
          <a-input
            placeholder="请输入菜单路径"
            v-decorator="[ 'path',{}]"
            :readOnly="disableSubmit"
          />
        </a-form-item>

        <a-form-item v-show="show" :labelCol="labelCol" :wrapperCol="wrapperCol" label="前端组件">
          <a-input
            placeholder="请输入前端组件"
            v-decorator="[ 'component', {}]"
            :readOnly="disableSubmit"
          />
        </a-form-item>

        <!-- <a-form-item
          v-show="localMenuType==0"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="默认跳转地址"
        >
          <a-input
            placeholder="请输入路由参数 redirect"
            v-decorator="[ 'redirect',{}]"
            :readOnly="disableSubmit"
          />
        </a-form-item>-->

        <!-- <a-form-item v-show="!show" :labelCol="labelCol" :wrapperCol="wrapperCol" label="授权标识">
          <a-input
            placeholder="多个用逗号分隔, 如: user:list,user:create"
            v-decorator="[ 'perms', {}]"
            :readOnly="disableSubmit"
          />
        </a-form-item>-->

        <a-form-item v-show="show" :labelCol="labelCol" :wrapperCol="wrapperCol" label="菜单图标">
          <a-input placeholder="点击右侧按钮选择图标" v-model="model.icon" :readOnly="disableSubmit">
            <a-icon slot="addonAfter" type="setting" @click="selectIcons" />
          </a-input>
        </a-form-item>

        <a-form-item v-show="show" :labelCol="labelCol" :wrapperCol="wrapperCol" label="排序">
          <a-input-number
            placeholder="请输入菜单排序"
            style="width: 200px"
            v-decorator="[ 'sortNo', {'initialValue':1.0,'rule':validatorRules.sortNo}]"
            :readOnly="disableSubmit"
          />
        </a-form-item>
        <!-- <a-form-item v-show="show" :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否路由菜单">
          <a-switch checkedChildren="是" unCheckedChildren="否" v-model="routeSwitch" />
        </a-form-item>-->

        <a-form-item v-show="show" :labelCol="labelCol" :wrapperCol="wrapperCol" label="隐藏路由">
          <a-switch checkedChildren="是" unCheckedChildren="否" v-model="hidden" />
        </a-form-item>
      </a-form>

      <!-- 选择图标 -->
      <icons
        @choose="handleIconChoose"
        @close="handleIconCancel"
        :iconChooseVisible="iconChooseVisible"
      ></icons>
    </a-spin>
    <!-- <a-row :style="{textAlign:'right'}">
      <a-button :style="{marginRight: '8px'}" @click="handleCancel">关闭</a-button>
      <a-button :disabled="disableSubmit" @click="handleOk" type="primary">确定</a-button>
    </a-row>-->
  </a-modal>
</template>

<script>
import { editList, authList } from '@/api/newpage'
import Icons from './icon/Icons'
import pick from 'lodash.pick'

export default {
  name: 'PermissionModal',
  components: { Icons },
  data() {
    return {
      drawerWidth: 700,
      treeData: [],
      title: '操作',
      visible: false,
      disableSubmit: false,
      model: {
        parentId: 1
      },
      localMenuType: '1',
      alwaysShow: false, //表单元素-聚合路由
      hidden: false, //表单元素-隐藏路由
      routeSwitch: true, //是否路由菜单
      show: true, //根据菜单类型，动态显示隐藏表单元素
      menuLabel: '菜单名称',
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
        title: { rules: [{ required: true, message: '请输入菜单标题!' }] },
        sortNo: { rules: [{ validator: this.validateNumber }] },
        // path: { rules: [{ required: true, message: '请输入菜单路径！' }] },
        component: { rules: [{ required: true, message: '请输入前端组件！' }] }
      },
      iconChooseVisible: false
    }
  },
  created() {},
  methods: {
    loadTree() {
      var that = this
      authList().then(res => {
        if (res.code == 200) {
          that.treeData = []
          let treeList = res.list
          for (let a = 0; a < treeList.length; a++) {
            let temp = treeList[a]
            temp.isLeaf = temp.leaf
            that.treeData.push(temp)
          }
        }
      })
    },
    add() {
      this.edit()
    },
    edit(record) {
      this.resetScreenSize() // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
      this.form.resetFields()
      this.model = Object.assign({}, record)
      // //--------------------------------------------------------------------------------------------------
      //根据菜单类型，动态展示页面字段
      if (record) {
        this.model.parentId = record.parentId.toString()
        this.alwaysShow = !record.alwaysShow ? false : true
        // this.model.status = !record.hidden ? false : true
        this.routeSwitch = record.route

        //console.log('record.menuType', record.menuType);
        this.show = record.menuType == 2 ? false : true
        this.menuLabel = record.menuType == 2 ? '按钮/权限名称' : '菜单名称'
        this.localMenuType = record.menuType
        // if (this.model.parentId && this.model.parentId != 0) {
        //   this.localMenuType = 1
        // } else {
        //   this.localMenuType = 0
        // }
      } else {
        if (this.model.parentId && this.model.parentId != 0) {
          this.localMenuType = 1
        } else {
          this.localMenuType = 0
        }
        this.show = true
        this.menuLabel = '菜单名称'
      }
      //----------------------------------------------------------------------------------------------

      this.visible = true
      this.loadTree()
      let fieldsVal = pick(this.model, 'title', 'perms', 'component', 'path', 'sortNo', 'menuType', 'hidden')
      this.$nextTick(() => {
        this.form.setFieldsValue(fieldsVal)
      })
    },
    close() {
      this.$emit('close')
      this.disableSubmit = false
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          that.confirmLoading = true
          // this.model.alwaysShow = this.alwaysShow
          this.model.hidden = this.hidden ? 1 : 0
          // this.model.route = this.routeSwitch
          console.log(values, '111')
          let formData = Object.assign(this.model, values)

          let obj
          if (!this.model.id) {
            // obj=addPermission(formData);
            obj = editList(formData)
          } else {
            // obj=editPermission(formData);
            obj = editList(formData)
          }
          obj
            .then(res => {
              if (res.msg == 'success') {
                that.$message.success('添加成功')
                that.$emit('ok')
              } else {
                that.$message.warning('添加失败')
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
    },
    validateNumber(rule, value, callback) {
      if (!value || new RegExp(/^[0-9]*[1-9][0-9]*$/).test(value)) {
        callback()
      } else {
        callback('请输入正整数!')
      }
    },
    onChangeMenuType(e) {
      console.log('localMenuType checked', e.target.value)
      this.localMenuType = e.target.value
      if (e.target.value == 2) {
        this.show = false
        this.menuLabel = '按钮/权限名称'
      } else {
        this.show = true
        this.menuLabel = '菜单名称'
      }
    },
    selectIcons() {
      this.iconChooseVisible = true
    },
    handleIconCancel() {
      this.iconChooseVisible = false
    },
    handleIconChoose(value) {
      console.log(value)
      this.model.icon = value
      this.form.icon = value
      this.iconChooseVisible = false
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
</style>