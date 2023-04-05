import request from '@/utils/request'

export function reqUserInfo(data) {
  return request({
    url: '/userInfo',
    method: 'post',
    data
  })
}

export function getUsers() {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}

export function editUser(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data
  })
}

export function reqValidatUserID(data) {
  return request({
    url: '/user/validatUserID',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}


export function getUserList(data) {
  return request({
    url: '/sys/user/page',
    method: 'get',
    params:{
      ...data
    },
  })
}

export function userAdd(data) {
  return request({
    url: '/sys/user/add',
    method: 'post',
    data
  })
}

export function userEdit(data, id) {
  return request({
    url: `/sys/user/modify/${id}`,
    method: 'post',
    data
  })
}

export function userDel(data, id) {
  return request({
    url: `/sys/user/remove/${id}`,
    method: 'post',
    data
  })
}

export function setUserPassword(data) {
  return request({
    url: '/sys/user/change/password',
    method: 'post',
    data
  })
}

export function resetPassword(data, id) {
  return request({
    url: `/sys/reset/password/${id}`,
    method: 'post',
    data
  })
}
