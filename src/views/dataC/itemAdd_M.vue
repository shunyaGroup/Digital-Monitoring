<template>
  <a-card :bordered="false" title="新建监测方案">
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="快捷模式" key="1">
        <a-row>
          <span class="dxTitle">方案类别</span>
          <a-radio-group @change="getListA" v-model="pgrame.category">
            <a-radio :value="1">监测</a-radio>
            <a-radio :value="2">订阅</a-radio>
            <a-radio :value="3">分析</a-radio>
            <a-radio :value="4">海外</a-radio>
          </a-radio-group>
        </a-row>
        <a-row>
          <span class="dxTitle">企业选择</span>
          <a-radio-group @change="onChange" v-model="foo.enterprise_id">
            <a-radio
              :value="datali.id"
              v-for="(datali,index) in datalist"
              :key="index"
            >{{datali.name}}</a-radio>
          </a-radio-group>
        </a-row>
        <a-row style="margin-top:50px">
          <span class="dxTitle">一级分类</span>
          <a-radio-group @change="onChange" v-model="foo.type_id">
            <a-radio :value="item.id" v-for="(item,index) in items" :key="index">{{item.name}}</a-radio>
          </a-radio-group>
        </a-row>
        <a-row style="margin-top:20px">
          <span class="dxTitle">方案名称</span>
          <a-col :span="15">
            <a-input placeholder="请输入方案名称" v-model="foo.name" />
          </a-col>
        </a-row>
        <a-row style="margin-top:20px">
          <span class="dxTitle">监测词</span>
          <a-col :span="15">
            <a-input name="keywords_simple" placeholder="请输入监测对象(必填)" v-model="foo.keywords" />
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
      </a-tab-pane>
      <a-tab-pane tab="高级模式" key="2" forceRender>
        <a-form :form="form">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="方案类别"
          >
            <a-select v-model="form2.category" @change="getListA">
              <a-select-option value="1">监测</a-select-option>
              <a-select-option value="2">订阅</a-select-option>
              <a-select-option value="3">分析</a-select-option>
              <a-select-option value="4">海外</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
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
          </a-form-item>

          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="一级分类"
          >
            <a-select v-model="form2.type_id" @change="onChange">
              <a-select-option
                v-for="(item,index) in items"
                :value="item.id"
                :key="index"
              >{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="方案名称"
          >
            <a-input placeholder="请填写方案名称" v-model="form2.name" />
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
            <a-input name="keywords_one" v-model="form2.dWord" placeholder="请输入监测对象(必填)" />
            <span class="dxMo">监测词之间用逗号或顿号隔开</span>
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="关联词"
          >
            <a-input name="keywords_one" v-model="form2.aWord" placeholder="请输入关联词" />
            <span class="dxMo">关联词之间用逗号或顿号隔开</span>
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

          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="描述"
          >
            <a-input placeholder="请输入描述内容" v-model="form2.description" name="keywords_exclude" />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="排除词"
          >
            <a-input placeholder="请输入排除词" v-model="form2.keywords_exclude" name="keywords_exclude" />
          </a-form-item>
        </a-form>
        <a-row style="margin-top:50px">
          <a-button
            type="primary"
            style="margin-left: 170px;margin-right: 150px;"
            @click="addScheme2"
          >保存方案</a-button>
          <a-button style="background: #ddd;" @click="actionJC2">开始监测</a-button>
        </a-row>
      </a-tab-pane>
      <a-tab-pane tab="精确模式" key="3">
        <a-form :form="form">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="方案类别"
          >
            <a-select v-model="form3.category" @change="getListA">
              <a-select-option value="1">监测</a-select-option>
              <a-select-option value="2">订阅</a-select-option>
              <a-select-option value="3">分析</a-select-option>
              <a-select-option value="4">海外</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
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
          </a-form-item>

          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="一级分类"
          >
            <a-select v-model="form3.type_id" @change="onChange">
              <a-select-option
                v-for="(item,index) in items"
                :value="item.id"
                :key="index"
              >{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="方案名称"
          >
            <a-input placeholder="请填写方案名称" v-model="form3.name" />
          </a-form-item>

          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="监测词组"
          ></a-form-item>

          <a-form-item
            v-for="(items,index) in form3.wordsList"
            :key="index"
            :label-col="2"
            :wrapper-col="18"
            :label="'监测词组'+ (index+1)"
          >
            <a-input style="width:20%" placeholder="请输入监测对象" v-model="items.name" />
            <span v-for="(item,ind) in items.list" :key="ind">
              +
              <a-input style="width:20%" placeholder="关联词" v-model="item.keyWord" />
            </span>
            <span v-if=" items.list!=undefined && (items.list.length) < 3" style="margin-left:10px">
              <a-button type="primary" icon="plus" @click="addKeyWord(index)">添加关联词</a-button>
            </span>
            
            <!-- <span style="margin-left:10px">
              <a-button type="primary" icon="plus" @click="addKeyWord(index)">添加关联词</a-button>
            </span> -->

          </a-form-item>
        </a-form>
        <a-row style="margin-top:50px">
          <a-button
            type="primary"
            style="margin-left: 170px;margin-right: 150px;"
            @click="addScheme3"
          >保存方案</a-button>
          <a-button style="background: #ddd;" @click="actionJC2">开始监测</a-button>
        </a-row>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script>
// import { getLQ, postAddA, getSelectlist, postActionJC } from '@/api/newpage'
import { getLQ, getSelectlist, addScheme , postActionJC} from '@/api/newpage'
import imgUrl from '../../static/img/监测词组.png'
import $ from 'jquery'
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 }
      },
      form2: {},
      form3: {
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
      foo: {
        enterprise_id: '',
        type_id: '1',
        category: '1',
        name: '',
        keywords: '',
        description: '',
        keywords_exclude:''
      },
      foo2: {
        enterprise_id: '',
        type_id: '',
        category: '',
        name: '',
        keywords: '',
        description: ''
      },
      datalist: [],
      pgrame: {
        category: '1'
      },
      jceArr: {
        tags: ['', 'Tag 2', 'Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3'],
        inputVisible: false,
        inputValue: ''
      },
      jcidobj: {
        id: ''
      },
      resultList: [],
      form: {}
    }
  },
  mounted() {
    // this.getListA()
    this.getSelectlist()
    this.getListA()
  },
  methods: {
    addKeyWord(index) {
      this.form3.wordsList[index].list.push({
        keyWord: ''
      })
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
      console.log('radio checked', e.target.value)
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
      var keywords_exclude = keywords_exclude_input.replace(new RegExp('\\s|，|、', 'g'), ',') //使用英文,替代中文，;
      var keywords_exclude1 = keywords_exclude.split(',')
      
      this.foo.keywords_exclude = JSON.stringify(keywords_exclude1)

      console.log(this.foo.description)
      console.log(this.foo.keywords_exclude)
      this.addScheme()
    },
    saveUp2() {},
    saveUp3() {},
    actionJC() {
      postActionJC(this.jcidobj).then(res => {
        console.log(res)
        this.$message.success('监测方案已提交')
      })
    },
    actionJC2() {
      postActionJC(this.jcidobj).then(res => {
        console.log(res)
        this.$message.success('监测方案已提交')
      })
    },
    actionJC3() {
      postActionJC(this.jcidobj).then(res => {
        console.log(res)
        this.$message.success('监测方案已提交')
      })
    },
    getListA() {
      getLQ(this.pgrame).then(res => {
        this.items = res.list
      })
    },
    addScheme(){
      addScheme(this.foo).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('监测方案已保存,请点击^开始监测^')
          $('.actionCss1').show();
          this.jcidobj.id = res.list.id
        }
      })
    },
    addScheme2() {
      if (!this.form2.category) {
        this.$message.warning('请选择方案类别')
        return
      }
      if (!this.form2.enterprise_id) {
        this.$message.warning('请选择企业')
        return
      }
      if (!this.form2.type_id) {
        this.$message.warning('请选择一级分类')
        return
      }
      if (!this.form2.description) {
        this.$message.warning('请输入描述')
        return
      }
      if (!this.form2.keywords_exclude) {
        this.$message.warning('请输入排除词')
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

      addScheme(this.form2).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('添加成功')
          this.jcidobj.id = res.list.id
        }
      })
    },
    addScheme3(){
      if (!this.form3.category) {
        this.$message.warning('请选择方案类别')
        return
      }
      if (!this.form3.enterprise_id) {
        this.$message.warning('请选择企业')
        return
      }
      if (!this.form3.type_id) {
        this.$message.warning('请选择一级分类')
        return
      }
      if (!this.form3.description) {
        this.$message.warning('请输入描述')
        return
      }
      if (!this.form3.keywords_exclude) {
        this.$message.warning('请输入排除词')
        return
      }
      if (!this.form3.name) {
        this.$message.warning('请输入方案名称')
        return
      }

      if (this.resultList.length == 0) {
        this.$message.warning('请先生成预览')
        return
      } else {
        this.form2.keywords = JSON.stringify(this.resultList)
      }

      addScheme(this.form3).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('添加成功')
          this.jcidobj.id = res.list.id
        }
      })
    },
    getSelectlist() {
      getSelectlist().then(res => {
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