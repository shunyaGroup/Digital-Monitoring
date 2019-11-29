<template>
<div id="components-layout-demo-basic">
    <a-layout class="listDiv">
      <a-layout-header>
      <!--<a-row>
        <a-button type="primary" style ="margin-left: 26px;margin-right: 50px;" @click='godataClean'>数据清洗</a-button>
        <a-button style="background: #ddd;" @click='goitemAdd'>添加方案</a-button>
      </a-row>-->
        <a-row>
          <span class="dxTitle">方案类别</span>
          <a-radio-group @change="onChange" v-model="foo.category">
          	<a-radio value="">全部</a-radio>
            <a-radio value="1">监测</a-radio>

            <a-radio value="3">回溯</a-radio>

          </a-radio-group>
          
          	  
	          <span class="dxTitle" style="margin-left: 100px;">状态</span>
	          <a-radio-group @change="onChange" v-model="foo.status">
	          	<a-radio value="">全部</a-radio>
	            <a-radio value="0">未监测</a-radio>
	            <a-radio value="1">监测中</a-radio>
	            <a-radio value="2">关闭</a-radio>
	       
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
       <a class="daochu" @click="daochu" style="font-weight: bold;color: #ffffff;background: #0080FF;border-radius: 2px; padding: 1px 5px;margin-bottom:20px;margin-left: 20px;" >一键导出</a>
      		<!--<a class="daochu" href="requre('http://39.97.241.172/%E6%96%B9%E6%A1%88%E5%88%97%E8%A1%A8.xlsx')" download="%E6%96%B9%E6%A1%88%E5%88%97%E8%A1%A8" target="_blank" style="font-weight: bold;color: #ffffff;background: #0080FF;border-radius: 2px; padding: 1px 5px;margin-bottom:20px" >一键导出</a>-->
        </div>
        <a-table :columns="columns" :dataSource="data" :pagination="pagination" @change="handleTableChange"  rowKey="id" key="index">
           <!-- <template slot="action" slot-scope="text">-->
              <!-- <a @click="" style="margin-right:10px">删除</a> -->
             <!--  <a @click="changeMsg(record)" style="margin-right:10px">设置</a>
             <a-popconfirm title="确定修改状态?" @confirm="() => onDelete(record.id)" style="margin-right:10px">
               <a href="javascript:;">显示中</a>
             </a-popconfirm>
             <a @click="">健康度刷新</a> -->
            <!--</template>-->

            <span slot="action" slot-scope="text, record">
            <!--  <a href="javascript:;" @click="bing(record)"></a>-->
              <a-popconfirm
                title="确定关闭吗?"
                @confirm="() => handleDelete(record)"
              >
                <a class="delBtn" v-if="record.status == '1'"> <a-icon type="slack"/>关闭</a>
              </a-popconfirm>
              
              
              <a-popconfirm
                title="确定删除吗?"
                @confirm="() => handleRealDel(record)"
                style="margin-left: 0px;"
              >
                <a class="delBtn" v-if="record.status == '2'"><a-icon type="delete" />删除</a>
              </a-popconfirm>
              
              <a  @click="rfjiance(record)" v-if="record.status == '0'" style="margin-left: 0px;"><a-icon type="redo" />重新监测</a>
              
              <a class="edit" @click="edit(record)" v-if="record.status == '1' && record.category !== '回溯'" style="margin-left: 15px;"><a-icon type="edit" />修改</a>
              <!--<a class="lookBtn" @click="lookfile(record)" style="margin-left: 15px;"><a-icon type="question-circle" />查看详情</a>-->
            </span>

            
            
            
        </a-table>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
<!--    <a-modal
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
      title="请点击右下角一键复制"
      v-model="visible_look"
      @ok="jsTest1"
      okText="一键复制"
    >
	<textarea  name="test1" rows="20" cols="72" id="test1" readonly="readonly" style="border: none;">{{opop}}</textarea>

    </a-modal>-->
    
    
    				  <div>
    
			    <a-modal
			      title="添加方案类型"
			      v-model="visible"
			      @ok="handleOk"
			    >
			    	<!--<a-row>
			        	<span class="dxTitle" style="margin-top: 5px;color:red">*企业选择</span>
			        <a-form :form="fooPOP">
			        <a-form-item
			            :label-col="formItemLayout.labelCol"
			            :wrapper-col="formItemLayout.wrapperCol"
			          
			          >
			            <a-select v-model="fooPOP.enterprise_id" @change="onChange2">
			              <a-select-option
			                v-for="(datali,index) in datalist"
			                :value="datali.id"
			                :key="index"
			              >{{datali.name}}</a-select-option>
			            </a-select>
			          </a-form-item>
			      </a-form>
			      
			       </a-row>-->
			      <a-row>
			          <span class="dxTitle" style="color:red">*方案类别</span>
			          <a-radio-group @change="getList" v-model="fooPOP.category">
			            <a-radio value="1">监测</a-radio>
			          
			            <a-radio value="3">回溯</a-radio>
			       
			          </a-radio-group>
			      </a-row>
			        <a-row style="margin-top:20px">
			          <span class="dxTitle" style="color:red">*方案标签</span>
			          <a-col :span="15">
			            <a-input placeholder="请输入方案标签名称" v-model="fooPOP.name" />
			          </a-col>
			        </a-row>
			    </a-modal>
			  </div>
			
			
	        <a-form :form="form" class="editDiv">
	        	<!--<a-form-item
	            :label-col="formItemLayout.labelCol"
	            :wrapper-col="formItemLayout.wrapperCol"
	            label="企业选择"
	          >
	            <a-select v-model="form3.enterprise_id" @change="onChange2">
	              <a-select-option
	                v-for="(datali,index) in datalist"
	                :value="datali.id"
	                :key="index"
	              >{{datali.name}}</a-select-option>
	            </a-select>
	            <span class="dxMo">*请先选择企业后再进行其他操作</span>
	          </a-form-item>-->
	          <a-form-item
	            :label-col="formItemLayout.labelCol"
	            :wrapper-col="formItemLayout.wrapperCol"
	            label="方案类别"
	            required="required"
	          >
	            <a-select v-model="form3.category" @change="getListC">
	              <a-select-option value="1">监测</a-select-option>
	       
	              <a-select-option value="3">回溯</a-select-option>
	
	            </a-select>
	          </a-form-item>
	          
			
	          <a-form-item
	            :label-col="formItemLayout.labelCol"
	            :wrapper-col="formItemLayout.wrapperCol"
	            label="方案标签"
	            required="required"
	          >
	            <a-select v-model="form3.type_id" @change="onChange2">
	              <a-select-option
	                v-for="(item,index) in items"
	                :value="item.id"
	                :key="index"
	              >{{item.name}}</a-select-option>
	            </a-select>
	           <a-button type="primary" @click="showModal" style="padding: 0;width: 25px;height: 25px;border-radius: 20px;line-height: 22px;">＋
			   </a-button>
	          </a-form-item>
	
	          <a-form-item
	            :label-col="formItemLayout.labelCol"
	            :wrapper-col="formItemLayout.wrapperCol"
	            label="方案名称"
	            required="required"
	          >
	            <a-input placeholder="请填写方案名称" v-model="form3.name" />
	          </a-form-item>
					
	          <a-form-item
	            :label-col="formItemLayout.labelCol"
	            :wrapper-col="formItemLayout.wrapperCol"
	            label="监测词组"
	            required="required"
	          ></a-form-item>
	
	          <a-form-item
	            v-for="(items,index) in form3.wordsList"
	            :key="index"
	            :label-col="{span: 2}"
	            :wrapper-col="{span: 22}"
	            :label='"监测词组"+ (index+1)'
	          >
	            <a-input style="width:20%" placeholder="请输入检测对象" v-model="items.name" />
	            <span v-for="(item,ind) in items.list" :key="ind" class="keyWordlist">
	              +
	              <a-input style="width:20%" placeholder="关联词" v-model="item.keyWord" />
	              <span class="readuceKey" @click="readuceKey(index,ind)" title="删除该关联词">x</span>
	            </span>
	            <span v-if="(items.list !== 'undefiend') && (items.list.length)<3" style="margin-left:10px">
	              <a-button type="primary" icon="plus" @click="addKeyWord(index)">添加关联词</a-button>
	            </span>
	            <span style="margin-left:10px">
	              <a-button type="primary" icon="minus" @click="deleteKeyWord(index)">删除监测词</a-button>
	            </span>
	          </a-form-item>
	
	          <a-form-item
	            :label-col="formItemLayout.labelCol"
	            :wrapper-col="formItemLayout.wrapperCol"
	          >
	            <a-button icon="plus" @click="addWordsList">添加组合</a-button>
	          </a-form-item>
	          
	          
	           <template v-for="(tag, index) in tags">
			      <a-tooltip  :key="tag" :title="tag">
			        <a-tag :key="tag" :closable="true" :afterClose="() => handleCloseC(tag)" style="background: #fff; borderStyle: dashed;padding: 0 30px;
				    text-align: center;
				    font-size: 18px;
				    color: #096dd9;
				    height: 36px;
				    line-height: 36px;
				    margin-bottom: 30px;">
			          {{tag}}
			        </a-tag>
			      </a-tooltip>
			    </template>
          		<a-input
			      v-if="inputVisible"
			      ref="input"
			      type="text"
			      size="small"
			      :style="{ width: '280px' }"
			      :value="inputValue"
			      @change="handleInputChangeC"
			      @blur="handleInputConfirmC"
			      @keyup.enter="handleInputConfirmC"
			      style="background: #fff; borderStyle: dashed;padding: 0 30px;
				    text-align: center;
				    font-size: 18px;
				    color: #096dd9;
				    height: 36px;
				    line-height: 36px;
				    margin-bottom: 30px;"
			    />
			    <a-tag v-else @click="showInputC" 
					style="background: #fff; borderStyle: dashed;padding: 0 30px;
				    text-align: center;
				    font-size: 18px;
				    color: #096dd9;
				    height: 36px;
				    line-height: 36px;
				    margin-bottom: 30px;">
			      <a-icon type="plus" /> 排除词
			    </a-tag>
	          <span class="dxMo">通过回车键或点击周围确认</span>
	          
	          <a-form-item
	            :label-col="formItemLayout.labelCol"
	            :wrapper-col="formItemLayout.wrapperCol"
	            label="描述"
	          >
	            <a-input placeholder="请输入描述内容" v-model="form3.description" name="description" />
	          </a-form-item>
	          <!--<a-form-item
	            :label-col="formItemLayout.labelCol"
	            :wrapper-col="formItemLayout.wrapperCol"
	            label="排除词"
	          >
	            <a-input placeholder="请输入排除词" v-model="form3.keywords_exclude" name="keywords_exclude3" />
	          </a-form-item>-->

	           <a-row style="margin-top:50px">
		          <a-button
		          	class="updataitem"
		            type="primary"
		            style="margin-left: 170px;margin-right: 150px;display: block;"
		            @click="updataList(3)"
		          >更新方案</a-button>
		          
		        </a-row>
	        </a-form>
	       
    
</div>

</template>
<script>

/*import '~@/styles/theme/variables.less';*/
import { schemeList,schemeDel,getFenpeiList,downloadExcel,itemEdit,itemWlist,schemetypeEdit,postActionJC,schemeRealDel,schemetypeSelectlist } from '@/api/newpage'
import imgUrl from '../../static/img/监测词组.png'
import $ from 'jquery'
const columns = [{
                  title: '创建时间',
                  dataIndex: 'add_time',
                  }, {
                  title: '方案名称',
                  dataIndex: 'name',
                  }, {
                  title: '操作者',
                  dataIndex: 'runner.user_name',
                  },{
                  title: '企业',
                  dataIndex: 'enterprise.simple_name',
                  },{
                  title: '标签',
                  dataIndex: 'scheme_type.name',
                  },{
                  title: '方案类别',
                  dataIndex: 'category',
                  },{
                  title: '方案状态',
                  dataIndex: 'statusFormat',
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
	 tags:[],
	 inputVisible: false,
	 inputValue: '',
     required:true,	
     items: [],	
     visible:false,	
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
        total:1,
        showTotal:() =>{}
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
      fooPOP:{
      	category:'1',
      },
      form3: {
      	category:'1',
        wordsList: [
          {
            name: '',
            list: [
              {
                keyWord: ''
              }
            ]
          }
        ]
      },
      jsonRecord:{
      	 keywords: [
          {
            name: '',
            list: [
              {
                keyWord: ''
              }
            ]
          }
        ]
      },
      push:{
        id:''
      },
      Wid:'',
      form:{
      	
      },
      editform:{
      	
      },
      jsonData:{
      	
      },
      editSave:{
      	
      }/*,
      goStatus:'',*/
    }
  },
  mounted() {
    this.schemeList()
    this.getFenpeiList()
    //this.goStatus = '1'
    localStorage.setItem('goStatus', '1')
    /*localStorage.setItem('editRecord','')*/
   this.getList()
   this.getListC()
  },
  methods: {
  	handleCloseC (removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag)
      console.log(tags)
      this.tags = tags
      console.log(tags)
    },
  	showInputC () {
      this.inputVisible = true
      this.$nextTick(function () {
        this.$refs.input.focus()
      })
      console.log(this.inputValue)
   },
    handleInputChangeC (e) {
    	
      this.inputValue = e.target.value
      console.log(this.inputValue)
    },
    handleInputConfirmC () {
      const inputValue = this.inputValue
      let tags = this.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      console.log(tags)
       console.log(this.tags)
       
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: '',
      })
      console.log(this.inputValue)
    },
  	deleteKeyWord(index) {
      this.form3.wordsList.splice(index, 1)
      this.$forceUpdate()
    },
    addWordsList() {
      this.form3.wordsList.push({
        name: '',
        list: [
          {
            keyWord: ''
          }
        ]
      })
      this.$forceUpdate()
    },
    addKeyWord(index) {
      this.form3.wordsList[index].list.push({
        keyWord: ''
      })
      this.$forceUpdate()
    },
    readuceKey(index, ind) {
      console.log(index, ind)
      this.form3.wordsList[index].list.splice(ind, 1)
      this.$forceUpdate()
    },
  	showModal() {
      this.visible = true
    },
  	getList() {
      schemetypeSelectlist(this.fooPOP).then(res => {
      	console.log(res)
        this.items = res.list
      })
    },
    getListC() {
      schemetypeSelectlist(this.form3).then(res => {
      	console.log(res)
        this.items = res.list
      })
    },
  	schemetypeEdit(){
  		schemetypeEdit(this.fooPOP).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('方案类型添加成功')
          this.getList()
      	  
        }else{
          this.$message.error(res.msg)
        }
      })
  	},
  	handleOk(e) {
      console.log(e);
      this.schemetypeEdit()
      this.$forceUpdate()
      this.visible = false
    },
  	daochu(){
    	this.downloadExcel()
    },
    downloadExcel() {
    	/*window.open('http://39.97.241.172/%E6%96%B9%E6%A1%88%E5%88%97%E8%A1%A8.xlsx')*/
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
      schemeList(this.foo).then(res => {
        console.log(res)
        this.data = res.list
        if (res.count) {
          this.pagination.total = res.count
          console.log(res.count)
        }
        this.pagination.showTotal = () => this.pagination.total
        var dL = this.data
        for(var i =0;i<dL.length;i++){
			/*console.log(dL[i])
			console.log(dL[i].status)
			console.log(dL[i].status)*/
	       /* if( dL[i].status == 1){
	        	dL[i].status = "监测中"	
	        }else{
	        	dL[i].status = "已删除"
	        }*/
	        
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
    edit(record){
    	console.log(record)
		
    /*  var name = record.name
      var keywords = record.keywords
      var keywords_exclude = record.keywords_exclude
      this.editSave = {
      		name:name,
      		keywords:keywords,
      		keywords_exclude:keywords_exclude
      }*/
      /*console.log(this.editSave)*/
      //console.log(this.goStatus)
      //this.goStatus = '2'
      //console.log(this.goStatus)
      /*
        localStorage.setItem('goStatus', '2')*/
       this.Wid = record.id
      var parm = {
      	id:this.Wid
      }
      console.log(parm)
      itemWlist(parm).then(res => {
      	
        this.jsonData = JSON.stringify(res.list);// 转成JSON格式
		//var jsonRecord = $.parseJSON(jsonData);// 转成JSON对象
      /*localStorage.setItem('editRecord',this.jsonData)*/
      	console.log(this.jsonData)
 		console.log( typeof this.jsonData)
 		
 		var jsonRecord = $.parseJSON(this.jsonData);// 转成JSON对象
			    
			    this.jsonRecord = jsonRecord
			    
		

			    this.form3 = jsonRecord
			    this.form3.wordsList = jsonRecord.keywords
			    console.log(jsonRecord.keywords_exclude)
			    
			    /*this.form3.keywords_exclude =JSON.stringify(this.tags)
				console.log(this.form3.keywords_exclude)*/
			  
			    //var a = jsonRecord.keywords_exclude
			    //console.log(a)
			    //var  b =  eval("("+ a + ")");
			    
			    //this.form3.keywords_exclude = JSON.stringify(jsonRecord.keywords_exclude)
			    
			    //console.log(b)
			    this.tags = jsonRecord.keywords_exclude
			    console.log(this.tags )
			    if(jsonRecord.category == "1"){
			    	this.form3.category = "监测"
			    }else if (jsonRecord.category == "3"){
			    	this.form3.category = "回溯"
			    }
 		
 		/*this.visible_list = true*/
      })
     /* [{
      	"name":"对象是否为空",
      	"list":[{
      		"keyWord":""}]
      }]*/
      
      
      
      $('.listDiv').hide();
      $('.editDiv').show();
    
      /*
      
 		this.$router.push({ path: "/dataC/itemAdd"})*/	
 		
    },
    postedit(record){
    	console.log(record)
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
    onChange2(e) {
    	console.log(e)
      //console.log('radio checked', e.target.value)
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
        if(res.msg == "success"){
        	alert("操作成功")
        }else{
        	alert(res.msg)
        }
       this.schemeList()   
      })
    },
    handleRealDel(record) {
    	var parm = {
    		id:record.id
    	}
     schemeRealDel(parm).then(res => {
        console.log(res)
        if(res.msg == "success"){
        	alert("操作成功")
        }else{
        	alert(res.msg)
        }
        
        this.schemeList()
      })
    },
    rfjiance(record){
    	var parm = {
    		id:record.id
    	}
     postActionJC(parm).then(res => {
        console.log(res)
        if(res.msg == "success"){
        	alert("操作成功")
        }else{
        	alert(res.msg)
        }
        this.schemeList()
      })
    },
    updataList(index) {
      let obj = {}
      if (index == 2) {
        if (!this.form2.category) {
          this.$message.warning('请选择方案类别')
          return
        }
        if (!this.form2.enterprise_id) {
          this.$message.warning('请选择企业')
          return
        }
        if (!this.form2.type_id) {
          this.$message.warning('请选择方案标签')
          return
        }
        if (!this.form2.description) {
          this.$message.warning('请输入描述')
          return
        }
        if (!this.form2.name) {
          this.$message.warning('请输入方案名称')
          return
        }

        if (this.resultList.length == 0) {
          this.$message.warning('请先生成预览')
          return
        } else {
          this.form2.keywords = JSON.stringify(this.resultList)
        }

        if (this.resultList.length == 0) {
          this.$message.warning('请先生成预览')
          return
        } /*else {
          var keywords_exclude2 = $.trim($('input[name=keywords_exclude2]').val()) //  排除词
          if(keywords_exclude2 == '' ||  null ||  undefined){
               this.form2.keywords_exclude === null
          }else{
              var keywords_exclude2 = keywords_exclude2.replace(new RegExp('\\s|，|、', 'g'), ',') //使用英文,替代中文，;
              var keywords_exclude2 = keywords_exclude2.split(',')
              this.form2.keywords_exclude = keywords_exclude2
              this.form2.keywords_exclude = JSON.stringify(this.resultList)
          }
        }*/
       
        if(keywords_exclude2 == '' ||  null ||  undefined){
               this.form2.keywords_exclude === null
          }else{
         var keywords_exclude2 = $.trim($('input[name=keywords_exclude2]').val()) //  排除词
          var keywords_exclude2 = keywords_exclude2.replace(new RegExp('\\s|，|、', 'g'), ',') //使用英文,替代中文，;
          var keywords_exclude2 = keywords_exclude2.split(',')
          
          this.form2.keywords_exclude = JSON.stringify(keywords_exclude2)
					}

        obj = this.form2

      } else if (index == 3) {
          var keywords_exclude3 = $.trim($('input[name=keywords_exclude3]').val()) //  排除词

         /*if(keywords_exclude3 == '' ||  null ||  undefined){
               this.foo.keywords_exclude3 === null
          }else{
            var keywords_exclude3 = keywords_exclude3.replace(new RegExp('\\s|，|、', 'g'), ',') //使用英文,替代中文，;
            var keywords_exclude3 = keywords_exclude3.split(',')
            this.form3.keywords_exclude = JSON.stringify(keywords_exclude3)
            console.log(typeof  this.form3.keywords_exclude)
          }*/
         this.form3.keywords_exclude = JSON.stringify(this.tags)
			    
			     console.log(this.form3.keywords_exclude)

        let arr = []
        console.log(this.form3.wordsList)
        
        for (let index = 0; index < this.form3.wordsList.length; index++) {
          let stringArr = []
          if (this.form3.wordsList[index].list.length === 0) {
          	stringArr.push(this.form3.wordsList[index].name)
          } else{
          	for (let j = 0; j < this.form3.wordsList[index].list.length; j++) {
          	
          		console.log(this.form3.wordsList[index].list[j].keyWord)
          		if (this.form3.wordsList[index].list[j].keyWord.length == 0) {
		         // this.$message.warning('请输入关联词')
		          this.form3.wordsList[index].list[j].keyWord== ""
		         // return
		         console.log(this.form3.wordsList[index].list[j].keyWord)
		        }
          		console.log(this.form3.wordsList[index].list[j].keyWord)
            stringArr.push(this.form3.wordsList[index].name + '+' + this.form3.wordsList[index].list[j].keyWord)
	            
          	}
          }
          console.log(stringArr)
          arr.push(stringArr)
        }
        
        console.log(arr)
        let result = []
        for (let i = 0; i < arr.length; i++) {
          result = result.concat(arr[i])
          console.log(result)
        }
        this.form3.keywords = JSON.stringify(result)
        console.log(this.form3.keywords)
        if(this.form3.category == "监测"){
			    	this.form3.category = "1"
			    }else if (this.form3.category == "回溯"){
			    	this.form3.category = "3"
			    }
        obj = this.form3
      }
			

      itemEdit(obj).then(res => {
        console.log(res)
        if(res.msg == "success"){
        	alert("操作成功")
        }else{
        	alert(res.msg)
        }
        $('.editDiv').hide();
        $('.listDiv').show();
        
       /* if (res.code == 200) {
          alert('监测方案已更新')
          $('.actionCss1').show();
          this.jcidobj.id = res.list.id
        }else{
          this.$message.error(res.msg)
        }*/
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
    /*height: 46px;*/
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
.actionCss1{
  display: none;
}
.content {
  box-sizing: border-box;
  max-width: 520px;
  padding: 15px 15px 5px;
  font-size: 12px;
  background: #fff5ee;
  border: 1px solid #ff8121;
}
.result {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  padding: 0px 30px 0px 10px;
  margin-right: 20px;
  color: #064593;
  background: #ebf0f7;
  border: 1px solid #064593;
  border-radius: 1px;
  margin-bottom: 8px;
}
.keyWordlist {
  position: relative;
}
.readuceKey {
  position: absolute;
  right: 10px;
  color: red;
  cursor: pointer;
  font-size: 16px;
}
.closeBtn {
  position: absolute;
  top: -10px;
  right: 6px;
  color: #e52e45;
  font-size: 12px;
  cursor: pointer;
  display: block;
}
.ant-tag:nth-child(1) {
  display: none;
}
/*.dxTitle {
  display: inline-block;
  width: 80px;
  float: left;
  height: 26px;
  line-height: 26px;
}*/
.dxMo {
  color: red;
  line-height: 26px;
  margin-left: 5px;
}
.jianceArr_img {
  width: 520px;
  margin-left: 100px;
}
.editDiv{
	display: none;
}
.listDiv{
	display: block;
}
</style>