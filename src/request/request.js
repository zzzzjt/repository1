import axios from 'axios'
const service=axios.create({
    baseURL:'http://jsonplaceholder.typicode.com',
    timeout:5000
});

service.interceptors.request.use(
    function(config){
        console.log("全局请求拦截");
        console.log(config);
        return config;
    },
    function(err){
        return Promise.reject(err);
    }
);

service.interceptors.response.use(
    function(response){
        console.log("全局响应拦截");
        console.log(response);
        return response;
    },
    function(err){
        return Promise.reject(err);
    }
);
export function get(url,params){
    return service.get(url,{
        params
    })
};
export function post(url,data){
    return service.post(url,data);
};
export function del(url){
    return service.delete(url);
};
export function put(url,data){
    return service.put(url,data);
}
export default service;