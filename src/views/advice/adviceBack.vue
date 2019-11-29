<template>
<div id="components-layout-demo-basic">
    <a-layout>
  
     
     <a-layout-content>
        <div style="margin-bottom: 10px;margin-top: 10px">
       <!--<a class="daochu" @click="daochu" style="font-weight: bold;color: #ffffff;background: #0080FF;border-radius: 2px; padding: 1px 5px;margin-bottom:20px;margin-left: 20px;" >一键导出</a>-->
      		<!--<a class="daochu" href="requre('http://39.97.241.172/%E6%96%B9%E6%A1%88%E5%88%97%E8%A1%A8.xlsx')" download="%E6%96%B9%E6%A1%88%E5%88%97%E8%A1%A8" target="_blank" style="font-weight: bold;color: #ffffff;background: #0080FF;border-radius: 2px; padding: 1px 5px;margin-bottom:20px" >一键导出</a>-->
        </div>
        
       <!-- <a-button type="primary" @click="showModal_Add" style="margin-bottom:20px ;">添加意见</a-button>-->
	    <a-modal
	      title="添加回复"
	      v-model="visibleAdd"
	      @ok="handleOk_Add"
	    >
	      	<a-row style="margin-top:20px">
	          <span class="dxTitle2">意见标题</span>
	          <a-col :span="15">
	            <a-input style="display: inherit;" placeholder="请输入意见标题" v-model="objAdd.title" />
	          </a-col>
	        </a-row>
	        <a-row style="margin-top:20px">
	          <span class="dxTitle2">意见内容</span>
	          <a-col :span="15">
	            <a-textarea  style="display: inherit;" placeholder="请输入意见内容" v-model="objAdd.content" />
	          </a-col>
	        </a-row>
	        <a-row style="margin-top:20px">
	          <span class="dxTitle2">类型</span>
	          <a-radio-group @change="onChange" v-model="objAdd.type">
	            <a-radio value="1">新需求</a-radio>
	            <a-radio value="2">优化建议</a-radio>
	          </a-radio-group>
	        </a-row>
	    	<a-row style="margin-top:20px">
	          <span class="dxTitle2">等级</span>
	          <a-radio-group @change="onChange" v-model="objAdd.level">
	            <a-radio value="1">低</a-radio>
	            <a-radio value="2">中</a-radio>
	            <a-radio value="3">高</a-radio>
	            <a-radio value="4">紧急</a-radio>
	          </a-radio-group>
	        </a-row>
	      
	      
	    </a-modal>
        
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
             <!-- <a href="javascript:;" @click="bing(record)"></a>-->
              <a-popconfirm
                title="确定已解决?"
                @confirm="() => handleDelete(record)"
              >
                <a class="delBtn" v-if="record.status !=='已解决'"><a-icon type="delete" />解决</a>
              </a-popconfirm>
              <!--<a class="edit" @click="edit(record)" style="margin-left: 15px;"><a-icon type="question-circle" />修改</a>-->
              <a class="lookBtn" @click="lookfile(record)" style="margin-left: 15px;"><a-icon type="question-circle" />详情</a>
              <!--<a class="star" @click="star(record)"  v-if="record.status == '待评价'"  style="margin-left: 15px;"><a-icon type="edit" />评价</a>-->
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
	  :width="1300"
    >
    <div class="statusLi">
		<ul>
			<li :class="status==='待处理'?'ccc':'aaa'">待处理 >>></li>
			<li :class="status==='处理中'?'ccc':'aaa'">处理中 >>></li>
			<li :class="status==='已解决'?'ccc':'aaa'">待评价 >>></li>
			<li :class="status==='已评价'?'ccc':'aaa'">已评价 >>></li>
			<li :class="status==='关闭'?'ddd':'aaa'">已关闭</li>
		</ul>
	
	</div>
	<div v-if="status == '已评价'" style="width:100%;text-align: center;">
		<a-rate v-model='adviceFileQobj.evaluate_info.score'  style="width:100%;text-align: center;" />
		<a-card :title="cardTitle" style="width: 1000px;  margin: 0 auto;">
	      <!--<a href="#" slot="extra">more</a>-->
	      <p>{{adviceFileQobj.evaluate_info.feedback}}</p>
	    </a-card>
	</div>	
	<!--<a-rate v-model='valueStar'  style="width:100%;text-align: center;" />-->
		<div style="height: 650px;overflow-y:scroll;width: 1000px;margin: 0 auto;">

		<a-list
		    class="comment-list"
		    itemLayout="horizontal"
		    :dataSource="chatInfo"
		    style="float: left; " 
		  	>

		   <a-list-item  class="liaotian" slot="renderItem" slot-scope="item, record" >
		      <a-comment
		        :author="item.user_info.user_name"
		        :class="item.type == 1 ?'typeA':'typeB'"
		        style="width: 977px;"
		      >
		        <!--<template slot="actions">
		          <span v-for="action in item.actions">{{action}}</span>
		        </template>-->
		         <span slot="actions"    @click="huifuClick(item.feedBackId, record)">回复</span>
		        <p slot="content"  >{{item.content}}</p>
		      </a-comment>
		    </a-list-item>
		  </a-list>
			</div>
    
		<!--<div style="text-align: center;">暂无详情</div>-->
    </a-modal>
    
			<a-modal
		      title="添加回复"
		      v-model="visibleHF"
		      @ok="handleOk_HF"
		    >
		        <a-row style="margin-top:20px">
		          <!--<span class="dxTitle2">意见内容</span>-->
		          <a-col :span="15">
		            <a-textarea  style="display: inherit;" placeholder="请输入回复内容" v-model="huifu.content" />
		          </a-col>
		        </a-row>   
		    </a-modal>
    
    
    
    		<a-modal
		      title="评价"
		      v-model="visibleStar"
		      @ok="handleOk_Star"
		    >
		    
		    <a-rate v-model='objStar.score'  style="width:100%;text-align: center;" />
		    
	        <a-row style="margin-top:20px">
	          <span class="dxTitle2">是否实现</span>
	          <a-radio-group @change="onChange" v-model="objStar.isExpect">
	            <a-radio value="1">未实现</a-radio>
	            <a-radio value="2">已实现</a-radio>
	          </a-radio-group>
	        </a-row>
		        <a-row style="margin-top:20px">
		          <span class="dxTitle2">评价反馈</span>
		          <a-col :span="15">
		            <a-textarea  style="display: inherit;" placeholder="请输入回复内容" v-model="objStar.feedback" />
		          </a-col>
		        </a-row>   
		    </a-modal>
    
    
</div>
</template>
<script>
import $ from 'jquery'
/*import '~@/styles/theme/variables.less';*/
import { schemeList,schemeDel,getFenpeiList,downloadExcel,itemEdit,adviceListQ,adviceFile,adviceNewTimQ,adviceCloseQ,adviceFileQ,adviceAddQ,adviceStarQ,adviceList,adviceKo,adviceFan  } from '@/api/newpage'
const columns = [{
                  title: '标题',
                  dataIndex: 'title',
                  }, {
                  title: '类型',
                  dataIndex: 'type',
                  }, {
                  title: '紧急程度',
                  dataIndex: 'level',
                  },{
                  title: '状态',
                  dataIndex: 'status',
                  },{
                  title: '创建时间',
                  dataIndex: 'created_at',
                  },{
                  title: '创建人',
                  dataIndex: 'user_info.user_name',
                  },{
                  title: '所属企业',
                  dataIndex: 'enterprise_info.simple_name',
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
    	type:0,
    	cardTitle:'',
    	status:'',
     visibleAdd:false,	
     visible_list:false,
     visibleHF:false,
     visibleStar:false,
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
      objAdd:{
      	
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
      adviceFileQobj:{
      	
      },
      chatInfo:[],
      huifu:{
      	
      },
      objStar:{

      },
      state: 0
    }
  },
  mounted() {
    this.schemeList()
    this.getFenpeiList()
    //this.statusCss()
  },
  methods: {
  	star(record){
  		this.objStar.feedbackId = record.id
  		console.log(record)
  		console.log(this.objStar.feedbackId)
  		this.visibleStar = true
  	},
  	handleOk_Star(){
  	
  		adviceStarQ(this.objStar).then(res => {
	        console.log(res)
	        if(res.msg == "success"){
	        	alert("操作成功")
	        	this.visibleStar = false

	        }else{
	        	alert(res.msg)
	        }  
	      })
  	},
  	huifuClick(e,record){
  		console.log(e,record)
  		var obj = {
  			feedbackId:e,
  			content:this.huifu.content
  		}
  	   this.huifu = obj
  		this.visibleHF = true	
  		 
  	},
  	handleOk_HF(){
  		adviceFan(this.huifu).then(res => {
	        console.log(res)
	        if(res.msg == "success"){
	        	alert("操作成功")
	        	this.visibleHF = false
	        	this.visible_look = false
	        }else{
	        	alert(res.msg)
	        }  
	      })
  	},
  	statusCss(){
  		//var status = '关闭'
  		//预加载样式
    	/*console.log(status)
		var sa = $('.statusLi_1')
		var sb = $('.statusLi_2')
		var sc = $('.statusLi_3')
		var sd = $('.statusLi_4')
		var se = $('.statusLi_5')
		
		if(status == "待处理"){
			sa.css('background','rgb(28, 239, 196)')
		}else if(status == "处理中"){
			sa.css('background','#18d8b1')
			sb.css('background','rgb(28, 239, 196)')
		}else if(status == "待评价"){
			sa.css('background','#18d8b1')
			sb.css('background','#18d8b1')
			sc.css('background','rgb(28, 239, 196)')
		}else if(status == "已评价"){
			sa.css('background','#18d8b1')
			sb.css('background','#18d8b1')
			sc.css('background','#18d8b1')
			sd.css('background','rgb(28, 239, 196)')
		}else if(status == "关闭"){			
			se.css('background','#c11616')
		}
		this.$forceUpdate()*/
  	},
  	showModal_Add() {
      this.visibleAdd = true
    },
    handleOk_Add(e) {
      console.log(e);
      this.visibleAdd = false
      adviceNewTimQ(this.objAdd).then(res => {
        console.log(res)
        if(res.msg == "success"){
        	alert("操作成功")
        	this.schemeList()
        }else{
        	alert(res.msg)
        }  
      })
    },
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
      adviceList(this.foo).then(res => {
        console.log(res)
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
			
		var obj ={
  			id : record.id
  		}
	      adviceFile(obj).then(res => {
	        console.log(res)
	        if(res.msg == "success"){
	        	
	        		var status = res.list.status
	        		 this.chatInfo =  res.list.chatInfo
	        		 var chatInfo = this.chatInfo
	        		 for(var i = 0; i < chatInfo.length; i++) {
	        		 	this.type = chatInfo[i].type
   						//console.log(chatInfo[i].type)
   						console.log(this.type)
							/*if(chatInfo[i].type == 2){
								$(".liaotian").css('padding-left','30px')
								$(".liaotian").css('color','#0d6ace')
							}else if(chatInfo[i].type == 1){
								$(".liaotian").css('padding-left','0px')
								$(".liaotian").css('color','#000')
							}*/
					} 
						
	        		 
			       // console.log(status)
			        this.status = status
			        console.log(this.status)
			        
			        /*if (status === "待处理") {
			        	this.state = 0
			        } else if(status === "处理中"){
			        	this.state = 1
			        } else if(status === "已解决"){
			        	this.state = 2
			        } else if(status === "已评价"){
			        	this.state = 3
			        } else (status === "关闭"){
			        	this.state = 4
			        }*/
			        
			        
//						var sa = $('.statusLi_1')
//						var sb = $('.statusLi_2')
//						var sc = $('.statusLi_3')
//						var sd = $('.statusLi_4')
//						var se = $('.statusLi_5')
//					console.log(sa)
//						if(this.status == "待处理"){
//				
//							console.log('1')
//							sa.css('background','rgb(28, 239, 196)')
//							sb.css('background','#94bbb3')
//							sc.css('background','#94bbb3')
//							sd.css('background','#94bbb3')
//							se.css('background','#94bbb3')
//						}
//						if(this.status == "处理中"){
//							sa.css('background','#18d8b1')
//							sb.css('background','rgb(28, 239, 196)')
//							sc.css('background','#94bbb3')
//							sd.css('background','#94bbb3')
//							se.css('background','#94bbb3')
//						}
//						if(this.status == "已解决"){
//							sa.css('background','#18d8b1')
//							sb.css('background','#18d8b1')
//							sc.css('background','rgb(28, 239, 196)')
//							sd.css('background','#94bbb3')
//							se.css('background','#94bbb3')
//						}
//						if(this.status == "已评价"){
//							sa.css('background','#18d8b1')
//							sb.css('background','#18d8b1')
//							sc.css('background','#18d8b1')
//							sd.css('background','rgb(28, 239, 196)')
//							se.css('background','#94bbb3')
//						}
//						if(this.status == "关闭"){
//							sa.css('background','#94bbb3')
//							sb.css('background','#94bbb3')
//							sc.css('background','#94bbb3')
//							sd.css('background','#94bbb3')
//							se.css('background','#c11616')
//						}
	        	this.visible_look = true
	        	
	        }
	        if(res.msg !== "success"){
	        	alert(res.msg)	
	        }
	        this.adviceFileQobj = res.list
	        console.log(this.adviceFileQobj)
	        if (this.adviceFileQobj.evaluate_info.isExpect == 2) {
	        	this.cardTitle = '已实现'
	        } else if(this.adviceFileQobj.evaluate_info.isExpect == 1){
	        	this.cardTitle = '未实现'
	        }else{
	        	this.cardTitle = ''
	        }
	        
	      })
		
	
    	
		this.$forceUpdate()
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
     var obj = {
     	id:record.id,
     	status:"2"
     }
     console.log(obj)
     adviceKo(obj).then(res => {
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
.dxTitle2 {
  display: inline-block;
  width: 80px;
  float: left;
  height: 26px;
  line-height: 26px;
}
.statusLi{
	
	width: 1000px;
	margin: 0 auto;
	height: 50px;
	background: #94bbb3;
	color: #FFFFFF;
}
.statusLi ul{
	list-style: none;
	float: left;
	padding-inline-start: 0px;
}
.statusLi ul li{
	list-style: none;
	float: left;
	width: 200px;
	line-height: 50px;
	text-align: center;
}
.aaa{
	background: #94bbb3;
}
.bbb{
	background: #18d8b1;
}
.ccc{
	background: rgb(28, 239, 196);
}
.ddd{
	background: #c11616;
}
.typeA{
	/*color: #096dd9 !important;*/
	background:rgba(24, 144, 255, 0.2)
}
.typeB{
	color:#096dd9 !important;
}
.ant-list-split .ant-list-item{
	border: none;
}
.ant-card-bordered{
	border:none;
}
</style>