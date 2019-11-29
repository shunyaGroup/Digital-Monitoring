<template>
<div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
            <a-row class='headRow'>
                  <span class="dxTitle">排序</span>
                  <a-radio-group @change="onChange" v-model="value">
                    <a-radio :value="1">文章数降序</a-radio>
                    <a-radio :value="2">关注度降序</a-radio>
                  </a-radio-group>
            </a-row>
            <a-row class='headRow'>
                  <span class="dxTitle">媒体名称</span>
                  <a-col :span="10">
                    <a-input placeholder=""/>
                  </a-col>
            </a-row>
            <a-row class='headRow'>
                  <span class="dxTitle">媒体来源</span>
                  <a-col :span="10">
                    <a-input placeholder=""  />
                  </a-col>
            </a-row>
            <a-row class='headRow'>
                  <span class="dxTitle">地区</span>
                  <!--省市区三级联动-->
                  <div class="divwrap" v-if="show">
                    <v-distpicker  @province="onChangeProvince1" @city="onChangeCity"
                                 hide-area></v-distpicker>
                  </div>
                  <!--遮罩层-->
                 <!--  <div class="blacks" v-if="show" @click="countermand"></div> -->
                  <!--触发选择-->
                 <!--  <div @click="choose">
                    <span>请选择</span>
                  </div> -->
            </a-row>

      </a-layout-header>
      <a-layout-content>
        <div style="margin-bottom: 16px">
          <!--<a-button
            type="primary"
            @click="start"
            :disabled="!hasSelected"
            :loading="loading"
          >
            Reload
          </a-button>-->
          <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{`Selected ${selectedRowKeys.length} items`}}
            </template>
          </span>
        </div>
        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data" >
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
            <template slot="action" slot-scope="text">
              <a @click="" style="margin-right:10px">删除</a>
              <a @click="handleEdit(record)" style="margin-right:10px">编辑</a>
              <a @click="">转发</a>
            </template>
        </a-table>
            <a-modal
                :title="modalTest"
                :visible="visible"
                @ok="handleOk"
                :confirmLoading="confirmLoading"
                @cancel="handleCancel"
              >
                <a-form :form="form">
                  <a-form-item label="情感属性" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                     <a-radio-group @change="onChange" v-model="value">
                      <a-radio :value="1">负面</a-radio>
                      <a-radio :value="2">中性</a-radio>
                      <a-radio :value="3">正面</a-radio>
                     </a-radio-group>
                  </a-form-item>
                  <a-form-item label="一级标签" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                      <a-select defaultValue="产品正面信息" style="width: 354px" @change="handleChangeUP">
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                        <a-select-option value="disabled" disabled>Disabled</a-select-option>
                        <a-select-option value="Yiminghe">yiminghe</a-select-option>
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                        <a-select-option value="disabled" disabled>Disabled</a-select-option>
                        <a-select-option value="Yiminghe">yiminghe</a-select-option>
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                        <a-select-option value="disabled" disabled>Disabled</a-select-option>
                        <a-select-option value="Yiminghe">yiminghe</a-select-option>
                      </a-select>
                  </a-form-item>
                  <a-form-item label="车型标签" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                    <a-input v-model="form.abc" />
                  </a-form-item>
                  <a-form-item label="网络来源" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                    <a-input v-model="form.abc" />
                  </a-form-item>
                  <a-form-item label="发布者" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                    <a-input v-model="form.abc" />
                  </a-form-item>
                  <a-form-item label="网络类别" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                    <a-radio-group @change="onChange" v-model="value">
                      <a-radio :value="1">网页</a-radio>
                      <a-radio :value="2">微信</a-radio>
                      <a-radio :value="3">微博</a-radio>
                      <a-radio :value="4">客户端</a-radio>
                      <a-radio :value="5">论坛</a-radio>
                    </a-radio-group>
                  </a-form-item>
                </a-form>
              </a-modal>
      </a-layout-content>
     <!-- <a-layout-footer>Footer</a-layout-footer>-->
    </a-layout>
</div>
</template>
<script>
import VDistpicker from 'v-distpicker'


//['录入时间', '一级分类', '网媒类别','网媒来源','发布者','标题','链接','车型','形势判断','发布时间','相似文章','关注度','操作']
const plainOptions = ['微信', '微博', '网页','客户端','论坛','视频','口碑','问答','自媒体']
const defaultCheckedList = ['口碑', '客户端']
const columns = [
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
       /* {
          title: '链接',
          align: 'center',
          dataIndex: 'news_url',
          scopedSlots: { customRender: 'news_url' },
          width: 280
        },*/
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
      ]

/*[{
                  title: '录入时间',
                  dataIndex: 'name',
                  }, {
                  title: '一级分类',
                  dataIndex: 'age',
                  }, {
                  title: '网媒类别',
                  dataIndex: 'address',
                  },{
                  title: '网媒来源',
                  dataIndex: 'name',
                  }, {
                  title: '发布者',
                  dataIndex: 'age',
                  }, {
                  title: '标题',
                  dataIndex: 'address',
                  },{
                  title: '链接',
                  dataIndex: 'name',
                  }, {
                  title: '车型',
                  dataIndex: 'age',
                  }, {
                  title: '形势判断',
                  dataIndex: 'address',
                  },{
                  title: '发布时间',
                  dataIndex: 'name',
                  }, {
                  title: '相似文章',
                  dataIndex: 'age',
                  }, {
                  title: '关注度',
                  dataIndex: 'address',
                  },{
                  title: '操作',
                  dataIndex: 'action',
                  scopedSlots: { customRender: 'action' },
                  align: 'center'
                  }]*/;

const data = [
        {
            "feel_tag": "负面",
            "news_read_count": 0,
            "xy_scheme_type_id": 1,
            "news_like_count": 0,
            "create_time_milli": 1569270219354,
            "hash_code": "63-5ae36dde89d247e005a3903ae87ec3ba",
            "handle_datetime": "2019-09-24 08:27:18",
            "assign_datetime": "2019-09-24 08:27:07",
            "news_uuid": "5ae36dde89d247e005a3903ae87ec3ba",
            "create_datetime": "2019-09-24 04:23:39",
            "auto_brand": "哈弗H6",
            "news_posttime": "2019-09-23 21:04:06",
            "handle_time_milli": 0,
            "is_assigned": 1,
            "news_author_final": "Turbo生活",
            "question_level": "产品力吐槽",
            "news_url": "http://a.mp.uc.cn/article.html?uc_param_str=&from=media#!wm_cid=312899786602708992!!wm_aid=37b62730ba1e42c6908823e44bd3952a!!wm_id=3187fa427de0492198b84aeb6fb8da6f",
            "xy_scheme_category": 1,
            "publish_datetime": "2019-09-24 08:28:10",
            "app_name_final": "大鱼号",
            "network_category": 2,
            "media_type_final": "客户端",
            "xy_scheme_id": 753,
            "assign_runner": 1,
            "sim_hash": "0c61274b9d6558bd84ecee07c7aa491a",
            "attention": 0,
            "news_title": "【破局】长安何以“安”？",
            "news_category": "未知",
            "status": 1,
            "simhashCount": 1
        },
        {
            "feel_tag": "负面",
            "news_read_count": 0,
            "xy_scheme_type_id": 1,
            "news_like_count": 0,
            "create_time_milli": 1569266948668,
            "hash_code": "63-e505822fa2840b9fef0681650e8edb57",
            "handle_datetime": "2019-09-24 08:27:18",
            "assign_datetime": "2019-09-24 08:27:07",
            "news_uuid": "e505822fa2840b9fef0681650e8edb57",
            "create_datetime": "2019-09-24 03:29:08",
            "auto_brand": "CS75 PLUS",
            "news_posttime": "2019-09-24 03:02:00",
            "handle_time_milli": 0,
            "is_assigned": 1,
            "news_author_final": "深圳新闻头条",
            "question_level": "产品力吐槽",
            "news_url": "http://www.szxwtt.com/xwzx/show-130472.html",
            "xy_scheme_category": 1,
            "publish_datetime": "2019-09-24 08:28:10",
            "app_name_final": "深圳新闻头条",
            "network_category": 3,
            "media_type_final": "地方媒体",
            "xy_scheme_id": 753,
            "assign_runner": 1,
            "sim_hash": "741bae7da9ce255f808121174219a806",
            "attention": 0,
            "news_title": "这几款国产车小毛病最多，车主投诉不断，老司机：谁买谁后悔",
            "news_category": "未知",
            "status": 1,
            "simhashCount": 2
        },
        {
            "feel_tag": "负面",
            "news_read_count": 61,
            "xy_scheme_type_id": 1,
            "news_like_count": 0,
            "create_time_milli": 1569264802340,
            "hash_code": "63-528a9bb2aff99b34a9839acf93435e21",
            "handle_datetime": "2019-09-24 08:27:18",
            "assign_datetime": "2019-09-24 08:27:07",
            "news_uuid": "528a9bb2aff99b34a9839acf93435e21",
            "create_datetime": "2019-09-24 02:53:22",
            "auto_brand": "CS75 PLUS",
            "news_posttime": "2019-09-23 21:01:00",
            "handle_time_milli": 0,
            "is_assigned": 1,
            "news_author_final": "琪车人",
            "question_level": "产品力吐槽",
            "news_url": "http://www.365yg.com/motor/m/feed/detail?group_id=6738188483640164878",
            "xy_scheme_category": 1,
            "publish_datetime": "2019-09-24 08:28:10",
            "app_name_final": "懂车帝",
            "network_category": 4,
            "media_type_final": "车友圈",
            "xy_scheme_id": 753,
            "assign_runner": 1,
            "sim_hash": "dff0641801e67041c6b5f7a9873dd714",
            "attention": 0,
            "news_title": "哈弗H6对手，荣威RX5新增一款车型，售13.88万元",
            "news_category": "未知",
            "status": 1,
            "simhashCount": 0
        },
        {
            "feel_tag": "负面",
            "news_read_count": 342,
            "xy_scheme_type_id": 1,
            "news_like_count": 0,
            "create_time_milli": 1569264801880,
            "hash_code": "63-0b954166b6aaaf94f81af9e49a17de91",
            "handle_datetime": "2019-09-24 08:27:18",
            "assign_datetime": "2019-09-24 08:27:07",
            "news_uuid": "0b954166b6aaaf94f81af9e49a17de91",
            "create_datetime": "2019-09-24 02:53:21",
            "auto_brand": "CS75 PLUS",
            "news_posttime": "2019-09-23 18:20:51",
            "handle_time_milli": 0,
            "is_assigned": 1,
            "news_author_final": "街拍酷车",
            "question_level": "产品力吐槽",
            "news_url": "http://m.zjurl.cn/motor/m/feed/detail?group_id=6739808931331179021",
            "xy_scheme_category": 1,
            "publish_datetime": "2019-09-24 08:28:10",
            "app_name_final": "懂车帝",
            "network_category": 2,
            "media_type_final": "客户端",
            "xy_scheme_id": 753,
            "assign_runner": 1,
            "sim_hash": "741bae7da9ce255f808121174219a806",
            "attention": 0,
            "news_title": "提车1.5T尊贵型，新车上路，请多多指教",
            "news_category": "未知",
            "status": 1,
            "simhashCount": 2
        },
        {
            "feel_tag": "负面",
            "news_read_count": 0,
            "xy_scheme_type_id": 1,
            "news_like_count": 0,
            "create_time_milli": 1569261084075,
            "hash_code": "63-7826f1cc71b449270f7966c9458b8a0a",
            "handle_datetime": "2019-09-24 08:27:18",
            "assign_datetime": "2019-09-24 08:27:07",
            "news_uuid": "7826f1cc71b449270f7966c9458b8a0a",
            "create_datetime": "2019-09-24 01:51:24",
            "auto_brand": "CS75 PLUS",
            "news_posttime": "2019-09-23 18:27:20",
            "handle_time_milli": 0,
            "is_assigned": 1,
            "news_author_final": "知乎",
            "question_level": "产品力吐槽",
            "news_url": "https://zhuanlan.zhihu.com/p/83782479",
            "xy_scheme_category": 1,
            "publish_datetime": "2019-09-24 08:28:10",
            "app_name_final": "知乎_其他",
            "network_category": 5,
            "media_type_final": "论坛",
            "xy_scheme_id": 753,
            "assign_runner": 1,
            "sim_hash": "741bae7da9ce255f808121174219a806",
            "attention": 0,
            "news_title": "长安CS75PLUS火了，周末完成万人交车",
            "news_category": "未知",
            "status": 1,
            "simhashCount": 2
        },
        {
            "feel_tag": "负面",
            "news_read_count": 0,
            "xy_scheme_type_id": 1,
            "news_like_count": 0,
            "create_time_milli": 1569259038469,
            "hash_code": "63-6afa2ea32772e221e7b15eb576b625eb",
            "handle_datetime": "2019-09-24 08:27:18",
            "assign_datetime": "2019-09-24 08:27:07",
            "news_uuid": "6afa2ea32772e221e7b15eb576b625eb",
            "create_datetime": "2019-09-24 01:17:18",
            "auto_brand": "哈弗H6",
            "news_posttime": "2019-09-24 00:00:00",
            "handle_time_milli": 0,
            "is_assigned": 1,
            "news_author_final": "艾仕汽车大亨",
            "question_level": "产品力吐槽",
            "news_url": "http://mp.weixin.qq.com/s?__biz=MzU4OTcyNDU3Nw==&mid=2247487872&idx=6&sn=6afa2ea32772e221e7b15eb576b625eb&scene=0",
            "xy_scheme_category": 1,
            "publish_datetime": "2019-09-24 08:28:10",
            "app_name_final": "微信",
            "network_category": 1,
            "media_type_final": "微信",
            "xy_scheme_id": 753,
            "assign_runner": 1,
            "sim_hash": "0c61274b9d6558bd84ecee07c7aa491a",
            "attention": 0,
            "news_title": "长安CS75PLUS又搞事情，居然连吉尼斯世界纪录都不放过",
            "news_category": "未知",
            "status": 1,
            "simhashCount": 1
        },
        {
            "feel_tag": "负面",
            "news_read_count": 0,
            "xy_scheme_type_id": 1,
            "news_like_count": 0,
            "create_time_milli": 1569254128932,
            "hash_code": "63-9240080cc9bc0a40d87212cbab1d28fc",
            "handle_datetime": "2019-09-24 08:27:18",
            "assign_datetime": "2019-09-24 08:27:07",
            "news_uuid": "ac906ebdb3f087e26bd79aa1c582943a",
            "create_datetime": "2019-09-23 23:55:28",
            "auto_brand": "CS75 PLUS",
            "news_posttime": "2019-09-23 23:34:38",
            "handle_time_milli": 0,
            "is_assigned": 1,
            "news_author_final": "阜新友金",
            "question_level": "产品力吐槽",
            "news_url": "http://weibo.com/6196529433/I8jQHiBo8",
            "xy_scheme_category": 1,
            "publish_datetime": "2019-09-24 08:28:10",
            "app_name_final": "微博",
            "network_category": 4,
            "media_type_final": "微博",
            "xy_scheme_id": 753,
            "assign_runner": 1,
            "sim_hash": "e34613104989fc6501ea9ca0aff47e47",
            "attention": 0,
            "news_title": "转发",
            "news_category": "未知",
            "status": 1,
            "simhashCount": 0
        },
        {
            "feel_tag": "负面",
            "news_read_count": 1,
            "xy_scheme_type_id": 1,
            "news_like_count": 0,
            "create_time_milli": 1569250971399,
            "hash_code": "63-239edb0e81a3f8696784e1e4dbb1a4a2",
            "handle_datetime": "2019-09-24 08:27:18",
            "assign_datetime": "2019-09-24 08:27:07",
            "news_uuid": "239edb0e81a3f8696784e1e4dbb1a4a2",
            "create_datetime": "2019-09-23 23:02:51",
            "auto_brand": "CS75 PLUS",
            "news_posttime": "2019-09-23 22:52:29",
            "handle_time_milli": 0,
            "is_assigned": 1,
            "news_author_final": "车速的人生",
            "question_level": "产品力吐槽",
            "news_url": "http://k.sina.cn/article_6468511094_1818da57600100l4id.html",
            "xy_scheme_category": 1,
            "publish_datetime": "2019-09-24 08:28:10",
            "app_name_final": "车速的人生",
            "network_category": 9,
            "media_type_final": "自媒体",
            "xy_scheme_id": 753,
            "assign_runner": 1,
            "sim_hash": "c857e2f7f7ab1ca0c40d8d3d30c29308",
            "attention": 0,
            "news_title": "瑞虎8的1.6t和CS75plus2.0T，操控和性价比谁好",
            "news_category": "未知",
            "status": 1,
            "simhashCount": 1
        },
        {
            "feel_tag": "负面",
            "news_read_count": 1,
            "xy_scheme_type_id": 1,
            "news_like_count": 0,
            "create_time_milli": 1569250970421,
            "hash_code": "63-596d2d837d39d533fb3fee040ac9b801",
            "handle_datetime": "2019-09-24 08:27:18",
            "assign_datetime": "2019-09-24 08:27:07",
            "news_uuid": "596d2d837d39d533fb3fee040ac9b801",
            "create_datetime": "2019-09-23 23:02:50",
            "auto_brand": "CS75 PLUS",
            "news_posttime": "2019-09-23 22:52:29",
            "handle_time_milli": 0,
            "is_assigned": 1,
            "news_author_final": "车速的人生",
            "question_level": "产品力吐槽",
            "news_url": "http://k.sina.com.cn/article_6468511094_1818da57600100l4id.html",
            "xy_scheme_category": 1,
            "publish_datetime": "2019-09-24 08:28:10",
            "app_name_final": "车速的人生",
            "network_category": 9,
            "media_type_final": "自媒体",
            "xy_scheme_id": 753,
            "assign_runner": 1,
            "sim_hash": "c857e2f7f7ab1ca0c40d8d3d30c29308",
            "attention": 0,
            "news_title": "史上最“恶心”网红，让我看到了人性真实的一面",
            "news_category": "未知",
            "status": 1,
            "simhashCount": 1
        },
        {
            "feel_tag": "负面",
            "news_read_count": 0,
            "xy_scheme_type_id": 1,
            "news_like_count": 0,
            "create_time_milli": 1569250168731,
            "hash_code": "63-b3ec9504d6f00f76a9dcb22ba88e705a",
            "handle_datetime": "2019-09-24 08:27:18",
            "assign_datetime": "2019-09-24 08:27:07",
            "news_uuid": "b3ec9504d6f00f76a9dcb22ba88e705a",
            "create_datetime": "2019-09-23 22:49:28",
            "auto_brand": "CS75 PLUS",
            "news_posttime": "2019-09-23 21:40:00",
            "handle_time_milli": 0,
            "is_assigned": 1,
            "news_author_final": "茶妙生活",
            "question_level": "产品力吐槽",
            "news_url": "http://3g.k.sohu.com/t/n395462130",
            "xy_scheme_category": 1,
            "publish_datetime": "2019-09-24 08:28:10",
            "app_name_final": "搜狐新闻",
            "network_category": 2,
            "media_type_final": "客户端",
            "xy_scheme_id": 753,
            "assign_runner": 1,
            "sim_hash": "3010ce30fb7fb2a29b480bd996cbb689",
            "attention": 0,
            "news_title": "CS75PLUS不怎么样！",
            "news_category": "未知",
            "status": 1,
            "simhashCount": 0
        }
    ];
/*for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}*/
//import { getList } from '@/api/newpage'
//import moment from 'moment'
export default {
    components: { VDistpicker },
    name: "particular",
  data () {
    return {
        lxr: '',
        lxdh: '',
        show: true,
        //省市区
        province: '',
        city: '',
        //area: '',
      value: 1,
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      visible:false,
      form: {},
      modalTest:'666'
    }
  },
  props: ['ips'],
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    //取消选择地区
      countermand: function () {
        this.show = false
      },
      //打开选择地区
      choose: function () {
        this.show = true;
      },
      onChangeProvince1: function (a) {
        this.province = a.value;
        if (a.value == '台湾省') {
          this.show = false;
        }
         console.log(this.province)
      },
      onChangeCity: function (a) {
        this.city = a.value;
        console.log(this.city)
      },
      // onChangeArea: function (a) {
      //   this.area = a.value;
      //   this.show = false;
      //   this.city = this.province + this.city + this.area;
      // },
    onDelete(key) {
      
    },
    handleEdit(record) {
      /*this.form = record*/
      this.visible = true
      this.disable = true
    },
    changeMsg(record) {
      
    },
    onChange (e) {
      console.log('radio checked', e.target.value)
    },
    onChangeMore (checkedList) {
      this.indeterminate = !!checkedList.length && (checkedList.length < plainOptions.length)
      this.checkAll = checkedList.length === plainOptions.length
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      })
    },
    start () {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
      }, 3000);
    },
    handleCancel(e) {
      this.visible = false;
    },
    handleChangeUP(value) {
      console.log(`selected ${value}`);
    },
  },
}
</script>
<style scoped>
/* 遮罩层
.blacks {
  position: fixed;
  width: 100%;
  height: 50%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.45);
}
省市区三级联动
.divwrap {
  height: 50%;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 99;
}

外部
.divwrap > .distpicker-address-wrapper {
  color: #0d0d0d;
  height: 100%;
}

头部
.divwrap >>> .address-header {
  background: #000;
  color: #fff;
  width: 100%;
  position: fixed;
  bottom: 50%;
  height: 0.5rem;
  font-size: 0.2rem;
}

头部内容
.divwrap >>> .address-header ul li {
  flex-grow: 1;
  text-align: center;
}

选择过省市区的头部
.divwrap >>> .address-header .active {
  color: #fff;
  border-bottom: 0.05rem solid #666;
}

内容部分
.divwrap >>> .address-container {
  overflow: scroll;
  height: 100%;
}

点过的地区内容
.divwrap >>> .address-container .active {
  color: red;
} */

/* #components-layout-demo-basic {
  text-align: center;
} */


/*.disabled-select >>> select:nth-child(3){
  display: none !important;
}
*/


#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #fff;/*#7dbcea*/
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
  height: auto;
  line-height: auto;
}
.dxTitle{
  display: inline-block;
  width: 80px;
  float: left;
}
.headRow{
    height: 46px;
    line-height: 46px;
   /* border-bottom: 1px solid;*/
}

</style>