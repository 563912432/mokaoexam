// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import {Loading, Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import cookie from 'js-cookie'
import '../static/UEditor/ueditor.config'
import '../static/UEditor/ueditor.all.min.js'
import '../static/UEditor/lang/zh-cn/zh-cn.js'
import '../static/UEditor/ueditor.parse.min.js'
import '../static/UEditor/kityformula-plugin/addKityFormulaDialog'
import '../static/UEditor/kityformula-plugin/getKfContent'
import '../static/UEditor/kityformula-plugin/defaultFilterFix'
// 引入自定义指令
import './directives.js';

Vue.use(ElementUI)
window.cookie = cookie
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (!window.userInfo.key) {
      router.push({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      store.state.access_token_student = window.userInfo.key
      if (store.state.access_token_student) {
        let student = window.userInfo.key
        if (student) {
          store.state.student = window.userInfo
        }
      }
      next()
    }
  } else {
    next()
  }
})
window.host = 'http://www.meili.com/'
window.axios = axios
window.axios.defaults.baseURL = window.host
window.axios.defaults.onUploadProgress = null
window.axios.defaults.timeout = 3000
window.axios.defaults.retry = 1 // 重试次数
window.axios.defaults.retryDelay = 1000 // 重试延时
window.axios.defaults.shouldRetry = (error) => true // 重试条件，默认只要是错误都需要重试

let loadingInstance = []
window.axios.interceptors.request.use(config => {
  // element ui Loading方法
  if (window.userInfo.key !== '') { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.token = window.userInfo.key
  }
  let i = Loading.service({fullscreen: true, background: 'transparent', text: '请稍后，加载中...'})
  loadingInstance.push(i)
  return config
}, error => {
  loadingInstance.close()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  if (response.data.status === 101) { // token 已过期，重定向到登录页面
    // store.commit('logout')
    router.replace({
      path: '/',
      query: {redirect: router.currentRoute.fullPath}
    })
  }
  let i = loadingInstance.pop()
  i.close()
  return response
}, function (error) {
  let i = loadingInstance.pop()
  i.close()
  // 重试条件是否满足
  let config = error.config
  if (!config || !config.retry || !config.shouldRetry || typeof config.shouldRetry !== 'function' || !config.shouldRetry(error)) {
    Message.error({message: '错误：请求未响应'})
    return Promise.reject(error)
  }
  // 设置重置次数，默认为0
  config.__retryCount = config.__retryCount || 0;
  // 判断是否超过了重试次数
  if (config.__retryCount >= config.retry) {
    Message.error({message: '错误：请求未响应'})
    return Promise.reject(error)
  }
  // 重试次数自增
  config.__retryCount += 1
  // 延时处理
  let backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve()
    }, config.retryDelay || 1)
  })
  // 重新发起axios请求
  return backoff.then(function () {
    return window.axios(config)
  })
})
Vue.config.productionTip = false
Vue.prototype.toLetter = (number) => {
  switch (number) {
    case 0:
      return 'A'
      break
    case 1:
      return 'B'
      break
    case 2:
      return 'C'
      break
    case 3:
      return 'D'
      break
    case 4:
      return 'E'
      break
    case 5:
      return 'F'
      break
    default:
      return '●'
      break
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
