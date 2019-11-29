import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { VueAxios } from './axios'
import { Modal, notification } from 'ant-design-vue'
import { ACCESS_NTOKEN, ACCESS_TOKEN } from "@/store/mutation-types"

// 创建 axios 实例
const service = axios.create({
  // baseURL: 'http://39.97.241.172', // api base_url
  // baseURL: 'http://192.168.0.43', // 本地
  baseURL: 'http://39.97.241.129:8888',
  // baseURL: '/api', // api 线上 测试
  timeout: 60000 // 请求超时时间
})



const err = (error) => {
  console.log(error)
  if (error.response) {
    let data = error.response.data
    const token = Vue.ls.get(ACCESS_NTOKEN)
    console.log("------异常响应------", token)
    console.log("------异常响应------", error.response.status)
    switch (error.response.status) {
      case 403:
        notification.error({ message: '系统提示', description: '拒绝访问', duration: 4 })
        break
      case 500:
        //notification.error({ message: '系统提示', description:'Token失效，请重新登录!',duration: 4})
        if (token && data.message == "Token失效，请重新登录") {
          // update-begin- --- author:scott ------ date:20190225 ---- for:Token失效采用弹框模式，不直接跳转----
          // store.dispatch('Logout').then(() => {
          //     window.location.reload()
          // })
          Modal.error({
            title: '登录已过期',
            content: '很抱歉，登录已过期，请重新登录',
            okText: '重新登录',
            mask: false,
            onOk: () => {
              store.dispatch('Logout').then(() => {
                Vue.ls.remove(ACCESS_NTOKEN)
                window.location.reload()
              })
            }
          })
          // update-end- --- author:scott ------ date:20190225 ---- for:Token失效采用弹框模式，不直接跳转----
        }
        break
      case 404:
        notification.error({ message: '系统提示', description: '很抱歉，资源未找到!', duration: 4 })
        break
      case 504:
        notification.error({ message: '系统提示', description: '网络超时' })
        break
      case 401:
        notification.error({ message: '系统提示', description: '未授权，请重新登录', duration: 4 })
        if (token) {
          store.dispatch('Logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
        }
        break
      default:
        notification.error({
          message: '系统提示',
          description: data.message,
          duration: 4
        })
        break
    }
  }
  return Promise.reject(error)
};


// request interceptor
service.interceptors.request.use(config => {

  //config.headers['Content-Type'] = 'application/json'
  config.headers = {
    'Content-Type': 'application/json' //  注意：设置很关键 
  }
  const token = Vue.ls.get(ACCESS_NTOKEN)
  if (token) {
    config.headers['token'] = token
    config.headers['X-Access-Token'] = Vue.ls.get(ACCESS_TOKEN)//嵌套人工智能接口
    //config.headers[ 'token' ] = eval('('+ token +')') // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  if (config.method == 'get') {
    config.params = {
      //_t: Date.parse(new Date())/1000,
      ...config.params
    }
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {

  //alert(response.data.msg)
  if (response.data.code == 300) {
    notification.error({ message: '系统提示', description: response.data.msg })
    //alert(response.data.msg)
    store.dispatch('Logout').then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    })
  } else {
    return response.data
  }

}, err)

const installer = {
  vm: {},
  install(Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}