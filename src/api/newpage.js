import { getAction, deleteAction, putAction, postAction, postboobAction } from '@/api/nmanage'


//标签列表
const biaoqianList = (params) => getAction("/admin/tag/getlist", params);

//标签添加
const biaoqianAdd = (params) => postAction("/admin/tag/add", params);

//标签编辑
const biaoqianEdit = (params) => postAction("/admin/tag/edit", params);

//标签删除
const biaoqianDelete = (params) => postAction("/admin/tag/delete", params);

//角色管理
const login = (params) => postAction("/admin/login/login", params);

const logout = (params) => getAction("/admin/site/logout", params);


const getInit = (params) => getAction("/admin/home/init", params);


const getList = (params) => getAction("/admin/enterprise/list", params);


//获取企业列表
const getCompanyList = (params) => getAction("/admin/enterprise/list", params);

//添加企业
const editCompanyADD = (params) => postAction("/admin/enterprise/add", params);

//编辑企业
const editCompany = (params) => postAction("/admin/enterprise/edit", params);

const esedit = (params) => postAction("/admin/enterprise/esedit", params);
//获取菜单
const authList = (params) => getAction("/admin/auth/list", params);

// 添加菜单
const editList = (params) => postAction("/admin/auth/edit", params);

//获取角色列表
const roleList = (params) => getAction("/admin/role/list", params);
//添加编辑角色

const editRole = (params) => postAction("/admin/role/edit", params);
//绑定角色权限
const bingRole = (params) => postAction("/admin/role/bing", params);

//h获取角色权限
const roleAuthlist = (params) => postAction("/admin/role/authlist", params);

//获取用户列表
const userList = (params) => getAction("/admin/user/list", params);

//获取企业列表
const enterpriseList = (params) => getAction("/admin/enterprise/selectlist", params);
//添加用户
const editUser = (params) => postAction("/admin/user/edit", params);

//角色绑定
const bingUser = (params) => postAction("/admin/user/bing", params);

//获取所有角色
const rolelist = (params) => getAction("/admin/role/rolelist", params);

const getSelectlist = (params) => getAction("/admin/enterprise/selectlist", params);

const getLQ = (params) => getAction("/admin/schemetype/list", params);

const addScheme = (params) => postAction("/admin/scheme/add", params);

const postActionJC = (params) => postAction("/admin/scheme/addqb", params);//开始监测

const dealList = (params) => getAction("/admin/enterprise/deallist", params);//登录时获取企业选项

const selectDeal = (params) => postAction("/admin/enterprise/select", params);//发送所选企业

//添加方案中的企业列表&分配处理企业列表
const getFenpeiList = (params) => getAction("/admin/enterprise/deallist", params);

/*//获取数据清洗列表
const getSentimentList = (params)=>getAction("/admin/sentiment/list",params);

//获取网络类别
const getNetwork = (params)=>getAction("/admin/sentiment/network",params);*/


//方案列表
const schemeList = (params) => getAction("/admin/scheme/list", params);

//方案关闭
const schemeDel = (params) => postAction("/admin/scheme/close", params);

//方案删除
const schemeRealDel = (params) => postAction("/admin/scheme/del", params);

//添加方案类型
const schemetypeEdit = (params) => postAction("/admin/schemetype/edit", params);

//添加方案标签
const schemetypeSelectlist = (params) => postAction("/admin/schemetype/selectlist", params);

//获取数据清洗列表
const getSentimentList = (params) => getAction("/admin/sentiment/list", params);

//获取网络类别
const getNetwork = (params) => getAction("/admin/sentiment/network", params);

//批量修改
const batchupdate = (params) => postAction("/admin/sentiment/batchupdate", params);

//获取车型列表
const carlist = (params) => getAction("/admin/cartype/list", params);

//批量删除
const batchdel = (params) => postAction("/admin/sentiment/batchdel", params);

//添加时间节点
const addtime = (params) => getAction("/admin/sentiment/addtime", params);

//批量发布
const batchpublish = (params) => getAction("/admin/sentiment/batchpublish", params);

//相似文章
const simhash = (params) => getAction("/admin/sentiment/simhash", params);

//回溯分析 -- 产品列表
const stype = (params) => getAction("/admin/schemeback/stype", params);

//巡检 -- 产品列表
const xjStype = (params) => getAction("/admin/xunjian/stype", params);


//回溯分析 -- 列表
const schemebackList = (params) => getAction("/admin/schemeback/list", params);

//巡检 -- 列表
const xunjianList = (params) => getAction("/admin/xunjian/list", params);

//回溯分析 -- 网络类别
const schemebackNetwork = (params) => getAction("/admin/schemeback/network", params);

//巡检 -- 网络类别
const xunjianNetwork = (params) => getAction("/admin/xunjian/network", params);

//负面信息汇总
const badAllList = (params) => getAction("/admin/negative/list", params);

//负面信息汇总网络类别条数
const badAllnetwork = (params) => getAction("/admin/negative/network", params);

//合作中企业列表
const getCooperate = (params) => getAction("/admin/enterprise/selectlist", params);

//获取该账号已分配企业id数组
const postUeid = (params) => postAction("/admin/user/ueid", params);

//账号分配企业
const postBinge = (params) => postAction("/admin/user/binge", params);

//车型添加
const cartypeAdd = (params) => postAction("/admin/cartype/edit", params);

//车型列表
const cartypeListbyid = (params) => postAction("/admin/cartype/listbyid", params);

//系统日志
const systemlog = (params) => getAction("/admin/systemlog/list", params);

//热度降序
const sameOrder = (params) => getAction("/admin/sentiment/sameorder", params);

//拉取数据
const pullData = (params) => getAction("/admin/assign/pull", params);

const getDataList = (params) => getAction("/admin/assign/list", params);
//热度降序
const getListBySameorder = (params) => getAction("/admin/assign/sameorder", params);

//数据提交
const submitData = (params) => postAction("/admin/assign/submit", params);
//分发处理信息
const handledMsgFf = (params) => postAction("/admin/assign/handled", params);

//审核列表
const getCheckList = (params) => getAction("/admin/check/list", params);
//热度降序
const getCheckListBySameorder = (params) => getAction("/admin/check/sameorder", params);

//审核
const checkData = (params) => postAction("/admin/check/check", params);
// 查看审核中相识文章
const checkSimhash = (params) => postAction("/admin/check/simhash", params);

//审核中处理信息
const handledMsg = (params) => postAction("/admin/check/handled", params);

//报告列表
const getReportList = (params) => getAction("/admin/report/list", params);
//添加报表
const addReport = (params) => postAction("/admin/report/add", params);

//绩效列表
//const kpiList = (params)=>getAction("/admin/performance/list",params);

//绩效详情
//const kpiFile = (params)=>postAction("/admin/performance/detail",params);

//下载excel
//const downloadExcel = (params)=>postAction("/admin/upload/download",params);

//下载excel
const downloadExcel = (params) => postboobAction("/admin/upload/download", params);
//绩效列表
const getPerformanceList = (params) => getAction("/admin/performance/list", params);

//绩效详情
const getPerformanceDetail = (params) => postAction("/admin/performance/detail", params);

//巡检相似文章
const xunjiansimhash = (params) => getAction("/admin/xunjian/simhash", params);

//方案更新
const itemEdit = (params) => postAction("/admin/scheme/edit", params);


//待处理意见列表
const adviceList = (params) => getAction("/admin/feedback/list", params);

//意见详情
const adviceFile = (params) => postAction("/admin/feedback/detail", params);

//后台反馈
const adviceFan = (params) => postAction("/admin/feedback/add", params);

//意见解决
const adviceKo = (params) => postAction("/admin/feedback/edit", params);

//方案详情
const itemWlist = (params) => postAction("/admin/scheme/detail", params);

//验证码
const loginSms = (params) => postAction("/admin/login/sendcode", params);

//前台-意见反馈列表
const adviceListQ = (params) => getAction("/home/feedback/list", params);

//前台-添加意见回复
const adviceAddQ = (params) => postAction("/home/feedback/addback", params);

//前台-意见详情
const adviceFileQ = (params) => postAction("/home/feedback/detail", params);

//前台-新建意见
const adviceNewTimQ = (params) => postAction("/home/feedback/add", params);

//前台-关闭反馈
const adviceCloseQ = (params) => postAction("/home/feedback/close", params);

//前台-意见评价
const adviceStarQ = (params) => postAction("/home/feedback/evaluate", params);

//记录积分
const jiluJifen = (params) => postAction("/admin/assign/record", params);

//积分列表
const jifenList = (params) => getAction("/admin/integral/list", params);

//驳回原因列表
const bohuiList = (params) => getAction("/admin/check/reject_list", params);

//审核不通过
const bohuiOK = (params) => postAction("/admin/check/reject", params);

//驳回删除   &&  驳回原因添加
const bohuiDelAdd = (params) => postAction("/admin/check/edit_reason", params);

//获取单条驳回原因
const bohuiYuanyin = (params) => postAction("/admin/assign/get_reject", params);

//积分概览
const jifenGailan = (params) => getAction("/admin/integral/overview", params);

//批量发布
const fabuPL = (params) => postAction("/admin/sentiment/publish", params);

//日报详情
const ribaoFile = (params) => postAction("/admin/report/detail", params);


//获取角色列表
const getRoleList = (params) => getAction("/admin/role/get_tree", params);

//获取用户列表
const getUserList = (params) => getAction("/admin/user/list", params);

//新增编辑用户
const addEditUser = (params) => postAction("/admin/user/edit", params);
//删除用户
const deleteUser = (params) => postAction("/admin/user/delete", params);

//删除菜单
const deletePermission = (params) => postAction("/admin/auth/delete", params);

export {
    logout,
    login,
    getList,
    getCompanyList,
    editCompany,
    esedit,
    authList,
    editList,
    roleList,
    editRole,
    bingRole,
    roleAuthlist,
    userList,
    enterpriseList,
    editUser,
    bingUser,
    rolelist,
    getInit,
    getSelectlist,
    getLQ,
    addScheme,
    postActionJC,
    dealList,
    selectDeal,
    getSentimentList,
    getNetwork,
    schemeList,
    schemeDel,
    batchupdate,
    carlist,
    batchdel,
    addtime,
    batchpublish,
    simhash,
    stype,
    schemebackList,
    schemebackNetwork,
    xjStype,
    xunjianList,
    xunjianNetwork,
    badAllList,
    badAllnetwork,
    getCooperate,
    postUeid,
    postBinge,
    getFenpeiList,
    schemetypeEdit,
    cartypeAdd,
    schemetypeSelectlist,
    cartypeListbyid,
    systemlog,
    sameOrder,
    pullData,
    getDataList,
    getListBySameorder,
    submitData,
    getCheckList,
    getCheckListBySameorder,
    checkData,
    checkSimhash,
    handledMsg,
    handledMsgFf,
    getReportList,
    addReport,
    downloadExcel,
    getPerformanceList,
    getPerformanceDetail,
    xunjiansimhash,
    itemEdit,
    adviceList,
    adviceFile,
    itemWlist,
    schemeRealDel,
    loginSms,
    adviceListQ,
    adviceAddQ,
    adviceFileQ,
    adviceNewTimQ,
    adviceCloseQ,
    adviceStarQ,
    adviceFan,
    adviceKo,
    jiluJifen,
    editCompanyADD,
    jifenList,
    bohuiList,
    bohuiOK,
    bohuiDelAdd,
    bohuiYuanyin,
    jifenGailan,
    fabuPL,
    ribaoFile,
    getRoleList,
    getUserList,
    addEditUser,
    deletePermission,
    deleteUser,
    biaoqianList,
    biaoqianAdd,
    biaoqianEdit,
    biaoqianDelete
}
