import axios from 'axios'
import { cloneDeep, isEmpty } from 'lodash'
import pathToRegexp from 'path-to-regexp'
import qs from 'qs'
import { getToken, removeToken } from '@/util/auth'
import router from '@/route/router'
import { Toast } from 'vant'
const { CancelToken } = axios;

window.cancelRequest = new Map();

export default function request(options) {
  axios.defaults.headers.common['token'] = getToken('token');

  let { data, url, method = 'get' } = options
  const cloneData = cloneDeep(data)

  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      [domain] = urlMatch
      url = url.slice(domain.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domain + url
  } catch (e) {
    console.log(e)
  }

  options.url =
    method.toLocaleLowerCase() === 'get'
      ? `${url}${isEmpty(cloneData) ? '' : '?'}${qs.stringify(cloneData)}`
      : url

  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    })
  })

  return axios(options).then(response => {
    const { statusText, status, data } = response
    if(data.code === '-1') {
      Toast('登录失效，请重新登录');
      removeToken('rights_desc');
      removeToken('token');
      router.push({
        name: 'passport'
      })
    }
    let result = {}
    if (typeof data === 'object') {
      result = data
      if (Array.isArray(data)) {
        result.list = data
      }
    } else {
      result.data = data
    }
    return Promise.resolve({
      success: true,
      message: statusText,
      statusCode: status,
      ...result,
    })
  }).catch(error => {
    const { response, message } = error
    if (String(message) === 'cancel request') {
      return {
        success: false,
      }
    }

    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || '网络错误'
    }
    return Promise.reject({
      success: false,
      statusCode,
      message,
      msg,
    })
  })
}
