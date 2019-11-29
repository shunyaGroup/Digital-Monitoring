import Vue from 'vue'
import { USER_NAME, USER_INFO, ACCESS_NTOKEN } from "@/store/mutation-types"
import { welcome } from "@/utils/util"
import { login, logout } from "@/api/newpage"
const user = {
  state: {
    token: '',
    ntoken: '',
    username: '',
    realname: '',
    welcome: '',
    avatar: '',
    permissionList: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NTOKEN: (state, ntoken) => {
      state.ntoken = ntoken
    },
    SET_NAME: (state, { username, realname, welcome }) => {
      state.username = username
      state.realname = realname
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PERMISSIONLIST: (state, permissionList) => {
      state.permissionList = permissionList
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      console.log(userInfo)
      return new Promise((resolve, reject) => {
        console.log(resolve)
        console.log(reject)
        login(userInfo).then(response => {
          console.log(response)
          if (response.code == '200') {
            const result = response
            // const userInfo = result.userInfo
            Vue.ls.set(ACCESS_NTOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            // Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
            // Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
            commit('SET_NTOKEN', result.token)
            // commit('SET_INFO', userInfo)
            // commit('SET_NAME', { username: userInfo.username, realname: userInfo.realname, welcome: welcome() })
            // commit('SET_AVATAR', userInfo.avatar)
            resolve()
          } else if (response.code == '300') {
            alert("已过期，请重新登录")
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
          console.log(error)
        })
      })
    },
    // 获取用户信息
    GetPermissionList({ commit }) {
      return new Promise((resolve, reject) => {
        let username = Vue.ls.get(USER_NAME);
        let params = { username: username };
        const menuData = [{
          component: "dashboard/Analysis",
          id: "9502685863ab87f0ad1134142788a385",
          meta: { keepAlive: "true", icon: "home", title: "宣亚智能舆情" },
          name: "dashboard-analysis",
          path: "/dashboard/analysis",
          redirect: null,
          route: "1"
        },
        {
          component: "layouts/RouteView",
          id: "baf16b7174bdfwef821b6bab2ff3fa9abb200d",
          meta: { keepAlive: "true", icon: "ordered-list", title: "数据中心" },
          name: "dataCenter",
          path: "/dataCenter",
          route: "1",
          children: [{
            component: "layouts/RouteView",
            id: "fwe16516516156151dddfwefw61",
            meta: { keepAlive: "true", icon: "dash", title: "数据清洗" },
            name: "dataCenter-dataClean",
            path: "/dataCenter/dataClean",
            route: "1",
            children: [{
              component: "dataCenter/dataClean/pendingData",
              id: "fwe16516516156151dddfwefw61",
              meta: { keepAlive: "true", icon: "dash", title: "待处理数据" },
              name: "dataClean-pendingData",
              path: "/dataCenter/dataClean/pendingData",
              route: "1",
            }]
          }]
        },
        {
          component: "layouts/RouteView",
          id: "baf16b7174bdfwef821b6bab2ff3fa9abb200d",
          meta: { keepAlive: "true", icon: "ordered-list", title: "方案管理" },
          name: "dataC-recall",
          path: "/dataC/recall",
          redirect: null,
          route: "1",
          children: [{
            component: "dataC/itemAdd",
            id: "fwe16516516156151dddfwefw61",
            meta: { keepAlive: "true", icon: "dash", title: "添加方案" },
            name: "dataC-itemAdd",
            path: "/dataC/itemAdd",
            route: "1"
          },{
            component: "dataC/itemList",
            id: "fwe1651651615ddd61",
            meta: { keepAlive: "true", icon: "dash", title: "方案列表" },
            name: "dataC-itemList",
            path: "/dataC/itemList",
            route: "1"
          },
          {
            component: "dataC/recall",
            id: "baf16b7174bdfwef821b6bab2ff3fa9abb200d",
            meta: { keepAlive: "true", icon: "dash", title: "方案回溯" },
            name: "itemBack-itemBack",
            path: "/dataC/recall",
            route: "1"
          }]
        },
        {
          component: "layouts/RouteView",
          id: "baf16b7174bdfwef821b6bab23fa9abb200d",
          meta: { keepAlive: "true", icon: "ordered-list", title: "数据清洗" },
          name: "dataC",
          path: "/dataC",
          redirect: null,
          route: "1",
          children: [
            {
              component: "dataC/dataClean",
              id: "fwe165165161561",
              meta: { keepAlive: "true", icon: "dash", title: "数据清洗" },
              name: "dataC-dataClean",
              path: "/dataC/dataClean",
              route: "1"
            },
            {
              component: "dataDistribute/distribute",
              id: "fwe1651651615ddd61",
              meta: { keepAlive: "true", icon: "dash", title: "数据分发" },
              name: "dataDistribute-distribute",
              path: "/dataDistribute/distribute",
              route: "1"
            },
            {
              component: "dataC/inspectionReport",
              id: "fwe1651651615ddd61",
              meta: { keepAlive: "true", icon: "dash", title: "巡检通报" },
              name: "dataC-inspectionReport",
              path: "/dataC/inspectionReport",
              route: "1"
            }/*,
          {
            component: "dataC/dataDown",
            id: "fwe16516516156ddnjn1",
            meta: { keepAlive: "true", icon: "setting", title: "数据下载" },
            name: "dataC-dataDown",
            path: "/dataC/dataDown",
            route: "1"
          }*/]
        },
        /*{
          component: "layouts/RouteView",
          id: "baf16b7174bdfwef821b6bab23fa9abb200d",
          meta: { keepAlive: "true", icon: "ordered-list", title: "数据分发" },
          name: "dataDistribute",
          path: "/dataDistribute",
          redirect: null,
          route: "1",
          children: [{
            component: "dataDistribute/distribute",
            id: "fwe1651651615ddd61",
            meta: { keepAlive: "true", icon: "dash", title: "数据分发" },
            name: "dataDistribute-distribute",
            path: "/dataDistribute/distribute",
            route: "1"
          }]
        },*/
        {
          component: "layouts/RouteView",
          id: "baf16b7174bdfwef821b6bab23fa9abb200d",
          meta: { keepAlive: "true", icon: "ordered-list", title: "数据审核" },
          name: "dataAudit",
          path: "/dataAudit",
          redirect: null,
          route: "1",
          children: [{
            component: "dataAudit/audit",
            id: "fwe1651651615ddd61",
            meta: { keepAlive: "true", icon: "dash", title: "数据审核" },
            name: "dataAudit-audit",
            path: "/dataAudit/audit",
            route: "1"
          }/*,{
            component: "dataC/dataClean",
            id: "fwe165165161561",
            meta: { keepAlive: "true", icon: "dash", title: "已发布" },
            name: "dataC-dataClean",
            path: "/dataC/dataClean",
            route: "1"
          }*//*,{
            component: "dataAudit/kpi",
            id: "fwe16516516fwefew15ddd61",
            meta: { keepAlive: "true", icon: "dash", title: "KPI管理" },
            name: "dataAudit-kpi",
            path: "/dataAudit/kpi",
            route: "1"
          }*/]
        }, {
          component: "layouts/RouteView",
          id: "baf16b7174bdfwef821b6bab23fa9abb200d",
          meta: { keepAlive: "true", icon: "ordered-list", title: "绩效管理" },
          name: "gradeManage",
          path: "/gradeManage",
          redirect: null,
          route: "1",
          children: [{
            component: "gradeManage/grade",
            id: "fwe1651651615ddd61",
            meta: { keepAlive: "true", icon: "dash", title: "绩效管理" },
            name: "gradeManage-grade",
            path: "/gradeManage/grade",
            route: "1"
          }, {
            component: "gradeManage/jifenList",
            id: "fwe1651651615dddwefew61",
            meta: { keepAlive: "true", icon: "dash", title: "积分列表" },
            name: "gradeManage-jifenList",
            path: "/gradeManage/jifenList",
            route: "1"
          }, {
            component: "gradeManage/jifenGailan",
            id: "fwe1651651615dddwefew6ddd1",
            meta: { keepAlive: "true", icon: "dash", title: "积分概览" },
            name: "gradeManage-jifenGailan",
            path: "/gradeManage/jifenGailan",
            route: "1"
          }]
        },
        /* {
           component: "timContro/timContro",
           id: "950268586sd3ab87f0ad1134142788a385",
           meta: { keepAlive: "true", icon: "setting", title: "报告管理" },
           name: "timContro-timContro",
           path: "/timContro/timContro",
           redirect: null,
           route: "1"
         },*/
        {
          component: "layouts/RouteView",
          id: "baf16b7174bdfwef821b6bab23fa9abb200d",
          meta: { keepAlive: "true", icon: "ordered-list", title: "报告管理" },
          name: "reportCenter",
          path: "/reportCenter",
          redirect: null,
          route: "1",
          children: [{
            component: "reportCenter/report",
            id: "fwe1651651615ddd61",
            meta: { keepAlive: "true", icon: "dash", title: "报告管理" },
            name: "reportCenter-report",
            path: "/reportCenter/report",
            route: "1"
          }]
        },
        {
          component: "layouts/RouteView",
          id: "baf16b7174bdfwef821b6bab2ff3fa9abb200d",
          meta: { keepAlive: "true", icon: "ordered-list", title: "负面媒体库" },
          name: "badHub",
          path: "/badHub",
          redirect: null,
          route: "1",
          children: [{
            component: "badHub/badAll_b",
            id: "baf16b7174bdfwef821b6bab2ff3fa9afsdbb200d",
            meta: { keepAlive: "true", icon: "dash", title: "负面信息汇总" },
            name: "badHub-badAll_b",
            path: "/badHub/badAll_b",
            route: "1"
          }/*,
          {
            component: "badHub/badHub66",
            id: "baf16b7174bdfwef821bdsdsddwdw6bab2ff3fa9abfdvb200d",
            meta: { keepAlive: "true", icon: "dash", title: "负面媒体库" },
            name: "badHub-badHub66",
            path: "/badHub/badHub66",
            route: "1"
          }*/]
        },
        {
          component: "layouts/RouteView",
          id: "baf16b7174bd821b6bab23fa9abb200d",
          meta: { keepAlive: "true", icon: "ordered-list", title: "系统管理" },
          name: "isystem",
          path: "/isystem",
          redirect: null,
          route: "1",
          children: [{
            component: "system/UserList",
            id: "3f915b2769fc80648e92d04e84ca059d",
            meta: { keepAlive: "false", icon: "dash", title: "用户管理" },
            name: "isystem-user",
            path: "/isystem/user",
            route: "1"
          }, {
            component: "system/RoleList",
            id: "3f915b2769fc80648e92d04e84ca059f",
            meta: { keepAlive: "true", icon: "dash", title: "角色管理" },
            name: "isystem-role",
            path: "/isystem/role",
            route: "1"
          }, {
            component: "system/PermissionList",
            id: "3f915b2769fc80648e92d04e84ca059e",
            meta: { keepAlive: "true", icon: "dash", title: "菜单管理" },
            name: "isystem-permission",
            path: "/isystem/permission",
            route: "1"
          },
          {
            component: "system/labelControl",
            id: "3f915b2769fc8064fsfe8e92d04e84ca059cefed",
            meta: { keepAlive: "true", icon: "dash", title: "标签管理" },
            name: "system-labelControl",
            path: "/system/labelControl",
            route: "1"
          }
          ]
        },
        {
          component: "newPage/companyList",
          id: "3f915b2769fc80648e92d04e84ca059d",
          meta: { keepAlive: "true", icon: "ordered-list", title: "企业列表" },
          name: "newPage-companyList",
          path: "/newPage/companyList",
          redirect: null,
          route: "1"
        },
        {
          component: "layouts/RouteView",
          id: "3f915b2769fc8064ferfe8e9freffrewfref2frefd04e84ca0eferf59d",
          meta: { keepAlive: "true", icon: "ordered-list", title: "意见反馈" },
          name: "advice",
          path: "/advice",
          redirect: null,
          route: "1",
          children: [{
            component: "advice/adviceTheStage",
            id: "3f915b2769fc80648gergwe92d04e84cagtrgrt059d",
            meta: { keepAlive: "true", icon: "dash", title: "意见列表" },
            name: "advice-adviceTheStage",
            path: "/advice/adviceTheStage",
            route: "1"
          } /*, {
            component: "advice/adviceFile",
            id: "3f915b2769fc80648e92d04grge8gergerg4ca059f",
            meta: { keepAlive: "true",icon: "dash", title: "意见详情" },
            name: "advice-adviceFile",
            path: "/advice/adviceFile",
            route: "1"
          }*/]
        },
        {
          component: "journal/sysJournal",
          id: "3f915b2769fc8064ferfe8e92frefd04e84ca059d",
          meta: { keepAlive: "true", icon: "ordered-list", title: "系统日志" },
          name: "journal-sysJournal",
          path: "/journal/sysJournal",
          redirect: null,
          route: "1"
        }]
        if (menuData && menuData.length > 0) {
          commit('SET_PERMISSIONLIST', menuData)
        } else {
          reject('getPermissionList: permissions must be a non-null array !')
        }
        resolve(menuData)
        // getInit().then(response => {
        //   console.log(response)
        //   const userInfo = response.list.userInfo
        //   Vue.ls.set(USER_NAME, userInfo.user_name, 7 * 24 * 60 * 60 * 1000)
        //   Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
        //   commit('SET_INFO', userInfo)
        //   commit('SET_NAME', { username: userInfo.user_name, realname: userInfo.true_name, welcome: welcome() })
        //   commit('SET_AVATAR', userInfo.icon)

        //   const menuData = response.list.menuList;
        //   if (menuData && menuData.length > 0) {
        //     commit('SET_PERMISSIONLIST', menuData)
        //   } else {
        //     reject('getPermissionList: permissions must be a non-null array !')
        //   }
        //   resolve(menuData)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 登出
    Logout({ commit }) {
      return new Promise((resolve) => {
        commit('SET_NTOKEN', '')
        commit('SET_PERMISSIONLIST', [])
        Vue.ls.remove(ACCESS_NTOKEN)
        logout().then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    },

  }
}

export default user