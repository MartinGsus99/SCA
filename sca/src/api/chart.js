import request from '@/utils/request'

export function getIndexChart(){
    return request({
        url: 'analysis/analysis/count',
        method: 'get',
        params:{
          
        },
    })
}

export function getAdminIndexChart(){
    return request({
        url: '/sys/system/status',
        method: 'get',
        params:{
          
        },
    })
}
