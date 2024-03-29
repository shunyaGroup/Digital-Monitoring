import { getAction,deleteAction,putAction,postAction} from '@/api/manage'

////根路径
// const doMian = "/jeecg-boot/";
////图片预览请求地址
// const imgView = "http://localhost:8080/jeecg-boot/sys/common/view/";


//角色管理
const addRole = (params)=>postAction("/sys/role/add",params);
const editRole = (params)=>putAction("/sys/role/edit",params);
// const getRoleList = (params)=>getAction("/sys/role/list",params);
// const deleteRole = (params)=>deleteAction("/sys/role/delete",params);
// const deleteRoleList = (params)=>deleteAction("/sys/role/deleteBatch",params);
const checkRoleCode = (params)=>getAction("/sys/role/checkRoleCode",params);
const queryall = (params)=>getAction("/sys/role/queryall",params);

//用户管理
const addUser = (params)=>postAction("/sys/user/add",params);
const editUser = (params)=>putAction("/sys/user/edit",params);
const queryUserRole = (params)=>getAction("/sys/user/queryUserRole",params);
const getUserList = (params)=>getAction("/sys/user/list",params);
// const deleteUser = (params)=>deleteAction("/sys/user/delete",params);
// const deleteUserList = (params)=>deleteAction("/sys/user/deleteBatch",params);
const frozenBatch = (params)=>putAction("/sys/user/frozenBatch",params);
//验证用户账号是否唯一
const checkUsername = (params)=>getAction("/sys/user/checkOnlyUser",params);
//改变密码
const changPassword = (params)=>putAction("/sys/user/changPassword",params);

//权限管理
const addPermission= (params)=>postAction("/sys/permission/add",params);
const editPermission= (params)=>putAction("/sys/permission/edit",params);
const getPermissionList = (params)=>getAction("/sys/permission/list",params);
// const deletePermission = (params)=>deleteAction("/sys/permission/delete",params);
// const deletePermissionList = (params)=>deleteAction("/sys/permission/deleteBatch",params);
const queryTreeList = (params)=>getAction("/sys/permission/queryTreeList",params);
const queryTreeListForRole = (params)=>getAction("/sys/role/queryTreeList",params);
const queryListAsync = (params)=>getAction("/sys/permission/queryListAsync",params);
const queryRolePermission = (params)=>getAction("/sys/permission/queryRolePermission",params);
const saveRolePermission = (params)=>postAction("/sys/permission/saveRolePermission",params);
const queryPermissionsByUser = (params)=>getAction("/sys/permission/queryByUser",params);
const loadAllRoleIds = (params)=>getAction("/sys/permission/loadAllRoleIds",params);
const getPermissionRuleList = (params)=>getAction("/sys/permission/getPermRuleListByPermId",params);
const queryPermissionRule = (params)=>getAction("/sys/permission/queryPermissionRule",params);

// 部门管理
const queryDepartTreeList = (params)=>getAction("/sysdepart/sysDepart/queryTreeList",params);
const queryIdTree = (params)=>getAction("/sysdepart/sysDepart/queryIdTree",params);
const queryParentName   = (params)=>getAction("/sysdepart/sysDepart/queryParentName",params);
const searchByKeywords   = (params)=>getAction("/sysdepart/sysDepart/searchBy",params);
const deleteByDepartId   = (params)=>deleteAction("/sysdepart/sysDepart/delete",params);

//日志管理
//const getLogList = (params)=>getAction("/sys/log/list",params);
const deleteLog = (params)=>deleteAction("/sys/log/delete",params);
const deleteLogList = (params)=>deleteAction("/sys/log/deleteBatch",params);

//数据字典
const addDict = (params)=>postAction("/sys/dict/add",params);
const editDict = (params)=>putAction("/sys/dict/edit",params);
//const getDictList = (params)=>getAction("/sys/dict/list",params);
const treeList = (params)=>getAction("/sys/dict/treeList",params);
const delDict = (params)=>deleteAction("/sys/dict/delete",params);
const getDictItemList = (params)=>getAction("/sys/dictItem/list",params);
const addDictItem = (params)=>postAction("/sys/dictItem/add",params);
const editDictItem = (params)=>putAction("/sys/dictItem/edit",params);
//const delDictItem = (params)=>deleteAction("/sys/dictItem/delete",params);
//const delDictItemList = (params)=>deleteAction("/sys/dictItem/deleteBatch",params);

//字典标签专用（通过code获取字典数组）
export const ajaxGetDictItems = (code, params)=>getAction(`/sys/dict/getDictItems/${code}`,params);

//系统通告
const doReleaseData = (params)=>getAction("/sys/annountCement/doReleaseData",params);
const doReovkeData = (params)=>getAction("/sys/annountCement/doReovkeData",params);
//获取系统访问量
const getLoginfo = (params)=>getAction("/sys/loginfo",params);
//数据日志访问
// const getDataLogList = (params)=>getAction("/sys/dataLog/list",params);

// 根据部门主键查询用户信息
const queryUserByDepId = (params)=>getAction("/sys/user/queryUserByDepId",params);

// 查询用户角色表里的所有信息
const queryUserRoleMap = (params)=>getAction("/sys/user/queryUserRoleMap",params);
// 重复校验
const duplicateCheck = (params)=>getAction("/sys/duplicate/check",params);

//系统管理 -- 项目管理 -- 获取项目列表
const projectList = (params)=>getAction("/project/aiProject/list",params);
//系统管理 -- 项目管理 -- 获取全部项目
const allprojectList = (params)=>getAction("/project/aiProject/queryList",params);

//系统管理 -- 项目管理 -- 添加项目
const addProject = (params)=>postAction("/project/aiProject/add",params);

//系统管理 -- 项目管理 -- 删除项目
const deleteProject = (params)=>deleteAction("/project/aiProject/delete",params);

//系统管理 -- 项目管理 -- 批量删除项目
const deleteProjectBatch = (params)=>deleteAction("/project/aiProject/deleteBatch",params);

//系统管理 -- 项目管理 -- 编辑项目
const editProject = (params)=>putAction("/project/aiProject/add",params);

//系统管理 -- 场景管理 -- 根据项目Id获取场景列表
const sceneQueryList = (params)=>getAction("/scene/aiScene/queryList",params);

//系统管理 -- 场景管理 -- 根据项目Id获取产品列表
const produceQueryList = (params)=>getAction("/produce/aiProduce/queryList",params);


//系统管理 -- 场景管理 -- 添加场景
const addScene = (params)=>postAction("/scene/aiScene/add",params);

//系统管理 -- 场景管理 -- 删除场景
const deleteScene = (params)=>deleteAction("/scene/aiScene/delete",params);

//系统管理 -- 场景管理 -- 批量删除场景
const deleteSceneBatch = (params)=>deleteAction("/scene/aiScene/deleteBatch",params);
//系统管理 -- 场景管理 -- 编辑场景
const editScene = (params)=>putAction("/scene/aiScene/edit",params);

//系统管理 -- 产品管理 -- 添加产品
const addProduce = (params)=>postAction("/produce/aiProduce/add",params);

//系统管理 -- 产品管理 -- 编辑产品
const editProduce = (params)=>putAction("/produce/aiProduce/edit",params);

//系统管理 -- 产品管理 -- 删除产品
const deleteProduce = (params)=>deleteAction("/produce/aiProduce/delete",params);
//系统管理 -- 产品管理 -- 批量删除产品
const deleteProduceBatch = (params)=>deleteAction("/produce/aiProduce/deleteBatch",params);

//人工智能短评 -- 添加新闻
//onst addNews = (params)=>postAction("/pdnews/pdNews/add",params);
//人工智能短评 -- 删除新闻
const deleteNews = (params)=>deleteAction("/pdnews/pdNews/delete",params);
//人工智能短评  -- 编辑新闻
const editNews = (params)=>putAction("/pdnews/pdNews/edit",params);


//获取话术列表
const getCorpusList = (params)=>getAction("/pdnews/pdNews/getCorpusList",params);

//修改话术
const corpusChange = (params)=>getAction("/pdnews/pdNews/corpusChange",params);

//添加新闻话术
const insertcorpus = (params)=>getAction("/pdnews/pdNews/insertNewsCorpus",params);
//删除新闻话术
const deletecorpus = (params)=>getAction("/pdnews/pdNews/deleteNewsCorpus",params);

//导出新闻列表模板
const importTemp = (params)=>getAction("/pdnews/pdNews/importTemp",params);

//根据链接识别
const doSpiderAi = (params)=>getAction("/pdnews/pdNews/doSpiderAi",params);
export {
  // imgView,
  // doMian,
  addRole,
  editRole,
  checkRoleCode,
  addUser,
  editUser,
  queryUserRole,
  getUserList,
  queryall,
  frozenBatch,
  checkUsername,
  changPassword,
  getPermissionList,
  addPermission,
  editPermission,
  queryTreeList,
  queryListAsync,
  queryRolePermission,
  saveRolePermission,
  queryPermissionsByUser,
  loadAllRoleIds,
  getPermissionRuleList,
  queryPermissionRule,
  queryDepartTreeList,
  queryIdTree,
  queryParentName,
  searchByKeywords,
  deleteByDepartId,
  deleteLog,
  deleteLogList,
  addDict,
  editDict,
  treeList,
  addDictItem,
  editDictItem,
  doReleaseData,
  doReovkeData,
  getLoginfo,
  queryUserByDepId,
  queryUserRoleMap,
  duplicateCheck,
  queryTreeListForRole,
  projectList,
  addProject,
  deleteProject,
  editProject,
  addScene,
  deleteScene,
  editScene,
  addProduce,
  editProduce,
  deleteProduce,
  deleteProduceBatch,
  deleteProjectBatch,
  deleteSceneBatch,
  allprojectList,
  //addNews,
  deleteNews,
  editNews,
  sceneQueryList,
  produceQueryList,
  getCorpusList,
  corpusChange,
  insertcorpus,
  deletecorpus,
  importTemp,
  doSpiderAi,
  getDictItemList,
  delDict
}
