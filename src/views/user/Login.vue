<template>
  <div class="main" style="width: 400px;">
    <a-modal
      title="选择对应企业数据，点击跳过则为默认数据包。"
      v-model="visible"
      @ok="handleOk"
      okText="跳过"
      :closable="false"
      :cancelButtonProps="{ props: {disabled: true} }"
      :maskClosable="false"
    >
      <a-list itemLayout="horizontal" :dataSource="items">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta>
            <a slot="title" :id="item.id" @click="dianji(item.id)">{{item.name}}</a>
            <a-avatar
              slot="avatar"
              :id="item.id"
              :src="item.logo"
              style="width: 55px;height: 39px;"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
      <!--  http://39.97.241.172/storage/app/admin/img/20190813174209-5d5285f18bb7b.png-->
      <!--39.97.241.172/storage/app/admin/img/20190813141030-5d5254566e846.jpg-->
      <!--`39.97.241.172${item.logo}`-->
    </a-modal>

    <a-form :form="form" class="user-layout-login" ref="formLogin" id="formLogin">
      <!--v-decorator="['mobile',validatorRules.mobile]"-->
      <a-form-item style="width: 300px;margin-top: 0px;position: relative;top: 30px;">
        <a-input size="large" type="text" placeholder="手机号" v-model="formLogin.mobile">
          <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>
      <a-button
        id="SMS"
        style="border: none;width: 60px;height: 38px;text-align: center;line-height: 40px;background: #c451d9; padding: 0 15px;border-radius: 0px;color:#FFFFFF; float: right;position: relative;bottom: 34px;"
        @click="logonSms"
        :disabled="logonSmsBtn"
      >{{content}}</a-button>
      <a-form-item>
        <a-input
          v-decorator="['authCode',validatorRules.authCode]"
          size="large"
          type="authCode"
          autocomplete="false"
          placeholder="请输入验证码"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <!--      <a-form-item>
        <a-checkbox v-model="formLogin.rememberMe">自动登陆</a-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa'} }"
          class="forge-password"
          style="float: right;"
        >忘记密码</router-link>
      </a-form-item>-->

      <!--@click.stop.prevent="handleSubmit"-->
      <a-form-item style="margin-top:24px;">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="loginBtn"
          style="border-radius: 20px;"
        >立即登录</a-button>
      </a-form-item>
    </a-form>

    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>

    <!-- <a-modal
      title="登录部门选择"
      :width="450"
      :visible="departVisible"
      :closable="false"
      :maskClosable="false"
    >
      <template slot="footer">
        <a-button type="primary" @click="departOk">确认</a-button>
      </template>
    
      <a-form>
        <a-form-item
          :labelCol="{span:4}"
          :wrapperCol="{span:20}"
          style="margin-bottom:10px"
          :validate-status="validate_status"
        >
          <a-tooltip placement="topLeft">
            <template slot="title">
              <span>您隶属于多部门，请选择登录部门</span>
            </template>
            <a-avatar style="backgroundColor:#87d068" icon="gold" />
          </a-tooltip>
          <a-select
            @change="departChange"
            :class="{'valid-error':validate_status=='error'}"
            placeholder="请选择登录部门"
            style="margin-left:10px;width: 80%"
          >
            <a-icon slot="suffixIcon" type="gold" />
            <a-select-option
              v-for="d in departList"
              :key="d.id"
              :value="d.orgCode"
            >{{ d.departName }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>-->
  </div>
</template>

<script>
//import md5 from "md5"
import $ from 'jquery'
import api from '@/api'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// import JGraphicCode from '@/components/jeecg/JGraphicCode'
import { putAction } from '@/api/manage'

import { nLogin, dealList, selectDeal, loginSms } from '@/api/newpage'
import { ACCESS_NTOKEN } from '@/store/mutation-types'

//嵌入人工智能登录
import { loginOther } from '@/api/comment'

export default {
  components: {
    TwoStepCaptcha
    // JGraphicCode
  },
  data() {
    return {
      content: '发送', // 按钮里显示的内容
      totalTime: 120, //记录具体倒计时时间
      timer: 'cloak', // 定时器名称
      canClick: true, //添加canClick  判断按钮能否点击
      logonSmsBtn: false,
      items: [],
      src: '',
      visible: false,
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        smsSendBtn: false
      },
      formLogin: {
        username: '',
        authCode: '',
        captcha: '',
        mobile: '',
        rememberMe: false
      },
      validatorRules: {
        username: { rules: [{ required: true, message: '请输入用户名!', validator: 'click' }] },
        authCode: { rules: [{ required: true, message: '请输入验证码!', validator: 'click' }] },
        mobile: { rules: [{ validator: this.validateMobile }] },
        captcha: { rule: [{ required: true, message: '请输入验证码!' }] },
        inputCode: { rules: [{ required: true, message: '请输入验证码!' }, { validator: this.validateInputCode }] }
      },
      verifiedCode: '',
      inputCodeContent: '',
      inputCodeNull: true,

      departList: [],
      departVisible: false,
      departSelected: '',
      currentUsername: '',
      validate_status: '',
      ep: {
        id: ''
      }
    }
  },
  created() {
    Vue.ls.remove(ACCESS_TOKEN)
    // update-begin- --- author:scott ------ date:20190225 ---- for:暂时注释，未实现登录验证码功能
    //      this.$http.get('/auth/2step-code')
    //        .then(res => {
    //          this.requiredTwoStepCaptcha = res.result.stepCode
    //        }).catch(err => {
    //          console.log('2step-code:', err)
    //        })
    // update-end- --- author:scott ------ date:20190225 ---- for:暂时注释，未实现登录验证码功能
    // this.requiredTwoStepCaptcha = true
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleUsernameOrEmail(rule, value, callback) {
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        this.loginType = 0
      } else {
        this.loginType = 1
      }
      callback()
    },
    handleTabClick(key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    /* handleSubmit() {
      let that = this
      let loginParams = {
        remember_me: that.formLogin.rememberMe
      }

 

      // 使用账户密码登陆
      if (that.customActiveKey === 'tab1') {
        that.form.validateFields(['mobile', 'password'], { force: true }, (err, values) => {
          console.log(err)
          console.log(values)
          if (!err) {
            loginParams = Object.assign(loginParams, values)
            that.loginBtn = true
            that
              .Login(loginParams)
              .then(() => {
                console.log(res);
                that.loginSuccess()
              })
              .catch(err => {
                that.requestFailed(err)
                console.log(err.msg)
              })
          }
        })
      }
    },*/
    handleSubmit() {
      var that = this
      let loginParams = {
        remember_me: that.formLogin.rememberMe,
        mobile: that.formLogin.mobile
      }
      // 使用验证码登陆
      if (that.customActiveKey === 'tab1') {
        that.form.validateFields(['mobile', 'authCode'], { force: true }, (err, values) => {
          console.log(err)
          console.log(values)
          if (!err) {
            loginParams = Object.assign(loginParams, values)
            console.log(loginParams)
            that.loginBtn = true
            that
              .Login(loginParams)
              .then(res => {
                console.log(res)
                that.loginSuccess()
              })
              .catch(err => {
                that.requestFailed(err)
                console.log(err.msg)
              })
          }
        })
      }
    },
    logonSms() {
      let that = this
      var reg = /^((1[3,5,8][0-9])|(14[0-9])|(17[0-9])|(19[0-9]))\d{8}$/
      if (!that.formLogin.mobile) {
        alert('手机号不能为空')
        return
      } else if (!reg.test(that.formLogin.mobile)) {
        alert('手机号码格式不正确')
        return
      }

      this.logonSmsBtn = true

      this.countDown()

      let loginParams = {
        mobile: that.formLogin.mobile
      }
      // 使用验证码登陆

      console.log(loginParams)
      /* that.loginBtn = true*/
      that
        .loginSms(loginParams)
        .then(res => {
          //that.$message.success('发送成功');
          console.log(res)
          //that.loginSuccess()
        })
        .catch(err => {
          //that.requestFailed(err)
          // that.$message.error(err.msg);
          console.log(err.msg)
          //that.content('发送')
        })
    },
    countDown() {
      var that = this

      that.content = that.totalTime + 's' //这里解决60秒不见了的问题
      that.cloak = setInterval(function() {
        that.totalTime--
        if (that.totalTime > 0) {
          that.content = that.totalTime + 's'
        }
        if (that.totalTime <= 0) {
          //当倒计时小于等于0时清除定时器
          window.clearInterval(that.cloak)
          that.content = '重发'
          that.totalTime = 120
          that.logonSmsBtn = false //这里重新开启
          $('#SMS').css({ color: '#fff', background: 'rgb(196, 81, 217)' })
        }
      }, 1000)
    },
    loginSms(e) {
      loginSms(e)
        .then(res => {
          console.log(res)
          if (res.code == '200' || res.code == 'success') {
            this.$message.success('发送成功')
            $('#SMS').css({ color: 'rgb(196, 81, 217)', background: '#eee' })
          } else {
            this.$message.error(res.msg)
            this.content = '发送'
            this.totalTime = '发送'
            this.logonSmsBtn = false
          }
        })
        .catch(err => {
          this.$message.error(err.msg)
          console.log(err.msg)
        })
    },
    getCaptcha(e) {
      e.preventDefault()
      let that = this

      this.form.validateFields(['mobile'], { force: true }, err => {
        if (!err) {
          this.state.smsSendBtn = true

          let interval = window.setInterval(() => {
            if (that.state.time-- <= 0) {
              that.state.time = 60
              that.state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          const hide = this.$message.loading('验证码发送中..', 0)
          this.$http
            .post(api.SendSms, { mobile: that.formLogin.mobile })
            .then(res => {
              setTimeout(hide, 2500)
              this.$notification['success']({
                message: '提示',
                description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                duration: 8
              })
            })
            .catch(err => {
              setTimeout(hide, 1)
              clearInterval(interval)
              that.state.time = 60
              that.state.smsSendBtn = false
              this.requestFailed(err)
            })
        }
      })
    },
    stepCaptchaSuccess() {
      this.loginSuccess()
    },
    stepCaptchaCancel() {
      this.Logout().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },
    loginSuccess() {
      /*  this.showModal()*/
      this.showModal()

      /*      console.log('aaa')
      this.loginBtn = false
      this.$router.push({ name: 'dashboard' })
      this.$notification.success({
        message: '欢迎',
        description: `${timeFix()}，欢迎回来`
      })*/
    },
    requestFailed(err) {
      this.$notification['error']({
        message: '登录失败',
        description: ((err.response || {}).data || {}).message || err.message || err.msg,
        duration: 4
      })
      this.loginBtn = false
    },
    validateMobile(rule, value, callback) {
      if (!value || new RegExp(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/).test(value)) {
        callback()
      } else {
        callback('您的手机号码格式不正确!')
      }
    },
    validateInputCode(rule, value, callback) {
      if (!value || this.verifiedCode == this.inputCodeContent) {
        callback()
      } else {
        callback('您输入的验证码不正确!')
      }
    },
    generateCode(value) {
      this.verifiedCode = value.toLowerCase()
    },
    inputCodeChange(e) {
      this.inputCodeContent = e.target.value
      if (!e.target.value || 0 == e.target.value) {
        this.inputCodeNull = true
      } else {
        this.inputCodeContent = this.inputCodeContent.toLowerCase()
        this.inputCodeNull = false
      }
    },
    departConfirm(res) {
      if (res.success) {
        let multi_depart = res.result.multi_depart
        //0:无部门 1:一个部门 2:多个部门
        if (multi_depart == 0) {
          this.loginSuccess()
          this.$notification.warn({
            message: '提示',
            description: `您尚未归属部门,请确认账号信息`,
            duration: 3
          })
        } else if (multi_depart == 2) {
          this.departVisible = true
          this.currentUsername = this.form.getFieldValue('username')
          this.departList = res.result.departs
        } else {
          this.loginSuccess()
        }
      } else {
        this.requestFailed(res)
        this.Logout()
      }
    },
    departOk() {
      if (!this.departSelected) {
        this.validate_status = 'error'
        return false
      }
      let obj = {
        orgCode: this.departSelected,
        username: this.form.getFieldValue('username')
      }
      putAction('/sys/selectDepart', obj).then(res => {
        if (res.success) {
          this.departClear()
          this.loginSuccess()
        } else {
          this.requestFailed(res)
          this.Logout().then(() => {
            this.departClear()
          })
        }
      })
    },
    departClear() {
      this.departList = []
      this.departSelected = ''
      this.currentUsername = ''
      this.departVisible = false
      this.validate_status = ''
    },
    departChange(value) {
      this.validate_status = 'success'
      this.departSelected = value
    },
    showModal() {
      this.visible = true
      dealList().then(res => {
        console.log(res)
        this.items = res.list
        console.log(this.items)

        var deaS = this.items
        for (var i = 0; i < deaS.length; i++) {
          console.log(deaS[i])
          this.items[i].logo = 'http://39.97.241.172' + deaS[i].logo
          console.log(this.items[i].logo)
        }
      })
    },
    handleOk() {
      /*console.log();*/
      this.visible = false
      this.loginBtn = false
      this.$router.push({ name: 'dashboard' })
      this.$notification.success({
        message: '欢迎',
        description: `${timeFix()}，欢迎回来`
      })
    },
    dianji(id) {
      console.log(id)
      this.ep.id = id
      console.log(this.ep.id)
      selectDeal(this.ep).then(res => {
        console.log(res)
        this.loginBtn = false
        this.$router.push({ name: 'dashboard' })
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.disable {
  pointer-events: none;
  color: #666;
}
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
// .effects{
//   width: 300px;
//   height: 300px;
//   position: absolute;
//   left: 0;
//   top: 0;
//   background: url(~@/assets/effects.png) no-repeat;
//    background-size: 100% 100%;
//    z-index: 3
// }
</style>
<style>
.valid-error .ant-select-selection__placeholder {
  color: #f5222d;
}

.ant-list-item-meta-title {
  margin-bottom: 4px;
  font-size: 20px;
  line-height: 22px;
  text-align: center;
  background: #73baef;
  height: 40px;
  line-height: 40px;
}
.ant-list-item-meta-title > a {
  color: #f3f3f3;
}
</style>