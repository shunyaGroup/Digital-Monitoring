<template>
  <a-card :bordered="false" title="新建监测方案">
  <div>
    
    <a-modal
      title="添加方案类型"
      v-model="visible"
      @ok="handleOk"
    >
    <!--	<a-row>
        	<span class="dxTitle" style="margin-top: 5px;color:red">*企业选择</span>
        <a-form :form="fooPOP">
        <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          
          >
            <a-select v-model="fooPOP.enterprise_id" @change="onChange">
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
            <!--<a-radio value="2">订阅</a-radio>-->
            <a-radio value="3">回溯</a-radio>
            <!--<a-radio value="4">海外</a-radio>-->
          </a-radio-group>
      </a-row>

        <a-row style="margin-top:20px">
          <span class="dxTitle" style="color:red">*方案标签</span>
          <a-col :span="15">
            <a-input placeholder="请输入方案标签名称" v-model="fooPOP.name" />
          </a-col>
        </a-row>
    </a-modal>
 
		     <a-modal
		      title="删除方案类型"
		      v-model="visible_Del"
		      @ok="handleOk"
		      :footer="null"
		    >
		      <a-row>
		          <span class="dxTitle" style="color:red">*方案类别</span>
		          <a-radio-group @change="getList_Del" v-model="fooPOP_Del.category">
		            <a-radio value="1">监测</a-radio>
		            <!--<a-radio value="2">订阅</a-radio>-->
		            <a-radio value="3">回溯</a-radio>
		            <!--<a-radio value="4">海外</a-radio>-->
		          </a-radio-group>
		      </a-row>
		        <template v-for="(tag, index) in items_Del">
				    <!--  <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
				        <a-tag :key="tag.id" :closable="index !== 0" :afterClose="() => handleCloseM(tag)">
				          {{tag.name}}
				        </a-tag>
				      </a-tooltip>-->
				      <a-tag  :key="tag.id" :closable="true" :afterClose="() => handleCloseM(tag)">
				        {{tag.name}}
				      </a-tag>
				    </template>
		    </a-modal>
 
  </div>
    <a-tabs defaultActiveKey="1" @change="callback">
<!--      <a-tab-pane tab="快捷模式" key="1">-->
<!--      	<a-row>
        	<span class="dxTitle" style="margin-top: 5px;color: red;">*企业选择</span>
        <a-form :form="foo">
        <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          
          >
            <a-select v-model="foo.enterprise_id" @change="onChange">
              <a-select-option
                v-for="(datali,index) in datalist"
                :value="datali.id"
                :key="index"
              >{{datali.name}}</a-select-option>
            </a-select>
            <span class="dxMo">*请先选择企业后再进行其他操作</span>
          </a-form-item>
          
        </a-form>
        
        </a-row>-->
      <!--  <a-row>
          <span class="dxTitle" style="color:red">*方案类别</span>
          <a-radio-group @change="getListA" v-model="foo.category">
            <a-radio value="1">监测</a-radio>
            <a-radio value="2">订阅</a-radio>
            <a-radio value="3">回溯</a-radio>
            <a-radio value="4">海外</a-radio>
          </a-radio-group>
        </a-row>-->
        
        <!--<a-row>
          <span class="dxTitle">企业选择</span>
          <a-radio-group @change="onChange" v-model="foo.enterprise_id">
            <a-radio
              :value="datali.id"
              v-for="(datali,index) in datalist"
              :key="index"
            >{{datali.name}}</a-radio>
          </a-radio-group>
        </a-row>-->
        
      <!--  <a-row style="margin-top:0px">-->
        	<!--<a-button type="primary" @click="showModal">点击此处 • 添加方案类型</a-button>-->
<!--        </a-row>
        <a-row style="margin-top:15px">
          <span class="dxTitle" style="color:red">*方案标签</span>
          
          <a-radio-group @change="onChange" v-model="foo.type_id">
            <a-radio :value="item.id" v-for="(item,index) in items" :key="index">{{item.name}}</a-radio>
          </a-radio-group>
          <a-button type="primary" @click="showModal" style="
          	padding: 0;
				    width: 25px;
				    height: 25px;
				    border-radius: 20px;
				    line-height: 22px;">＋
				  </a-button>
        </a-row>
        <a-row style="margin-top:20px">
          <span class="dxTitle" style="color:red">*方案名称</span>
          <a-col :span="15">
            <a-input placeholder="请输入方案名称" v-model="foo.name" />
          </a-col>
        </a-row>
        <a-row style="margin-top:20px">
          <span class="dxTitle" style="color:red">*监测词</span>
          <a-col :span="15">
            <a-input name="keywords_simple" placeholder="请输入监测对象" v-model="foo.keywords" />
          </a-col>
          <span class="dxMo">监测词之间用逗号或顿号隔开</span>
        </a-row>
        <a-row style="margin-top:20px">
          <span class="dxTitle">排除词</span>
          <a-col :span="15">
            <a-input
              name="keywords_exclude_simple"
              placeholder="请输入排除词"
              v-model="foo.keywords_exclude"
            />
          </a-col>
          <span class="dxMo">排除词之间用逗号或顿号隔开</span>
        </a-row>
        <a-row style="margin-top:20px">
          <span class="dxTitle">描述</span>
          <a-col :span="15">
            <a-input
              placeholder="请输入描述"
              v-model="foo.description"
            />
          </a-col>
        </a-row>
        <a-row style="margin-top:20px">
          <a-button
            type="primary"
            style="margin-left: 170px;margin-right: 150px;"
            @click="saveUp"
          >保存方案</a-button>
          <a-button class="actionCss1" style="background: #ddd;" @click="actionJC">开始监测</a-button>
        </a-row>
      </a-tab-pane>-->
      <a-tab-pane tab="普通模式" key="2" forceRender>
        <a-form :form="form">
        	<!--<a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="企业选择"
          >
            <a-select v-model="form2.enterprise_id" @change="onChange">
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
            <a-select v-model="form2.category" @change="getListB">
              <a-select-option value="1">监测</a-select-option>
              <!--<a-select-option value="2">订阅</a-select-option>-->
              <a-select-option value="3">回溯</a-select-option>
              <!--<a-select-option value="4">海外</a-select-option>-->
            </a-select>
   
          </a-form-item>

				<a-row v-if="form2.category =='3'">
      	   <a-form-item label="时间" :labelCol="{span: 2}" :wrapperCol="{span: 20}" required="required">
            <a-range-picker
              format="YYYY-MM-DD HH:mm:ss"  
              @change="changeDate"
              
            />
          </a-form-item>
      </a-row>

          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="方案标签"
            required="required"
          >
            <a-select  v-model="form2.type_id" @change="onChange">
              <a-select-option
                v-for="(item,index) in items"
                :value="item.id"
                :key="index"
              >{{item.name}}</a-select-option>
	             
            </a-select>
            <a-button type="primary" @click="showModal" style="
	          	padding: 0;
					    width: 25px;
					    height: 25px;
					    border-radius: 20px;
					    line-height: 22px;">＋
					  </a-button>
					  <a-button type="primary" @click="showModal_Del" style="
	          	padding: 0;
					    width: 25px;
					    height: 25px;
					    border-radius: 20px;
					    margin-left: 20px;
					    line-height: 22px;">－
					  </a-button>
          </a-form-item>
					
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="方案名称"
          >
            <a-input 
            	v-decorator="[
			          '方案名称',
			          {rules: [{ required: true, message: '请填写方案名称' }]}
			        ]"
             v-model="form2.name" />
            
          </a-form-item>

          <a-row style="margin-top:20px">
            <p>监测词组(下图为示例)</p>
            <img class="jianceArr_img" :src="imgUrl" alt />
          </a-row>

          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="监测词"
          >
            <a-input name="keywords_one" v-model="form2.dWord" placeholder="监测词之间用逗号或顿号隔开" 
            	v-decorator="[
			          '监测词',
			          {rules: [{ required: true, message: '请输入监测对象' }]}
			        ]"
            	/>
            <span class="dxMo">监测词仅限本企车型或品牌相关信息</span>
          </a-form-item>
          
          
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="关联词"
          >
            <a-input name="keywords_one" v-model="form2.aWord" placeholder="关联词之间用逗号或顿号隔开"/>
          <!--<span class="dxMo">关联词之间用逗号或顿号隔开</span>-->
          </a-form-item>

          <a-form-item>
            <a-button type="primary" ghost @click="check">点击生成预览</a-button>
          </a-form-item>

          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="生成预览"
          >
            <div v-if="resultList.length > 0" class="content">
              <div class="result" v-for="(item,index) in resultList" :key="index">
                <div class="closeBtn" @click="closeResult(index)">X</div>
                {{item}}
              </div>
            </div>
          </a-form-item>
          
      <!--    <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="排除词"
          >
            <a-input placeholder="请输入排除词" v-model="form2.keywords_exclude" name="keywords_exclude2" />
          </a-form-item>-->
          
          
          
          
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
            <a-input placeholder="请输入描述内容" v-model="form2.description" name="description" />
          </a-form-item>
          
        </a-form>
        <a-row style="margin-top:50px">
          <a-button
            type="primary"
            style="margin-left: 170px;margin-right: 150px;"
            @click="addScheme(2)"
          >保存方案</a-button>
          <a-button  class="actionCss1" style="background: #ddd;" @click="actionJC2">开始监测</a-button>
        </a-row>
      </a-tab-pane>
      
      <a-tab-pane tab="精确模式" key="3">
        <a-form :form="form">
        	<!--<a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="企业选择"
          >
            <a-select v-model="form3.enterprise_id" @change="onChange">
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
              <!--<a-select-option value="2">订阅</a-select-option>-->
              <a-select-option value="3">回溯</a-select-option>
             <!-- <a-select-option value="4">海外</a-select-option>-->
            </a-select>
          </a-form-item>
          
          
          <a-row v-if="form3.category =='3'">
      	   <a-form-item label="时间" :labelCol="{span: 2}" :wrapperCol="{span: 20}" required="required">
            <a-range-picker
              format="YYYY-MM-DD HH:mm:ss"  
              @change="changeDateJQ"
              
            />
          </a-form-item>
      	</a-row>

          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="方案标签"
            required="required"
          >
            <a-select v-model="form3.type_id" @change="onChange">
            	
              <a-select-option
                v-for="(item,index) in itemsC"
                :value="item.id"
                :key="index"
              >{{item.name}}</a-select-option>
            </a-select>
            <a-button type="primary" @click="showModal" style="
	          	padding: 0;
					    width: 25px;
					    height: 25px;
					    border-radius: 20px;
					    line-height: 22px;">＋
					  </a-button>
					  <a-button type="primary" @click="showModal_Del" style="
	          	padding: 0;
					    width: 25px;
					    height: 25px;
					    border-radius: 20px;
					    margin-left: 20px;
					    line-height: 22px;">－
					  </a-button>
          </a-form-item>

          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="方案名称_"
          >
            <a-input v-decorator="[
			          '方案名称_',
			          {rules: [{ required: true, message: '请填写方案名称' }]}
			        ]" placeholder="请填写方案名称" v-model="form3.name" />
          </a-form-item>

          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="监测词组"
            required="required"
          ></a-form-item>
						
					<a-row style="color:red;padding-left: 30px;
    padding-bottom: 30px;">
						监测对象仅限本企车型或品牌相关信息
					</a-row>
          <a-form-item
            v-for="(items,index) in form3.wordsList"
            :key="index"
            :label-col="{span: 2}"
            :wrapper-col="{span: 22}"
            :label='"监测词组"+ (index+1)'
          >
            <a-input style="width:20%" placeholder="请输入监测对象" v-model="items.name" />
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
          
          
          
           <template v-for="(tag, index) in tagsD">
			      <a-tooltip  :key="tag" :title="tag">
			        <a-tag :key="tag" :closable="true" :afterClose="() => handleCloseD(tag)" style="background: #fff; borderStyle: dashed;padding: 0 30px;
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
			      v-if="inputVisibleD"
			      ref="input"
			      type="text"
			      size="small"
			      :style="{ width: '280px' }"
			      :value="inputValueD"
			      @change="handleInputChangeD"
			      @blur="handleInputConfirmD"
			      @keyup.enter="handleInputConfirmD"
			      style="background: #fff; borderStyle: dashed;padding: 0 30px;
				    text-align: center;
				    font-size: 18px;
				    color: #096dd9;
				    height: 36px;
				    line-height: 36px;
				    margin-bottom: 30px;"
			    />
			    <a-tag v-else @click="showInputD" 
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
         <!-- <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="排除词"
          >
            <a-input placeholder="请输入排除词" v-model="form3.keywords_exclude" name="keywords_exclude3" />
          </a-form-item>-->
          
          
          
          
          
          
        </a-form>
        <a-row style="margin-top:50px">
          <a-button
            type="primary"
            style="margin-left: 170px;margin-right: 150px;"
            @click="addScheme(3)"
          >保存方案</a-button>
          <a-button class="actionCss1" style="background: #ddd;" @click="actionJC3">开始监测</a-button>
        </a-row>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script>
// import { getLQ, postAddA, getSelectlist, postActionJC } from '@/api/newpage'
import { getLQ, getFenpeiList, addScheme,postActionJC,schemetypeEdit,schemetypeSelectlist,jiluJifen} from '@/api/newpage'
import imgUrl from '../../static/img/监测词组.png'
 import $ from 'jquery'
 import moment from 'moment'
export default {
  data() {
    return {
    	tags:[],
    	inputVisible: false,
    	tagsD:[],
    	inputVisibleD: false,
      inputValue: '',
      inputValueD: '',
    	required:true,	
    	visible_Del:false,
    	visible:false,
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 }
      },
      form2: {
      	begin_time: '',
      	end_time: '',
        keywords_exclude:'',
        category:'1'
      },
      form3: {
      	begin_time: '',
      	end_time: '',
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
      imgUrl: imgUrl,
      items: [],
      itemsC:[],
      items_Del:[],
      fooPOP:{
      },
      fooPOP_Del:{
      	category:'1',
      	is_del:'1',
      	id:''
      },
      foo: {
        /*enterprise_id: '',*/
        type_id: '',
        category:'' ,
        name: '',
        keywords: '',
        description: '',
        keywords_exclude:''
      },
      datalist: [],
      pgrame: {},
      jceArr: {
        tags: ['', 'Tag 2', 'Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3'],
        inputVisible: false,
        inputValue: ''
      },
      jcidobj: {
        id: ''
      },
      resultList: [],
      form: {},
      form: this.$form.createForm(this)
    }
  },
  mounted() {
    // this.getListA()
    //this.getSelectlist()
    this.getFenpeiList()
    //this.getListA()
    this.getListB()
    this.getListC()
    this.getList_Del()
  },
  methods: {
  	handleCloseD (removedTag) {
      const tagsD = this.tagsD.filter(tag => tag !== removedTag)
      console.log(tagsD)
      this.tagsD = tagsD
      console.log(tagsD)
    },
  	showInputD () {
      this.inputVisibleD = true
      this.$nextTick(function () {
        this.$refs.input.focus()
      })
      console.log(this.inputValueD)
   },
    handleInputChangeD (e) {
    	
      this.inputValueD = e.target.value
      console.log(this.inputValueD)
    },
    handleInputConfirmD () {
      const inputValueD = this.inputValueD
      let tagsD = this.tagsD
      if (inputValueD && tagsD.indexOf(inputValueD) === -1) {
        tagsD = [...tagsD, inputValueD]
      }
      console.log(tagsD)
       console.log(this.tagsD)
       
      Object.assign(this, {
        tagsD,
        inputVisibleD: false,
        inputValueD: '',
      })
      console.log(this.inputValueD)
    },
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
  	handleCloseM (removedTag) {
  		console.log(removedTag)
      const items_Del = this.items_Del.filter(tag => tag !== removedTag)
		      console.log(items_Del)
		      this.items_Del = items_Del
					this.fooPOP_Del.id = removedTag.id
					
      schemetypeEdit(this.fooPOP_Del).then(res => {
        console.log(res)
        if (res.msg == 'success') {
						alert("操作成功")
        }else{
          this.$message.error(res.msg)
        }
      })
    },
  	schemetypeEdit(){
  		schemetypeEdit(this.fooPOP).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('方案类型添加成功')
          this.getListB()
      		this.getListC()
        }else{
          this.$message.error(res.msg)
        }
      })
  	},
  	showModal() {
      this.visible = true
    },
    showModal_Del() {
      this.visible_Del = true
    },
    handleOk(e) {
      console.log(e);
      this.schemetypeEdit()
      this.$forceUpdate()
      this.visible = false
    },
    deleteKeyWord(index) {
      this.form3.wordsList.splice(index, 1)
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
    },
    addKeyWord(index) {
      this.form3.wordsList[index].list.push({
        keyWord: ''
      })
    },
    readuceKey(index, ind) {
      console.log(index, ind)
      this.form3.wordsList[index].list.splice(ind, 1)
    },
    closeResult(index) {
      console.log(index)
      this.resultList.splice(index, 1)
    },
    check() {
      if (!this.form2.dWord) {
        this.$message.warning('请输入监测词!')
        return
      }
      console.log(this.form2.dWord, this.form2.aWord)
      let dWordArr = this.form2.dWord.split(/['，','、',' ','，']/)
      let aWordArr
      if (this.form2.aWord) {
        aWordArr = this.form2.aWord.split(/['，','、',' ','，']/)
      }
      this.resultList = []
      dWordArr.map(a => {
        if (aWordArr) {
          aWordArr.map(v => {
            this.resultList.push(a + '+' + v)
          })
        } else {
          this.resultList = dWordArr
        }
      })
      console.log(this.resultList)
    },

    callback(key) {
      console.log(key)
    },
    onChange(e) {
    	console.log(e)
      //console.log('radio checked', e.target.value)
    },
    saveUp() {
      //快捷模式表单提交
      //监测词
      var keywords_simple_input = $.trim($('input[name=keywords_simple]').val())
      var keywords_simple = keywords_simple_input.replace(new RegExp('\\s|，|、', 'g'), ',') //使用英文,替代中文，;
      var keywords = keywords_simple.split(',')

      this.foo.keywords = JSON.stringify(keywords)

      console.log(this.foo.keywords)
      console.log(keywords)
      console.log(this.foo.name)
      console.log(typeof keywords)
      //排除词
      var keywords_exclude_input = $.trim($('input[name=keywords_exclude_simple]').val()) //  排除词

      if(keywords_exclude_input == '' ||  null ||  undefined){
        this.foo.keywords_exclude === null
      }else{
        var keywords_exclude = keywords_exclude_input.replace(new RegExp('\\s|，|、', 'g'), ',') //使用英文,替代中文，;
        var keywords_exclude1 = keywords_exclude.split(',')
        this.foo.keywords_exclude = JSON.stringify(keywords_exclude1)
      }
      console.log(this.foo.description)
      console.log(this.foo.keywords_exclude)
      this.addScheme1()
    },
    saveUp2() {},
    saveUp3() {},
    actionJC() {
      postActionJC(this.jcidobj).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('监测方案已提交')
          $('.actionCss1').hide();
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    actionJC2() {
      postActionJC(this.jcidobj).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('监测方案已提交')
          $('.actionCss1').hide();
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    actionJC3() {
      postActionJC(this.jcidobj).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('监测方案已提交')
          $('.actionCss1').hide();
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    getList() {
      schemetypeSelectlist(this.fooPOP).then(res => {
      	console.log(res)
        this.items = res.list
      })
    },
    getList_Del() {
      schemetypeSelectlist(this.fooPOP_Del).then(res => {
      	console.log(res)
        this.items_Del = res.list
      })
    },
    getListA() {
      schemetypeSelectlist(this.foo).then(res => {
      	console.log(res)
        this.items = res.list
      })
    },
    getListB() {
    /*	$('.delV').val("")*/
      schemetypeSelectlist(this.form2).then(res => {
      	console.log(res)
        this.items = res.list
      })
    },
    getListC() {
      schemetypeSelectlist(this.form3).then(res => {
      	console.log(res)
        this.itemsC = res.list
      })
    },
    addScheme1(){
    
    	
      addScheme(this.foo).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('监测方案已保存,请点击^开始监测^')
          $('.actionCss1').show();
          this.jcidobj.id = res.list.id
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    addScheme(index) {
    		this.form.validateFields(
        (err) => {
          if (!err) {
            console.info('success');
          }
        },
      );
      let obj = {}
      if (index == 2) {
        if (!this.form2.category) {
          this.$message.warning('请选择方案类别')
          return
        }
        
        if(this.form2.category == '3' ||this.form2.category == 3 ){
	        	 if (!this.form2.begin_time || !this.form2.end_time) {
			          this.$message.warning('请选择日期')
			          return
			        }
        }
       
        /*if (!this.form2.enterprise_id) {
          this.$message.warning('请选择企业')
          return
        }*/
        if (!this.form2.type_id) {
          this.$message.warning('请选择方案标签')
          return
        }
        
        /*if (!this.form2.keywords_exclude) {*/
          //排除词
/*          var keywords_exclude2 = $.trim($('input[name=keywords_exclude2]').val()) //  排除词
          var keywords_exclude2 = keywords_exclude2.replace(new RegExp('\\s|，|、', 'g'), ',') //使用英文,替代中文，;
          var keywords_exclude2 = keywords_exclude2.split(',')
          
          this.form2.keywords_exclude = JSON.stringify(keywords_exclude2)
*/
          // console.log(this.form2.keywords_exclude)
        //   this.$message.warning('请输入排除词')
        //   return
        // }
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
        
       /* if (!this.form2.description) {
          this.$message.warning('请输入描述')
          return
        }
*/
        /*if (this.resultList.length == 0) {
          this.$message.warning('请先生成预览')
          return
        } *//*else {
          var keywords_exclude2 = $.trim($('input[name=keywords_exclude2]').val()) //  排除词
          if(keywords_exclude2 == '' ||  null ||  undefined){
               this.form2.keywords_exclude === null
          }else{
              var keywords_exclude2 = keywords_exclude2.replace(new RegExp('\\s|，|、', 'g'), ',') //使用英文,替代中文，;
              var keywords_exclude2 = keywords_exclude2.split(',')
              this.form2.keywords_exclude = keywords_exclude2
              this.form2.keywords_exclude = JSON.stringify(this.keywords_exclude2)
          }
        }*/
       /*  if(keywords_exclude2 == '' ||  null ||  undefined){
               this.form2.keywords_exclude === null
          }else{*/
          	//this.form2.keywords_exclude == ''
        // var keywords_exclude2 = $.trim($('input[name=keywords_exclude2]').val()) //  排除词
         // var  keywords_exclude2  =   this.form2.keywords_exclude	
        
         // var  aaa = keywords_exclude2.replace(new RegExp('\\s|，|、', 'g'), ',') //使用英文,替代中文，;
         // var  bbb = aaa.split(',')
          
          
       //   this.form2.keywords_exclude = JSON.stringify(bbb)
       
       
       		this.form2.keywords_exclude =JSON.stringify(this.tags)
          
          
          console.log(this.form2.keywords_exclude)
				/*	}*/
        obj = this.form2

      } else if (index == 3) {
      	
      	if (!this.form3.category) {
          this.$message.warning('请选择方案类别')
          return
        }
        /*if (!this.form2.enterprise_id) {
          this.$message.warning('请选择企业')
          return
        }*/
        if(this.form3.category == '3' ||this.form3.category == 3 ){
	        	 if (!this.form3.begin_time || !this.form3.end_time) {
			          this.$message.warning('请选择日期')
			          return
			        }
        }
        
        if (!this.form3.type_id) {
          this.$message.warning('请选择方案标签')
          return
        }
      	
      	 if (!this.form3.name) {
          this.$message.warning('请输入方案名称')
          return
        }

      	
          /*var keywords_exclude3 = $.trim($('input[name=keywords_exclude3]').val()) //  排除词

         if(keywords_exclude3 == '' ||  null ||  undefined){
               this.foo.keywords_exclude3 === null
          }else{
            var keywords_exclude3 = keywords_exclude3.replace(new RegExp('\\s|，|、', 'g'), ',') //使用英文,替代中文，;
            var keywords_exclude3 = keywords_exclude3.split(',')
            this.form3.keywords_exclude = JSON.stringify(keywords_exclude3)
          }*/

				this.form3.keywords_exclude =JSON.stringify(this.tagsD)
          
          
          console.log(this.form3.keywords_exclude)


        let arr = []
        for (let index = 0; index < this.form3.wordsList.length; index++) {
          let stringArr = []
          for (let j = 0; j < this.form3.wordsList[index].list.length; j++) {
            stringArr.push(this.form3.wordsList[index].name + '+' + this.form3.wordsList[index].list[j].keyWord)
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
        obj = this.form3
      }


      addScheme(obj).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('监测方案已保存,请点击^开始监测^')
          $('.actionCss1').show();
          this.jcidobj.id = res.list.id
        /*  jiluJifen({
		        id: this.jcidobj.id
		      }).then(res => {
		        console.log(res)
		      })*/
		     //积分+20
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    getFenpeiList() {
      getFenpeiList().then(res => {
        console.log(res)
        this.datalist = res.list
        console.log(this.datalist)
        /*this.dataSource = res.list
        this.pagination.total = res.count*/
      })
    },
    handleClose(removedTag) {
      const tags = this.jceArr.tags.filter(tag => tag !== removedTag)
      console.log(tags)
      this.jceArr.tags = jceArr.tags
    },

    showInput() {
      this.jceArr.inputVisible = true
      this.$nextTick(function() {
        this.$refs.input.focus()
      })
    },
    handleInputChange(e) {
      this.jceArr.inputValue = e.target.value
    },
    handleInputConfirm() {
      const inputValue = this.jceArr.inputValue
      const inputVisible = this.jceArr.inputVisible
      let tags = this.jceArr.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      console.log(tags)
      Object.assign(this.jceArr, {
        tags,
        inputVisible: false,
        inputValue: ''
      })
    },
    changeDate(dates, dateStrings){
  	 	console.log(this.form2.begin_time)
  	 	console.log(this.form2.end_time)
  	 	this.form2.begin_time = dateStrings[0]
  	 	this.form2.end_time = dateStrings[1]
  	 	console.log(this.form2.begin_time)
  	 	console.log(this.form2.end_time)
  	 //	this.schemeList()
  	 },
  	 changeDateJQ(dates, dateStrings){
  	 	console.log(this.form3.begin_time)
  	 	console.log(this.form3.end_time)
  	 	this.form3.begin_time = dateStrings[0]
  	 	this.form3.end_time = dateStrings[1]
  	 	console.log(this.form3.begin_time)
  	 	console.log(this.form3.end_time)
  	 //	this.schemeList()
  	 },
    moment
  }
}
</script>
<style scoped>
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
.dxTitle {
  display: inline-block;
  width: 80px;
  float: left;
  height: 26px;
  line-height: 26px;
}
.dxMo {
  color: red;
  line-height: 26px;
  margin-left: 5px;
}
.jianceArr_img {
  width: 520px;
  margin-left: 100px;
}
</style>