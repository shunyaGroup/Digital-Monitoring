(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-03ddf599"],{"2d51":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("a-card",{attrs:{bordered:!1}},[s("a-row",[s("a-col",{attrs:{sm:8,xs:24}},[s("head-info",{attrs:{title:"我的待办",content:"8个任务",bordered:!0}})],1),s("a-col",{attrs:{sm:8,xs:24}},[s("head-info",{attrs:{title:"本周任务平均处理时间",content:"32分钟",bordered:!0}})],1),s("a-col",{attrs:{sm:8,xs:24}},[s("head-info",{attrs:{title:"本周完成任务数",content:"24个"}})],1)],1)],1),s("a-card",{staticStyle:{"margin-top":"24px"},attrs:{bordered:!1,title:"标准列表"}},[s("div",{attrs:{slot:"extra"},slot:"extra"},[s("a-radio-group",[s("a-radio-button",[t._v("全部")]),s("a-radio-button",[t._v("进行中")]),s("a-radio-button",[t._v("等待中")])],1),s("a-input-search",{staticStyle:{"margin-left":"16px",width:"272px"}})],1),s("div",{staticClass:"operate"},[s("a-button",{staticStyle:{width:"100%"},attrs:{type:"dashed",icon:"plus"}},[t._v("添加")])],1),s("a-list",{attrs:{size:"large",pagination:{showSizeChanger:!0,showQuickJumper:!0,pageSize:5,total:50}}},t._l(t.data,function(a,e){return s("a-list-item",{key:e},[s("a-list-item-meta",{attrs:{description:a.description}},[s("a-avatar",{attrs:{slot:"avatar",size:"large",shape:"square",src:a.avatar},slot:"avatar"}),s("a",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(a.title))])],1),s("div",{attrs:{slot:"actions"},slot:"actions"},[s("a",[t._v("编辑")])]),s("div",{attrs:{slot:"actions"},slot:"actions"},[s("a-dropdown",[s("a-menu",{attrs:{slot:"overlay"},slot:"overlay"},[s("a-menu-item",[s("a",[t._v("编辑")])]),s("a-menu-item",[s("a",[t._v("删除")])])],1),s("a",[t._v("更多"),s("a-icon",{attrs:{type:"down"}})],1)],1)],1),s("div",{staticClass:"list-content"},[s("div",{staticClass:"list-content-item"},[s("span",[t._v("Owner")]),s("p",[t._v(t._s(a.owner))])]),s("div",{staticClass:"list-content-item"},[s("span",[t._v("开始时间")]),s("p",[t._v(t._s(a.startAt))])]),s("div",{staticClass:"list-content-item"},[s("a-progress",{staticStyle:{width:"180px"},attrs:{percent:a.progress.value,status:a.progress.status?a.progress.status:null}})],1)])],1)}),1)],1)],1)},r=[],o=s("81d1"),n=[];n.push({title:"Alipay",avatar:"https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",description:"那是一种内在的东西， 他们到达不了，也无法触及的",owner:"付晓晓",startAt:"2018-07-26 22:44",progress:{value:90}}),n.push({title:"Angular",avatar:"https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",description:"希望是一个好东西，也许是最好的，好东西是不会消亡的",owner:"曲丽丽",startAt:"2018-07-26 22:44",progress:{value:54}}),n.push({title:"Ant Design",avatar:"https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",description:"生命就像一盒巧克力，结果往往出人意料",owner:"林东东",startAt:"2018-07-26 22:44",progress:{value:66}}),n.push({title:"Ant Design Pro",avatar:"https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png",description:"城镇中有那么多的酒馆，她却偏偏走进了我的酒馆",owner:"周星星",startAt:"2018-07-26 22:44",progress:{value:30}}),n.push({title:"Bootstrap",avatar:"https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png",description:"那时候我只会想自己想要什么，从不想自己拥有什么",owner:"吴加好",startAt:"2018-07-26 22:44",progress:{status:"exception",value:100}});var i={name:"StandardList",components:{HeadInfo:o["default"]},data:function(){return{data:n}}},l=i,p=(s("8343"),s("2877")),c=Object(p["a"])(l,e,r,!1,null,"64b9f314",null);a["default"]=c.exports},"81d1":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"head-info",class:t.center&&"center"},[s("span",[t._v(t._s(t.title))]),s("p",[t._v(t._s(t.content))]),t.bordered?s("em"):t._e()])},r=[],o={name:"HeadInfo",props:{title:{type:String,default:""},content:{type:String,default:""},bordered:{type:Boolean,default:!1},center:{type:Boolean,default:!0}}},n=o,i=(s("8519"),s("2877")),l=Object(i["a"])(n,e,r,!1,null,"4d866d96",null);a["default"]=l.exports},8343:function(t,a,s){"use strict";var e=s("af63"),r=s.n(e);r.a},8519:function(t,a,s){"use strict";var e=s("e114"),r=s.n(e);r.a},af63:function(t,a,s){},e114:function(t,a,s){}}]);