import axios from 'axios';
import router from "@/router";
import { Message } from 'element-plus';
const request = axios.create({
    baseURL: '',
    timeout: 1000
})

// 请求拦截器
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
                router.replace('/');
            }
        }

        // 返回响应结果
        return resp.data;
    },error => {
        console.log(error);

        if(error.response.code === 404 || error.response.code === 504){
            // Message.error({message: '服务器被吃了T_T'});
            console.log('服务器被吃了T_T');
        }else if(error.response.code === 403){
            // Message.error({message: '权限不足，请联系管理员'});
            console.log('权限不足，请联系管理员');
        }else if(error.response.code === 401){
            // Message.error({message: '请先进行登录'});
            console.log('请先进行登录');
            router.replace('/');
        }else{
            if(error.response.data.message){
                // Message.error({message: error.response.data.message});
                console.log('请求出错啦T_T');
            }else{
                // Message.error({message: '服务器后台未响应T_T'});
                console.log('服务器后台未响应T_T');
            }
        }
        return;
    }
)

// post请求
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: url,
        data: params
    })
}

// get请求
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: url,
        data: params
    })
}

// put请求
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: url,
        data: params
    })
}

// delete请求
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: url,
        data: params
    })
}
export default request