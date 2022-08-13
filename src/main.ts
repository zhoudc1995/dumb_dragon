/*
 * @Author: 周东晨 mr_zhoudc@163.com
 * @Date: 2022-07-22 16:18:16
 * @LastEditors: 周东晨 mr_zhoudc@163.com
 * @LastEditTime: 2022-08-13 09:52:27
 * @FilePath: /code/vue3/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
import App from "./App.vue"
import router from "./router";
import filters from "@/common/filter";
import mixins from "@/common/mixin";
import { debounce, throttle, downloadImage } from "@/common/utils";
// if (process.env.NODE_ENV !== 'production') {	// 开发环境使用mock进行http请求拦截，实际开发时注释该代码块即可
// require('./mock')
// }

const app = createApp(App);

// 全局过滤器（采用全局方法形式模拟实现vue2.0的语法）
app.config.globalProperties.$filters = filters;

// 全局方法
app.config.globalProperties.$utils = {
  debounce,
  throttle,
  downloadImage,
};

// 全局 mixin
app.mixin(mixins);

app.use(router).mount("#app");
