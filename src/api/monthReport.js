import request from '@/utils/request'
// 查询可以填写的表格数据
export function getMonthReport(query) {
  return request({
    url: '/bankAccountMonthReport/getMonthBaseData',
    method: 'get',
    params: query
  })
}
// 新增/修改
export function addMonthReport(data) {
  return request({
    url: '/bankAccountMonthReport/save',
    method: 'post',
    data: data
  })
}
// 预览
export function previewMonthReport(query) {
  return request({
    url: '/bankAccountMonthReport/getMonthData',
    method: 'get',
    params: query
  })
}
 