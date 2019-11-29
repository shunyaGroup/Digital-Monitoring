<template>
  <a-card :bordered="false">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="10">
          <a-col :span="6">
            <a-form-item label="情感" :labelCol="{span: 10}" :wrapperCol="{span: 13}">
              <a-select v-model="form.feel">
                <a-select-option value>全部</a-select-option>
                <a-select-option value="1">正面</a-select-option>
                <a-select-option value="2">负面</a-select-option>
                <a-select-option value="3">中性</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="6">
            <a-form-item label="排序" :labelCol="{span: 10}" :wrapperCol="{span: 13}">
              <a-select v-model="form.orderBy">
              	<a-select-option value="">全部</a-select-option>
                <a-select-option value="2">时间倒序</a-select-option>
                <a-select-option value="1">时间正序</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="6">
            <a-form-item label="媒体属性" :labelCol="{span: 10}" :wrapperCol="{span: 13}">
              <a-select v-model="form.mediaAttr">
                <a-select-option value>全部</a-select-option>
                <a-select-option value="1">用户层面</a-select-option>
                <a-select-option value="2">新闻层面</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="内容搜索" :labelCol="{span: 10}" :wrapperCol="{span: 13}">
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
          </a-col>
          <a-col :span="24">
            <a-form-item label="网络类别" :labelCol="{span: 3}" :wrapperCol="{span: 13}">
              <a-select
                mode="multiple"
                style="width: 100%"
                @change="handleChange"
                :defaultValue="defaultNet"
              >
                <a-select-option
                  v-for="(item,index) in netWorkList"
                  :key="index"
                  :value="item.value"
                >{{item.key}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="btns">
      <a @click="changeList">批量操作</a>
      <a @click="deleteAll">删除</a>
      <a-checkbox style="margin-left:15px" @change="changeHot">热度降序</a-checkbox>
      <!--<a @click="goyifabu" style="font-weight: bold;color: #ffffff;background: #0080FF;border-radius: 2px; padding: 1px 5px;">已发布</a>-->
      <a @click="carAdd" style="font-weight: bold;color: #ffffff;background: #0080FF;border-radius: 2px; padding: 1px 5px;">车型添加</a>
    
      <!-- <a @click="cleanData">清洗完成</a> -->
      <!--<a @click="upData">立即发布</a>-->
      <!-- <a @click="getlist">查看全部</a> -->
      <!-- <a @click="carAdd">车型添加</a> -->
      <!-- <a @click="hotPX">热度降序</a> -->
      <!-- <a @click="daochu">导出CSV文件</a>-->
    </div>
    <a-tabs type="card" @change="changeTab">
      <a-tab-pane tab="待审核" key="2">
        <a
          @click="submit"
          style="font-weight: bold;color: #ffffff;background: rgba(237, 70, 70, 0.88);border-radius: 2px; padding: 10px 10px;margin-bottom:20px;line-height: 32px;"
        >审核通过</a>
        <a
          @click="bohuiPiliang"
          style="font-weight: bold;color: #ffffff;background: rgb(171, 73, 250);border-radius: 2px; padding: 10px 10px;margin-bottom:20px;margin-left:30px;line-height: 32px;"
        >批量驳回</a>
        <a-table
          ref="table"
          bordered
          size="middle"
          rowKey="hash_code"
          :columns="columnsDaishenhe"
          :dataSource="dataSource"
          :loading="loading"
          @change="handleTableChange"
          :rowSelection="rowSelection"
          :scroll="{ x: 1800, y: 600 }"
          :pagination="pagination"
          style="margin-top: 20px;"
        >
          <template
            slot="handle_datetime"
            slot-scope="text"
          >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>
          <template slot="news_url" slot-scope="text">
            <a :href="text" style="word-break:break-all" target="_blank">{{text}}</a>
          </template>
          <template
            slot="publish_datetime"
            slot-scope="text"
          >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>

          <span slot="action" slot-scope="text, record">
          <!--  <a @click="handleEditHotP(record)">编辑</a>-->
            <a @click="disposeMsg(record)" style="margin-left:10px">历史判断</a>
          <!--  <a-popconfirm title="确定删除吗?" @confirm="() =>handleDelete(record)">
              <a style="margin-left:10px">删除</a>
            </a-popconfirm>-->
            <a @click="bohui(record)" style="margin-left:10px">驳回</a>
          </span>
          <span slot="simhashCount" slot-scope="text, record">
            <a @click="checkSimhash(record)">查看</a>
          </span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane tab="审核通过" key="3">
        <a
          @click="issue"
          style="font-weight: bold;color: #ffffff;background: rgb(65, 0, 255);border-radius: 2px; padding:  10px 20px;margin-bottom:20px; line-height: 32px;"
        >全部发布</a>
        
        <a
          @click="issuePL"
          style="font-weight: bold;color: rgb(65, 0, 255);background: #eeeeee;border-radius: 2px; padding:  10px 20px;margin-bottom:20px; line-height: 32px;margin-left: 20px;"
        >批量发布</a>
        
        <a-table
          ref="table"
          bordered
          size="middle"
          rowKey="hash_code"
          :columns="columnsSHTG"
          :dataSource="dataSource2"
          :loading="loading"
          @change="handleTableChange"
          :rowSelection="rowSelection"
          :scroll="{ x: 1800, y: 600 }"
          :pagination="pagination"
          style="margin-top: 20px;"
        >
          <template
            slot="handle_datetime"
            slot-scope="text"
          >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>
          <template slot="news_url" slot-scope="text">
            <a :href="text" style="word-break:break-all" target="_blank">{{text}}</a>
          </template>
          <template
            slot="publish_datetime"
            slot-scope="text"
          >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>
<!--
          <span slot="action" slot-scope="text, record">
            <a @click="handleEditHotP(record)">编辑</a>
            <a @click="disposeMsg(record)" style="margin-left:10px">处理信息</a>
            <a-popconfirm title="确定删除吗?" @confirm="() =>handleDelete(record)">
              <a style="margin-left:10px">删除</a>
            </a-popconfirm>
          </span>-->
          <span slot="simhashCount" slot-scope="text, record">
            <a @click="checkSimhash(record)">查看</a>
          </span>
        </a-table>
      </a-tab-pane>
      
      <a-tab-pane tab="已发布" key="4">
        <a-table
          ref="table"
          bordered
          size="middle"
          rowKey="hash_code"
          :columns="columns"
          :dataSource="dataSourceFabu"
          :loading="loading"
          @change="handleTableChange"
          :rowSelection="rowSelection"
          :scroll="{ x: 1800, y: 600 }"
          :pagination="pagination"
          style="margin-top: 20px;"
        >
          <template
            slot="handle_datetime"
            slot-scope="text"
          >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>
          <template slot="news_url" slot-scope="text">
            <a :href="text" style="word-break:break-all" target="_blank">{{text}}</a>
          </template>
          <template
            slot="publish_datetime"
            slot-scope="text"
          >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>

          <span slot="action" slot-scope="text, record">
            <a @click="handleEditHotP(record)">编辑</a>
            <a-popconfirm title="确定删除吗?" @confirm="() =>handleDelete(record)">
              <a style="margin-left:10px">删除</a>
            </a-popconfirm>
          </span>
          <span slot="simhashCount" slot-scope="text, record">
            <a @click="checkSimhash(record)">查看</a>
          </span>
        </a-table>
      </a-tab-pane>
      
    </a-tabs>
    <!--    <a-row>数据总量：<span class="dxTitle" style="color:red;margin-top: 3px;">{{fooCLE.count}}条</span></a-row>-->
    <div>
      <a-modal title="相似文章" v-model="visible4" @ok="V4popOK" okText="完成" width="1200px" :footer="null" @cancel="quxiaoFn">
        <div class="btns">
          <a @click="changeListWZ">批量操作</a>
          <a @click="deleteAll">删除</a>
        </div>
        <a-table
          ref="table"
          bordered
          size="middle"
          rowKey="hash_code"
          :columns="modalcolumns"
          :dataSource="dataSource3"
          @change="handleTableChange"
          :rowSelection="rowSelection"
          :scroll="{ x: 1800, y: 600 }"
          :pagination="false"
          :loading="loading"
        >
          <template
            slot="handle_datetime"
            slot-scope="text"
          >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>
          <template slot="news_url" slot-scope="text">
            <a :href="text" style="word-break:break-all" target="_blank">{{text}}</a>
          </template>
          <template
            slot="publish_datetime"
            slot-scope="text"
          >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>

          <span slot="action" slot-scope="text,record">
         <!--   <a @click="handleEditWZ(record)">编辑</a>-->
            <a @click="disposeMsg(record)" style="margin-left:10px">处理信息</a>
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

    <a-modal title="已处理信息" v-model="handelVisible">
      <p>一级分类：{{handelMsg.question_level}}</p>
      <p>网络类别：{{handelMsg.media_type_final}}</p>
      <p>网媒来源：{{handelMsg.app_name_final}}</p>
      <p>发布者{{handelMsg.news_author_final}}</p>
      <p>车型：{{handelMsg.auto_brand}}</p>
      <p>调性：{{handelMsg.feel_tag}}</p>
    </a-modal>

		
		<a-modal title="批量驳回" v-model="bohuiPopPiliang" @ok="bohuiOKPiliang" okText="确定驳回">
      <a @click="PL_bohuiAdd" style="margin-top: 20px;">添加驳回原因</a>
      
      <div >

			    <a-table
			      :rowSelection="rowSelectionB"
			      :columns="columnsBohui"
			      :dataSource="bohuiData.list"
	          bordered
	          size="middle"
	          rowKey="id"
	          :pagination= "false"
	          style="margin-top: 20px;"
			   >
			    <span slot="action" slot-scope="text,record">
            <a-popconfirm title="确定删除吗?" @confirm="() =>bohuiDel(record)">
              <a style="margin-left:10px">删除</a>
            </a-popconfirm>
          </span>
			   </a-table>
			  </div>
    </a-modal>
		
		
    <a-modal title="驳回原因" v-model="bohuiPop" @ok="bohuiOK" okText="确定驳回">
      <a @click="bohuiAdd" style="margin-top: 20px;">添加驳回原因</a>
      
      <div >

			    <a-table
			      :rowSelection="rowSelectionB"
			      :columns="columnsBohui"
			      :dataSource="bohuiData.list"
	          bordered
	          size="middle"
	          rowKey="id"
	          :pagination= "false"
	          style="margin-top: 20px;"
			   >
			    <span slot="action" slot-scope="text,record">
            <a-popconfirm title="确定删除吗?" @confirm="() =>bohuiDel(record)">
              <a style="margin-left:10px">删除</a>
            </a-popconfirm>
          </span>
			   </a-table>
			  </div>
    </a-modal>
    
    		<a-modal
		      title="添加驳回原因"
		      v-model="bohuiAddPop"
		      @ok="bohuiAddOK"
		    >
		        <a-row style="margin-top:20px">
		          <a-col :span="15">
		            <a-textarea  style="display: inherit;" placeholder="请输入驳回原因" v-model="bohuiAddData.reason" />
		          </a-col>
		        </a-row>   
		    </a-modal>
		    
		    <a-modal
		      title="添加驳回原因"
		      v-model="PL_bohuiAddPop"
		      @ok="PL_bohuiAddOK"
		    >
		        <a-row style="margin-top:20px">
		          <a-col :span="15">
		            <a-textarea  style="display: inherit;" placeholder="请输入驳回原因" v-model="bohuiAddData.reason" />
		          </a-col>
		        </a-row>   
		    </a-modal>
    
    
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
			 
    

    <a-modal title="立即发布" v-model="visible3" @ok="upData" okText="确定">
      <a-row>
        数据截止日期：
        <span
          class="dxTitle"
          style="color:red;margin-top: 3px;width: 200px;"
        >{{fooCLE.datetime}}</span>
      </a-row>
      <a-row style="margin-top:20px">
        数据总量：
        <span class="dxTitle" style="color:red;margin-top: 3px;">{{fooCLE.count}}条</span>
      </a-row>
    </a-modal>
  </a-card>
</template>
<script>
import {
  getSentimentList,
  getNetwork,
  batchupdate,
  carlist,
  batchdel,
  addtime,
  batchpublish,
  simhash,
  cartypeListbyid,
  sameOrder,
  getCheckList,
  getCheckListBySameorder,
  submitData,
  checkData,
  handledMsg,
  checkSimhash,
  bohuiList,
  bohuiOK,
  bohuiDelAdd,
  cartypeAdd,
  getFenpeiList,
  fabuPL
} from '@/api/newpage'
import moment from 'moment'
import { fail } from 'assert'
export default {
  data() {
    return {
    	fooPOP:{},
    	visible2:false,
    	bohuiPopPiliang:false,
    	bohuiAddData:{},
    	bohuiAddPop:false,
    	PL_bohuiAddPop:false,
    	hash_code_Bohui:[],
    	reject_id:'',
    	Krr:[],
    	columnsBohui:[{
	      title: '原因',
	      dataIndex: 'reason',
    	},{
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          fixed: 'right',
          align: 'center',
          width: 160
        }],
    	bohuiPop:false,
    	bohuiData:{
    	},
      handelVisible: false,
      handelMsg: {},
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 }
      },
      activeKey: 2,
      datalist: [],
      fooPOP: {},
      modalTest: '',
      changeform: {},
      changeType: '',
      value: 1,
      indeterminate: false,
      checkAll: false,
      selectedRowKeys: [], // Check here to configure the default column
      //selectedRowKeysBohui:[],
      loading: false,
      visible: false,
      fooCLE: {},
      pagination: {
        pageSize: 10,
        total: 1,
        showTotal: () => {}
      },
      visible3: false,
      visible4: false,
      visible5: false,
      visibleHotP: false,
      visibleWZ: false,
      form: {
        feel: '',
        orderBy: '',
        mediaAttr: '',
        is_handled: '',
        isPublished: '',
        startTime: '',
        endTime: '',
        //checkboxgroup: [],
        networkCategory: '',
        news_content: '',
        news_title: '',
        app_name: '',
        question_level: '',
        news_author: '',
        auto_brand: '',
        page: 1,
        limit: 10
      },
      simHashForm: {},
      netWorkList: [
        {
          key: '其他',
          value: 0
        },
        {
          key: '微信',
          value: 1
        },
        {
          key: '客户端',
          value: 2
        },
        {
          key: '网页',
          value: 3
        },
        {
          key: '微博',
          value: 4
        },
        {
          key: '论坛',
          value: 5
        },
        {
          key: '视频',
          value: 6
        },
        {
          key: '口碑',
          value: 7
        },
        {
          key: '问答',
          value: 8
        },
        {
          key: '自媒体',
          value: 9
        },
        {
          key: '投诉',
          value: 10
        }
      ],
      defaultNet: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      allCheckList: [],
      modalcolumns: [
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
          title: '标题',
          align: 'center',
          dataIndex: 'news_title',
          width: 280
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
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          fixed: 'right',
          align: 'center',
          width: 160
        }
      ],
        columnsSHTG: [
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
          title: '标题',
          align: 'center',
          dataIndex: 'news_title',
           width: 280
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
          width: 100
        }
      ],
      columns: [
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
          title: '标题',
          align: 'center',
          dataIndex: 'news_title',
           width: 280
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
          width: 100
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          fixed: 'right',
          align: 'center',
          width: 220
        }
      ],
            columnsDaishenhe: [
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
          title: '标题',
          align: 'center',
          dataIndex: 'news_title',
           width: 280
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
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          fixed: 'right',
          align: 'center',
          width: 220
        }
      ],
      dataSource: [],
      unsibmitData: [],
      dataSource2: [],
      dataSource3: [],
      dataSourceFabu: [],
      ids: [],
      uncheckIds: [],
      carList: [],
      showList: true,
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  watch: {
    form: {
      handler(newValue) {
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
        if (this.showList) {
          this.getlist()
        } else {
          this.getListBySameorder()
        }
        // this.getlist()
      },
      deep: true
    }
  },
  mounted() {
    this.cartypeListbyid()
    this.getlist()
    this.getFenpeiList()
  },
  computed: {
    rowSelection() {
    	//const { selectedRowKeys } = this
      return {
      	 
        onChange: (selectedRowKeys, selectedRows) => {
          let arr = []
          for (let i = 0; i < selectedRows.length; i++) {
            arr.push(selectedRows[i].hash_code)
          }
          this.ids = arr
          
        }
      }
    },
    rowSelectionB() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          let orr = []
          for (let i = 0; i < selectedRows.length; i++) {
            orr.push(selectedRows[i].id)
          }
          this.Krr = orr
          console.log(this.Krr)
         this.reject_id = this.getTextByJs(this.Krr)
          console.log(this.reject_id)
        }
      }
    }
    
  },
  methods: {
  	getFenpeiList() {
      getFenpeiList().then(res => {
        console.log(res)
        this.datalist = res.list
        console.log(this.datalist)
        /*this.dataSource = res.list
        this.pagination.total = res.count*/
      })
    },
  	onChangeCarQiye(e) {
      //console.log('radio checked', e.target.value)
      console.log(e)
    },
  	cartypeAdd(){
  		cartypeAdd(this.fooPOP).then(res => {
        console.log(res)
        if (res.code == 200) {
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
  	carAdd(){
  		this.visible2 = true
  	},
  	getTextByJs(e) {
		      var str = "";
		      for (var i = 0; i < e.length; i++) {
		          str += e[i]+ ",";
		      }
		     //去掉最后一个逗号(如果不需要去掉，就不用写)
		     if (str.length > 0) {
		         str = str.substr(0, str.length - 1);
		     }
		    // console.log(str)
		     return str;
		     //console.log(str)
 		},
  	startBohui() {
        this.loading = true;
        // ajax request after empty completing
        setTimeout(() => {
          this.loading = false;
          this.selectedRowKeys = [];
        }, 1000);
    },
    bohuiPiliang(){
    	
    	bohuiList().then(res => {
        if (res.msg == 'success') {
          //this.$message.success(res.info)
          this.bohuiData = res
          this.bohuiData.list = res.list
          console.log(this.bohuiData)
          this.bohuiPopPiliang = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    bohuiOKPiliang(){
    	var obj={
    		hash_code:this.ids,
    		reject_id:this.reject_id
    	}
    	console.log(this.ids)
    	bohuiOK(obj).then(res => {
    		console.log(res)
        if (res.msg == 'success') {
          this.$message.success("驳回成功")
          this.ids = []
          console.log(this.ids)
          this.bohuiPopPiliang = false
          this.getlist()
          /*this.selectedRowKeys = []
          this.selectedRows = []*/
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    bohuiAdd(){
    	this.bohuiAddPop = true
    },
    PL_bohuiAdd(){
    	this.PL_bohuiAddPop = true
    },
    bohuiAddOK(){
    	
    	bohuiDelAdd(this.bohuiAddData).then(res => {
    		console.log(res)
        if (res.msg == 'success') {
          this.$message.success("添加成功")
          this.bohuiAddPop = false
          this.bohuiF5()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    PL_bohuiAddOK(){
    	
    	bohuiDelAdd(this.bohuiAddData).then(res => {
    		console.log(res)
        if (res.msg == 'success') {
          this.$message.success("添加成功")
          this.PL_bohuiAddPop = false
          this.bohuiF5()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    bohuiDel(e){
    	console.log(e)
    	var obj={
    		is_del:1,
    		id:e.id
    	}
    	bohuiDelAdd(obj).then(res => {
    		console.log(res)
        if (res.msg == 'success') {
          this.$message.success("删除成功")
          this.bohuiF5()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    bohuiOK(){
    	var brr = []
    	brr.push(this.hash_code_Bohui) 
    	var obj={
    		hash_code:brr,
    		reject_id:this.reject_id
    	}
    	bohuiOK(obj).then(res => {
    		console.log(res)
        if (res.msg == 'success') {
          this.$message.success("驳回成功")
          
          this.bohuiPop = false
          this.getlist()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  	bohui(record) {
      //this.bohuiData = record
      
      this.hash_code_Bohui = record.hash_code
      console.log( this.hash_code_Bohui)
      
      bohuiList().then(res => {
        if (res.msg == 'success') {
          //this.$message.success(res.info)
          this.bohuiData = res
          this.bohuiData.list = res.list
          console.log(this.bohuiData)
          this.bohuiPop = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    bohuiF5(){
    	bohuiList().then(res => {
        if (res.msg == 'success') {
         // this.$message.success(res.info)
          this.bohuiData = res
          this.bohuiData.list = res.list
          console.log(this.bohuiData)
         // this.bohuiPop = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  	goyifabu(){
  		/*localStorage.setItem('isPublished','2')*/
  		/*this.$router.push({name:'dataC-dataClean',params: {isPublished: '2'}})*/
  		this.$router.push({ path: "/dataC/dataClean"})	
  	}, 
    //全部发布
    issue() {
      addtime().then(res => {
        if (res.code == '200') {
          this.fooCLE = res.list
          this.visible3 = true
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    //批量发布
    issuePL() {
    	if(!this.ids.length){
    		this.$message.success("请先选择发布内容")
    		return
    	}
    	
      fabuPL({hash_code:this.ids}).then(res => {
        if (res.msg == "success") {
          this.$message.success("批量发布成功")
          this.ids = []
          this.loading = true
			        	
										this.getlist()
								
        } else {
        	
          this.$message.warning(res.msg)
        }
      })
    },
    //处理信息
    disposeMsg(record) {
      handledMsg({
        sim_hash: record.hash_code
      }).then(res => {
        console.log(!res.list)
        if (res.list.length > 0) {
          this.handelVisible = true
          this.handelMsg = res.list[0]
        } else {
          this.$message.warning('该条暂无处理信息')
        }
      })
    },
    //审核通过
    submit() {
      if (!this.ids.length) {
        this.$message.warning('请选择至少通过一项！')
        return
      }
      const that = this
      let obj = {
        data: that.ids
      }
      checkData(obj).then(res => {
        if (res.msg == 'success') {
        	that.ids = []
          that.$message.success(res.info)
          that.getlist()
          that.sameOrder()
          that.simhash(that.simHashForm)
        } else {
          that.$message.warning('审核失败')
        }
      })
    },
    daochu() {
      //要导出的json数据
      var jsonData = this.dataSource
      console.log(jsonData)
      //列标题，逗号隔开，每一个逗号就是隔开一个单元格
      //let str = `姓名,电话,邮箱\n`;
      let str = `\n`
      //let str = `录入时间,更新时间,一级分类,网络类别,网媒来源,发布者,文章发布时间,发布时间,标题,链接,车型,形式判断,相似文章\n`;
      //增加\t为了不让表格显示科学计数法或者其他格式
      for (let i = 0; i < jsonData.length; i++) {
        for (let item in jsonData[i]) {
          str += `${jsonData[i][item] + '\t'},`
        }
        str += '\n'
      }
      //encodeURIComponent解决中文乱码
      let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
      //通过创建a标签实现
      var link = document.createElement('a')
      link.href = uri
      //对下载的文件命名
      link.download = 'json数据表.csv'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    hotPX() {
      this.visible5 = true
      this.sameOrder()
    },
    sameOrder() {
      sameOrder().then(res => {
        console.log(res)
        this.dataSource3 = res.list
        this.loading = false
      })
    },
    V4popOK() {
      this.visible4 = false
      this.visible5 = false
    },
    changeHot(e) {
      this.showList = !e.target.checked
      this.form.page = 1
      this.pagination.current = 1
      if (e.target.checked == true) {
        this.getListBySameorder()
      } else {
        this.getlist()
      }
    },
    //热度降序
    getListBySameorder() {
      let obj = this.form
      obj.state = this.activeKey
      getCheckListBySameorder(obj).then(res => {
        if (this.activeKey == 2) {
          this.dataSource = res.list
        } else if (this.activeKey == 3) {
          this.dataSource2 = res.list
        }else if(this.activeKey == 4){
        	this.dataSourceFabu = res.list
        }
        if (res.count) {
          this.pagination.total = res.count
        } else {
          this.pagination.total = 0
        }
        this.pagination.showTotal = () => this.pagination.total
        this.loading = false
      })
    },
     quxiaoFn(){
    	//this.simHashForm = {}
    	this.dataSource3 = []
    },
    //查看相似文章
    checkSimhash(record) {
    	this.loading = true
      console.log(record)
      var sim_hash = record.sim_hash
      var simHashForm = {
        feel: this.form.feel,
        orderBy: this.form.orderBy,
        mediaAttr: this.form.mediaAttr,
        is_handled: this.form.is_handled,
        isPublished: this.form.isPublished,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        networkCategory: this.form.networkCategory,
        news_content: this.form.news_content,
        news_title: this.form.news_title,
        app_name: this.form.app_name,
        question_level: this.form.question_level,
        news_author: this.form.news_author,
        auto_brand: this.form.auto_brand,
        simHash: sim_hash,
        state: this.activeKey
      }
      this.simHashForm = simHashForm
      console.log(sim_hash)
      this.simhash(simHashForm)
      this.visible4 = true
    },
    simhash(e) {
      checkSimhash(e).then(res => {
       // this.dataSource3 = res.list
        if(res.msg == "success"){
      		this.dataSource3 = res.list
        	this.loading = false
      	}else{
      		this.$message.error(res.msg)
      	}
      })
    },
    upData() {
      this.visible3 = false
     /* this.$confirm({
        title: '发布',
        content: '是否确定发布?',
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk() {*/
       	const that = this
          batchpublish().then(res => {
            console.log(res)
            if(res.code == '200' || res.msg == "success"){
		      	that.$message.success("发布成功")
			        	console.log(res.msg)
			        	that.loading = true
			        	setTimeout(function() {

										console.log('3秒钟之后执行了')
										that.getlist()
										},3000)
			        	//this.getlist()
		        }else{
		        	that.$message.error(res.msg)
		        	
		        }
          })
          
       /* },*/
       /* onCancel() {
          console.log('Cancel')
        }
      })*/
    },
    deleteAll() {
      if (!this.ids.length) {
        this.$message.warning('请选择至少删除一项！')
        return
      }
      const that = this
      that.$confirm({
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
          	that.ids = []
          	console.log(res.msg)
            if (that.showList == true) {
            	 console.log('000')
              that.getlist()
            } else {
            	 console.log('111')
              that.getListBySameorder()
            }
            console.log('222')
            //that.getList()
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
        this.carList = res.list
      })
    },
    changeList() {
      if (!this.ids.length) {
        this.$message.warning('请选择修改内容！')
        return
      }
      this.changeform = {}
      this.visible = true
    },
    changeListHotP() {
      if (!this.ids.length) {
        this.$message.warning('请选择修改内容！')
        return
      }
      this.changeform = {}
      this.visibleHotP = true
    },
    changeListWZ() {
      if (!this.ids.length) {
        this.$message.warning('请选择修改内容！')
        return
      }
      this.changeform = {}
      this.visibleWZ = true
    },
    handleTableChange(pagination, filters, sorter) {
      this.form.page = pagination.current
      this.pagination.current = pagination.current
//    console.log(this.showList)
//    if (this.showList) {
//      this.getlist()
//    } else {
//      this.getListBySameorder()
//    }
    },
    changeTab(key) {
      this.activeKey = key
      this.form.page = 1
      this.pagination.current = 1
      
      
      if (this.showList) {
      	this.ids = []
      	this.loading = true
        this.getlist()
      } else {
        this.getListBySameorder()
      }
    },
    getlist() {
     //  this.ids = []
      let obj = this.form
      
      obj.state = this.activeKey
      getCheckList(obj).then(res => {
      	console.log(res)
        if (this.activeKey == 2) {
          this.dataSource = res.list
        } else if(this.activeKey == 3){
          this.dataSource2 = res.list
        }else if(this.activeKey == 4){
        	this.dataSourceFabu = res.list
        }
        
        if (res.count) {
          this.pagination.total = res.count
        } else {
          this.pagination.total = 0
        }
        this.pagination.showTotal = () => this.pagination.total
        this.loading = false
      })
      //   getSentimentList(obj).then(res => {
      //     this.dataSource = res.list
      //     if (res.count) {
      //       this.pagination.total = res.count
      //     }
      //     this.pagination.showTotal = () => this.pagination.total
      //     this.loading = false
      //   })
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
      console.log(this.changeform)
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
       // this.loading = true
        this.sameOrder()
        this.simhash(this.simHashForm)
      })
    },
    changeMsg(record) {},

    showModal() {
      this.visible = true
    },
    handleOk(e) {
      //this.loading = true
      let obj = JSON.parse(JSON.stringify(this.changeform))
      let hash_codeArr = []
      if (!this.changeform.hash_code) {
        obj.hash_code = this.ids
      } else {
        
        hash_codeArr.push(this.changeform.hash_code)
        obj.hash_code = hash_codeArr
      }

      let newObj = {
        data: JSON.stringify(obj),
        isRecord: 1
      }
      batchupdate(newObj).then(res => {
      	this.ids = []
        console.log(res)
        this.visible = false
        this.getlist()
      })
    },
    handleOkHotP(e) {
      //this.loading = true
      let obj = JSON.parse(JSON.stringify(this.changeform))
//    delete obj.hash_code
      console.log(this.changeform)
      let hash_codeArr = []
      if (!this.changeform.hash_code) {
        obj.hash_code = this.ids
      } else {
        console.log(this.changeform.hash_code)
        hash_codeArr.push(this.changeform.hash_code)
        obj.hash_code = hash_codeArr
      }
			
			console.log(obj.hash_code)


      let newObj = {
        data: JSON.stringify(obj),
        isRecord: 1
      }
      batchupdate(newObj).then(res => {
      		this.ids = []
        console.log(res)
        this.visibleHotP = false
        //this.sameOrder()
      })
    },
    handleOkWZ(e) {
      //this.loading = true
       let obj = JSON.parse(JSON.stringify(this.changeform))
      if (!this.changeform.hash_code) {
        obj.hash_code = this.ids
      } else {
        let hash_codeArr = []
        hash_codeArr.push(this.changeform.hash_code)
        obj.hash_code = hash_codeArr
      }

      let newObj = {
        data: JSON.stringify(obj),
        isRecord: 1
      }
      batchupdate(newObj).then(res => {
      		this.ids = []
        console.log(res)
        this.visibleWZ = false
        this.visible4 = false
        
       // this.sameOrder()
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
    handleChange(value) {
      console.log(value)
      this.form.networkCategory = value
    },
    changeDate(dates, dateStrings) {
      this.form.startTime = dateStrings[0]
      this.form.endTime = dateStrings[1]
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