import request from '@/utils/request'

export function addSetting(data) {
    return request({
      url: '/content-analysis/addSetting',
      method: 'post',
      data
    })
  }
  
  export function getSetting(data) {
    return request({
      url: '/content-analysis/getSettings',
      method: 'post',
      data
    })
  }
  

  export function delSetting(data) {
    return request({
      url: '/content-analysis/delSetting',
      method: 'post',
      data
    })
  }
  