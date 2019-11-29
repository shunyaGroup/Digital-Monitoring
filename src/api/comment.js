import { getAction, deleteAction, putAction, postAction, postData } from '@/api/manage'



//字典标签专用（通过code获取字典数组）
export const ajaxGetDictItems = (code, params) => getAction(`http://39.97.240.97:8080/AIRW/sys/dict/getDictItems/${code}`, params);



//系统管理 -- 场景管理 -- 根据项目Id获取场景列表
const sceneQueryList = (params) => getAction("http://39.97.240.97:8080/AIRW/scene/aiScene/queryList", params);

//系统管理 -- 场景管理 -- 根据项目Id获取产品列表
const produceQueryList = (params) => getAction("http://39.97.240.97:8080/AIRW/produce/aiProduce/queryList", params);




//人工智能短评 -- 添加新闻
const addNews = (params) => postAction("http://39.97.240.97:8080/AIRW/pdnews/pdNews/add", params);
//人工智能短评 -- 删除新闻
const deleteNews = (params) => deleteAction("http://39.97.240.97:8080/AIRW/pdnews/pdNews/delete", params);

//人工智能短评 -- 批量删除新闻
const deleteNewsBatch = (params) => deleteAction("http://39.97.240.97:8080/AIRW/pdnews/pdNews/deleteBatch", params);

//人工智能短评  -- 编辑新闻
const editNews = (params) => putAction("http://39.97.240.97:8080/AIRW/pdnews/pdNews/edit", params);


//获取话术列表
const getCorpusList = (params) => getAction("http://39.97.240.97:8080/AIRW/pdnews/pdNews/getCorpusList", params);

//修改话术
const corpusChange = (params) => getAction("http://39.97.240.97:8080/AIRW/pdnews/pdNews/corpusChange", params);

//添加新闻话术
const insertcorpus = (params) => getAction("http://39.97.240.97:8080/AIRW/pdnews/pdNews/insertNewsCorpus", params);
//删除新闻话术
const deletecorpus = (params) => getAction("http://39.97.240.97:8080/AIRW/pdnews/pdNews/deleteNewsCorpus", params);

//导出新闻列表模板
const importTemp = (params) => getAction("http://39.97.240.97:8080/AIRW/pdnews/pdNews/importTemp", params);

//根据链接识别
const doSpiderAi = (params) => getAction("http://39.97.240.97:8080/AIRW/pdnews/pdNews/doSpiderAi", params);

//添加项目
const aiProjectPlist = (params) => getAction("http://39.97.240.97:8080/AIRW/project/aiProject/plist", params);
//删除项目
const deleteAiProject = (params) => deleteAction("http://39.97.240.97:8080/AIRW/project/aiProject/delete", params);

// 编辑项目
const editAiProject = (params) => putAction("http://39.97.240.97:8080/AIRW/project/aiProject/edit", params);
//  批量删除项目
const deleteBatchProject = (params) => deleteAction("http://39.97.240.97:8080/AIRW/project/aiProject/deleteBatch", params);

//根据项目id查询项目
const getprojectList = (params) => getAction("http://39.97.240.97:8080/AIRW/project/aiProject/queryById", params);

//根据项目id获取任务
const gettaskListByid = (params) => getAction("http://39.97.240.97:8080/AIRW/task/aiTask/queryList", params);

//添加任务
const addAiTask = (params) => postAction("http://39.97.240.97:8080/AIRW/task/aiTask/add", params);

//获取任务列表
const gettaskList = (params) => getAction("http://39.97.240.97:8080/AIRW/task/aiTask/list", params);

//  删除任务
const deleteTask = (params) => deleteAction("http://39.97.240.97:8080/AIRW/task/aiTask/delete", params);

//  批量删除任务
const deleteTaskBatch = (params) => deleteAction("http://39.97.240.97:8080/AIRW/task/aiTask/deleteBatch", params);

// 编辑任务

const editAiTask = (params) => putAction("http://39.97.240.97:8080/AIRW/task/aiTask/edit", params);

//根据任务id获取批次列表
const getbatchList = (params) => getAction("http://39.97.240.97:8080/AIRW/batch/taskBatch/queryList", params);

//添加任务批次
const addBatch = (params) => postAction("http://39.97.240.97:8080/AIRW/batch/taskBatch/add", params);

//批量生成话术
const batchInsertNewsCorpus = (params) => postAction("http://39.97.240.97:8080/AIRW/pdnews/pdNews/batchInsertNewsCorpus", params);

//批量生成话术
const loginOther = (params) => postAction("http://39.97.240.97:8080/AIRW/sys/login", params);

export {
    addNews,
    deleteNews,
    editNews,
    sceneQueryList,
    produceQueryList,
    getCorpusList,
    corpusChange,
    insertcorpus,
    deletecorpus,
    doSpiderAi,
    aiProjectPlist,
    gettaskListByid,
    deleteNewsBatch,
    getbatchList,
    addBatch,
    batchInsertNewsCorpus,
    loginOther
}
