import request from '@/utils/request'

// 首页模型列表启用停用
export function updateStopAndRun(data) {
  return request({
    url: '/modelInstance/update',
    method: 'post',
    data
  })
}

// 首页模型列表查询
export function selectByPage(query) {
  return request({
    url: '/modelInstance/selectByPage',
    method: 'get',
    params: query
  })
}

// 模型实例查询
export function selectInstance(query) {
  return request({
    url: '/modelInstance/selectInstance',
    method: 'get',
    params: query
  })
}

// 查询模型分类
export function selectModelType(query) {
  return request({
    url: '/modelDataSource/selectModelType',
    method: 'get',
    params: query
  })
}

// 查询模型列表
export function selectModelList(query) {
  return request({
    url: '/modelDataSource/selectModelTypeList',
    method: 'get',
    params: query
  })
}

// 查询项目列表
export function selectPlantCode(query) {
  return request({
    url: '/modelDataSource/selectPlantCode',
    method: 'get',
    params: query
  })
}

// 查询机组列表
export function selectUnitCode(query) {
  return request({
    url: '/modelDataSource/selectUnitCode',
    method: 'get',
    params: query
  })
}

// 新增模型实例
export function saveInstanceList(data) {
  return request({
    url: '/modelInstance/save',
    method: 'post',
    data
  })
}

// 更新模型实例
export function updateInstance(data) {
  return request({
    url: '/modelInstance/update',
    method: 'post',
    data
  })
}

// 查询模型参数列表第二步
export function selectModelParamDicList(query) {
  return request({
    url: '/modelDataSource/selectModelParamDicList',
    method: 'get',
    params: query
  })
}

// 第二步专家参数校验
export function validateConstParamCode(data) {
  return request({
    url: '/model_instance_point_const/validate_const_param_code',
    method: 'post',
    data
  })
}
// 查询专家参数
export function queryByInstanceId(query) {
  return request({
    url: '/model_instance_const/queryByInstanceId',
    method: 'get',
    params:query
  })
}
// 更新专家参数
export function update(data) {
  return request({
    url: '/model_instance_const/update',
    method: 'post',
    data
  })
}


// 专家经验参数第二步新增
export function batchSave(data) {
  return request({
    url: '/model_instance_const/batch_save',
    method: 'post',
    data
  })
}

// 计算点初始化加载参数
export function selectModelListThirdStep(query) {
  return request({
    url: '/modelDataSource/selectModelList',
    method: 'get',
    params:query
  })
}

