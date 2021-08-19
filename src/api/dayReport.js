import request from '@/utils/request'

// 查询可以填写的表格数据
export function getDayReport(query) {
  return request({
    url: '/fbdr/selectByReportOrg',
    method: 'get',
    params: query
  })
}
 
// 新增/修改
export function addDayReport(data) {
  return request({
    url: '/fbdr/saveDailyReport',
    method: 'post',
    data: data
  })
}
// 预览
export function previewDayReport(query) {
  return request({
    url: '/fbdr/selectByViewOrg',
    method: 'get',
    params: query
  })
}
// 填写
export function getYesterdayData(query) {
  return request({
    url: '/fbdr/getBeforeWorkDayInfo',
    method: 'get',
    params: query
  })
}