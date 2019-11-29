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
          <a-button
            type="primary"
            @click="start"
            :disabled="!hasSelected"
            :loading="loading"
          >
            Reload
          </a-button>
          <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{`Selected ${selectedRowKeys.length} items`}}
            </template>
          </span>
        </div>
        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data" >
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
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
</div>
</template>
<script>
import VDistpicker from 'v-distpicker'


//['录入时间', '一级分类', '网媒类别','网媒来源','发布者','标题','链接','车型','形势判断','发布时间','相似文章','关注度','操作']
const plainOptions = ['微信', '微博', '网页','客户端','论坛','视频','口碑','问答','自媒体']
const defaultCheckedList = ['口碑', '客户端']
const columns = [{
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
                  }];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
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
    border-bottom: 1px solid;
}

</style>