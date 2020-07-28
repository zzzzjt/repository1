import axios from 'axios';

const token = "fresh sfbghy216rhu325354y.;/'dp332";

const instance = axios.create({
  baseURL: 'https://ja.api.pupuvip.com',
  headers: {
    Authorization: token
  }
});

instance.interceptors.request.use(
  function(config) {
    console.log('全局请求拦截');
    console.log(config);
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  function(response) {
    console.log('全局响应拦截');
    console.log(response);
    return response;
  },
  function(err) {
    return Promise.reject(err);
  }
);
export function get(url, params) {
  return instance.get(url, {
    params
  });
}
export function post(url, data) {
  return instance.post(url, data);
}
export function del(url) {
  return instance.delete(url);
}
export function put(url, data) {
  return instance.put(url, data);
}
export default instance;
