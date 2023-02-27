import request from '@/utils/request'

export function getCVELoophole(data){
    return request({
        url:'/loophole/page/cve',
        method:'get',
        params:{
            ...data
        },
    })
}

export function getCWELoophole(data){
    return request({
        url:'/loophole/page/cwe',
        method:'get',
        params:{
            ...data
        },
    })
}

export function getCPELoophole(data){
    return request({
        url:'/loophole/page/cpe',
        method:'get',
        params:{
            ...data
        },
    })
}


export function getLicTypeList(data){
    return request({
        url:'/loophole/page/lic_type',
        method:'get',
        params:{
            ...data
        },
    })
}


export function getLicList(data){
    return request({
        url:'/loophole/page/lic',
        method:'get',
        params:{
            ...data
        },
    })
}

export function getCveId(data){
    return request({
        url:'/loophole/all_cve',
        method:'get',
        params:{
            ...data
        }
    })
}

export function getCveInfor(data){
    return request({
        url:'/loophole/cve_message',
        method:'get',
        params:{
            ...data
        }
    })
}