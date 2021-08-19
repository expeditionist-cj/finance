import request from '@/utils/request'
 
export const getPlantDs = (query) => {
    return request({
        url: "/fbdr/remind",
        method: 'get',
        params: query,
    })
}
  