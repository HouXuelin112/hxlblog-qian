//定义拦截器
import axios from "axios";

//创建axios
const BASEURL = process.env.VUE_APP_API;
const service = axios.create({
  baseURL: BASEURL,
  timeout: 12000,
});

//添加请求拦截器
service.interceptors.request.use(
  function(config) {
    //发出请求之前,对请求配置做点什么
    return config;
  },
  function(error) {
    //请求错误
    return Promise.reject(error);
  }
);

//添加响应拦截器
service.interceptors.response.use(
  function(response) {
    //对响应数据做点什么，修改完之后进行返回
    return response.data;
  },
  function(error) {
    //响应错误处理
    return Promise.reject(error);
  }
);

export default service;
