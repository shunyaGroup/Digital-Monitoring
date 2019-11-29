<template>
<div>
  <a-tabs defaultActiveKey="1" @change="callback">
    <a-tab-pane tab="舆情日报" key="1">	
		<div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
      <a-row>
        <a-button style="background: #ddd;" @click='goitemAdd'>+新建报告</a-button>
      </a-row>

      </a-layout-header>
      <a-layout-content>
        <div style="margin-bottom: 10px;margin-top: 10px">
        </div>
        <a-table :columns="columns" :dataSource="data" :pagination="pagination" @change="handleTableChange"  rowKey="id" key="index">
            <template slot="action" slot-scope="text">
              <!-- <a @click="" style="margin-right:10px">删除</a> -->
             <!--  <a @click="changeMsg(record)" style="margin-right:10px">设置</a>
             <a-popconfirm title="确定修改状态?" @confirm="() => onDelete(record.id)" style="margin-right:10px">
               <a href="javascript:;">显示中</a>
             </a-popconfirm>
             <a @click="">健康度刷新</a> -->
            </template>

            <span slot="action" slot-scope="text, record">    
              <a href="javascript:;" @click="bing(record)"></a>
              <a-popconfirm
                title="确定删除吗?"
                @confirm="() => handleDelete(record)"
              >
                <a class="delBtn"><a-icon type="delete" />删除</a>
              </a-popconfirm>
            </span>

        </a-table>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
</div>
	</a-tab-pane>
	
    <a-tab-pane tab="车型日报" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
    <a-tab-pane tab="销量日报" key="3">Content of Tab Pane 3</a-tab-pane>
    <a-tab-pane tab="专项日报" key="4">Content of Tab Pane 4</a-tab-pane>
  </a-tabs>
</div>
</template>
<script>
import $ from 'jquery'

import { schemeList,schemeDel,getFenpeiList } from '@/api/newpage'
const columns = [{
                  title: '创建时间',
                  dataIndex: 'add_time',
                  }, {
                  title: '方案名称',
                  dataIndex: 'name',
                  }, {
                  title: '一级分类',
                  dataIndex: 'scheme_type.name',
                  },{
                  title: '方案类别',
                  dataIndex: 'category',
                  },{
                  title: '方案状态',
                  dataIndex: 'status',
                  },{
                  title: '操作',
                  dataIndex: 'action',
                  scopedSlots: { customRender: 'action' },
                  align: 'center'
                  }];

//import moment from 'moment'
export default {
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 }
      },
      value:'',
      indeterminate: true,
      checkAll: false,
      data:[],
      datalist:[],
      columns,
     // selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      pagination: {
        pageSize: 10,
        total: 1
      },
      foo: {
        enterprise_id: '',
        type_id: '',
        category:'' ,
        name: '',
		status:'',
		page: 1,
        limit: 10
      },
      push:{
        id:''
      },
      form:{
      	
      }
    }
  },
  mounted() {
    this.schemeList()
    this.getFenpeiList()
  },
  methods: {
   callback (key) {
      console.log(key)
   },
   getFenpeiList() {
      getFenpeiList().then(res => {
        console.log(res)
        this.datalist = res.list
        console.log(this.datalist)
      })
    },
    godataClean(){
      this.$router.push({ name: 'dataC-dataClean' })
    },
    goitemAdd(){
      this.$router.push({ name: 'dataC-itemAdd' })
    },
    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
    },
    schemeList() {
      schemeList(this.foo).then(res => {
        console.log(res)
        this.data = res.list
        if (res.count) {
          this.pagination.total = res.count
          console.log(res.count)
        }
        var dL = this.data
        for(var i =0;i<dL.length;i++){
			/*console.log(dL[i])
			console.log(dL[i].status)
			console.log(dL[i].status)*/
	        if( dL[i].status == 1){
	        	dL[i].status = "监测中"	
	        }else{
	        	dL[i].status = "已删除"
	        }
	        
	        if(dL[i].category == 1){
	        	dL[i].category = "监测"
	        }else if(dL[i].category == 2){
	        	dL[i].category = "订阅"
	        }else if(dL[i].category == 3){
	        	dL[i].category = "分析"
	        }else if(dL[i].category == 4){
	        	dL[i].category = "海外"
	        }
		};
      })
    },
    onDelete() {

    },
    handleEdit(record) {
      
    },
    changeMsg(record) {

    },
    onChange(e) {
//    console.log('radio checked', e.target.value)
      this.schemeList();
      console.log(e)
    },
    handleTableChange(pagination, filters, sorter) {
      this.foo.page = pagination.current
      this.schemeList()
    },
    bing(record) {
      console.log(record)
      this.visible = true
      this.chooseRecord = record
    },
    handleDelete(record) {
     console.log(record)
     this.push.id = record.id
     console.log(this.push.id)
     schemeDel(this.push).then(res => {
        console.log(res)
       this.schemeList()   
      })
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
   /* border-bottom: 1px solid;*/
} 
.ant-table-thead > tr > th, .ant-table-tbody > tr > td{
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

</style>