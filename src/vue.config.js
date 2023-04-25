// 跨域配置
// const cors = require('cors');
//
// module.exports = {
//     devServer: {
//         before: function (app) {
//             app.use(cors()); // 开启CORS跨域请求
//
//             // 配置前台用户界面的代理地址
//             app.use(cors(), proxy({
//                 target: 'https://lizp.vip:8183',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/dor': ''
//                 }
//             }));
//
//             // 配置后台管理界面的代理地址
//             app.use('/dor/pm',cors(), proxy({
//                 target: 'https://lizp.vip:5453',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/dor/pm': ''
//                 }
//             }));
//         }
//     }
// };
module.exports = {
    devServer: {
        proxy: {
            '/api1': { // 对应第一个实例
                target: 'https://lizp.vip:8183',
                pathRewrite: {
                    '^/api1': ''
                }
            },
            '/api2': { // 对应第二个实例
                target: 'http://lizp.vip:5453',
                pathRewrite: {
                    '^/api2': ''
                }
            }
        }
    },
    configureWebpack: {
        resolve: {
            fallback: {
                fs: false
            }
        }
    }
}