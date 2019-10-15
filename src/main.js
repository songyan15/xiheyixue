// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import FastClick from "fastclick";
import App from "./App";
import router from "./router";
import store from "../src/store/index";
import axios from "axios";
import qs from "qs";
//FastClick.attach(document.body)
Vue.config.productionTip = false;
import {
  XHeader,
  Actionsheet,
  TransferDom,
  Tabbar,
  TabbarItem,
  XButton,
  ViewBox,
  Flexbox,
  FlexboxItem,
  Group,
  Cell,
  Datetime,
  Toast,
  Confirm ,
  Loading,
  DatetimePlugin
} from "vux";
Vue.component("x-header", XHeader);
Vue.component("tabbar", Tabbar);
Vue.component("tabbar-item", TabbarItem);
Vue.component("x-button", XButton);
Vue.component("view-box", ViewBox);
Vue.component("flexbox", Flexbox);
Vue.component("flexbox-item", FlexboxItem);
Vue.component("group", Group);
Vue.component("cell", Cell);
Vue.component("datetime", Datetime);
Vue.component("actionsheet", Actionsheet);
Vue.directive("transfer-dom", TransferDom);
Vue.component('loading', Loading)
Vue.component('toast', Toast)
Vue.component('confirm', Confirm)
import  { ToastPlugin, LoadingPlugin,ConfirmPlugin } from 'vux'
Vue.use(DatetimePlugin);
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);

import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
//请求头拦截器
axios.defaults.timeout = 50000;
//debugger
let flg=false
if(flg){
  axios.defaults.baseURL = "/api";
}else{
  axios.defaults.baseURL = process.env.BASE_URL;
}
axios.interceptors.request.use(
  config => {
    //debugger
    config.headers = {
      "Content-Type": "application/json"
    };
    // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
    // console.log(store.state.loading)
    Vue.$vux.loading.show({ text:'数据加载中……'})
    // 2 . 根据请求方法，序列化传来的参数，根据后端需求是否序列化
    if (config.method === "post") {
      config.headers = {
        //'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      };
      // if (config.data.__proto__ === FormData.prototype
      //   || config.url.endsWith('path')
      //   || config.url.endsWith('mark')
      //   || config.url.endsWith('patchs')
      // ) {

      // } else {
      //     config.data = qs.stringify(config.data)
      // }
      config.data = qs.stringify({...config.data})
      //config.data = JSON.parse(config.data)
    }

    return config;
  },

  error => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  response => {  //成功请求到数据
    Vue.$vux.loading.hide();
    return response;
      // //这里根据后端提供的数据进行对应的处理
      // if (response.data.result === 'TRUE') {
      //     return response.data;
      // } else {
      //     Vue.$vux.toast.show({
      //         //常规错误处理
      //         type: 'warn',
      //         text: response.data.data.msg
      //     });
      // }
  },
  error => {  //响应错误处理console.log('error');
      console.log(error);
      console.log(JSON.stringify(error));
      let text = JSON.parse(JSON.stringify(error)).response.status === 404
          ? '404'
          : '网络异常，请重试';
      app.$vux.toast.show({
          type: 'warn',
          text: text
      });
      return Promise.reject(error)
  }
)


import Mint from "mint-ui";
import "mint-ui/lib/style.css";
Vue.use(Mint);

const shouldUseTransition = !/transition=none/.test(location.href);
store.registerModule("vux", {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: shouldUseTransition ? "forward" : ""
  },
  mutations: {
    updateDemoPosition(state, payload) {
      state.demoScrollTop = payload.top;
    },
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading;
    },
    updateDirection(state, payload) {
      if (!shouldUseTransition) {
        return;
      }
      state.direction = payload.direction;
    }
  },
  actions: {
    updateDemoPosition({ commit }, top) {
      commit({ type: "updateDemoPosition", top: top });
    }
  }
});

require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
import VideoPlayer from "vue-video-player";
Vue.use(VideoPlayer);

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app-box");
