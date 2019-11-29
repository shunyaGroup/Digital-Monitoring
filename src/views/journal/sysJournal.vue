<template>
<div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
     <!-- <a-row>
        <a-button type="primary" style ="margin-left: 26px;margin-right: 50px;" @click='godataClean'>数据清洗</a-button>
        <a-button style="background: #ddd;" @click='goitemAdd'>添加方案</a-button>
      </a-row>-->
        <a-row>
         <!-- <span class="dxTitle">方案类别</span>
          <a-radio-group @change="onChange" v-model="foo.category">
            <a-radio value="1">监测</a-radio>
            <a-radio value="2">订阅</a-radio>
            <a-radio value="3">分析</a-radio>
            <a-radio value="4">海外</a-radio>
          </a-radio-group>-->
          
          	  
	          <span class="dxTitle" style="margin-left: 0px;">状态</span>
	          <a-radio-group @change="onChange" v-model="foo.status">
	            <a-radio value="1">登录</a-radio>
	            <a-radio value="2">方案操作</a-radio>
	          </a-radio-group>
	      
        </a-row>
        <a-row>
        <a-form :form="form" >
	         <a-form-item
	            :label-col="formItemLayout.labelCol"
	            :wrapper-col="formItemLayout.wrapperCol"
	            label="企业选择"
	            style="margin-bottom: 0;"
	          >
	            <a-select v-model="foo.esId" @change="onChange" 
	                :allowClear="true">
	              <a-select-option
	                v-for="(datali,index) in datalist"
	                :key="index"
	                :value="datali.id"
	              >{{datali.name}}</a-select-option>
	            </a-select>
	         </a-form-item>
        </a-form>
         </a-row>
        <!--<a-button style="background: #ddd;">查询</a-button>-->
        <a-row>
          <a-col :span="15">
            <a-input placeholder="输入管理员用户名并按回车查询" v-model="foo.userName" @pressEnter="onChange"/>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="15">
            <a-input placeholder="输入管理员手机号并按回车查询" v-model="foo.mobile" @pressEnter="onChange"/>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content>
        <div style="margin-bottom: 10px;margin-top: 10px">
        </div>
        <a-table
        	 :columns="columns" 
        	 :dataSource="data" 
        	 :pagination="pagination" 
        	 @change="handleTableChange"  
        	 rowKey="id" 
        	 key="index">


        </a-table>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
</div>
</template>
<script>
import $ from 'jquery'

import { schemeList,schemeDel,getSelectlist,systemlog } from '@/api/newpage'
const columns = [{
                  title: '创建时间',
                  dataIndex: 'create_datetime',
                  },{
                  title: 'IP',
                  dataIndex: 'ip',
                  }, {
                  title: '地址',
                  dataIndex: 'location',
                  }, {
                  title: '日志描述',
                  dataIndex: 'descript',
                  },{
                  title: '管理员用户名',
                  dataIndex: 'user_name',
                  },{
                  title: '管理员手机号',
                  dataIndex: 'mobile',
                  },{
                  title: '登录企业简称',
                  dataIndex: 'loginEnInfo.name',
                  },{
                  title: '处理企业简称',
                  dataIndex: 'dealEnInfo.name',
                  },{
                  title: '状态',
                  dataIndex: 'status',
                  }/*,{
                  title: '操作',
                  dataIndex: 'action',
                  scopedSlots: { customRender: 'action' },
                  align: 'center'
                  }*/];

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
        esId: '',
        type_id: '',
        category:'' ,
        name: '',
        userName:'',
        mobile:'',
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
    this.systemlog()
    this.getSelectlist()
  },
  methods: {
   getSelectlist() {
      getSelectlist().then(res => {
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
    systemlog() {
      systemlog(this.foo).then(res => {
        console.log(res)
        this.data = res.list
        if (res.count) {
          this.pagination.total = res.count
          console.log(res.count)
        }
        var dL = this.data
        for(var i =0;i<dL.length;i++){
			console.log(dL[i])
			console.log(dL[i].status)
	        if( dL[i].status == 1){
	        	dL[i].status = "登录"	
	        }else{
	        	dL[i].status = "方案操作"
	        }
	    
	    /*
	    console.log(dL[i].status)
	    if(dL[i].status == 1){
	        	dL[i].status = "合作中"
	        }else if(dL[i].status == 2){
	        	dL[i].status = "已停止"
	        }*/
	    
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
      this.systemlog();
      console.log(e)
    },
    handleTableChange(pagination, filters, sorter) {
      this.foo.page = pagination.current
      this.systemlog()
    },
    bing(record) {
      console.log(record)
      this.visible = true
      this.chooseRecord = record
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