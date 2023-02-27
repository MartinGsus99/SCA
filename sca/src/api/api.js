import axios from 'axios'
import Cookies from 'js-cookie'
import { getCookie, setCookie } from '@/utils/auth'
axios.defaults.timeout = 5000
axios.defaults.baseURL =
  'https://www.easy-mock.com/mock/5cbd90c278a48d0396a92f28/yunwei_test'


axios.defaults.baseURL = 'http://192.168.2.2'
// axios.defaults.baseURL = 'http://192.168.133.133:5000'
// axios.defaults.withCredentials = true


//http request 拦截器
axios.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8;'
    return config
  },
  (error) => {
    return Promise.reject(err)
  }
)

//http response 拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.errCode == 2) {
      router.push({
        path: '/login',
        querry: { redirect: router.currentRoute.fullPath }, //从哪个页面跳转
      })
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
let userInfo = getCookie('userInfo')

/**
 * Http 请求
 * @returns {Promise}
 */
function http(url, method, data, config) {
  userInfo = getCookie('userInfo')
  const timeout = 30 * 10000
  const baseData = {
    creatorId: userInfo.id,
    creator: userInfo.username,
  }
  const hasFormData = {
    menderId: userInfo.id,
    mender: userInfo.username,
  }
  const cookieInfo = {
    cookieUserId: userInfo.id,
    cookieUserName:userInfo.username,
  }
  let params = data
  // 查询的时候不带上create mender信息，否则会变成查询条件
  if (!url.includes('/page') && !url.includes('/list')){
    if (url != '/sys/login') {
      params = Object.assign(data, baseData)
      /* formData 判断 */
      if (data instanceof FormData) {
        // data.append('createId', userInfo.id)
        data.append('creatorId', userInfo.id)
        data.append('creator', userInfo.username)
        params = data
        if (config.isForm) {
          params.append('menderId', userInfo.id)
          params.append('mender', userInfo.username)
        }
        
      }
      if ('isForm' in config) {
        if (config.isForm && !(data instanceof FormData))
          params = Object.assign(params, hasFormData)
        delete config.isForm
      }
    }
  }
  params = Object.assign(params, cookieInfo)
  if (data instanceof FormData) {
    data.append('cookieUserId', userInfo.id)
    data.append('cookieUserName', userInfo.username)
  } 

  let key = method === 'get' ? 'params' : 'data'
  let obj = {
    timeout,
    method,
    url,
    ...config,
    [key]: params,
  }

  return new Promise((resolve, reject) => {
    axios(obj)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}, config = {}) {
  return http(url, 'get', params, config)
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}, config = {}) {
  return http(url, 'post', data, config)
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}, config = {}) {
  return http(url, 'patch', data, config)
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}, config = {}) {
  return http(url, 'put', data, config)
}


/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function remove(url, data = {}, config = {}) {
  return http(url, 'delete', new FormData(), config)
}


export default {
  get,
  post,
  patch,
  put,
  remove,
}
