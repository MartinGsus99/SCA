import request from '@/utils/request'

export function getRoleList(data) {
  return request({
    url: '/sys/role/page',
    method: 'get',
    params:{
      ...data
    },
  })
}

export function delRole(data, id) {
  return request({
    url: `/sys/role/remove/${id}`,
    method: 'post',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/sys/role/add',
    method: 'post',
    data
  })
}
export function editRole(data, id) {
  return request({
    url: `/sys/role/modify/${id}`,
    method: 'post',
    data
  })
}

// 用户关联角色
export function addUserRole(data) {
  return request({
    url: '/sys/user/role/user/add',
    method: 'post',
    data
  })
}


// 获取角色列表
export function roleList(data) {
  return request({
    url: '/sys/role/list',
    method: 'get',
    params:{
      ...data
    },
  })
}
