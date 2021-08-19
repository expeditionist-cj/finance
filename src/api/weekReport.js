import request from '@/utils/request'
// 查询可以填写的表格数据
export function getWeekReport(query) {
  return request({
    url: '/fund_balance_week/writeList',
    method: 'get',
    params: query
  })
}
// 新增/修改
export function addWeekReport(data) {
  return request({
    url: '/fund_balance_week/save',
    method: 'post',
    data: data
  })
}
// 预览
export function previewWeekReport(query) {
  return request({
    url: '/fund_balance_week/preview',
    method: 'get',
    params: query
  })
}
 