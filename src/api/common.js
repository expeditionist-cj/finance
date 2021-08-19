import request from '@/utils/request'

// 导出excel
export const excel = (url, query) => {
    return request({
        url,
        method: 'get',
        params: query,
        responseType: 'arraybuffer'
    })
}