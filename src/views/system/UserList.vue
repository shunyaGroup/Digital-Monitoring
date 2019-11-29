<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="12">
            <a-form-item label="账号">
              <a-input placeholder="请输入账号查询" v-model="queryParam.user_name"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="企业名称">
              <a-select v-model="queryParam.enterprise_id" placeholder="请选择企业查询">
                <a-select-option
                  v-for="(item,index) in enterList"
                  :value="item.id"
                  :key="index"
                >{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <template>
            <a-col :md="6" :sm="8">
              <a-form-item label="手机号码">
                <a-input placeholder="请输入手机号码查询" v-model="queryParam.mobile"></a-input>
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="8">
              <a-form-item label="真实姓名">
                <a-input placeholder="请输入真实姓名查询" v-model="queryParam.true_name"></a-input>
              </a-form-item>
            </a-col>
          </template>

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button @click="handleAdd" type="primary" icon="plus">添加用户</a-button>
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div>
      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="user_id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="popCooperate(record)">分配企业</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除？" @confirm="handleDelite(record)" okText="确定" cancelText="取消">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 点击用户名 -->
    <a-modal :visible="visible2" title="分配企业" @cancel="handleCancel">
      <a-row class="headRow">
        <span class="dxTitle">合作中企业列表：</span>
        <!-- <a-select style="width: 200px">
          <a-select-option
            v-for="i in 25"
            :key="(i + 9).toString(36) + i"
          >{{(i + 9).toString(36) + i}}</a-select-option>
        </a-select>-->
        <!-- <a-form>
        <a-form-item label="企业名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select>
            <a-select-option
              v-for="(item,index) in objU.list"
            :key="index"
            >{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        </a-form>-->
        <a-checkbox-group v-model="checkedList">
          <a-checkbox
            :value="item.id"
            v-for="(item,index) in objU.list"
            :key="index"
            @change="oncheckChange"
          >{{item.name}}</a-checkbox>
          <br />
        </a-checkbox-group>
      </a-row>
      <template slot="footer">
        <a-button key="back" @click="handleCancel">取消</a-button>
      </template>
    </a-modal>

    <!-- 点击角色弹出层 -->
    <!-- <a-modal title="绑定角色" v-model="visible" @ok="bingOk" okText="确认" cancelText="取消">
      <a-form>
        <a-form-item label="角色名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select v-model="chooseRoleId" placeholder="请选择分配角色">
            <a-select-option
              :value="item.id"
              v-for="(item,index) in roleList"
              :key="index"
            >{{item.roleName}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>-->
    <!-- 点击角色弹出层 -->

    <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>
    <!-- <a-modal title="绑定角色" v-model="visible" @ok="bingOk" okText="确认" cancelText="取消">
      <a-form>
        <a-form-item label="角色名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-select v-model="chooseRoleId" placeholder="请选择分配角色">
            <a-select-option
              :value="item.id"
              v-for="(item,index) in roleList"
              :key="index"
            >{{item.roleName}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>-->
    <!-- <password-modal ref="passwordmodal" @ok="passwordModalOk"></password-modal> -->
  </a-card>
</template>

<script>
import UserModal from './modules/UserModal'
// import PasswordModal from './modules/PasswordModal'
import { putAction } from '@/api/manage'
import { frozenBatch } from '@/api/api'

import {
  userList,
  enterpriseList,
  rolelist,
  bingUser,
  getCooperate,
  postUeid,
  postBinge,
  dealList,
  getUserList,
  deleteUser
} from '@/api/newpage'
import { fail } from 'assert'

// import {JeecgListMixin} from '@/mixins/JeecgListMixin'
export default {
  name: 'UserList',
  // mixins: [JeecgListMixin],
  components: {
    UserModal
    // PasswordModal
  },
  data() {
    return {
      objU: {
        list: []
      },
      objUeid: {
        //user_id:'',
      },
      ueidList: [],
      checkedList: [],
      enterList: [],
      // visible: false,
      visible2: false,
      description: '这是用户管理页面',
      queryParam: {
        page: 1,
        limit: 10
      },
      pagination: {
        total: 0,
        pageSize: 10,
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true
      },
      form: {
        feel: '',
        orderBy: '',
        mediaAttr: '',
        is_handled: '',
        isPublished: 0,
        startTime: '',
        endTime: '',
        checkboxgroup: [],
        networkCategory: '',
        test: '1',
        news_content: '',
        content: '',
        page: 1,
        limit: 50
      },

      list: [],
      dataSource: [],
      loading: false,
      columns: [
        {
          title: '用户账号',
          align: 'center',
          dataIndex: 'user_name',
          width: 120,
          key: 'user_name',
          scopedSlots: { customRender: 'user_name' }
        },
        {
          title: '真实姓名',
          align: 'center',
          width: 100,
          dataIndex: 'true_name'
        },
        {
          title: '手机号码',
          align: 'center',
          width: 100,
          dataIndex: 'mobile'
        },
        {
          title: '企业',
          align: 'center',
          dataIndex: 'enterprise.name'
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'add_time'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: 200
        }
      ],
      url: {
        imgerver: window._CONFIG['domianURL'] + '/sys/common/view',
        syncUser: '/process/extActProcess/doSyncUser',
        list: '/sys/user/list',
        delete: '/sys/user/delete',
        deleteBatch: '/sys/user/deleteBatch',
        exportXlsUrl: 'sys/user/exportXls',
        importExcelUrl: 'sys/user/importExcel'
      },
      chooseRecord: {},
      chooseRoleId: '',
      roleList: []
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  mounted() {
    this.getList()
    this.getenterpriseList()
    this.getRolelist()
    //this.postUeid()
    //this.getCooperate()
  },
  methods: {
    //删除用户
    handleDelite(record) {
      deleteUser({
        user_id: record.user_id
      }).then(res => {
        if (res.msg == 'success') {
          this.$message.success('删除成功')
          this.getList()
        } else {
          this.$message.success('请联系管理员')
        }
      })
    },
    getRolelist() {
      rolelist().then(res => {
        this.roleList = res.list
      })
    },
    postUeid(record) {
      //已分配企业
      let objUeid = {
        user_id: this.objUeid.user_id
      }
      postUeid(objUeid).then(res => {
        var checkedListOLD = res.list
        var checkedListNEW = []
        for (var i = 0; i < checkedListOLD.length; i++) {
          //return checkedListOLD[i];
          checkedListNEW.push(Number(checkedListOLD[i]))
        }
        this.checkedList = checkedListNEW
        this.getCooperate()
      })
    },
    getCooperate(record) {
      dealList().then(res => {
        this.objU.list = res.list
      })
    },
    postBinge(enterprise_id, is_del) {
      let objBinge = {
        user_id: this.objUeid.user_id,
        enterprise_id: enterprise_id,
        is_del: is_del
      }
      postBinge(objBinge).then(res => {})
    },
    popCooperate(record) {
      // this.$refs.modalForm.hezuo(record)
      //this.$refs.modalForm.title = '合作中企业'
      this.objUeid.user_id = record.user_id
      this.visible2 = true
      //this.getCooperate()
      this.postUeid()
    },
    oncheckChange(record) {
      var is_del = ''
      if (record.target.checked == true) {
        var is_del = 0
      } else if (record.target.checked == false) {
        var is_del = 1
      }
      let enterprise_id = record.target.value
      this.postBinge(enterprise_id, is_del)
      // this.indeterminate = !!checkedList.length && (checkedList.length < objU.list.length)
      // console.log(this.indeterminate)
    },
    handleOk(e) {
      this.visible2 = false
      /*      this.loading = true;
      setTimeout(() => {
        this.visible2 = false;
        this.loading = false;
      }, 3000);*/
    },
    handleCancel(e) {
      this.visible2 = false
    },
    // bing(record) {
    //   this.visible = true
    //   this.chooseRecord = record
    // },
    // bingOk() {
    //   let obj = {
    //     role_id: this.chooseRoleId,
    //     user_id: this.chooseRecord.user_id,
    //     is_del: 0
    //   }
    //   const that = this
    //   bingUser(obj).then(res => {
    //     if (res.code == 200) {
    //       that.$message.success('绑定成功!')
    //       that.visible = false
    //       that.getList()
    //     }
    //   })
    // },
    handleDelete(record) {
      let obj = {
        role_id: record.user_role.role_id,
        user_id: record.user_id,
        is_del: 1
      }
      const that = this
      bingUser(obj).then(res => {
        if (res.code == 200) {
          that.$message.success('解绑成功!')
          that.getList()
        }
      })
    },
    getenterpriseList() {
      dealList().then(res => {
        this.enterList = res.list
      })
    },
    searchQuery() {
      this.getList()
    },
    searchReset() {
      this.queryParam = {
        page: 1,
        limit: 10
      }
      this.getList()
    },
    getList() {
      getUserList(this.queryParam).then(res => {
        this.dataSource = res.list
        this.pagination.total = res.count
        // for (var i = 0; i < this.dataSource.length; i++) {
        //   if (this.dataSource[i].lastTime == '0') {
        //     this.dataSource[i].lastTime = '未激活'
        //   } else {
        //     this.dataSource[i].lastTime = '已激活'
        //   }
        // }
      })
    },
    getAvatarView: function(avatar) {
      return this.url.imgerver + '/' + avatar
    },
    modalFormOk(e) {
      console.log(e)
      console.log('aa')
      this.queryParam.page = 1
      this.getList()
      this.bing(e)
      //this.visible =  true
    },
    batchFrozen: function(status) {
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return false
      } else {
        let ids = ''
        let that = this
        that.selectedRowKeys.forEach(function(val) {
          ids += val + ','
        })
        that.$confirm({
          title: '确认操作',
          content: '是否' + (status == 1 ? '解冻' : '冻结') + '选中账号?',
          onOk: function() {
            frozenBatch({ ids: ids, status: status }).then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.loadData()
                that.onClearSelected()
              } else {
                that.$message.warning(res.message)
              }
            })
          }
        })
      }
    },
    handleMenuClick(e) {
      if (e.key == 1) {
        this.batchDel()
      } else if (e.key == 2) {
        this.batchFrozen(2)
      } else if (e.key == 3) {
        this.batchFrozen(1)
      }
    },
    handleFrozen: function(id, status) {
      let that = this
      frozenBatch({ ids: id, status: status }).then(res => {
        if (res.success) {
          that.$message.success(res.message)
          that.loadData()
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    handleChangePassword(username) {
      this.$refs.passwordmodal.show(username)
    },
    handleSyncUser() {
      var that = this
      putAction(that.url.syncUser, {}).then(res => {
        if (res.success) {
          that.$message.success(res.message)
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    passwordModalOk() {
      //TODO 密码修改完成 不需要刷新页面，可以把datasource中的数据更新一下
    },
    handleAdd() {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = '添加用户'
    },
    handleEdit(record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑用户'
    },
    handleAllot(record) {
      this.visible2 = true
    },
    handleTableChange(pagination, filters, sorter) {
      this.queryParam.page = pagination.current
      this.getList()
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
.dxTitle {
  margin-right: 15px;
}
</style>