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
              <!-- <a-checkbox-group v-model="form.networkCategory">
                <a-checkbox
                  :checked="true"
                  v-for="(item,index) in netWorkList"
                  :key="index"
                  :value="item.value"
                >{{item.key}}({{item.count}})</a-checkbox>
              </a-checkbox-group>-->
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div>
      <!--<a-button type="primary" @click="showModal">点击此处 • 添加方案类型</a-button>-->
      <a-modal title="清洗完成" v-model="visible3" @ok="upData" okText="立即发布">
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
    </div>
    <div class="btns">
      <a
        @click="pulldata"
        style="font-weight: bold;color: #ffffff;background: #0080FF;border-radius: 2px; padding: 1px 5px;"
      >拉取</a>
      <a @click="changeList">批量操作</a>
      <a @click="deleteAll">删除</a>
      <a @click="submit">提交审批</a>
      <a-checkbox style="margin-left:15px" @change="changeHot">热度降序</a-checkbox>
      <a @click="carAdd" style="font-weight: bold;color: #ffffff;background: #0080FF;border-radius: 2px; padding: 1px 5px;">车型添加</a>
      
      <!-- <a @click="cleanData">清洗完成</a> -->
      <!--<a @click="upData">立即发布</a>-->
      <!-- <a @click="getlist">查看全部</a> -->
      <!-- <a @click="carAdd">车型添加</a> -->
      <!-- <a @click="hotPX">热度降序</a> -->
      <!-- <a @click="daochu">导出CSV文件</a>-->

      <!-- <div>
        <a-modal title="相似文章·热度降序" v-model="visible5" @ok="V4popOK" okText="完成" width="1200px">
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
              <a :href="text" style="word-break:break-all">{{text}}</a>
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
      </div>-->
    </div>
    <a-tabs type="card" @change="changeTab">
      <a-tab-pane tab="待处理" key="1">
        <a-table
          ref="table"
          bordered
          size="middle"
          rowKey="hash_code"
          :columns="columns"
          :dataSource="dataSource"
          :loading="loading"
          @change="handleTableChange"
          :rowSelection="rowSelection"
          :scroll="{ x: 1800, y: 600 }"
          :pagination="pagination"
        >
          <template
            slot="handle_datetime"
            slot-scope="text, record"
          >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>
          <template slot="news_url" slot-scope="text, record">
          	<a @click="jifenTiao(text,record)" style="word-break:break-all" target="_blank">{{text}}</a>
           <!-- <a :href="text" style="word-break:break-all" target="_blank">{{text}}</a>-->
          </template>
          <template
            slot="publish_datetime"
            slot-scope="text, record"
          >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>

          <span slot="action" slot-scope="text, record">
            <a @click="handleEditHotP(record)">编辑</a>
            <a @click="disposeMsg(record)" style="margin-left:10px">历史判断</a>
            <a-popconfirm title="确定删除吗?" @confirm="() =>handleDelete(record)">
              <a style="margin-left:10px">删除</a>
            </a-popconfirm>
          </span>

          <span slot="simhashCount" slot-scope="text, record">
            <a @click="checkSimhashJifen(record)">查看</a>
          </span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane tab="已处理" key="3">
        <a-table
          ref="table"
          bordered
          size="middle"
          rowKey="hash_code"
          :columns="columns"
          :dataSource="dataSource"
          :loading="loading"
          @change="handleTableChange"
          :rowSelection="rowSelection"
          :scroll="{ x: 1800, y: 600 }"
          :pagination="pagination"
        >
          <template
            slot="handle_datetime"
            slot-scope="text, record"
          >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>
          <template slot="news_url" slot-scope="text, record">
          	<a @click="jifenTiao(text,record)" style="word-break:break-all" target="_blank">{{text}}</a>
           <!-- <a :href="text" style="word-break:break-all" target="_blank">{{text}}</a>-->
          </template>
          <template
            slot="publish_datetime"
            slot-scope="text, record"
          >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>

          <span slot="action" slot-scope="text, record">
            <a @click="handleEditHotP(record)">编辑</a>
            <a @click="disposeMsg(record)" style="margin-left:10px">历史判断</a>
            <a-popconfirm title="确定删除吗?" @confirm="() =>handleDelete(record)">
              <a style="margin-left:10px">删除</a>
            </a-popconfirm>
          </span>

          <span slot="simhashCount" slot-scope="text, record">
            <a @click="checkSimhashJifen(record)">查看</a>
          </span>
        </a-table>
      </a-tab-pane>
            <a-tab-pane tab="已提交" key="2">
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
          :pagination="pagination"
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
          <!--  <a @click="disposeMsg(record)" style="margin-left:10px">处理信息</a>-->
            <a-popconfirm title="确定删除吗?" @confirm="() =>handleDelete(record)">
              <a style="margin-left:10px">删除</a>
            </a-popconfirm>
          </span>

          <span slot="simhashCount" slot-scope="text, record">
            <a @click="checkSimhash(record)">查看</a>
          </span>
        </a-table>
      </a-tab-pane>
    <a-tab-pane tab="驳回" key="5">
        <a-table
          ref="table"
          bordered
          size="middle"
          rowKey="hash_code"
          :columns="columns"
          :dataSource="dataSourceX"
          :loading="loading"
          @change="handleTableChange"
          :rowSelection="rowSelection"
          :scroll="{ x: 1800, y: 600 }"
          :pagination="pagination"
        >
          <template
            slot="handle_datetime"
            slot-scope="text, record"
          >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>
          <template slot="news_url" slot-scope="text, record">
          	<a @click="jifenTiao(text,record)" style="word-break:break-all" target="_blank">{{text}}</a>
           <!-- <a :href="text" style="word-break:break-all" target="_blank">{{text}}</a>-->
          </template>
          <template
            slot="publish_datetime"
            slot-scope="text, record"
          >{{text == '1970-01-01 00:00:00' ? '' : text}}</template>

          <span slot="action" slot-scope="text, record">
          	<a @click="lookBohui(record)">驳回原因</a>
            <a @click="handleEditHotP(record)" style="margin-left:10px">编辑</a>
            <a @click="disposeMsg(record)" style="margin-left:10px">历史判断</a>
            <a-popconfirm title="确定删除吗?" @confirm="() =>handleDelete(record)">
              <a style="margin-left:10px">删除</a>
            </a-popconfirm>
          </span>

          <span slot="simhashCount" slot-scope="text, record">
            <a @click="checkSimhashJifen(record)">查看</a>
          </span>
        </a-table>
      </a-tab-pane>
    </a-tabs>
    <!--    <a-row>数据总量：<span class="dxTitle" style="color:red;margin-top: 3px;">{{fooCLE.count}}条</span></a-row>-->
    <div>
      <a-modal title="相似文章" v-model="visible4" @ok="V4popOK" okText="完成" width="1200px" @cancel="quxiaoFn" :footer="null">
        <div class="btns">
          <a @click="changeListWZ">批量操作</a>
          <a @click="deleteAll">删除</a>
        </div>
        <a-table
          ref="table"
          bordered
          size="middle"
          rowKey="hash_code"
          :columns="columns2"
          :dataSource="dataSource2"
          :loading="loading"
          @change="handleTableChange"
          :rowSelection="rowSelection"
          :scroll="{ x: 1800, y: 600 }"
          :pagination="false"
          
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
           <!-- <a @click="handleEditWZ(record)">编辑</a>-->
            <!--<a @click="disposeMsg(record)" style="margin-left:10px">处理信息</a>-->
            <a-popconfirm title="确定删除吗?" @confirm="() =>handleDelete(record)">
              <a style="margin-left:10px">删除</a>
            </a-popconfirm>
          </span>

          <span slot="simhashCount" slot-scope="text, record">
            <a @click="checkSimhash(record)">查看</a>
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


		<a-modal
		      title="驳回原因"
		      v-model="bohuiPop"
		      
		      :footer="null"
		    >

		        <template v-for="(tag, index) in items_Del">
				      <a-tag  :key="tag.id" :closable="false" >
				        {{tag.reason}}
				      </a-tag>
				    </template>
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
import {
  getSentimentList,
  getNetwork,
  batchupdate,
  carlist,
  batchdel,
  addtime,
  batchpublish,
  simhash,
  cartypeAdd,
  cartypeListbyid,
  sameOrder,
  getDataList,
  pullData,
  getListBySameorder,
  submitData,
  checkSimhash,
  handledMsgFf,
  jiluJifen,
  bohuiYuanyin,
  getFenpeiList
} from '@/api/newpage'
import moment from 'moment'
import { fail } from 'assert'
export default {
  data() {
    return {
    	datalist:[],
    	visible2:false,
    	bohuiPop:false,
    	items_Del:[],
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 }
      },
      activeKey: 1,
      fooPOP: {},
      modalTest: '',
      changeform: {},
      changeType: '',
      value: 1,
      indeterminate: false,
      checkAll: false,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      visible: false,
      fooCLE: {},
      pagination: {
        pageSize: 10,
        total: 0,
        showTotal: () => {}
      },
      visible3: false,
      visible4: false,
      visible5: false,
      visibleHotP: false,
      visibleWZ: false,
      form: {
      	isHandled:'0',
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
          width: 200
        }
      ],
      columns2: [
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
          width: 200
        }
      ],
      dataSource: [],
      unsibmitData: [],
      dataSource2: [],
      dataSource3: [],
      dataSourceX:[],
      ids: '',
      carList: [],
      showList: true
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
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          let arr = []
          for (let i = 0; i < selectedRows.length; i++) {
            arr.push(selectedRows[i].hash_code)
          }
          this.ids = arr
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
  	/*goyifabu(){
  		localStorage.setItem('isPublished','2')
  		this.$router.push({name:'dataC-dataClean',params: {isPublished: '2'}})
  		this.$router.push({ path: "/dataC/dataClean"})
  		
  		
  	}, 	*/
   
    lookBohui(record){
    	
    	bohuiYuanyin({hash_code:record.hash_code}).then(res => {
    		if(res.code == '200' || res.msg == "success"){
	        	console.log(res)
		        this.items_Del = res.list
		        this.bohuiPop = true
        }else{
        		this.$message.error(res.msg)
        }
      })
    },
     //处理信息
    disposeMsg(record) {
    	console.log(record)
      handledMsgFf({
        sim_hash: record.hash_code
      }).then(res => {
      	
      	if(res.code == '200' || res.msg == "success"){
	        	console.log('成功')
        }else{
        	console.log(res.msg)
        		//this.$message.error(res.msg)
        }
      	
        console.log(!res.list)
        if (res.list.length > 0) {
          this.handelVisible = true
          this.handelMsg = res.list[0]
        } else {
          this.$message.warning('该条暂无处理信息')
        }
      })
    },
		jifenTiao(text,record){
			console.log(text)
			console.log(record)
			jiluJifen({
        hash_code: record.hash_code
      }).then(res => {
        console.log(res)
      	window.open(text,'_blank' )
      	
      	if(res.code == '200' || res.msg == "success"){
	        	console.log(res.msg)
        }else{
        		this.$message.error(res.msg)
        }
      	
      })	
		},
    //提交审核
    submit() {
      submitData().then(res => {
        
        if(res.code == '200' || res.msg == "success"){
        	this.$message.success(res.info)
	        	console.log(res.msg)
        }else{
        		this.$message.error(res.msg)
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
      getListBySameorder(obj).then(res => {
        if (this.activeKey == 1) {
          this.dataSource = res.list
        }else if(this.activeKey == 5){
        	this.dataSourceX = res.list
        }else {
          this.dataSource2 = res.list
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
    	this.dataSource2 = []
    	this.getlist()
    },
    //查看相似文章带积分
    checkSimhashJifen(record) {
    	this.loading = true
      console.log(record)
      
      jiluJifen({
        sim_hash: record.sim_hash
      }).then(res => {
        console.log(res)
      })	
      
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
    //查看相似文章
    checkSimhash(record) {
    	/*this.simHashForm ={}*/
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
    simhash(e) {
      checkSimhash(e).then(res => {
      	if(res.msg == "success"){
      		this.dataSource2 = res.list
        	this.loading = false
      	}else{
      		this.$message.error(res.msg)
      	}
        
        //this.pagination.pageSize = 100000
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
            
             if(res.code == '200' || res.msg == "success"){
		        	this.$message.success('成功')
			        	console.log(res.msg)
		        }else{
		        		this.$message.error(res.msg)
		        }
            
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
            if (that.showList == true) {
              that.getlist()
            } else {
              that.getListBySameorder()
            }
            that.getlist()
            that.sameOrder()
            that.simhash(that.simHashForm)
            
            
            if(res.code == '200' || res.msg == "success"){
		        	that.$message.success('成功')
			        	console.log(res.msg)
		        }else{
		        		that.$message.error(res.msg)
		        }
            
            
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
      this.pagination.current = pagination.current
//    if (this.showList == true) {
//      this.getList()
//    } else {
//      this.getListBySameorder()
//    }
    },
    pulldata() {
      pullData().then(res => {
        
        if(res.code == '200' || res.msg == "success"){
	        	this.$message.success(res.info)
	          this.getlist()
        }else{
        	this.$message.error(res.msg)
        }
        
      })
    },

    changeTab(key) {
      this.activeKey = key
      if(key == 1){
      	this.form.isHandled = '0'
      }
      if(key == 3){
      	this.activeKey = 1
      	this.form.isHandled = '1'
      } 
      if(key == 2 || key == 5 ){
      	 delete this.form.isHandled
      } 
      if (this.showList) {
        this.getlist()
      } else {
        this.getListBySameorder()
      }
    },
    getlist() {
    	console.log(this.ids)
    	this.ids = []
    	console.log(this.ids)
      let obj = this.form
      obj.state = this.activeKey
     
      getDataList(obj).then(res => {
      	console.log(res)
        if (this.activeKey == 1) {
          this.dataSource = res.list
        }else if(this.activeKey == 5){
        	this.dataSourceX = res.list
        }else {
          this.dataSource2 = res.list
        }
        if (res.count) {
          this.pagination.total = res.count
        } else {
          this.pagination.total = 0
        }
        this.pagination.showTotal = () => this.pagination.total
        this.loading = false
        
        
        if(res.code == '200' || res.msg == "success"){
		        	//this.$message.success('成功')
			        	console.log(res.msg)
		        }else{
		        		this.$message.error(res.msg)
		        }
        
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
    handleOk(e) {
     // this.loading = true
       let obj = JSON.parse(JSON.stringify(this.changeform))
      if (!this.changeform.hash_code) {
        obj.hash_code = this.ids
      } else {
        let hash_codeArr = []
        hash_codeArr.push(this.changeform.hash_code)
        obj.hash_code = hash_codeArr
      }
      console.log(obj)
      // let newObj = {
      //   data: JSON.stringify(obj)
      // }
      // batchupdate(newObj).then(res => {
      //   console.log(res)
      //   this.visible = false
      //   this.getlist()
      // })
    },
    handleOkHotP(e) {
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
        data: JSON.stringify(obj)
      }
      console.log(obj)
      // batchupdate(newObj).then(res => {
      //   console.log(res)
      //   this.visibleHotP = false
      //   if(res.code == '200' || res.msg == "success"){
		  //       	this.$message.success('成功')
			//         	console.log(res.msg)
		  //       }else{
		  //       		this.$message.error(res.msg)
		  //       }
      // })
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
        data: JSON.stringify(obj)
      }
      batchupdate(newObj).then(res => {
        console.log(res)
        this.visibleWZ = false
        this.visible4 = false
        //this.sameOrder()
        this.getlist()
        //      this.sameOrder()
        this.simhash(this.simHashForm)
        
        if(res.code == '200' || res.msg == "success"){
		        	this.$message.success('成功')
			        	console.log(res.msg)
		        }else{
		        		this.$message.error(res.msg)
		        }
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