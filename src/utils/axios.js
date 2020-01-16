/*jshint esversion: 6*/
import axios from 'axios';
// var ui = require('element-ui')

// 测试环境

// 自己的后端
// axios.defaults.baseURL = "http://localhost:8888";
// 模拟数据
// axios.defaults.baseURL = "http://localhost:3000";
// 超球
// axios.defaults.baseURL = "http://192.168.1.17:8080";
// 颜通
// axios.defaults.baseURL = "http://192.168.1.117:8025";
// 佳超
// axios.defaults.baseURL = "http://192.168.1.62:8080";
// 李媛
// axios.defaults.baseURL = "http://192.168.1.55:8080";
// 陈吕
// axios.defaults.baseURL = "http://192.168.1.33:8080";
// 生产环境
axios.defaults.baseURL = "http://47.106.71.3:8080";

// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   console.log(config)
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   console.log(error)
//   return Promise.reject(error);
// });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // eslint-disable-next-line no-console
  // if (response && response.data && response.data.code && response.data.code != 0) {
  //   ui.Message({
  //     message: response.data.msg || '页面加载失败',
  //     type: 'warning'
  //   })
  // } else {
  //   return response;
  // }
  return response;
}, function (error) {
  // 对响应错误做点什么
  // console.log(error)
  return Promise.reject(error);
});

// Vue.prototype.$axios = axios
export default axios;