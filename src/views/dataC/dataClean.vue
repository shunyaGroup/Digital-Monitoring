<template>
  <a-card :bordered="false" title="数据清洗">  	
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="12">
          <a-form-item label="发布时间" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-range-picker
              format="YYYY-MM-DD HH:mm:ss"
              :ranges="{ '今天': [moment(), moment()], '昨天': [moment().subtract('days', 1), moment()], '近七天': [moment().subtract('days', 7),moment()], '近30天':[moment().subtract('days', 30),moment()]}"
              @change="changeDate"
            />
          </a-form-item>

          <a-form-item label="情感" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-radio-group v-model="form.feel">
              <a-radio value>全部</a-radio>
              <a-radio :value="1">正面</a-radio>
              <a-radio :value="2">负面</a-radio>
              <a-radio :value="3">中性</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="排序" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-radio-group v-model="form.orderBy">
              <a-radio value>全部</a-radio>
              <a-radio :value="1">时间正序</a-radio>
              <a-radio :value="2">时间倒序</a-radio>
              <a-radio :value="3">权重倒序</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="媒体属性" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-radio-group v-model="form.mediaAttr">
              <a-radio value>全部</a-radio>
              <a-radio :value="1">用户层面</a-radio>
              <a-radio :value="2">新闻层面</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="处理情况" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-radio-group v-model="form.is_handled">
              <a-radio value>全部</a-radio>
              <a-radio :value="1">未处理</a-radio>
              <a-radio :value="2">已处理</a-radio>
            </a-radio-group>
          </a-form-item>
         <a-form-item label="发布情况" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
            <a-radio-group v-model="form.isPublished">
            	<a-radio value>全部</a-radio>
              <a-radio :value="1">未发布</a-radio>
              <a-radio :value="2">已发布</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="网络类别" :labelCol="{span: 2}" :wrapperCol="{span: 20}">
           <!-- <a-checkbox
              :indeterminate="indeterminate"
              :checked="checkAll"
              @change="onCheckAllChange"
            >全部</a-checkbox>-->
            <a-checkbox-group v-model="form.networkCategory">
              <a-checkbox
                :checked="true"
                v-for="(item,index) in netWorkList"
                :key="index"
                :value="item.value"
              >{{item.key}}({{item.count}})</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item label="内容搜索" :labelCol="{span: 2}" :wrapperCol="{span: 10}">
            <a-input v-model="form.content">
              <a-select slot="addonBefore" style="width: 100px" v-model="form.test">
                <a-select-option value="1">搜内容</a-select-option>
                <a-select-option value="2">搜标题</a-select-option>
                <a-select-option value="3">搜媒体</a-select-option>
                <a-select-option value="4">搜标签</a-select-option>
                <a-select-option value="5">搜发布者</a-select-option>
                <a-select-option value="6">搜车型</a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
        </a-row>
      </a-form>
    </div>
    <div>
			    <!--<a-button type="primary" @click="showModal">点击此处 • 添加方案类型</a-button>-->
			    <a-modal
			      title="清洗完成"
			      v-model="visible3"
			      @ok="upData"
			      okText="立即发布"
			    >
			       <a-row>
			          数据截止日期：<span class="dxTitle" style="color:red;margin-top: 3px;width: 200px;">{{fooCLE.datetime}}</span>
			       </a-row>
			       <a-row style="margin-top:20px">
			          数据总量：<span class="dxTitle" style="color:red;margin-top: 3px;">{{fooCLE.count}}条</span>
			       </a-row>
			    </a-modal>
		</div>
    <div class="btns">
      <a @click="changeList">批量操作</a>
      <a @click="deleteAll">删除</a>
    <a @click="cleanData">清洗完成</a>
      <!--<a @click="upData">立即发布</a>-->
      <a @click="getlist">查看全部</a>
      <a @click="carAdd">车型添加</a>
      <a @click="hotPX">热度降序</a>
     <!-- <a @click="daochu">导出CSV文件</a>-->
      
      <div>
			    <a-modal
			      title="相似文章·热度降序"
			      v-model="visible5"
			      @ok="V4popOK"
			      okText="完成"
			      width="1200px"
			      :footer="null"
			    >
			    <div class="btns">
			    	<a @click="changeListHotP">批量操作</a>
      			<a @click="deleteAll">删除</a>
			    </div>
			       <a-table
					      ref="table"
					      bordered
					      size="middle"
					      rowKey="hash_code"
					      :columns="columns"
					      :dataSource="dataSource3"
					      :loading="loading"
					      @change="handleTableChange"
					      :rowSelection="rowSelection"
					      :scroll="{ x: 1800, y: 600 }"
					      :pagination="false"
					    >
					      <template
					        slot="handle_datetime"
					        slot-scope="text, record"
					      >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>
					      <template slot="news_url" slot-scope="text, record">
					        <a :href="text" style="word-break:break-all" target="_blank">{{text}}</a>
					      </template>
					      <template
					        slot="publish_datetime"
					        slot-scope="text, record"
					      >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>
					
					      
					      <span slot="action" slot-scope="text, record">
					        <a @click="handleEditHotP(record)">编辑</a>
					        <a-popconfirm title="确定删除吗?" @confirm="() =>handleDelete(record)">
					          <a style="margin-left:10px">删除</a>
					        </a-popconfirm>
					      </span>
					
					      <span slot="simhashCount" slot-scope="text, record">
					        <a @click="checkSimhash(record)">{{text}}</a>
					      </span>
					
					    </a-table>
			    </a-modal>
		</div>
      
      
        <div>
			    <!--<a-button type="primary" @click="showModal">点击此处 • 添加方案类型</a-button>-->
			    <a-modal
			      title="添加车型"
			      v-model="visible2"
			      @ok="cartypeOK"
			    >
			       <a-row>
			          <span class="dxTitle" style="color:red;float: left;margin-top: 3px;">*品牌</span>
			          <a-col :span="15">
			            <a-input placeholder="请输入品牌名称" v-model="fooPOP.brand" />
			          </a-col>
			       </a-row>
			       <a-row style="margin-top:20px">
			          <span class="dxTitle" style="color:red;float: left;margin-top: 3px;">*车型</span>
			          <a-col :span="15">
			            <a-input placeholder="请输入车型名称" v-model="fooPOP.car_type" />
			          </a-col>
			        </a-row>
			       <a-row style="margin-top:20px">
			        	<span class="dxTitle" style="margin-top: 5px;color:red;float: left;margin-top: 9px;">*企业选择</span>
			        <a-form :formBox="fooPOP">
			        <a-form-item
			            :label-col="formItemLayout.labelCol"
			            :wrapper-col="formItemLayout.wrapperCol"
			          >
			            <a-select v-model="fooPOP.enterprise_id" @change="onChangeCarQiye">
			              <a-select-option
			                v-for="(datali,index) in datalist"
			                :value="datali.id"
			                :key="index"
			              >{{datali.name}}</a-select-option>
			            </a-select>
			          </a-form-item>
			        </a-form>
			        </a-row>
			    </a-modal>
			  
        </div>
    </div>
    <a-table
      ref="table"
      bordered
      size="middle"
      rowKey="hash_code"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :rowSelection="rowSelection"
      :scroll="{ x: 1800, y: 600 }"
    >
      <template
        slot="handle_datetime"
        slot-scope="text, record"
      >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>
      <template slot="news_url" slot-scope="text, record">
        <a :href="text" style="word-break:break-all" target="_blank">{{text}}</a>
      </template>
      <template
        slot="publish_datetime"
        slot-scope="text, record"
      >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-popconfirm title="确定删除吗?" @confirm="() =>handleDelete(record)">
          <a style="margin-left:10px">删除</a>
        </a-popconfirm>
      </span>

      <span slot="simhashCount" slot-scope="text, record">
        <a @click="checkSimhash(record)">{{text}}</a>
      </span>

    </a-table>
<!--    <a-row>数据总量：<span class="dxTitle" style="color:red;margin-top: 3px;">{{fooCLE.count}}条</span></a-row>-->
    <div>
			    <a-modal
			      title="相似文章"
			      v-model="visible4"
			      @ok="V4popOK"
			      okText="完成"
			      width="1200px"
			      :footer="null"
			    >
			    <div class="btns">
			    	<a @click="changeListWZ">批量操作</a>
      			<a @click="deleteAll">删除</a>
			    </div>
			       <a-table
					      ref="table"
					      bordered
					      size="middle"
					      rowKey="hash_code"
					      :columns="columns"
					      :dataSource="dataSource2"
					      :loading="loading"
					      @change="handleTableChange"
					      :rowSelection="rowSelection"
					      :scroll="{ x: 1800, y: 600 }"
					      :pagination="false"
					    >
					      <template
					        slot="handle_datetime"
					        slot-scope="text, record"
					      >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>
					      <template slot="news_url" slot-scope="text, record">
					        <a :href="text" style="word-break:break-all" target="_blank">{{text}}</a>
					      </template>
					      <template
					        slot="publish_datetime"
					        slot-scope="text, record"
					      >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>
					
					      
					      <span slot="action" slot-scope="text, record">
					        <a @click="handleEditWZ(record)">编辑</a>
					        <a-popconfirm title="确定删除吗?" @confirm="() =>handleDelete(record)">
					          <a style="margin-left:10px">删除</a>
					        </a-popconfirm>
					      </span>
					
					      <span slot="simhashCount" slot-scope="text, record">
					        <a @click="checkSimhash(record)">{{text}}</a>
					      </span>
								
					    </a-table>
			    </a-modal>
		</div>
    <a-modal title="修改" :visible="visible" @ok="handleOk" @cancel="handleCancel">
      <a-form :form="changeform">
        <a-form-item label="一级标签修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <!-- <a-input v-model="changeform.question_level" /> -->
          <a-select v-model="changeform.question_level" allowClear>
            <a-select-option value="产品正面信息">产品正面信息</a-select-option>
            <a-select-option value="产品质量问题">产品质量问题</a-select-option>
            <a-select-option value="产品力吐槽">产品力吐槽</a-select-option>
            <a-select-option value="产品设计问题">产品设计问题</a-select-option>
            <a-select-option value="重大事件">重大事件</a-select-option>
            <a-select-option value="外观抄袭">外观抄袭</a-select-option>
            <a-select-option value="品牌战略">品牌战略</a-select-option>
            <a-select-option value="市场策略">市场策略</a-select-option>
            <a-select-option value="领导人相关">领导人相关</a-select-option>
            <a-select-option value="品牌活动">品牌活动</a-select-option>
            <a-select-option value="销量问题">销量问题</a-select-option>
            <a-select-option value="销量信息">销量信息</a-select-option>
            <a-select-option value="用户体验">用户体验</a-select-option>
            <a-select-option value="投诉盘点">投诉盘点</a-select-option>
            <a-select-option value="售后服务问题">售后服务问题</a-select-option>
            <a-select-option value="疑似黑车">疑似黑车</a-select-option>
            <a-select-option value="其他">其他</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="网媒类别修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="changeform.media_type_final" />
        </a-form-item>
        <a-form-item label="网络来源修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="changeform.app_name_final" />
        </a-form-item>
        <a-form-item label="发布者修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="changeform.news_author_final" />
        </a-form-item>
        <a-form-item label="车型修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select v-model="changeform.auto_brand" allowClear>
            <a-select-option
              v-for="(item,index) in carList"
              :key="index"
              :value="item.car_type"
            >{{item.car_type}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="修改调性" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select v-model="changeform.feel_tag" allowClear>
            <a-select-option value="正面">正面</a-select-option>
            <a-select-option value="负面">负面</a-select-option>
            <a-select-option value="中性">中性</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    
    <a-modal title="修改" v-model="visibleHotP" @ok="handleOkHotP" @cancel="handleCancelHotP">
      <a-form :form="changeform">
        <a-form-item label="一级标签修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <!-- <a-input v-model="changeform.question_level" /> -->
          <a-select v-model="changeform.question_level" allowClear>
            <a-select-option value="产品正面信息">产品正面信息</a-select-option>
            <a-select-option value="产品质量问题">产品质量问题</a-select-option>
            <a-select-option value="产品力吐槽">产品力吐槽</a-select-option>
            <a-select-option value="产品设计问题">产品设计问题</a-select-option>
            <a-select-option value="重大事件">重大事件</a-select-option>
            <a-select-option value="外观抄袭">外观抄袭</a-select-option>
            <a-select-option value="品牌战略">品牌战略</a-select-option>
            <a-select-option value="市场策略">市场策略</a-select-option>
            <a-select-option value="领导人相关">领导人相关</a-select-option>
            <a-select-option value="品牌活动">品牌活动</a-select-option>
            <a-select-option value="销量问题">销量问题</a-select-option>
            <a-select-option value="销量信息">销量信息</a-select-option>
            <a-select-option value="用户体验">用户体验</a-select-option>
            <a-select-option value="投诉盘点">投诉盘点</a-select-option>
            <a-select-option value="售后服务问题">售后服务问题</a-select-option>
            <a-select-option value="疑似黑车">疑似黑车</a-select-option>
            <a-select-option value="其他">其他</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="网媒类别修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="changeform.media_type_final" />
        </a-form-item>
        <a-form-item label="网络来源修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="changeform.app_name_final" />
        </a-form-item>
        <a-form-item label="发布者修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="changeform.news_author_final" />
        </a-form-item>
        <a-form-item label="车型修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select v-model="changeform.auto_brand" allowClear>
            <a-select-option
              v-for="(item,index) in carList"
              :key="index"
              :value="item.car_type"
            >{{item.car_type}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="修改调性" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select v-model="changeform.feel_tag" allowClear>
            <a-select-option value="正面">正面</a-select-option>
            <a-select-option value="负面">负面</a-select-option>
            <a-select-option value="中性">中性</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    
    
    <a-modal title="修改" v-model="visibleWZ" @ok="handleOkWZ" @cancel="handleCancelWZ">
      <a-form :form="changeform">
        <a-form-item label="一级标签修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <!-- <a-input v-model="changeform.question_level" /> -->
          <a-select v-model="changeform.question_level" allowClear>
            <a-select-option value="产品正面信息">产品正面信息</a-select-option>
            <a-select-option value="产品质量问题">产品质量问题</a-select-option>
            <a-select-option value="产品力吐槽">产品力吐槽</a-select-option>
            <a-select-option value="产品设计问题">产品设计问题</a-select-option>
            <a-select-option value="重大事件">重大事件</a-select-option>
            <a-select-option value="外观抄袭">外观抄袭</a-select-option>
            <a-select-option value="品牌战略">品牌战略</a-select-option>
            <a-select-option value="市场策略">市场策略</a-select-option>
            <a-select-option value="领导人相关">领导人相关</a-select-option>
            <a-select-option value="品牌活动">品牌活动</a-select-option>
            <a-select-option value="销量问题">销量问题</a-select-option>
            <a-select-option value="销量信息">销量信息</a-select-option>
            <a-select-option value="用户体验">用户体验</a-select-option>
            <a-select-option value="投诉盘点">投诉盘点</a-select-option>
            <a-select-option value="售后服务问题">售后服务问题</a-select-option>
            <a-select-option value="疑似黑车">疑似黑车</a-select-option>
            <a-select-option value="其他">其他</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="网媒类别修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="changeform.media_type_final" />
        </a-form-item>
        <a-form-item label="网络来源修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="changeform.app_name_final" />
        </a-form-item>
        <a-form-item label="发布者修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="changeform.news_author_final" />
        </a-form-item>
        <a-form-item label="车型修改" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select v-model="changeform.auto_brand" allowClear>
            <a-select-option
              v-for="(item,index) in carList"
              :key="index"
              :value="item.car_type"
            >{{item.car_type}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="修改调性" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select v-model="changeform.feel_tag" allowClear>
            <a-select-option value="正面">正面</a-select-option>
            <a-select-option value="负面">负面</a-select-option>
            <a-select-option value="中性">中性</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    
  </a-card>
</template>
<script>
import { getSentimentList, getNetwork, batchupdate, carlist, batchdel, addtime,batchpublish,simhash,getFenpeiList,cartypeAdd,cartypeListbyid,sameOrder } from '@/api/newpage'
import moment from 'moment'
import { fail } from 'assert'
export default {
  data() {
    return {
    	formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 }
      },
    	datalist:[],
    	fooPOP:{},
      modalTest: '',
      changeform: {},
      changeType: '',
      value: 1,
      indeterminate: false,
      checkAll: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      visible: false,
      fooCLE:{},
      pagination: {
        pageSize: 10,
        total:1,
        showTotal:() =>{}
      },
      visible2:false,
      visible3:false,
      visible4:false,
      visible5:false,
      visibleHotP:false,
      visibleWZ:false,
      form: {
        feel: '',
        orderBy: '',
        mediaAttr: '',
        is_handled: '',
        isPublished:0,
        startTime: '',
        endTime: '',
        //checkboxgroup: [],
        networkCategory: [],
        news_content: '',
        news_title:'',
        app_name:'',
        question_level:'',
        news_author:'',
        auto_brand:'',
        page: 1,
        limit: 10
      },
      simHashForm:{
      },
      netWorkList: [],
      allCheckList: [],
      columns: [
        {
          title: '录入时间',
          align: 'center',
          dataIndex: 'create_datetime',
          scopedSlots: { customRender: 'create_datetime' },
          width: 100
        },
        {
          title: '更新时间',
          align: 'center',
          dataIndex: 'handle_datetime',
          scopedSlots: { customRender: 'handle_datetime' },
          width: 100
        },
        {
          title: '一级分类',
          align: 'center',
          dataIndex: 'question_level',
          width: 150
        },
        {
          title: '网络类别',
          align: 'center',
          dataIndex: 'media_type_final',
          width: 100
        },
        {
          title: '网媒来源',
          align: 'center',
          dataIndex: 'app_name_final',
          width: 100
        },
        {
          title: '发布者',
          align: 'center',
          dataIndex: 'news_author_final',
          width: 100
        },
        {
          title: '文章发布时间',
          align: 'center',
          dataIndex: 'news_posttime',
          scopedSlots: { customRender: 'news_posttime' },
          width: 100
        },
        {
          title: '发布时间',
          align: 'center',
          dataIndex: 'publish_datetime',
          scopedSlots: { customRender: 'publish_datetime' },
          width: 100
        },
        {
          title: '标题',
          align: 'center',
          dataIndex: 'news_title'
        },
        {
          title: '链接',
          align: 'center',
          dataIndex: 'news_url',
          scopedSlots: { customRender: 'news_url' },
          width: 280
        },
        {
          title: '车型',
          align: 'center',
          dataIndex: 'auto_brand',
          width: 100
        },
        {
          title: '形式判断',
          align: 'center',
          dataIndex: 'feel_tag',
          width: 100
        },
        {
          title: '相似文章',
          align: 'center',
          dataIndex: 'simhashCount',
          scopedSlots: { customRender: 'simhashCount' },
          width: 80
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          fixed: 'right',
          align: 'center',
          width: 100
        }
      ],
      dataSource: [],
      dataSource2: [],
      dataSource3: [],
      ids: '',
      carList: []
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  beforeRouteEnter (to, from, next){ next(vm => { 
//	console.log(from)
  	if (from.path == '/dataAudit/audit') {
  		vm.form.isPublished = 2
  	} else{
  		vm.form.isPublished = 0
  	}
  	console.log(vm.form)
  })},
  watch: {
    form: {
      handler(newValue) {
        this.getNetLit()
        delete this.form.news_content
        delete this.form.news_title
        delete this.form.app_name
        delete this.form.question_level
        delete this.form.news_author
        delete this.form.auto_brand
        if (newValue.test == '1') {
          this.form.news_content = this.form.content
        } else if (newValue.test == '2') {
          this.form.news_title = this.form.content
        } else if (newValue.test == '3') {
          this.form.app_name = this.form.content
        } else if (newValue.test == '4') {
          this.form.question_level = this.form.content
        } else if (newValue.test == '5') {
          this.form.news_author = this.form.content
        } else if (newValue.test == '6') {
          this.form.auto_brand = this.form.content
        }
        this.getlist()
      },
      deep: true
    }
  },
  mounted() {
    this.getNetLit()
    this.cartypeListbyid()
    this.getlist()
    this.getFenpeiList()
  },
  computed: {
    rowSelection() {
//    const { selectedRowKeys } = this
/*1-ccc4364a38a259b033da79d5bf490ea6;
1-ccc4364a38a259b033da79d5bf490ea6*/
      return {
        onChange: (selectedRowKeys, selectedRows) => {
        	console.log(selectedRows,selectedRowKeys)
        	let arr = []
        	for (let i=0;i<selectedRows.length;i++) {
        		arr.push(selectedRows[i].hash_code)
        	}
          this.ids = arr
          console.log(this.ids)
        }
      }
    }
  },
  methods: {
  	daochu(){
  		      //要导出的json数据
  		      var jsonData = this.dataSource
  		      console.log(jsonData)
      /*var jsonData = [
        {
          name:'路人甲',
          phone:'123456789',
          email:'000@123456.com'
        },
        {
          name:'炮灰乙',
          phone:'123456789',
          email:'000@123456.com'
        },
        {
          name:'土匪丙',
          phone:'123456789',
          email:'000@123456.com'
        },
        {
          name:'流氓丁',
          phone:'123456789',
          email:'000@123456.com'
        },
      ]*/
      //列标题，逗号隔开，每一个逗号就是隔开一个单元格
      //let str = `姓名,电话,邮箱\n`;
       let str = `\n`
      //let str = `录入时间,更新时间,一级分类,网络类别,网媒来源,发布者,文章发布时间,发布时间,标题,链接,车型,形式判断,相似文章\n`;
      //增加\t为了不让表格显示科学计数法或者其他格式
      for(let i = 0 ; i < jsonData.length ; i++ ){
        for(let item in jsonData[i]){
            str+=`${jsonData[i][item] + '\t'},`;     
        }
        str+='\n';
      }
      //encodeURIComponent解决中文乱码
      let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
      //通过创建a标签实现
      var link = document.createElement("a");
      link.href = uri;
      //对下载的文件命名
      link.download =  "json数据表.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  	},
  	hotPX(){
  		this.visible5 = true
  		this.sameOrder()
  	},
  	sameOrder(){
  		sameOrder().then(res=>{
  			console.log(res)
        this.dataSource3 = res.list
        this.loading = false
      })
  	},
  	carAdd(){
  		this.visible2 = true
  	},
  	V4popOK(){
  		this.visible4 = false
  		this.visible5 = false
  	},
  	cartypeAdd(){
  		cartypeAdd(this.fooPOP).then(res => {
        console.log(res)
        if (res.msg == "success") {
          this.$message.success('车型添加成功')
        }else{
          this.$message.error(res.msg)
        }
      })
  	},
  	cartypeOK(e) {
      console.log(e);
      this.cartypeAdd()
      this.visible2 = false
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
    //查看相似文章
    checkSimhash(record){
    	console.log(record)
    	var sim_hash = record.sim_hash
    	var simHashForm = {
      	feel:this.form.feel,
        orderBy: this.form.orderBy,
        mediaAttr:this.form.mediaAttr,
        is_handled: this.form.is_handled,
        isPublished:this.form.isPublished,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        networkCategory: this.form.networkCategory,
        news_content: this.form.news_content,
        news_title:this.form.news_title,
        app_name:this.form.app_name,
        question_level:this.form.question_level,
        news_author:this.form.news_author,
        auto_brand:this.form.auto_brand,
        simHash:sim_hash
      }
    	this.simHashForm = simHashForm
			/*this.simHashForm.simHash = record.hash_code*/
    	console.log(sim_hash)
    	this.simhash(simHashForm)
    	this.visible4 = true
     /* simhash(simHashForm).then(res=>{
        this.dataSource2 = res.list
        this.loading = false
        //this.pagination.pageSize = 100000
       	this.visible4 = true
      })*/
    },
    simhash(e){
    	simhash(e).then(res=>{
        this.dataSource2 = res.list
        this.loading = false
        //this.pagination.pageSize = 100000
       	
      })
    },
    //清洗完成
    cleanData() {
    	
      addtime().then(res => {
        console.log(res) 
        if(res.msg == "当前暂无需要发布的数据"){
        	alert(res.msg)
        }else{
        	this.fooCLE = res.list
        	this.visible3 = true 
        }
      })
    },
    upData() {
      this.$confirm({
        title: '发布',
        content: '是否确定发布?',
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk() {
          batchpublish().then(res => {
            console.log(res)
            this.visible3 = false
            alert('发布成功！')
          })
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    deleteAll() {
      if (!this.ids) {
        this.$message.warning('请选择至少删除一项！')
        return
      }
      const that = this
      this.$confirm({
        title: '删除',
        content: '是否确定删除选中项?',
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk() {
          let obj = {
            data: that.ids
          }
          batchdel(obj).then(res => {
            that.getlist()
            that.sameOrder()
            that.simhash(that.simHashForm)
          })
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    cartypeListbyid() {
      cartypeListbyid().then(res => {
        console.log(res)
        this.carList = res.list
      })
    },
    changeList() {
      if (!this.ids) {
        this.$message.warning('请选择修改内容！')
        return
      }
      this.changeform = {}
      this.visible = true
    },
    changeListHotP() {
      if (!this.ids) {
        this.$message.warning('请选择修改内容！')
        return
      }
      this.changeform = {}
      this.visibleHotP = true
    },
    changeListWZ() {
      if (!this.ids) {
        this.$message.warning('请选择修改内容！')
        return
      }
      this.changeform = {}
      this.visibleWZ = true
    },
    handleTableChange(pagination, filters, sorter) {
      this.form.page = pagination.current
      this.getList()
    },
    onCheckAllChange(e) {
    	console.log(e)
      this.form.networkCategory = e.target.checked ? this.allCheckList : []
      console.log(this.form.networkCategory)
      this.indeterminate = false
      this.checkAll = e.target.checked
    //  console.log(checkAll)
    },
    oncheckChange() {},
    getNetLit() {
      let obj = this.form
      getNetwork(obj).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.netWorkList = res.list
          for (let index = 0; index < res.list.length; index++) {
           this.allCheckList.push(res.list[index].value)
          }
           console.log(this.allCheckList)
           console.log(this.form.networkCategory)
        }
      })
    },
    getlist() {
  	/*	console.log(localStorage.getItem('isPublished'))
    	
    	console.log(this.$route.query.isPublished)*/
      let obj = this.form
      getSentimentList(obj).then(res => {
        console.log(res)
        this.dataSource = res.list
        if (res.count) {
          this.pagination.total = res.count
        }
        this.pagination.showTotal = () => this.pagination.total
        //console.log(this.pagination.total)
        //console.log(this.pagination)
        this.loading = false
      })
    },
    onDelete(key) {},
    handleEdit(record) {
      this.changeform = record
      console.log(record.media_type)
      this.visible = true
      this.disable = true
    },
    handleEditHotP(record) {
      this.changeform = record
      console.log(record.media_type)
      this.visibleHotP = true
      this.disable = true
    },
    handleEditWZ(record) {
      this.changeform = record
      console.log(record.media_type)
      this.visibleWZ = true
      this.disable = true
    },
    handleDelete(record) {
      let arr = []
      arr.push(record.hash_code)
      let obj = {
        data: arr
      }
      batchdel(obj).then(res => {
        this.getlist()
        this.loading = true
        this.sameOrder()
        this.simhash(this.simHashForm)
      })
    },
    changeMsg(record) {},
    onChange(e) {
      console.log('radio checked', e.target.value)
    },
    onChangeCarQiye(e) {
      //console.log('radio checked', e.target.value)
      console.log(e)
    },
    start() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.selectedRowKeys = []
      }, 1000)
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    showModal() {
      this.visible = true
    },
    handleOk(e) {
     // this.loading = true
      let obj = this.changeform
      if (!this.changeform.hash_code) {
        obj.hash_code = this.ids
        console.log(obj.hash_code)
      } else {
        let hash_codeArr = []
        hash_codeArr.push(this.changeform.hash_code)
        obj.hash_code = hash_codeArr
        console.log(obj.hash_code)
      }
			console.log(this.changeform.hash_code)
			
			
      let newObj = {
        data: JSON.stringify(obj)
      }
      console.log(newObj)
      
      batchupdate(newObj).then(res => {
        console.log(res)
        this.visible = false
        this.getlist()
//      this.sameOrder()
//      this.simhash(this.simHashForm)
      })
    },
    handleOkHotP(e) {
      this.loading = true
      let obj = this.changeform
      if (!this.changeform.hash_code) {
        obj.hash_code = this.ids
      } else {
        let hash_codeArr = []
        hash_codeArr.push(this.changeform.hash_code)
        obj.hash_code = hash_codeArr
      }

      let newObj = {
        data: JSON.stringify(obj)
      }
      batchupdate(newObj).then(res => {
        console.log(res)
        this.visibleHotP = false
        this.sameOrder()
        //this.getlist()
//      this.sameOrder()
//      this.simhash(this.simHashForm)
      })
    },
    handleOkWZ(e) {
      this.loading = true
      let obj = this.changeform
      if (!this.changeform.hash_code) {
        obj.hash_code = this.ids
      } else {
        let hash_codeArr = []
        hash_codeArr.push(this.changeform.hash_code)
        obj.hash_code = hash_codeArr
      }

      let newObj = {
        data: JSON.stringify(obj)
      }
      batchupdate(newObj).then(res => {
        console.log(res)
        this.visibleWZ = false
        //this.sameOrder()
        //this.getlist()
//      this.sameOrder()
      	this.simhash(this.simHashForm)
      })
    },
    handleCancel(e) {
      this.visible = false
    },
    handleCancelHotP(e) {
      this.visibleHotP = false
    },
    handleCancelWZ(e) {
      this.visibleWZ = false
    },
    handleChangeUP(value) {
      console.log(`selected ${value}`)
    },
    changeDate(dates, dateStrings) {
      this.form.startTime = dateStrings[0]
      console.log( this.form.startTime)
      this.form.endTime = dateStrings[1]
      console.log( this.form.endTime)
    },
    moment
  }
}
</script>
<style scoped>
/* #components-layout-demo-basic {
  text-align: center;
} */
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #7dbcea;
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
.ant-layout-header {
  height: auto;
  line-height: auto;
}
.dxTitle {
  display: inline-block;
  width: 80px;
}
.headRow {
  height: 46px;
  line-height: 46px;
  border-bottom: 1px solid;
}
.btns {
  margin-bottom: 10px;
}
.btns a {
  margin-left: 8px;
}
</style>