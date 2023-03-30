// store.js
import Vue from 'vue';
import Vuex, {mapMutations, useStore} from 'vuex';
// Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        // 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
    },

    mutations: {
        // 修改token，并将token存入localStorage
        changeLogin (state, user) {
            state.Authorization = user.Authorization;
            localStorage.setItem('Authorization', user.Authorization);
        }
    }
});
const hooks = (mapperFn, mapper, module) => {
    const store = useStore();  // 引入vuex中的useStore函数
    const resultFn = {};
    let mapData = {};
    if (module) {  // 判断是否存在命名空间，如果存在则绑定
        mapData = mapperFn(module, mapper);
    } else {
        mapData = mapperFn(mapper);
    }
    Object.keys(mapData).forEach( item => {
        const fn = mapData[item].bind({'$store': store});  // 使用bind方法将得到map函数结果绑定到vuex上
        resultFn[item] = fn;
    });
    return resultFn
};
export const useMutations = (mapper, module) => {
    return hooks( mapMutations, mapper, module);
};

export default store;

export {
    store
}

