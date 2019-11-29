<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '10px' }">
        <chart-card :loading="loading" title="新闻处理总量" :total="2430 | NumberFormat">
          <a-tooltip title="本周新闻处理总量" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <template slot="footer">
            日均处理量
            <span>486</span>
          </template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '10px' }">
        <chart-card :loading="loading" title="发布话术总量" :total="8845 | NumberFormat">
          <a-tooltip title="话术发布总量" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <!-- <div>
            <mini-area />
          </div>-->
          <template slot="footer">
            日均发布量
            <span>{{ '1769' | NumberFormat }}</span>
          </template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '10px' }">
        <chart-card :loading="loading" title="新闻处理率" total="80%">
          <a-tooltip title="已处理新闻在全部新闻占比" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <template slot="footer">
            <trend flag="up" style="margin-right: 16px;">
              <span slot="term">日环比</span>
              96%
            </trend>
          </template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '10px' }">
        <chart-card :loading="loading" title="话术总量" :total="28846 | NumberFormat">
          <a-tooltip title="生成话术总量" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <template slot="footer">
            <trend flag="up" style="margin-right: 16px;">
              <span slot="term">月环比</span>
              87%
            </trend>
          </template>
        </chart-card>
      </a-col>
    </a-row>

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs
          default-active-key="1"
          size="large"
          :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
        >
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>本周</a>
              <a>本月</a>
              <a>本年</a>
            </div>
            <a-range-picker :style="{width: '256px'}" />
          </div>
          <a-tab-pane loading="true" tab="新闻处理量" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar title="新闻处理量" :dataSource="barData" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="处理新闻排行" :list="rankList" />
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="发布话术量" key="2">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar title="发布话术量" :dataSource="barData2" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="话术发布排行" :list="rankList2" />
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
import ChartCard from '@/components/ChartCard'
import ACol from 'ant-design-vue/es/grid/Col'
import ATooltip from 'ant-design-vue/es/tooltip/Tooltip'
import MiniArea from '@/components/chart/MiniArea'
import MiniBar from '@/components/chart/MiniBar'
import MiniProgress from '@/components/chart/MiniProgress'
import RankList from '@/components/chart/RankList'
import Bar from '@/components/chart/Bar'
import Trend from '@/components/Trend'
import moment from 'moment'
// import {getLoginfo} from '@/api/api'

const rankList = [
  {
    name: 'keny',
    total: 120
  },
  {
    name: 'chris',
    total: 116
  },
  {
    name: 'cary',
    total: 98
  },
  {
    name: 'George',
    total: 88
  },
  {
    name: 'Bobby',
    total: 76
  }
]

const rankList2 = [
  {
    name: 'keny',
    total: 215
  },
  {
    name: 'Kary',
    total: 116
  },
  {
    name: 'Jany',
    total: 97
  },
  {
    name: 'George',
    total: 86
  },
  {
    name: 'Ken',
    total: 80
  }
]
const barData = [
  {
    x: moment()
      .subtract(30, 'days')
      .format('MM-DD'),
    y: 213
  },
  {
    x: moment()
      .subtract(29, 'days')
      .format('MM-DD'),
    y: 224
  },
  {
    x: moment()
      .subtract(28, 'days')
      .format('MM-DD'),
    y: 256
  },
  {
    x: moment()
      .subtract(27, 'days')
      .format('MM-DD'),
    y: 312
  },
  {
    x: moment()
      .subtract(26, 'days')
      .format('MM-DD'),
    y: 363
  },
  {
    x: moment()
      .subtract(25, 'days')
      .format('MM-DD'),
    y: 245
  },
  {
    x: moment()
      .subtract(24, 'days')
      .format('MM-DD'),
    y: 316
  },
  {
    x: moment()
      .subtract(23, 'days')
      .format('MM-DD'),
    y: 265
  },
  {
    x: moment()
      .subtract(22, 'days')
      .format('MM-DD'),
    y: 261
  },
  {
    x: moment()
      .subtract(21, 'days')
      .format('MM-DD'),
    y: 412
  },
  {
    x: moment()
      .subtract(20, 'days')
      .format('MM-DD'),
    y: 342
  },
  {
    x: moment()
      .subtract(19, 'days')
      .format('MM-DD'),
    y: 257
  },
  {
    x: moment()
      .subtract(18, 'days')
      .format('MM-DD'),
    y: 442
  },
  {
    x: moment()
      .subtract(17, 'days')
      .format('MM-DD'),
    y: 213
  },
  {
    x: moment()
      .subtract(16, 'days')
      .format('MM-DD'),
    y: 356
  },
  {
    x: moment()
      .subtract(15, 'days')
      .format('MM-DD'),
    y: 245
  },
  {
    x: moment()
      .subtract(14, 'days')
      .format('MM-DD'),
    y: 280
  },
  {
    x: moment()
      .subtract(13, 'days')
      .format('MM-DD'),
    y: 256
  },
  {
    x: moment()
      .subtract(12, 'days')
      .format('MM-DD'),
    y: 312
  },
  {
    x: moment()
      .subtract(11, 'days')
      .format('MM-DD'),
    y: 251
  },
  {
    x: moment()
      .subtract(10, 'days')
      .format('MM-DD'),
    y: 311
  },
  {
    x: moment()
      .subtract(9, 'days')
      .format('MM-DD'),
    y: 321
  },
  {
    x: moment()
      .subtract(8, 'days')
      .format('MM-DD'),
    y: 411
  },
  {
    x: moment()
      .subtract(7, 'days')
      .format('MM-DD'),
    y: 403
  },
  {
    x: moment()
      .subtract(6, 'days')
      .format('MM-DD'),
    y: 214
  },
  {
    x: moment()
      .subtract(5, 'days')
      .format('MM-DD'),
    y: 323
  },
  {
    x: moment()
      .subtract(4, 'days')
      .format('MM-DD'),
    y: 211
  },
  {
    x: moment()
      .subtract(3, 'days')
      .format('MM-DD'),
    y: 216
  },
  {
    x: moment()
      .subtract(2, 'days')
      .format('MM-DD'),
    y: 313
  },
  {
    x: moment()
      .subtract(1, 'days')
      .format('MM-DD'),
    y: 140
  },
  {
    x: moment()
      .format('MM-DD'),
    y: 180
  },
]

const barData2 = [
  {
    x: moment()
      .subtract(30, 'days')
      .format('MM-DD'),
    y: 246
  },
  {
    x: moment()
      .subtract(29, 'days')
      .format('MM-DD'),
    y: 267
  },
  {
    x: moment()
      .subtract(28, 'days')
      .format('MM-DD'),
    y: 255
  },
  {
    x: moment()
      .subtract(27, 'days')
      .format('MM-DD'),
    y: 225
  },
  {
    x: moment()
      .subtract(26, 'days')
      .format('MM-DD'),
    y: 363
  },
  {
    x: moment()
      .subtract(25, 'days')
      .format('MM-DD'),
    y: 321
  },
  {
    x: moment()
      .subtract(24, 'days')
      .format('MM-DD'),
    y: 352
  },
  {
    x: moment()
      .subtract(23, 'days')
      .format('MM-DD'),
    y: 277
  },
  {
    x: moment()
      .subtract(22, 'days')
      .format('MM-DD'),
    y: 221
  },
  {
    x: moment()
      .subtract(21, 'days')
      .format('MM-DD'),
    y: 311
  },
  {
    x: moment()
      .subtract(20, 'days')
      .format('MM-DD'),
    y: 189
  },
  {
    x: moment()
      .subtract(19, 'days')
      .format('MM-DD'),
    y: 223
  },
  {
    x: moment()
      .subtract(18, 'days')
      .format('MM-DD'),
    y: 407
  },
  {
    x: moment()
      .subtract(17, 'days')
      .format('MM-DD'),
    y: 218
  },
  {
    x: moment()
      .subtract(16, 'days')
      .format('MM-DD'),
    y: 351
  },
  {
    x: moment()
      .subtract(15, 'days')
      .format('MM-DD'),
    y: 212
  },
  {
    x: moment()
      .subtract(14, 'days')
      .format('MM-DD'),
    y: 234
  },
  {
    x: moment()
      .subtract(13, 'days')
      .format('MM-DD'),
    y: 252
  },
  {
    x: moment()
      .subtract(12, 'days')
      .format('MM-DD'),
    y: 309
  },
  {
    x: moment()
      .subtract(11, 'days')
      .format('MM-DD'),
    y: 258
  },
  {
    x: moment()
      .subtract(10, 'days')
      .format('MM-DD'),
    y: 313
  },
  {
    x: moment()
      .subtract(9, 'days')
      .format('MM-DD'),
    y: 276
  },
  {
    x: moment()
      .subtract(8, 'days')
      .format('MM-DD'),
    y: 311
  },
  {
    x: moment()
      .subtract(7, 'days')
      .format('MM-DD'),
    y: 303
  },
  {
    x: moment()
      .subtract(6, 'days')
      .format('MM-DD'),
    y: 284
  },
  {
    x: moment()
      .subtract(5, 'days')
      .format('MM-DD'),
    y: 233
  },
  {
    x: moment()
      .subtract(4, 'days')
      .format('MM-DD'),
    y: 251
  },
  {
    x: moment()
      .subtract(3, 'days')
      .format('MM-DD'),
    y: 246
  },
  {
    x: moment()
      .subtract(2, 'days')
      .format('MM-DD'),
    y: 273
  },
  {
    x: moment()
      .subtract(1, 'days')
      .format('MM-DD'),
    y: 189
  },
  {
    x: moment()
      .format('MM-DD'),
    y: 223
  },
]
// for (let i = 0; i < 12; i += 1) {
//   barData.push({
//     x: `${i + 1}`,
//     y: Math.floor(Math.random() * 1000) + 200
//   })
// }
export default {
  name: 'Analysis',
  components: {
    // ATooltip,
    // ACol,
    ChartCard,
    // MiniArea,
    // MiniBar,
    // MiniProgress,
    RankList,
    Bar,
    Trend
  },
  data() {
    return {
      loading: true,
      center: null,
      rankList,
      rankList2,
      barData,
      barData2,
      loginfo: {}
    }
  },
  created() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
    // this.initLogInfo();
  },
  methods: {
    moment
    // initLogInfo () {
    //   getLoginfo(null).then((res)=>{
    //     if(res.success){
    //       this.loginfo = res.result;
    //     }
    //   })
    // },
  }
}
</script>

<style lang="scss" scoped>
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

/* 首页访问量统计 */
.head-info {
  position: relative;
  text-align: left;
  padding: 0 32px 0 0;
  min-width: 125px;

  &.center {
    text-align: center;
    padding: 0 32px;
  }

  span {
    color: rgba(0, 0, 0, 0.45);
    display: inline-block;
    font-size: 0.95rem;
    line-height: 42px;
    margin-bottom: 4px;
  }
  p {
    line-height: 42px;
    margin: 0;
    a {
      font-weight: 600;
      font-size: 1rem;
    }
  }
}
</style>