import axios from 'axios';

// const token =
//   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTU5NzYiLCJqdGkiOiIwNzdiN2M0Yy01MWExLTQ1MmUtYmEyOS02MzlhYmM3YTkzZjgiLCJnaXZlbl9uYW1lIjoi5pa55omsIiwiR3JvdXAiOiIxZjg5NzNjNy0zZTMzLTRjZTgtYTg0NC04NzQ4Y2FhYzhlNzEiLCJUb2tlbiI6IjhiMzk3NzUyMDM1NDYzYTI1ZTQzMjgwNGUyNjgzY2I4NjZlMmUzMTQiLCJleHAiOjE1OTU4MTY2NjUsImlzcyI6Imh0dHA6Ly91Yy5wdXB1dmlwLmNvbSIsImF1ZCI6Imh0dHA6Ly91Yy5wdXB1dmlwLmNvbSJ9.soMNDwsHnGLxAtB_2rAn9aN9iHdSM5I-3UOf3sTGbeM';

const instance = axios.create({
  baseURL: 'https://ja.api.pupuvip.com'
  // headers: { token: token }
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
