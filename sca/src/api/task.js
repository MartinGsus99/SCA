/*
 * @Author: MartinWang 
 * @Date: 2022-10-18 19:26:07 
 * @Last Modified by: MartinWang
 * @Last Modified time: 2023-01-10 16:11:40
 */


import request from '@/utils/request'

export function getTask(data) {
  return request({
    url: '/analysis/task/page',
    method: 'get',
    params: {
      ...data
    },
  })
}

export function addTask(data) {
  return request({
    url: '/analysis/task/add',
    method: 'post',
    data
  })
}

export function delTask(data,id) {
  return request({
    url: `/analysis/task/remove/${id}`,
    method: 'post',
    data
  })
}

export function executeTask(data,id) {
  return request({
    url: `/analysis/task/execute/${id}`,
    method: 'post',
    data
  })
}

export function modifyTask(data,id) {
  return request({
    url: `/analysis/task/modify/${id}`,
    method: 'post',
    data
  })
}


export function pauseTask(id) {
  return request({
    url: `/analysis/task/pause/${id}`,
    method: 'post',
    
  })
}


export function resumeTask(id) {
  return request({
    url: `/analysis/task/resume/${id}`,
    method: 'post',
  })
}
