<template>
  <a-modal :title="title" @cancel="close" :visible="visible">
    <a-form>
      <a-form-item label="所拥有的权限">
        <a-tree
          checkable
          @check="onCheck"
          :checkedKeys="checkedKeys"
          :treeData="treeData"
          @expand="onExpand"
          @select="onTreeNodeSelect"
          :expandedKeys="expandedKeysss"
          :checkStrictly="checkStrictly"
        >
          <span slot="hasDatarule" slot-scope="{slotTitle,icon}">
            {{ slotTitle }}
            <a-icon v-if="icon" type="align-left" style="margin-left:5px;color: red;"></a-icon>
          </span>
        </a-tree>
      </a-form-item>
    </a-form>

    <!-- <div class="drawer-bootom-button">
      <a-dropdown style="float: left" :trigger="['click']" placement="topCenter">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="switchCheckStrictly(1)">父子关联</a-menu-item>
          <a-menu-item key="2" @click="switchCheckStrictly(2)">取消关联</a-menu-item>
          <a-menu-item key="3" @click="checkALL">全部勾选</a-menu-item>
          <a-menu-item key="4" @click="cancelCheckALL">取消全选</a-menu-item>
          <a-menu-item key="5" @click="expandAll">展开所有</a-menu-item>
          <a-menu-item key="6" @click="closeAll">合并所有</a-menu-item>
        </a-menu>
        <a-button>
          树操作
          <a-icon type="up" />
        </a-button>
      </a-dropdown>
      <a-popconfirm title="确定放弃编辑？" @confirm="close" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="loading">提交</a-button>
    </div>-->
    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <!-- <div class="drawer-bootom-button" v-show="!disableSubmit">
        <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
          <a-button style="margin-right: .8rem">取消</a-button>
        </a-popconfirm>
      </div>-->
    </template>
    <role-datarule-modal ref="datarule"></role-datarule-modal>
  </a-modal>
</template>
<script>
import { queryTreeListForRole, queryRolePermission, saveRolePermission } from '@/api/api'
import RoleDataruleModal from './RoleDataruleModal.vue'
import { authList, bingRole, roleAuthlist } from '@/api/newpage'
export default {
  name: 'RoleModal',
  components: {
    RoleDataruleModal
  },
  data() {
    return {
      role_id: '',
      treeData: [],
      defaultCheckedKeys: [],
      checkedKeys: [],
      expandedKeysss: [],
      allTreeKeys: [],
      autoExpandParent: true,
      checkStrictly: true,
      title: '角色权限配置',
      visible: false,
      loading: false
    }
  },
  methods: {
    onTreeNodeSelect(id, info) {},
    changeCheck(value) {
      console.log(value)
    },
    onCheck(o, info) {
      let obj = {
        role_id: this.role_id,
        auth_id: info.node.value
      }
      if (info.checked) {
        obj.is_del = 0
      } else {
        obj.is_del = 1
      }
      bingRole(obj).then(res => {
        if (res.code == 200) {
          if (info.checked) {
            this.$message.success('绑定成功')
          } else {
            this.$message.success('解绑成功')
          }
          
        } else {
          this.$message.warning(res.msg)
        }
      })

      if (this.checkStrictly) {
        this.checkedKeys = o.checked
      } else {
        this.checkedKeys = o
      }
    },
    show(role_id) {
      this.role_id = role_id
      this.visible = true
    },
    close() {
      this.reset()
      this.$emit('close')
      this.visible = false
    },
    onExpand(expandedKeys) {
      this.expandedKeysss = expandedKeys
      this.autoExpandParent = false
    },
    reset() {
      this.expandedKeysss = []
      this.checkedKeys = []
      this.defaultCheckedKeys = []
      this.loading = false
    },
    expandAll() {
      this.expandedKeysss = this.allTreeKeys
    },
    closeAll() {
      this.expandedKeysss = []
    },
    checkALL() {
      this.checkedKeys = this.allTreeKeys
    },
    cancelCheckALL() {
      //this.checkedKeys = this.defaultCheckedKeys
      this.checkedKeys = []
    },
    switchCheckStrictly(v) {
      if (v == 1) {
        this.checkStrictly = false
      } else if (v == 2) {
        this.checkStrictly = true
      }
    },
    handleCancel() {
      this.close()
    },
    handleSubmit() {
      let that = this
      let params = {
        permissionIds: that.checkedKeys.join(','),
        role_id: that.role_id
      }
      that.loading = true
      saveRolePermission(params).then(res => {
        if (res.success) {
          that.$message.success(res.message)
          that.loading = false
          that.close()
        } else {
          that.$message.error(res.message)
          that.loading = false
          that.close()
        }
      })
    }
  },
  watch: {
    visible() {
      if (this.visible) {
        authList().then(res => {
          this.treeData = res.list
          roleAuthlist({ roleId: this.role_id }).then(res => {
            this.checkedKeys = [...res.list]
            this.defaultCheckedKeys = [...res.list]
            // this.expandedKeysss = this.allTreeKeys
          })
        })
        // queryTreeListForRole().then(rFes => {
        //   this.treeData = res.result.treeList
        //   this.allTreeKeys = res.result.ids
        //   queryRolePermission({ roleId: this.roleId }).then(res => {
        //     this.checkedKeys = [...res.result]
        //     this.defaultCheckedKeys = [...res.result]
        //     this.expandedKeysss = this.allTreeKeys
        //   })
        // })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.drawer-bootom-button {
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  left: 0;
  background: #fff;
  border-radius: 0 0 2px 2px;
}
</style>