<template>
<div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
            <!-- <a-row>
              <a-col :span="12">col-12</a-col>
              <a-col :span="12">col-12</a-col>
            </a-row> -->
      <a-row>
        <a-button type="primary" style ="margin-left: 26px;margin-right: 50px;">数据清洗</a-button>
        <a-button style="background: #ddd;">添加方案</a-button>
      </a-row>
      </a-layout-header>
      <a-layout-content>
        <div style="margin-bottom: 10px;margin-top: 10px">
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
        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data" >
            <template slot="action" slot-scope="text">
              <a @click="" style="margin-right:10px">删除</a>
              <a @click="changeMsg(record)" style="margin-right:10px">设置</a>
              <a-popconfirm title="确定修改状态?" @confirm="() => onDelete(record.id)" style="margin-right:10px">
                <a href="javascript:;">显示中</a>
              </a-popconfirm>
              <a @click="">健康度刷新</a>
            </template>
        </a-table>
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
</div>
</template>
<script>
import $ from 'jquery'


const columns = [{
                  title: '创建时间',
                  dataIndex: 'name',
                  }, {
                  title: '方案名称',
                  dataIndex: 'age',
                  }, {
                  title: '一级分类',
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
      indeterminate: true,
      checkAll: false,
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    onDelete(key) {
      
    },
    handleEdit(record) {
      
    },
    changeMsg(record) {
       /*$('.additemBtn').click(function(){
          alert('恭喜你，jquery引入成功')
       })*/
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
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
    }
  },
}
</script>
<style scoped>
/* #components-layout-demo-basic {
  text-align: center;
} */
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
 /*  background: #7dbcea; */
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
  background: #fff;
  height: auto;
  line-height: auto;
}
.dxTitle{
  display: inline-block;
  width: 80px;
}
.ant-row{
    height: 46px;
    line-height: 46px;
    border-bottom: 1px solid;
}  
</style>