<template>
  <a-card :bordered="false" title="新建监测方案">
    <div>
      <a-modal title="添加方案类型" v-model="visible" @ok="handleOk">
        <a-row>
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
        </a-row>
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
    </div>

    <a-form :form="form">
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
        <span class="dxMo">*请先选择企业后再进行其他操作</span>
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="方案类别"
      >
        <a-select v-model="form3.category" @change="getListC">
          <a-select-option value="1">监测</a-select-option>
          <!--<a-select-option value="2">订阅</a-select-option>-->
          <a-select-option value="3">回溯</a-select-option>
          <!-- <a-select-option value="4">海外</a-select-option>-->
        </a-select>
      </a-form-item>

      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="方案标签"
      >
        <a-select v-model="form3.type_id" @change="onChange">
          <a-select-option v-for="(item,index) in items" :value="item.id" :key="index">{{item.name}}</a-select-option>
        </a-select>
        <a-button
          type="primary"
          @click="showModal"
          style="
	          	padding: 0;
					    width: 25px;
					    height: 25px;
					    border-radius: 20px;
					    line-height: 22px;"
        >＋</a-button>
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

      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-button icon="plus" @click="addWordsList">添加组合</a-button>
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="描述"
      >
        <a-input placeholder="请输入描述内容" v-model="form3.description" name="description" />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="排除词"
      >
        <a-input placeholder="请输入排除词" v-model="form3.keywords_exclude" name="keywords_exclude3" />
      </a-form-item>
    </a-form>
    <a-row style="margin-top:50px">
      <a-button
        class="saveitem"
        type="primary"
        style="margin-left: 170px;margin-right: 150px;"
        @click="addScheme(3)"
      >保存方案</a-button>

      <a-button
        class="updataitem"
        type="primary"
        style="margin-left: 170px;margin-right: 150px;display: none;"
        @click="updataList(3)"
      >更新方案</a-button>

      <a-button class="actionCss1" style="background: #ddd;" @click="actionJC3">开始监测</a-button>
    </a-row>
  </a-card>
</template>
<script>
// import { getLQ, postAddA, getSelectlist, postActionJC } from '@/api/newpage'
import {
  getLQ,
  getFenpeiList,
  addScheme,
  postActionJC,
  schemetypeEdit,
  schemetypeSelectlist,
  itemEdit
} from '@/api/newpage'
import imgUrl from '../../static/img/监测词组.png'
import $ from 'jquery'
export default {
  data() {
    return {
      visible: false,
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 }
      },
      form2: {
        keywords_exclude: ''
      },
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
      fooPOP: {},
      foo: {
        enterprise_id: '',
        type_id: '',
        category: '',
        name: '',
        keywords: '',
        description: '',
        keywords_exclude: ''
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
      editRecord: {},
      jsonRecord: {
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
      } /*,
      goStatus:''*/
    }
  },
  mounted() {
    // this.getListA()
    //this.getSelectlist()
    this.getFenpeiList()
    //this.getListA()
  },

  created() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //	console.log(from)

      vm.goStatus = localStorage.getItem('goStatus')
      console.log(vm.goStatus)

      var goStatus = localStorage.getItem('goStatus')

      if (from.path == '/dataC/itemList' && goStatus == '2') {
        $('.saveitem').hide()
        $('.updataitem').show()
        vm.editRecord = localStorage.getItem('editRecord')
        console.log(vm.editRecord)
        var jsonRecord = $.parseJSON(vm.editRecord) // 转成JSON对象

        vm.jsonRecord = jsonRecord

        vm.form3 = jsonRecord
        vm.form3.wordsList = jsonRecord.keywords

        if (jsonRecord.category == '1') {
          vm.form3.category = '监测'
        } else if (jsonRecord.category == '3') {
          vm.form3.category = '回溯'
        }
        localStorage.setItem('goStatus', '1')
      }

      /*console.log(vm.form)*/
    })
  },
  methods: {
    schemetypeEdit() {
      schemetypeEdit(this.fooPOP).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('方案类型添加成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      console.log(e)
      this.schemetypeEdit()
      this.visible = false
    },
    deleteKeyWord(index) {
      /*	this.form3.wordsList = this.jsonRecord.keywords
	      		this.form3.wordsList[index].list.push({
	        keyWord: ''
	      	})*/
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

      console.log(this.form3)
      this.$forceUpdate()
      /* this.form3.wordsList.push({
        name: '',
        list: [
          {
            keyWord: ''
          }
        ]
      })*/
      //this.jsonRecord.keywords = this.form3.wordsList
    },
    addKeyWord(index) {
      //this.jsonRecord = this.form3
      if (this.goStatus == '2') {
        this.form3.wordsList = this.jsonRecord.keywords
        this.form3.wordsList[index].list.push({
          keyWord: ''
        })
      } else {
        this.form3.wordsList[index].list.push({
          keyWord: ''
        })
      }
      this.$forceUpdate()
    },
    readuceKey(index, ind) {
      console.log(index, ind)

      if (this.goStatus == '2') {
        this.form3.wordsList = this.jsonRecord.keywords
        this.form3.wordsList[index].list.splice(ind, 1)
      } else {
        this.form3.wordsList[index].list.splice(ind, 1)
      }
      this.$forceUpdate()
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

      if (keywords_exclude_input == '' || null || undefined) {
        this.foo.keywords_exclude === null
      } else {
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
          $('.actionCss1').hide()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    actionJC2() {
      postActionJC(this.jcidobj).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('监测方案已提交')
          $('.actionCss1').hide()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    actionJC3() {
      postActionJC(this.jcidobj).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('监测方案已提交')
          $('.actionCss1').hide()
          this.$router.push({ path: '/dataC/itemList' })
        } else {
          this.$message.error(res.msg)
          this.$router.push({ path: '/dataC/itemList' })
        }
      })
    },
    getList() {
      schemetypeSelectlist(this.fooPOP).then(res => {
        console.log(res)
        this.items = res.list
      })
    },
    getListA() {
      schemetypeSelectlist(this.foo).then(res => {
        console.log(res)
        this.items = res.list
      })
    },
    getListB() {
      schemetypeSelectlist(this.form2).then(res => {
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
    addScheme1() {
      addScheme(this.foo).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('监测方案已保存,请点击^开始监测^')
          $('.actionCss1').show()
          this.jcidobj.id = res.list.id
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addScheme(index) {
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

        if (this.resultList.length == 0) {
          this.$message.warning('请先生成预览')
          return
        } else {
          var keywords_exclude2 = $.trim($('input[name=keywords_exclude2]').val()) //  排除词
          if (keywords_exclude2 == '' || null || undefined) {
            this.form2.keywords_exclude === null
          } else {
            var keywords_exclude2 = keywords_exclude2.replace(new RegExp('\\s|，|、', 'g'), ',') //使用英文,替代中文，;
            var keywords_exclude2 = keywords_exclude2.split(',')
            this.form2.keywords_exclude = keywords_exclude2
            this.form2.keywords_exclude = JSON.stringify(this.resultList)
          }
        }

        obj = this.form2
      } else if (index == 3) {
        var keywords_exclude3 = $.trim($('input[name=keywords_exclude3]').val()) //  排除词

        if (keywords_exclude3 == '' || null || undefined) {
          this.foo.keywords_exclude3 === null
        } else {
          var keywords_exclude3 = keywords_exclude3.replace(new RegExp('\\s|，|、', 'g'), ',') //使用英文,替代中文，;
          var keywords_exclude3 = keywords_exclude3.split(',')
          this.form3.keywords_exclude = JSON.stringify(keywords_exclude3)
        }

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
          $('.actionCss1').show()
          this.jcidobj.id = res.list.id
        } else {
          this.$message.error(res.msg)
        }
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
        } else {
          var keywords_exclude2 = $.trim($('input[name=keywords_exclude2]').val()) //  排除词
          if (keywords_exclude2 == '' || null || undefined) {
            this.form2.keywords_exclude === null
          } else {
            var keywords_exclude2 = keywords_exclude2.replace(new RegExp('\\s|，|、', 'g'), ',') //使用英文,替代中文，;
            var keywords_exclude2 = keywords_exclude2.split(',')
            this.form2.keywords_exclude = keywords_exclude2
            this.form2.keywords_exclude = JSON.stringify(this.resultList)
          }
        }

        obj = this.form2
      } else if (index == 3) {
        var keywords_exclude3 = $.trim($('input[name=keywords_exclude3]').val()) //  排除词

        if (keywords_exclude3 == '' || null || undefined) {
          this.foo.keywords_exclude3 === null
        } else {
          var keywords_exclude3 = keywords_exclude3.replace(new RegExp('\\s|，|、', 'g'), ',') //使用英文,替代中文，;
          var keywords_exclude3 = keywords_exclude3.split(',')
          this.form3.keywords_exclude = JSON.stringify(keywords_exclude3)
        }

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
        if (this.form3.category == '监测') {
          this.form3.category = '1'
        } else if (this.form3.category == '回溯') {
          this.form3.category = '3'
        }
        obj = this.form3
      }
      itemEdit(obj).then(res => {
        console.log(res)
        alert(res.msg)
        this.$router.push({ path: '/dataC/itemList' })
        /* if (res.code == 200) {
          alert('监测方案已更新')
          $('.actionCss1').show();
          this.jcidobj.id = res.list.id
        }else{
          this.$message.error(res.msg)
        }*/
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
    }
  }
}
</script>
<style scoped>
.actionCss1 {
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