import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import * as echarts from 'echarts'
import axios from "axios"
import store from "./store/store"

axios.defaults.baseURL = "http://lizp.vip:8183";

createApp(App).use(router).use(store).use(ElementPlus,{ locale}).mount('#app')
app.echarts = echarts