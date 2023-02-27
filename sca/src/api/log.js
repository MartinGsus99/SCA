import request from '@/utils/request'

export function getLogData(data) {
  return request({
    url: '/sys/log/page',
    method: 'get',
    params:{
      ...data
    },
  })
}
