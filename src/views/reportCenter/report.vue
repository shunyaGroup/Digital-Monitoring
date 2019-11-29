<template>
	<a-card :bordered="false">
		<a-tabs defaultActiveKey="1">
			<a-tab-pane tab="舆情aaa日报" key="1">
				<a-button type="primary" @click="add">添加报告</a-button>
				<a-table ref="table" bordered size="middle" rowKey="id" :columns="columns" :dataSource="dataSource" :pagination="pagination" :loading="loading" @change="handleTableChange" :rowSelection="rowSelection">
					<span slot="action" slot-scope="text, record,index">
            <a @click="details(record,index)">详情</a>
            <a @click="details(record,index)">修改</a>
          </span>
				</a-table>
			</a-tab-pane>
			<a-tab-pane tab="车型日报" key="2" forceRender>
				<a-button type="primary" @click="add">添加报告</a-button>
				<a-table ref="table" bordered size="middle" rowKey="id" :columns="columns" :dataSource="dataSource2" :pagination="pagination" :loading="loading" @change="handleTableChange" :rowSelection="rowSelection">
					<span slot="action" slot-scope="text, record,index">
            <a @click="details2(index)">详情</a>
          </span>
				</a-table>
			</a-tab-pane>
			<a-tab-pane tab="销量日报" key="3">
				<a-button type="primary" @click="add">添加报告</a-button>
				<a-table ref="table" bordered size="middle" rowKey="id" :columns="columns" :dataSource="dataSource3" :pagination="pagination" :loading="loading" @change="handleTableChange" :rowSelection="rowSelection">
					<span slot="action" slot-scope="text, record,index">
            <a @click="details3(index)">详情</a>
          </span>
				</a-table>
			</a-tab-pane>
			<a-tab-pane tab="专项日报" key="4">
				<a-button type="primary" @click="add">添加报告</a-button>
				<a-table ref="table" bordered size="middle" rowKey="id" :columns="columns" :dataSource="dataSource4" :pagination="pagination" :loading="loading" @change="handleTableChange" :rowSelection="rowSelection">
					<span slot="action" slot-scope="text, record,index">
            <a @click="details4(index)">详情</a>
          </span>
				</a-table>
			</a-tab-pane>
		</a-tabs>

		<a-modal title="添加报告" :visible="visible" @ok="handleOk" @cancel="handleCancel">
			<a-form>
				<a-form-item label="报告名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
					<a-input v-model="addform.name" />
				</a-form-item>
				<a-form-item label="报告标题" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
					<a-input v-model="addform.title" />
				</a-form-item>
				<a-form-item label="报告类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
					<a-select v-model="addform.type">
						<a-select-option value="1">日报</a-select-option>
						<a-select-option value="2">车型日报</a-select-option>
						<a-select-option value="3">销量日报</a-select-option>
						<a-select-option value="4">专项日报</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item label="开始时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
					<a-date-picker :disabledDate="disabledStartDate" showTime format="YYYY-MM-DD HH:mm:ss" v-model="startValue" placeholder="Start" @openChange="handleStartOpenChange" />
				</a-form-item>
				<a-form-item label="结束时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
					<a-date-picker :disabledDate="disabledEndDate" showTime format="YYYY-MM-DD HH:mm:ss" placeholder="End" v-model="endValue" :open="endOpen" @openChange="handleEndOpenChange" />
				</a-form-item>
			</a-form>
		</a-modal>

		<a-modal title="详情" :visible="showDetail" @ok="handleClose" @cancel="handleClose" width="1000px">

			<img src="./img/report-tit.png" alt style="width:100%;" />
			<div style="width: 100%;text-align: center;height: 40px;line-height: 40px;font-size: 24px;font-weight: bold;margin-top: 15px;">{{timeData}}</div>

			<div style="width: 100%;text-align: center;height: 40px;line-height: 40px;font-size: 28px;font-weight: bold;margin-top: 15px;color: #000;">核心竞品舆情健康度趋势</div>
			<div style="font-size: 26px;">&nbsp;&nbsp;&nbsp;&nbsp;{{today}}{{strT}}</div>
			<a-radio-group @change="onChangeTime" v-model="value" style="margin: 0 auto; margin-top: 30px;text-align: center;width: 100%;margin-bottom: 30px;">
				<!--<a-radio-button value="a">近一月</a-radio-button>-->
				<a-radio-button value="a">21-28天前</a-radio-button>
				<a-radio-button value="b" style="margin-left: 30px;">14-21天前</a-radio-button>
				<a-radio-button value="c" style="margin-left: 30px;">7-14天前</a-radio-button>
				<a-radio-button value="d" style="margin-left: 30px;">近7天</a-radio-button>
			</a-radio-group>
			<div id="mainJKD" style="width:100%;height:350px;border: 0px solid #0071CE;padding: 0px;margin: 0 auto;margin-top: 0px;"></div>
			<a-row style="text-align: center;">
				<!--<a-input v-if="inputVisible" ref="input" type="text" size="small" :style="{ width: '280px' }" :value="inputValue" @change="handleInputChangeS" @blur="handleInputConfirmS(inputValue)" @keyup.enter="handleInputConfirmS(inputValue)" style="background: #fff; borderStyle: dashed;padding: 0 10px;
						    text-align: center;
						    font-size: 15px;
						    color: #096dd9;
						    height: 36px;
						    line-height: 36px;
						    margin-bottom: 30px;" />-->

				<span style="margin-right: 30px;">日期：</span>
				<template v-for="(tag, index) in tags" style="margin-top: 0px;">
					<a-tooltip :key="tag" :title="tag">

						<a-tag :key="tag" :closable="false" :afterClose="() => handleCloseC(tag)" style="background: #fff; borderStyle: dashed;padding: 0 10px;
				    text-align: center;
				    font-size: 15px;
				    color: #096dd9;
				    height: 36px;
				    line-height: 36px;
				    margin-bottom: 30px;">
							{{tag}}
						</a-tag>
					</a-tooltip>
				</template>
			</a-row>
			<a-row style="text-align: center;">
				<input v-for="(tag, index) in tags" :key="index"></input>
			</a-row>
			<a-row style="text-align: center;">
				<span style="margin-right: 17px;">{{qiyeA}}</span>
				<template v-for="(tagA, index) in tagsA">
					<a-tooltip :key="index">
						<a-tag :key="index" style="background: #fff; borderStyle: dashed;padding: 0 10px;
					    text-align: center;
					    font-size: 15px;
					    color: #096dd9;
					    height: 36px;
					    line-height: 36px;
					    margin-bottom: 30px;
					    width: 98px;">
							{{tagA}}
						</a-tag>
					</a-tooltip>
				</template>
				<!--<template v-for="(tagA, index) in tagsA">
					<a-tooltip :key="index">-->
						<a-input v-for="(tagA, index) in tagsA" :key="index" style="background: #fff; borderStyle: dashed;padding: 0 10px;
					    text-align: center;
					    font-size: 15px;
					    color: #096dd9;
					    height: 36px;
					    line-height: 36px;
					    margin-bottom: 30px;
					    width: 98px;">
							{{tagA}}
						</a-input>
				<!--	</a-tooltip>
				</template>-->
				<a-input
				      v-if="inputVisible"
				      ref="input"
				      type="text"
				      size="small"
				      :style="{ width: '78px' }"
				      :value="inputValue"
				      @change="handleInputChange"
				      @blur="handleInputConfirm"
				      @keyup.enter="handleInputConfirm"
				    />
				<a-tag v-else @click="showInputS" v-for="(tag, index) in tags" style="background: #fff; borderStyle: dashed;">
			      <a-icon type="plus" />{{tag}}
			    </a-tag>
			</a-row>

			<a-row style="text-align: center;">
				<span style="margin-right: 17px;">{{qiyeB}}</span>
				<template v-for="(tagB, index) in tagsB">
					<a-tooltip :key="index">
						<a-tag :key="index" style="background: #fff; borderStyle: dashed;padding: 0 10px;
					    text-align: center;
					    font-size: 15px;
					    color: #096dd9;
					    height: 36px;
					    line-height: 36px;
					    margin-bottom: 30px;
					    width: 98px;">
							{{tagB}}
						</a-tag>
					</a-tooltip>
				</template>
			</a-row>

			<a-row style="text-align: center;">
				<span style="margin-right: 17px;">{{qiyeC}}</span>
				<template v-for="(tagC, index) in tagsC">
					<a-tooltip :key="index">
						<a-tag :key="index" style="background: #fff; borderStyle: dashed;padding: 0 10px;
					    text-align: center;
					    font-size: 15px;
					    color: #096dd9;
					    height: 36px;
					    line-height: 36px;
					    margin-bottom: 30px;
					    width: 98px;">
							{{tagC}}
						</a-tag>
					</a-tooltip>
				</template>
			</a-row>

			<a-row style="text-align: center;">
				<span style="margin-right: 17px;">{{qiyeD}}</span>
				<template v-for="(tagD, index) in tagsD">
					<a-tooltip :key="index">
						<a-tag :key="index" style="background: #fff; borderStyle: dashed;padding: 0 10px;
					    text-align: center;
					    font-size: 15px;
					    color: #096dd9;
					    height: 36px;
					    line-height: 36px;
					    margin-bottom: 30px;
					    width: 98px;">
							{{tagD}}
						</a-tag>
					</a-tooltip>
				</template>
			</a-row>

			<!-- ECharts长安舆情概览 -->

			<div style="width: 100%;text-align: center;height: 40px;line-height: 40px;font-size: 28px;font-weight: bold;margin-top: 15px;color: #000;">长安舆情概览</div>
			<div style="font-size: 26px;">&nbsp;&nbsp;&nbsp;&nbsp;今日，媒体报道及双微信息总量为{{overview.weiMediaTotal}}篇，其中媒体报道{{overview.mediaTotal}}篇（原创{{overview.mediaOrigin}}篇），包含负面{{overview.negativeTotal}}篇（原创{{overview.negativeOrigin}}篇），原创负面率{{overview.negativeOriginRate}}%（低），舆情健康度{{overview.healthDegree}}分。</div>
			<div id="main" style="width:100%;height:350px;border: 0px solid #0071CE;padding: 0px;margin-top: 50px;"></div>

			<h2 style="font-weight: bold;font-size: 19px;margin-top: 30px;">关注度TOP10</h2>
			<!-- 关注度Top10 -->
			<a-table ref="table" bordered size="middle" rowKey="hash_code" :columns="columnsTop" :dataSource="attentionTop" :loading="loading" @change="handleTableChange" :pagination="false" style="margin-top: 10px;">
				<!--<span slot="action" slot-scope="text, record,index">
            <a @click="details(record,index)">详情</a>
          </span>-->
			</a-table>

			<!-- 正面信息车型占比 -->
			<div id="mainZM" style="width:100%;height:450px;border: 0px solid #0071CE;margin-top: 50px;"></div>

		</a-modal>

		<a-modal title="详情" :visible="showDetail2" @ok="handleClose2" @cancel="handleClose2">
			<img src="./img/a_2.png" v-if="detailImg !=2 && detailImg !=3&& detailImg!=4" alt style="width:100%;" />
			<img src="./img/a_2.png" v-if="detailImg ==2" alt style="width:100%;" />
			<img src="./img/a_2.png" v-if="detailImg ==3" alt style="width:100%;" />
			<img src="./img/a_2.png" v-if="detailImg ==4" alt style="width:100%;" />
		</a-modal>

		<a-modal title="详情" :visible="showDetail3" @ok="handleClose3" @cancel="handleClose3">
			<img src="./img/a_3.png" v-if="detailImg !=2 && detailImg !=3&& detailImg!=4" alt style="width:100%;" />
			<img src="./img/a_2.png" v-if="detailImg ==2" alt style="width:100%;" />
			<img src="./img/a_2.png" v-if="detailImg ==3" alt style="width:100%;" />
			<img src="./img/a_2.png" v-if="detailImg ==4" alt style="width:100%;" />
		</a-modal>

		<a-modal title="详情" :visible="showDetail4" @ok="handleClose4" @cancel="handleClose4">
			<img src="./img/a_4.png" v-if="detailImg !=2 && detailImg !=3&& detailImg!=4" alt style="width:100%;" />
			<img src="./img/a_2.png" v-if="detailImg ==2" alt style="width:100%;" />
			<img src="./img/a_2.png" v-if="detailImg ==3" alt style="width:100%;" />
			<img src="./img/a_2.png" v-if="detailImg ==4" alt style="width:100%;" />
		</a-modal>

	</a-card>

</template>
<script>

	import { getReportList, addReport, ribaoFile } from '@/api/newpage'
	import moment from 'moment'
	var echarts = require('echarts');
	export default {

		data() {
			return {
				value: 'a',
				tags: [],
				tagsA: [],
				tagsB: [],
				tagsC: [],
				tagsD: [],
				inputVisible: false,
				inputValue: '',
				arrJkdQiye: [],
				today: '',
				strT: '',
				oboline: {},
				showDetail: false,
				showDetail2: false,
				showDetail3: false,
				showDetail4: false,
				detailImg: '',
				startValue: null,
				endValue: null,
				endOpen: false,
				visible: false,
				addform: {
					name: '',
					title: '',
					type: 1,
					startTime: '',
					endTime: ''
				},
				columns: [{
						title: '报告名称',
						align: 'center',
						dataIndex: 'name'
					},
					{
						title: '报告标题',
						align: 'center',
						dataIndex: 'title'
					},
					{
						title: '报告类型',
						align: 'center',
						dataIndex: 'type'
					},
					{
						title: '创建时间',
						align: 'center',
						dataIndex: 'created_at'
					},
					{
						title: '操作',
						align: 'center',
						dataIndex: 'action',
						scopedSlots: {
							customRender: 'action'
						}
					}
				],
				columnsTop: [{
						title: '序号',
						align: 'center',
						dataIndex: 'sort'
					},
					{
						title: '分类',
						align: 'center',
						dataIndex: 'question_level'
					},
					{
						title: '关注度',
						align: 'center',
						dataIndex: 'attentionSum'
					},
					{
						title: '调性',
						align: 'center',
						dataIndex: 'feel_tag'
					},
					{
						title: '车型',
						align: 'center',
						dataIndex: 'auto_brand'
					},
					{
						title: '标题',
						align: 'center',
						dataIndex: 'news_title'
					}
				],
				rbList: [],
				dataSource: [],
				fileData: {},
				overview: {},
				attentionTop: [],
				positiveAttention: [],
				timeData: '',
				pagination: {
					pageSize: 10,
					total: 0,
					page: 1,
					showTotal: () => {}
				},
				loading: false,
				dataSource2: [{
						"id": 75,
						"enterprise_id": 6,
						"title": "长安车型日报",
						"name": "长安报告",
						"type": "日报",
						"is_del": 0,
						"startTime": "2019-09-23 03:50:30",
						"endTime": "2019-09-27 03:50:33",
						"createBy": 1,
						"updateBy": 0,
						"created_at": "2019-09-20 15:50:41",
						"updated_at": "2019-09-20 15:50:41",
						"enterprise": {
							"id": 6,
							"simple_name": "长安汽车",
							"logo": "/storage/app/admin/img/20190825225154-5d62a08a2a8b5.jpg"
						}
					},
					{
						"id": 74,
						"enterprise_id": 6,
						"title": "长安车型日报",
						"name": "长安报告",
						"type": "日报",
						"is_del": 0,
						"startTime": "2019-09-24 03:49:24",
						"endTime": "2019-09-26 03:49:27",
						"createBy": 1,
						"updateBy": 0,
						"created_at": "2019-09-20 15:49:33",
						"updated_at": "2019-09-20 15:49:33",
						"enterprise": {
							"id": 6,
							"simple_name": "长安汽车",
							"logo": "/storage/app/admin/img/20190825225154-5d62a08a2a8b5.jpg"
						}
					},
					{
						"id": 72,
						"enterprise_id": 6,
						"title": "长安车型日报",
						"name": "长安报告",
						"type": "日报",
						"is_del": 0,
						"startTime": "2019-08-16 18:00:00",
						"endTime": "2019-08-17 18:00:00",
						"createBy": 5,
						"updateBy": 0,
						"created_at": "2019-09-18 17:43:25",
						"updated_at": "2019-09-18 17:43:25",
						"enterprise": {
							"id": 6,
							"simple_name": "长安汽车",
							"logo": "/storage/app/admin/img/20190825225154-5d62a08a2a8b5.jpg"
						}
					},
					{
						"id": 73,
						"enterprise_id": 6,
						"title": "长安车型日报",
						"name": "长安报告",
						"type": "日报",
						"is_del": 0,
						"startTime": "2019-08-16 18:00:00",
						"endTime": "2019-08-17 18:00:00",
						"createBy": 5,
						"updateBy": 0,
						"created_at": "2019-09-18 18:06:24",
						"updated_at": "2019-09-18 18:06:24",
						"enterprise": {
							"id": 6,
							"simple_name": "长安汽车",
							"logo": "/storage/app/admin/img/20190825225154-5d62a08a2a8b5.jpg"
						}
					}
				],
				dataSource3: [{
						"id": 75,
						"enterprise_id": 6,
						"title": "长安销量日报",
						"name": "长安报告",
						"type": "日报",
						"is_del": 0,
						"startTime": "2019-09-23 03:50:30",
						"endTime": "2019-09-27 03:50:33",
						"createBy": 1,
						"updateBy": 0,
						"created_at": "2019-09-20 15:50:41",
						"updated_at": "2019-09-20 15:50:41",
						"enterprise": {
							"id": 6,
							"simple_name": "长安汽车",
							"logo": "/storage/app/admin/img/20190825225154-5d62a08a2a8b5.jpg"
						}
					},
					{
						"id": 74,
						"enterprise_id": 6,
						"title": "长安销量日报",
						"name": "长安报告",
						"type": "日报",
						"is_del": 0,
						"startTime": "2019-09-24 03:49:24",
						"endTime": "2019-09-26 03:49:27",
						"createBy": 1,
						"updateBy": 0,
						"created_at": "2019-09-20 15:49:33",
						"updated_at": "2019-09-20 15:49:33",
						"enterprise": {
							"id": 6,
							"simple_name": "长安汽车",
							"logo": "/storage/app/admin/img/20190825225154-5d62a08a2a8b5.jpg"
						}
					}
				],
				dataSource4: [{
						"id": 75,
						"enterprise_id": 6,
						"title": "长安专项日报",
						"name": "长安报告",
						"type": "日报",
						"is_del": 0,
						"startTime": "2019-09-23 03:50:30",
						"endTime": "2019-09-27 03:50:33",
						"createBy": 1,
						"updateBy": 0,
						"created_at": "2019-09-20 15:50:41",
						"updated_at": "2019-09-20 15:50:41",
						"enterprise": {
							"id": 6,
							"simple_name": "长安汽车",
							"logo": "/storage/app/admin/img/20190825225154-5d62a08a2a8b5.jpg"
						}
					},
					{
						"id": 74,
						"enterprise_id": 6,
						"title": "长安专项日报",
						"name": "长安报告",
						"type": "日报",
						"is_del": 0,
						"startTime": "2019-09-24 03:49:24",
						"endTime": "2019-09-26 03:49:27",
						"createBy": 1,
						"updateBy": 0,
						"created_at": "2019-09-20 15:49:33",
						"updated_at": "2019-09-20 15:49:33",
						"enterprise": {
							"id": 6,
							"simple_name": "长安汽车",
							"logo": "/storage/app/admin/img/20190825225154-5d62a08a2a8b5.jpg"
						}
					},
					{
						"id": 72,
						"enterprise_id": 6,
						"title": "长安专项日报",
						"name": "长安报告",
						"type": "日报",
						"is_del": 0,
						"startTime": "2019-08-16 18:00:00",
						"endTime": "2019-08-17 18:00:00",
						"createBy": 5,
						"updateBy": 0,
						"created_at": "2019-09-18 17:43:25",
						"updated_at": "2019-09-18 17:43:25",
						"enterprise": {
							"id": 6,
							"simple_name": "长安汽车",
							"logo": "/storage/app/admin/img/20190825225154-5d62a08a2a8b5.jpg"
						}
					},
					{
						"id": 73,
						"enterprise_id": 6,
						"title": "长安专项日报",
						"name": "长安报告",
						"type": "日报",
						"is_del": 0,
						"startTime": "2019-08-16 18:00:00",
						"endTime": "2019-08-17 18:00:00",
						"createBy": 5,
						"updateBy": 0,
						"created_at": "2019-09-18 18:06:24",
						"updated_at": "2019-09-18 18:06:24",
						"enterprise": {
							"id": 6,
							"simple_name": "长安汽车",
							"logo": "/storage/app/admin/img/20190825225154-5d62a08a2a8b5.jpg"
						}
					},
					{
						"id": 88,
						"enterprise_id": 6,
						"title": "长安专项日报",
						"name": "长安报告",
						"type": "日报",
						"is_del": 0,
						"startTime": "2019-08-16 18:00:00",
						"endTime": "2019-08-17 18:00:00",
						"createBy": 5,
						"updateBy": 0,
						"created_at": "2019-09-18 18:06:24",
						"updated_at": "2019-09-18 18:06:24",
						"enterprise": {
							"id": 6,
							"simple_name": "长安汽车",
							"logo": "/storage/app/admin/img/20190825225154-5d62a08a2a8b5.jpg"
						}
					}
				],
				dateBrandHealth_1: {},
				dateBrandHealth_2: {},
				dateBrandHealth_3: {},
				dateBrandHealth_4: {},
				sewenTime: [],
				Health: [],
				qiyeA: '',
				qiyeB: '',
				qiyeC: '',
				qiyeD: '',
			}
		},
		watch: {
			startValue(val) {
				this.addform.startTime = moment(val).format('YYYY-MM-DD hh:mm:ss ')
			},
			endValue(val) {
				this.addform.endTime = moment(val).format('YYYY-MM-DD hh:mm:ss ')
			}
		},
		computed: {
			rowSelection() {
				return {
					onChange: (selectedRowKeys, selectedRows) => {}
				}
			}
		},
		mounted() {
			this.getList()
			//this.ribaoXQ()
		},
		methods: {
		
			onChangeTime(e) {
				console.log(`checked = ${e.target.value}`);
				var e = e.target.value
				console.log(e)
				if(e == 'a') {
					this.sewenTime = this.dateBrandHealth_1.dateList
					this.Health = this.dateBrandHealth_1.data
					if(this.dateBrandHealth_1.data.length !== 0) {
						this.tagsA = this.dateBrandHealth_1.data[0].data
						console.log(this.tagsA)
						this.tagsB = this.dateBrandHealth_1.data[1].data
						console.log(this.tagsB)
						this.tagsC = this.dateBrandHealth_1.data[2].data
						console.log(this.tagsC)
						this.tagsD = this.dateBrandHealth_1.data[3].data
						console.log(this.tagsD)
					} else {
						this.kong()
					}
				} else if(e == 'b') {
					this.sewenTime = this.dateBrandHealth_2.dateList
					this.Health = this.dateBrandHealth_2.data
					if(this.dateBrandHealth_2.data.length !== 0) {
						this.tagsA = this.dateBrandHealth_2.data[0].data
						console.log(this.tagsA)
						this.tagsB = this.dateBrandHealth_2.data[1].data
						console.log(this.tagsB)
						this.tagsC = this.dateBrandHealth_2.data[2].data
						console.log(this.tagsC)
						this.tagsD = this.dateBrandHealth_2.data[3].data
						console.log(this.tagsD)
					} else {
						this.kong()
					}
				} else if(e == 'c') {
					this.sewenTime = this.dateBrandHealth_3.dateList
					this.Health = this.dateBrandHealth_3.data
					if(this.dateBrandHealth_3.data.length !== 0) {
						this.tagsA = this.dateBrandHealth_3.data[0].data
						console.log(this.tagsA)
						this.tagsB = this.dateBrandHealth_3.data[1].data
						console.log(this.tagsB)
						this.tagsC = this.dateBrandHealth_3.data[2].data
						console.log(this.tagsC)
						this.tagsD = this.dateBrandHealth_3.data[3].data
						console.log(this.tagsD)
					} else {
						this.kong()
					}
				} else if(e == 'd') {
					this.sewenTime = this.dateBrandHealth_4.dateList
					this.Health = this.dateBrandHealth_4.data
					if(this.dateBrandHealth_4.data.length !== 0) {
						this.tagsA = this.dateBrandHealth_4.data[0].data
						console.log(this.tagsA)
						this.tagsB = this.dateBrandHealth_4.data[1].data
						console.log(this.tagsB)
						this.tagsC = this.dateBrandHealth_4.data[2].data
						console.log(this.tagsC)
						this.tagsD = this.dateBrandHealth_4.data[3].data
						console.log(this.tagsD)
					} else {
						this.kong()
					}
				} else {
					console.log('else')
				}
				console.log(this.sewenTime)
				this.jianKD(this.arrJkdQiye, this.Health, this.sewenTime)
				this.tags = this.sewenTime
				console.log(this.arrJkdQiye, this.Health, this.sewenTime)
			},
			handleCloseS(removedTag) {
				const tags = this.tags.filter(tag => tag !== removedTag)
				console.log(tags)
				this.tags = tags
				console.log(tags)
			},
			showInputS() {
				this.inputVisible = true
				this.$nextTick(function() {
					this.$refs.input.focus()
				})
				console.log(this.inputValue)
			},
			handleInputChangeS(e) {

				this.inputValue = e.target.value
				console.log(this.inputValue)
			},
			handleInputConfirmS() {
				const inputValue = this.inputValue

				let tags = this.tags

				if(inputValue && tags.indexOf(inputValue) === -1) {
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
			ribaoXQ(obj) {
				//日报详情
				ribaoFile(obj).then(res => {
					console.log(res)

					if(res.msg == 'success') {
						console.log(res.msg)
						this.fileData = res.list

						this.dateBrandHealth_1 = res.list.dateBrandHealth_1
						this.dateBrandHealth_2 = res.list.dateBrandHealth_2
						this.dateBrandHealth_3 = res.list.dateBrandHealth_3
						this.dateBrandHealth_4 = res.list.dateBrandHealth_4

						this.tags = res.list.dateBrandHealth_1.dateList
						console.log(this.tags)

						if(res.list.dateBrandHealth_1.data.length !== 0) {
							this.tagsA = res.list.dateBrandHealth_1.data[0].data
							console.log(this.tagsA)
							this.tagsB = res.list.dateBrandHealth_1.data[1].data
							console.log(this.tagsB)
							this.tagsC = res.list.dateBrandHealth_1.data[2].data
							console.log(this.tagsC)
							this.tagsD = res.list.dateBrandHealth_1.data[3].data
							console.log(this.tagsD)
						} else {
							this.tagsA = []
							this.tagsB = []
							this.tagsC = []
							this.tagsD = []
							console.log(res.list.dateBrandHealth_1.length)
						}

						this.attentionTop = res.list.attentionTop

						this.positiveAttention = res.list.positiveAttention

						this.timeData = res.list.date

						console.log(this.timeData)
						console.log(this.positiveAttention)
						console.log(this.attentionTop)
						console.log(this.fileData)
						var rbdata = this.fileData.tagAttention.data
						console.log(rbdata)
						this.rbList = rbdata
						console.log(this.rbList)

						// this.oboline = res.list.brandHealth;

						this.yuqingGailan(this.rbList);
						this.zmZB(this.positiveAttention)

						/*this.fileData.attentionTop*/

						this.overview = res.list.overview
						console.log(this.overview)

						this.oboline = res.list.brandHealth
						/*this.oboline =	{
            "长安汽车": 15,
            "福特汽车": 0,
            "吉利汽车": 0
        }*/

						const that = this
						console.log(that.oboline)
						console.log(typeof that.oboline)

						if(Object.prototype.isPrototypeOf(that.oboline) && Object.keys(that.oboline).length === 0) {
							console.log('111')
							that.today = ''
							that.strT = ''
						} else {
							console.log('222')
							that.today = '今日，'
						}

						var obo = that.oboline
						var str = ''
						var jkdQiye = ''
						Object.keys(obo).forEach(function(key) {

							console.log(key, obo[key]);
							str += key + '舆情健康度' + obo[key] + '分；'
							// console.log(str)
							that.strT = str
							//console.log(that.strT)
							jkdQiye += key + ','
							//console.log(jkdQiye)
						});
						console.log(that.strT)
						console.log(jkdQiye)
						var reg = /,$/gi;
						jkdQiye = jkdQiye.replace(reg, "");
						console.log(jkdQiye)

						var arrJkdQiye = jkdQiye.split(',');
						var dateBrandHealth_1_Data = res.list.dateBrandHealth_1.data
						console.log(arrJkdQiye)
						console.log(typeof arrJkdQiye)

						that.arrJkdQiye = arrJkdQiye
						console.log(that.arrJkdQiye)
						that.qiyeA = that.arrJkdQiye[0]
						console.log(that.qiyeA)
						that.qiyeB = that.arrJkdQiye[1]
						that.qiyeC = that.arrJkdQiye[2]
						that.qiyeD = that.arrJkdQiye[3]
						that.Health = dateBrandHealth_1_Data
						that.sewenTime = that.dateBrandHealth_1.dateList
						console.log(that.arrJkdQiye, that.Health, that.sewenTime)
						that.jianKD(that.arrJkdQiye, that.Health, that.sewenTime)
					} else {
						that.$message.warning(res.msg)
					}
				})
			},
			kong() {
				this.tagsA = []
				this.tagsB = []
				this.tagsC = []
				this.tagsD = []
			},
			jianKD(q, w, r) {
				console.log(q, w, r)
				var myChart = echarts.init(document.getElementById('mainJKD'));
				var option = {
					title: {
						text: ''
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: q
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						feature: {
							/*saveAsImage: {}*/
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: r
					},
					yAxis: {
						type: 'value'
					},
					series: w
				};
				myChart.setOption(option);
			},
			zmZB(z) {
				console.log(z)
				var myChart = echarts.init(document.getElementById('mainZM'));
				var option = {
					title: {
						text: '正面信息车型占比',
						/* subtext: '纯属虚构',
						 x:'center'*/
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					toolbox: {
						feature: {
							/*saveAsImage: {}*/
						}
					},
					series: [{
						name: '',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: z,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						},
						label: {
							formatter: "{b}: {c} ({d}%)",
						}
					}]
				};
				myChart.setOption(option);
			},
			yuqingGailan(e) {
				console.log(e)
				//长安舆情概览  扇形图

				if(!e) {
					console.log('aaa')

				} else {
					console.log('bbb')
					for(var i = 0; i < e.length; i++) {
						e[i].name = e[i].name + '\n(其中负面占比：' + e[i].negativeRate + ')'
						console.log(e[i].name)
					}
				}

				var myChart = echarts.init(document.getElementById('main'));
				var option2 = {
					title: {
						text: '',
						/* subtext: '纯属虚构',
						 x:'center'*/
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					toolbox: {
						feature: {
							/* saveAsImage: {}*/
						}
					},
					series: [{
						name: '',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: e,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						},
						label: {
							formatter: "{b}:\n {c} ({d}%)",
						}
					}]
				};
				myChart.setOption(option2);
			},
			handleClose3() {
				this.showDetail3 = false
			},
			details3(index) {
				console.log(index)
				this.detailImg = index
				this.showDetail3 = true
			},
			handleClose4() {
				this.showDetail4 = false
			},
			details4(index) {
				console.log(index)
				this.detailImg = index
				this.showDetail4 = true
			},
			handleClose() {
				this.showDetail = false
			},
			handleClose2() {
				this.showDetail2 = false
			},
			details2(index) {
				console.log(index)
				this.detailImg = index
				this.showDetail2 = true
			},
			details(record, index) {
				console.log(record)
				var obj = {
					id: record.id
				}
				//日报详情
				this.ribaoXQ(obj)
				/*ribaoFile(obj).then(res => {
    		console.log(res)
    		this.fileData = res.list
    		console.log(this.fileData)
        if (res.msg == 'success') {
          console.log(res.msg)
        }else{
        	this.$message.warning(res.msg)
        }
      })*/

				console.log(index)
				this.detailImg = index
				this.showDetail = true
			},
			add() {
				this.visible = true
				this.addform.name = ''
				this.addform.title = ''
				this.addform.type = '1'
				this.addform.startTime = ''
				this.addform.endTime = ''
			},
			handleOk() {
				console.log(this.addform)
				addReport(this.addform).then(res => {
					if(res.msg == 'success') {
						this.getList()
					}
				})
				this.visible = false
			},
			handleCancel() {
				this.visible = false
			},
			handleTableChange(pagination) {
				this.pagination.page = pagination.current
				this.getList()
			},
			getList() {
				let obj = {
					limit: this.pagination.pageSize,
					page: this.pagination.page
				}
				getReportList(obj).then(res => {
					console.log(res)
					this.dataSource = res.list
					if(res.count) {
						this.pagination.total = res.count
					} else {
						this.pagination.total = 0
					}
					this.pagination.showTotal = () => '共' + this.pagination.total + '页'
					this.loading = false
				})
			},
			disabledStartDate(startValue) {
				const endValue = this.endValue
				if(!startValue || !endValue) {
					return false
				}
				return startValue.valueOf() > endValue.valueOf()
			},
			disabledEndDate(endValue) {
				const startValue = this.startValue
				if(!endValue || !startValue) {
					return false
				}
				return startValue.valueOf() >= endValue.valueOf()
			},
			handleStartOpenChange(open) {
				if(!open) {
					this.endOpen = true
				}
			},
			handleEndOpenChange(open) {
				this.endOpen = open
			},
			moment
		}
	}
</script>