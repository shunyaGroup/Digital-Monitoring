<template>
<div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
      <!--<a-row>
        <a-button type="primary" style ="margin-left: 26px;margin-right: 50px;" @click='godataClean'>数据清洗</a-button>
        <a-button style="background: #ddd;" @click='goitemAdd'>添加方案</a-button>
      </a-row>-->
        <a-row>
          <span class="dxTitle">方案类别</span>
          <a-radio-group @change="onChange" v-model="foo.category">
            <a-radio value="1">监测</a-radio>

            <a-radio value="3">回溯</a-radio>

          </a-radio-group>
          
          	  
	          <span class="dxTitle" style="margin-left: 100px;">状态</span>
	          <a-radio-group @change="onChange" v-model="foo.status">
	            <a-radio value="1">监测中</a-radio>
	            <a-radio value="0">已删除</a-radio>
	          </a-radio-group>
	      
        </a-row>
       
        <a-form :form="form" >
	         <a-form-item
	            :label-col="formItemLayout.labelCol"
	            :wrapper-col="formItemLayout.wrapperCol"
	            label="企业选择"
	            style="margin-bottom: 0;"
	          >
	            <a-select v-model="foo.enterprise_id" @change="onChange" 
	                :allowClear="true">
	              <a-select-option
	                v-for="(datali,index) in datalist"
	                :key="index"
	                :value="datali.id"
	              >{{datali.name}}</a-select-option>
	            </a-select>
	         </a-form-item>
        </a-form>
        <!--<a-button style="background: #ddd;">查询</a-button>-->
        <a-row>
          <a-col :span="15">
            <a-input placeholder="输入方案名称并按回车查询" v-model="foo.name" @pressEnter="onChange"/>
          </a-col>
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
              
              <a class="lookBtn" @click="lookfile(record)" style="margin-left: 15px;"><a-icon type="question-circle" />查看详情</a>
            </span>

            
            
            
        </a-table>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
    <a-modal
      title="请勿更改输入框的内容"
      v-model="visible_look"
      @ok="jsTest1"
      okText="一键复制"
    >
	<textarea  name="test1" rows="20" cols="75" id="test1" style="border: none;">{{opop}}</textarea>
     <!--<textarea cols="60" name="test1" rows="2" id="test1">
			
      </textarea>-->
   		<!-- <input type=button value="复制" @click="jsTest1"><br />-->
    </a-modal>
</div>
</template>
<script>
import $ from 'jquery'

import { schemeList,schemeDel,getFenpeiList,kpiFile,kpiList } from '@/api/newpage'
const columns = [{
                  title: '创建时间',
                  dataIndex: 'add_time',
                  }, {
                  title: '方案名称',
                  dataIndex: 'name',
                  }, {
                  title: '标签',
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
     opop:'',	
     copytest:'',
      visible_look:false,	
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
	        	dL[i].category = "回溯"
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
    lookfile(record) {
      console.log(record)
      var add_time = "创建时间:" + record.add_time + "\n"
      var name = "方案名称:" + record.name + "\n"
      var scheme_type = "标签:" + record.scheme_type.name + "\n"
      var category = "方案类别:" + record.category + "\n"
      var status = "方案状态:" + record.status + "\n"
      var keywords = "关键词组:" + record.keywords + "\n"
      
      var opop = add_time + name + scheme_type + category + status + keywords
      this.opop = opop
      /*$('#test1').text(opop)*/
       this.visible_look = true
     /* $('#test1').text(opop)
      this.copytest =  $('#test1').val()*/
    },
    copy(){
    	
    },
    copyLink(record) {
	   let _this = this;
	   let clipboard = new this.clipboard(".cobyOrderSn");
	   clipboard.on('success', function () {
	    alert("复制成功")
	   });
	   clipboard.on('error', function () {
	    alert("复制失败")
	   });
	 },
	 jsTest1() {
        var e = document.getElementById("test1");//对象是test1
        e.select(); //选择对象
        document.execCommand("Copy"); //执行浏览器复制命令
        alert("已复制好，可贴粘。");
   },
    handleOk_look(record){
    	console.log(record)
    	
    	this.visible_look = false
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