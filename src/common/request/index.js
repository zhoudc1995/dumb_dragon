import axios from "axios";
import { ElMessage } from "element-plus";
// MD5
import { md5 } from "./tools";
// baseUrl,
import { requstParams, apiConfig } from "@/common/config";
import { v1 as uuidv1 } from "uuid";
import cookie from "@/common/utils/cookie";
const { HOST, SIGN_KEY, SIGN_VERSION } = apiConfig(
  process.env.VUE_APP_ENV || "production"
);
const baseURL = HOST;
const signkey = SIGN_KEY;
const signver = SIGN_VERSION;
function olaakNonceSig() {
  const nonce = uuidv1();
  const sig = md5(nonce + signkey);
  return { nonce, sig };
}
function judgeClient() {
  let client = "web";
  var UA = window.navigator.userAgent;
  if (UA.indexOf("Android") > -1 || UA.indexOf("Adr") > -1) {
    client = "android";
  } else if (
    UA.match(/iPad/) ||
    UA.match(/iPhone/) ||
    UA.match(/iPod/) ||
    UA.match(/iOS/)
  ) {
    client = "ios";
  }
  return client;
}
const service = axios.create({
  baseURL: baseURL, //baseUrl
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    // zdc 2022/7/26 新增ajax请求的公共入参封装 ==============================
    config.params = { ...requstParams() };
    const { nonce, sig } = olaakNonceSig();
    //add google ga client
    let xGaClientId =
      window._xGaClientId || cookie.getItem("xGaClientId") || "";
    if (!xGaClientId && window.gtag) {
      window.gtag("get", "UA-201375901-1", "client_id", (clientID) => {
        window._xGaClientId = clientID;
        cookie.setItem("xGaClientId", clientID, Infinity);
        xGaClientId = clientID;
      });
    }
    let headers = {
      "x-client-id": xGaClientId,
      "x-linkr-href": location.href,
      "x-linkr-referrer": document.referrer,
      "x-nonce": nonce,
      "x-signature": sig,
      "x-platform": judgeClient(),
      "x-version": signver,
    };
    const token = localStorage.getItem("token");
    if (token) {
      headers["x-token"] = token;
    }
    config.headers = Object.assign({ ...config.headers, ...headers });

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject();
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      // return response.data;
      // lss 2021/5/10 新增ajax回参统一处理 ==============================
      // 0成功状态
      if (response.data.code === 0) {
        return response.data.data;
      }
      // tonken失效等，重定向到登录页。10010 10011
      else if (response.data.code === 401 || response.data.code === 402) {
        // ElMessage.error(response.data.msg);
        localStorage.clear();
        let isLogin = location.pathname === "/login";
        if (!isLogin) {
          // 不是登录页时跳转站点首页
          location.replace(location.origin + "/");
        }
      }
      // 特殊情况，部分返回码返回整个response.data，用于页面做逻辑处理
      /* else if(response.data.error ===  || response.data.error === ){
				return response.data
			} */
      // 其他情况统一弹出信息框，避免业务代码中出现一大堆信息框的冗余代码
      else {
        let isLogin = location.pathname === "/login";
        if (!isLogin) {
          ElMessage({
            message: response.data.msg,
            type: "error",
            duration: 2000,
          });
        }

        return response.data;
      }
    } else {
      Promise.reject();
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject();
  }
);

export default service;
