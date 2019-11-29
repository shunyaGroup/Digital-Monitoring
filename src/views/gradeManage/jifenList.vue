<template>
<div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header style="display: block;">
      <!--<a-row>
        <a-button type="primary" style ="margin-left: 26px;margin-right: 50px;" @click='godataClean'>数据清洗</a-button>
        <a-button style="background: #ddd;" @click='goitemAdd'>添加方案</a-button>
      </a-row>-->
      <a-row>
      	   <a-form-item label="时间" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-range-picker
              format="YYYY-MM-DD HH:mm:ss"
              
              @change="changeDate"
            />
          </a-form-item>
      </a-row>
     		<a-row>
          <a-col :span="15">
            <a-input placeholder="输入手机号并按回车查询" v-model="foo.mobile" @pressEnter="onChange"/>
          </a-col>
        </a-row>
        <a-row>  	  
	          <span class="dxTitle" style="margin-left: 100px;">状态</span>
	          <a-radio-group @change="onChange" v-model="foo.status">
	          	<a-radio value="">全部</a-radio>
	            <a-radio value="1">添加方案</a-radio>
	            <a-radio value="2">阅读更新</a-radio>
	            <a-radio value="3">相似文章更新</a-radio>
	            <a-radio value="4">发布</a-radio>
	            <a-radio value="5">新用户激活</a-radio>
	            <a-radio value="6">意见反馈</a-radio>
	          </a-radio-group>
	      
        </a-row>

        <!--<a-button style="background: #ddd;">查询</a-button>-->
      </a-layout-header>
      <a-layout-content>
        <div style="margin-bottom: 10px;margin-top: 10px">
       <!--<a class="daochu" @click="daochu" style="font-weight: bold;color: #ffffff;background: #0080FF;border-radius: 2px; padding: 1px 5px;margin-bottom:20px;margin-left: 20px;" >一键导出</a>-->
      		<!--<a class="daochu" href="requre('http://39.97.241.172/%E6%96%B9%E6%A1%88%E5%88%97%E8%A1%A8.xlsx')" download="%E6%96%B9%E6%A1%88%E5%88%97%E8%A1%A8" target="_blank" style="font-weight: bold;color: #ffffff;background: #0080FF;border-radius: 2px; padding: 1px 5px;margin-bottom:20px" >一键导出</a>-->
        </div>
        
        <div style="font-size: 26px;font-weight: bold;">企业总积分：{{zongjifen}}</div>
        
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
             <!-- <a href="javascript:;" @click="bing(record)"></a>
              <a-popconfirm
                title="确定删除吗?"
                @confirm="() => handleDelete(record)"
              >
                <a class="delBtn"><a-icon type="delete" /></a>
              </a-popconfirm>-->
              <!--<a class="edit" @click="edit(record)" style="margin-left: 15px;"><a-icon type="question-circle" />修改</a>-->
              <a class="lookBtn" @click="lookfile(record)" style="margin-left: 15px;"><a-icon type="question-circle" />详情</a>
            </span>

            
            
            
        </a-table>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
    <a-modal
      title="修改方案"
      v-model="visible_list"
      @ok="postedit"
      okText="保存"
    >
		<a-row style="margin-top:20px">
          <span class="dxTitle2">方案名称</span>
          <a-col :span="15">
            <a-input style="display: inherit;" placeholder="请输入方案名称" v-model="editSave.name" />
          </a-col>
        </a-row>
        <a-row style="margin-top:20px">
          <span class="dxTitle2">关键字</span>
          <a-col :span="15">
            <a-input style="display: inherit;" placeholder="请输入关键字" v-model="editSave.keywords" />
          </a-col>
        </a-row>
        <a-row style="margin-top:20px">
          <span class="dxTitle2">排除词</span>
          <a-col :span="15">
            <a-input style="display: inherit;" placeholder="请输入排除词" v-model="editSave.keywords_exclude" />
          </a-col>
        </a-row>
    </a-modal>
    
    
    <a-modal
      title="查看详情"
      v-model="visible_look"
      @ok="handleOk_look"
      okText="完成"
    >
		<div style="text-align: center;">暂无详情</div>
    </a-modal>
</div>
</template>
<script>
import $ from 'jquery'
/*import '~@/styles/theme/variables.less';*/
import { schemeList,schemeDel,getFenpeiList,downloadExcel,itemEdit,adviceList,adviceFile,jifenList} from '@/api/newpage'
import moment from 'moment'
const columns = [{
                  title: '创建时间',
                  dataIndex: 'createTime',
                  },{
                  title: '激活时间',
                  dataIndex: 'lastTime',
                  }, {
                  title: '摘要',
                  dataIndex: 'digest',
                  }, {
                  title: '单项积分',
                  dataIndex: 'integral',
                  },{
                  title: '发布条数',
                  dataIndex: 'publishTotal',
                  },{
                  title: '用户名',
                  dataIndex: 'userName',
                  }];


export default {
  data () {
    return {
    	
      endOpen: false,
     visible_list:false,	
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
      	startTime: '',
      	endTime: '',
        mobile:'',
				status:'',
				page: 1,
        limit: 10
      },
      push:{
        id:''
      },
      form:{
      	
      },
      editform:{
      	
      },
      editSave:{
      	
      },
      zongjifen:'',
    }
  },
  mounted() {
    this.schemeList()
    this.getFenpeiList()
  },
  methods: {

  	daochu(){
    	this.downloadExcel()
    },
    downloadExcel() {
    	/*window.open('http://1320/%E6%96%B9%E6%A1%88%E5%88%97%E8%A1%A8.xlsx')*/
    	/*var  obj ={
    		filename:"方案列表"
    	}
      downloadExcel(obj).then(res => {
        console.log(res)
       this.download(res)
      })*/
     
     	alert('暂不支持下载')
    },
    download (data) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.xlsx')

        document.body.appendChild(link)
        link.click()
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
      jifenList(this.foo).then(res => {
        console.log(res)
        this.zongjifen = res.scoreTotal
        this.data = res.list
        if (res.count) {
          this.pagination.total = res.count
          console.log(res.count)
        }
        var dL = this.data
       /* for(var i =0;i<dL.length;i++){*/
			/*console.log(dL[i])
			console.log(dL[i].status)
			console.log(dL[i].status)*/
	     /*   if( dL[i].status == 1){
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
		};*/
      })
    },
    onDelete() {

    },
    handleEdit(record) {
      
    },
    edit(record){
		this.visible_list = true
      var name = record.name
      var keywords = record.keywords
      var keywords_exclude = record.keywords_exclude
      this.editSave = {
      		name:name,
      		keywords:keywords,
      		keywords_exclude:keywords_exclude
      }
 
    },
    postedit(record){
    	/*itemEdit(editForm).then(res => {
	        console.log(res)
	    })*/
    	this.visible_list = false
    },
    changeMsg(record) {

    },
   /* daochu(){
    	function readWorkbookFromLocalFile(file, callback) {
		    var reader = new FileReader();
		    reader.onload = function(e) {
		        var data = e.target.result;
		        var workbook = XLSX.read(data, {type: 'binary'});
		        if(callback) callback(workbook);
		    };
		    reader.readAsBinaryString(file);
		}
    },*/
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

       this.visible_look = true

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
    changeDate(dates, dateStrings){
  	 	console.log(this.foo.startTime)
  	 	console.log(this.foo.endTime)
  	 	this.foo.startTime = dateStrings[0]
  	 	this.foo.endTime = dateStrings[1]
  	 	console.log(this.foo.startTime)
  	 	console.log(this.foo.endTime)
  	 	this.schemeList()
  	 },
    moment
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
.dxTitle2 {
  display: inline-block;
  width: 80px;
  float: left;
  height: 26px;
  line-height: 26px;
}
</style>