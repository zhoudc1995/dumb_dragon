/**
 * 提供常用的一些工具方法
 * @description 暂时提供：防抖、节流、格式化时间戳、二维数组去重、判断类型集合等
 * @Author lss
 * @Date 2021-3-8
 */

import { saveAs } from "file-saver";

let _debounceTimeout = null;
let _throttleRunning = false;

/**
 * 防抖（多次触发事件后，事件处理函数只执行一次，并且是在触发操作结束时执行）
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const debounce = (fn, delay = 500) => {
  clearTimeout(_debounceTimeout);
  _debounceTimeout = setTimeout(() => {
    fn();
  }, delay);
};
/**
 * 节流（触发函数事件后，短时间间隔内无法连续调用，只有上一次函数执行后，过了规定的时间间隔，才能进行下一次的函数调用）
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms
 */
export const throttle = (fn, delay = 500) => {
  if (_throttleRunning) {
    return;
  }
  _throttleRunning = true;
  fn();
  setTimeout(() => {
    _throttleRunning = false;
  }, delay);
};

/**
 * 格式化时间戳 Y-m-d H:i:s
 * @param {String} format Y-m-d H:i:s
 * @param {Number} timestamp 时间戳
 * @return {String}
 */
export const date = (format, timeStamp) => {
  if ("" + timeStamp.length <= 10) {
    timeStamp = +timeStamp * 1000;
  } else {
    timeStamp = +timeStamp;
  }
  const _date = new Date(timeStamp);
  const Y = _date.getFullYear();
  let m = _date.getMonth() + 1;
  let d = _date.getDate();
  let H = _date.getHours();
  let i = _date.getMinutes();
  let s = _date.getSeconds();

  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;
  H = H < 10 ? "0" + H : H;
  i = i < 10 ? "0" + i : i;
  s = s < 10 ? "0" + s : s;

  return format.replace(/[YmdHis]/g, (key) => {
    return { Y, m, d, H, i, s }[key];
  });
};
// 二维数组去重
export const getUnique = (array) => {
  const obj = {};
  return array.filter((item) => {
    const newItem = item + JSON.stringify(item);
    // return obj.hasOwnProperty(newItem) ? false : obj[newItem] = true
    return Object.prototype.hasOwnProperty.call(obj, newItem)
      ? false
      : (obj[newItem] = true);
  });
};
// 判断类型集合
export const checkStr = (str, type) => {
  switch (type) {
    case "mobile": // 手机号码
      return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
    case "tel": // 座机
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case "card": // 身份证
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
    case "mobileCode": // 6位数字验证码
      return /^[0-9]{6}$/.test(str);
    case "pwd": // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return /^([a-zA-Z0-9_]){6,18}$/.test(str);
    case "payPwd": // 支付密码 6位纯数字
      return /^[0-9]{6}$/.test(str);
    case "postal": // 邮政编码
      return /[1-9]\d{5}(?!\d)/.test(str);
    case "QQ": // QQ号
      return /^[1-9][0-9]{4,9}$/.test(str);
    case "email": // 邮箱
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case "money": // 金额(小数点2位)
      return /^\d*(?:\.\d{0,2})?$/.test(str);
    case "URL": // 网址
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
        str
      );
    case "IP": // IP
      return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(
        str
      );
    case "date": // 日期时间
      return (
        /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(
          str
        ) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
      );
    case "number": // 数字
      return /^[0-9]*$/.test(str);
    case "english": // 英文
      return /^[a-zA-Z]+$/.test(str);
    case "chinese": // 中文
      return /^[\\u4E00-\\u9FA5]+$/.test(str);
    case "lower": // 小写
      return /^[a-z]+$/.test(str);
    case "upper": // 大写
      return /^[A-Z]+$/.test(str);
    case "HTML": // HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
    case "special": // 特殊字符
      return /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/.test(
        str
      );
    default:
      return true;
  }
};

// 对象转换为URL查询参数
export const toQueryString = (obj) => {
  let data = obj || ""; // 传参 {type1:1,type2:2,}
  data = JSON.stringify(data);
  data = data.replace(/[{}"]/g, "");
  data = data.replace(/,/g, "&");
  data = data.replace(/:/g, "=");
  return data;
};

// URL查询参数转换为对象
export const paramObj = (url) => {
  const search = url.split("?")[1] ? url.split("?")[1] : url.split("?")[0];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, " ") +
      '"}'
  );
};

// 去空格
export const trim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, "");
};

// 父子关系的数组转换成树形结构数据
export function translateDataToTree(data) {
  const parent = data.filter(
    (value) => value.parentId === "undefined" || value.parentId == null
  );
  const children = data.filter(
    (value) => value.parentId !== "undefined" && value.parentId != null
  );
  const translator = (parent, children) => {
    parent.forEach((parent) => {
      children.forEach((current, index) => {
        if (current.parentId === parent.id) {
          const temp = JSON.parse(JSON.stringify(children));
          temp.splice(index, 1);
          translator([current], temp);
          typeof parent.children !== "undefined"
            ? parent.children.push(current)
            : (parent.children = [current]);
        }
      });
    });
  };
  translator(parent, children);
  return parent;
}

// 树形结构数据转换成父子关系的数组
export function translateTreeToData(data) {
  const result = [];
  data.forEach((item) => {
    const loop = (data) => {
      result.push({
        id: data.id,
        name: data.name,
        parentId: data.parentId,
      });
      const child = data.children;
      if (child) {
        for (let i = 0; i < child.length; i++) {
          loop(child[i]);
        }
      }
    };
    loop(item);
  });
  return result;
}

// 获取随机idß
export function getUuid() {
  let s = [];
  let hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  let uuid = s.join("");
  return uuid;
}

// 生成m到n的随机数
export function random(m, n) {
  return Math.floor(Math.random() * (m - n) + n);
}

export function imgToBlob(url, width, height) {
  console.log(width, height);
  return new Promise((resolve) => {
    let ele = document.createElement("canvas");
    ele.width = width;
    ele.height = height;
    let ctx = ele.getContext("2d");
    let image = new Image();
    image.onload = function () {
      ctx.drawImage(image, 0, 0, width, height);
      setTimeout(() => {
        ele.toBlob((blob) => {
          console.log(blob, "blob");
          resolve(blob);
        });
      }, 500);
    };
    image.src = url;
    image.setAttribute("crossOrigin", "Anonymous");
  });
}

export async function downloadImage(
  url,
  name = "a",
  cb,
  format = "png",
  width = 1000,
  height = 1000
) {
  const blob = await imgToBlob(url, width, height);
  console.log(blob, name, format);
  saveAs(blob, `${name}.${format}`);
  cb && cb();
}

export function emailPattern(email) {
  return /^^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/.test(
    email
  );
}

export function setMeta(key, value, isProperty) {
  if (isProperty) {
    let property = document.querySelector(`meta[property='${key}']`);
    if (property) {
      property.content = value;
    } else {
      let oMeta = document.createElement("meta");
      oMeta.property = key;
      oMeta.content = value;
      document.getElementsByTagName("head")[0].appendChild(oMeta);
    }
  } else {
    const metas = document.getElementsByTagName("meta");
    if (metas[key]) {
      metas[key].content = value;
    } else {
      let oMeta = document.createElement("meta");
      oMeta.name = key;
      oMeta.content = value;
      document.getElementsByTagName("head")[0].appendChild(oMeta);
    }
  }
}

export function urlHideHttp(url) {
  return url.replace(/^https?\:\/\//i, "");
}
