// request.js
import axios from 'axios'
const baseURL1 = 'https://lizp.vip:8183';
const baseURL2 = 'http://lizp.vip:5453';
const instance1 = axios.create({
    baseURL: baseURL1,
    timeout: 10000, // 请求超时时间
    withCredentials: true, // 跨域请求时发送 cookies
});
const instance2 = axios.create({
    baseURL: baseURL2,
    timeout: 10000, // 请求超时时间
    withCredentials: true, // 跨域请求时发送 cookies
});
axios.interceptors.request.use(
    config=>{
        // 如果token存在，请求时携带token
        if(window.localStorage.getItem('Authorization')){
            config.headers['Authorization'] = window.localStorage.getItem('Authorization');
        }else{
            // 内容置空
            config.headers['Authorization'] = '';
        }
        return config;
    },error => {
        // Message.error({message: '请求出错啦T_T'});
        console.log('请求出错啦T_T')
    }
)
// 响应拦截器，对结果统一处理
axios.interceptors.response.use(
    resp => {
        console.log("11111")
        // 响应成功
        if(resp.data.success){
            if(resp.data.msg)
                // Message.success({message: resp.data.msg});
                console.log('请求成功啦T_T');
        }else{
            // 业务出错
            // Message.error({message: resp.data.msg});
            console.log('请求出错啦T_T');
            // 登录失效，跳转登录页
            if(resp.data.code === 401){
                router.replace('/login');
            }
        }
        // 返回响应结果
        console.log(resp.data)
        return resp.data;
    },error => {
        console.log("11111");
        if(error.response.code === 404 || error.response.code === 504){
            console.log('服务器被吃了T_T');
        }else if(error.response.code === 403){
            console.log('权限不足，请联系管理员');
        }else if(error.response.code === 401){
            console.log('请先进行登录');
            router.replace('/login');
        }else{
            if(error.response.data.message){
                console.log('请求出错啦T_T');
            }else{
                console.log('服务器后台未响应T_T');
            }
        }
        return;
    }
)
// instance1.interceptors.request.use(
//     config=>{
//         // 如果token存在，请求时携带token
//         if(window.localStorage.getItem('Authorization')){
//             config.headers['Authorization'] = window.localStorage.getItem('Authorization');
//         }else{
//             // 内容置空
//             config.headers['Authorization'] = '';
//         }
//         return config;
//     },error => {
//         // Message.error({message: '请求出错啦T_T'});
//         console.log('请求出错啦T_T')
//     }
// )
// // 响应拦截器，对结果统一处理
// instance1.interceptors.response.use(
//     resp => {
//         console.log("11111")
//         // 响应成功
//         if(resp.data.success){
//             if(resp.data.msg)
//                 // Message.success({message: resp.data.msg});
//                 console.log('请求成功啦T_T');
//         }else{
//             // 业务出错
//             // Message.error({message: resp.data.msg});
//             console.log('请求出错啦T_T');
//             // 登录失效，跳转登录页
//             if(resp.data.code === 401){
//                 router.replace('/login');
//             }
//         }
//         // 返回响应结果
//         console.log(resp.data)
//         return resp.data;
//     },error => {
//         console.log("11111");
//         if(error.response.code === 404 || error.response.code === 504){
//             console.log('服务器被吃了T_T');
//         }else if(error.response.code === 403){
//             console.log('权限不足，请联系管理员');
//         }else if(error.response.code === 401){
//             console.log('请先进行登录');
//             router.replace('/login');
//         }else{
//             if(error.response.data.message){
//                 console.log('请求出错啦T_T');
//             }else{
//                 console.log('服务器后台未响应T_T');
//             }
//         }
//         return;
//     }
//     )
// instance2.interceptors.request.use(
//     config=>{
//         // 如果token存在，请求时携带token
//         if(window.localStorage.getItem('Authorization')){
//             config.headers['Authorization'] = window.localStorage.getItem('Authorization');
//         }else{
//             // 内容置空
//             config.headers['Authorization'] = '';
//         }
//         return config;
//     },error => {
//         console.log('请求出错啦T_T')
//     }
// )
// // 响应拦截器，对结果统一处理
// instance2.interceptors.response.use(
//     resp => {
//         // 响应成功
//         if(resp.data.success){
//             if(resp.data.msg)
//                 console.log('请求成功啦T_T');
//         }else{
//             // 业务出错
//             console.log('请求出错啦T_T');
//             // 登录失效，跳转登录页
//             if(resp.data.code === 401){
//                 router.replace('/login');
//             }
//         }
//
//         // 返回响应结果
//         return resp.data;
//     },error => {
//         console.log(error);
//
//         if(error.response.code === 404 || error.response.code === 504){
//             console.log('服务器被吃了T_T');
//         }else if(error.response.code === 403){
//             console.log('权限不足，请联系管理员');
//         }else if(error.response.code === 401){
//             console.log('请先进行登录');
//             router.replace('/login');
//         }else{
//             if(error.response.data.message){
//                 console.log('请求出错啦T_T');
//             }else{
//                 console.log('服务器后台未响应T_T');
//             }
//         }
//         return;
//     })
export const API1 = {
    // post请求
    postRequest  (url, params)  {
        return axios({
            method: 'post',
            url: baseURL1+url,
            data: params
        })
    },

    // get请求
    getRequest (url, params) {
        return axios({
            method: 'get',
            url: baseURL1+url,
            data: params
        })
    },

    // put请求
    putRequest(url, params){
        return axios({
            method: 'put',
            url: baseURL1+url,
            data: params
        })
    },

    // delete请求
    deleteRequest(url, params){
        return axios({
            method: 'delete',
            url: baseURL1+url,
            data: params
        })
    }
};
export const API2 = {
    // post请求
    postRequest  (url, params)  {
        return axios({
            method: 'post',
            url: baseURL2+url,
            data: params
        })
    },

    // get请求
    getRequest (url, params) {
        return axios({
            method: 'get',
            url: baseURL2+url,
            data: params
        })
    },

    // put请求
    putRequest(url, params){
        return axios({
            method: 'put',
            url: baseURL2+url,
            data: params
        })
    },

    // delete请求
    deleteRequest(url, params){
        return axios({
            method: 'delete',
            url: baseURL2+url,
            data: params
        })
    }
};
