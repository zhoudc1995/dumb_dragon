/**
 * 存放一些常用的公共配置
 * @description 暂时提供： appid、接口前缀、白名单页面、请求公共入参
 * @Author lss
 * @Date 2021-3-9
 */
export const appid = process.env.NODE_ENV === "development" ? 10001 : 10001; // 10005

export const wechatId = "wx50e92e0f0a318a15"; // 公司公众号：wxeb8f03dbe32285xx 个人号测试：wx50e92e0f0a318a15

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://api.story_1146.xxx.test.xxx.com/v1"
    : "http://api.story_1146.xxx.test.xxx.com/v1"; // 'http://api.xxx.com/v1'

export const whiteList = ["/login", "/error/403", "/error/404"]; // 无需授权的白名单

export const PLATFORM =
  process.env.UNI_PLATFORM || process.env.VUE_APP_PLATFORM; // h5、mp-weixin、mp-alipay、mp-baidu、mp-toutiao、mp-qq

// 请求公共入参
export const requstParams = () => {
  // let par = {
  // 	appid: appid, 								// 应用分配的APPID
  // 	token: sessionStorage['token'],				// 登陆状态下传递的登陆认证TOKEN，需要登陆状态的接口，此值为必填
  // 	_platform: PLATFORM === 'h5' ? 3 : 5,		// 请求的平台参数，PC:1; APP:2; H5:3; wechat:4; 小程序:5
  // 	t: parseInt(new Date().getTime() / 1000), 	// 当前时间的时间戳，系统最大允许误差为前后3分钟
  // }
  // if (!par.token){
  // 	// 防止token传false回去，造成签名失败
  // 	delete par.token
  // }
  // return par
};

export const apiConfig = (env = "development") => {
  let params = {
    test: {
      HOST: "https://dev.api.linkr.it/short_link/",
      SIGN_KEY: "BA78C810-BA31-4BE8-ACD0-DA0212486584",
      SIGN_VERSION: "shortlink-dev-web-1.0",
    },
    development: {
      HOST: "https://api.linkr.it/short_link/",
      SIGN_KEY: "BA78C810-BA31-4BE8-ACD0-DA0212486584",
      SIGN_VERSION: "shortlink-dev-web-1.0",
    },
    production: {
      HOST: "https://api.linkr.it/short_link/",
      SIGN_KEY: "719C87CF-AC4C-4A6D-9D5C-B195118F6DA7",
      SIGN_VERSION: "shortlink-production-web-1.0",
    },
  };
  return params[env];
};
/* module.exports = {
	publicPages,
	baseUrl
}; */
