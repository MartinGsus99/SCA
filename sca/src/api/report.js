
import request from '@/utils/request'

export function getTaskReportList(data) {
    return request({
      url: '/analysis/analysis_result/page',
      method: 'get',
      params: {
        ...data
      },
    })
  }
  
export function delTaskReport(data,id){
  return request({
    url:`/analysis/analysis_result/remove/${id}`,
    method:'post',
    data
  })
}

export function retestTask(data, id) {
  return request({
    url: `/analysis/regenerate/analysis/${id}`,
    method: 'post',
    data
  })
}

export function reportDel(data, id) {
  return request({
    url: `/task/report/remove/${id}`,
    method: 'post',
    data
  })
}

export function getTaskReportPDF(data,id) {
  return request({
    url: `/task/download/pdf/${id}`,
    method: 'post',
    data
  })
}

export function checkTheReport(data, id) {
  return request({
    url: `/task/report/check/${id}`,
    method: 'post',
    data
  })
}