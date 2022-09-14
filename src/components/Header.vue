<!--
 * @Author: 周东晨 mr_zhoudc@163.com
 * @Date: 2022-07-29 15:47:29
 * @LastEditors: 周东晨 mr_zhoudc@163.com
 * @LastEditTime: 2022-09-14 17:08:45
 * @FilePath: /code/vue3/src/components/Header.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="dumb-header">
    <div class="dumb-header-content">
      <div class="left pointer" @click="jumpPage('/index')">
        <div class="avator"></div>
        <div class="logo"></div>
      </div>
      <div class="center">
        <div class="text1 pointer" @click="scroll"></div>
        <div class="text2 pointer" @click="jumpPage('/art')"></div>
        <div class="text3 pointer" @click="jumpPage('/experments')"></div>
      </div>
      <div class="right">
        <div class="icon1"></div>
        <div class="icon2"></div>
        <div class="connect" @click="connect"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.dumb-header {
  width: 100%;
  height: 80px;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &-content {
    padding: 0 25px;
    height: 100%;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    .left,
    .center,
    .right {
      display: flex;
      align-items: center;
    }
    .center {
      margin-left: 140px;
    }

    .avator {
      width: 56px;
      height: 56px;
      background: url(~@/assets/img/index/dragon.png) no-repeat center;
      background-size: cover;
    }
    .logo {
      width: 297px;
      height: 50px;
      background: url(~@/assets/img/index/logo.png) no-repeat center;
      background-size: cover;
      margin-left: 13px;
    }
    .text1 {
      width: 124px;
      height: 22px;
      background: url(~@/assets/img/index/text1.png) no-repeat center;
      background-size: cover;
    }
    .text2 {
      width: 119px;
      height: 22px;
      background: url(~@/assets/img/index/text2.png) no-repeat center;
      background-size: cover;
      margin-left: 46px;
    }
    .text3 {
      width: 138px;
      height: 25px;
      margin-top: 6px;
      background: url(~@/assets/img/index/text3.png) no-repeat center;
      background-size: cover;
      margin-left: 41px;
    }
    .icon1 {
      width: 33px;
      height: 30px;
      background: url(~@/assets/img/index/icon1.png) no-repeat center;
      background-size: cover;
    }
    .icon2 {
      width: 33px;
      height: 30px;
      background: url(~@/assets/img/index/icon2.png) no-repeat center;
      background-size: cover;
      margin-left: 32px;
    }
    .connect {
      width: 150px;
      height: 50px;
      background: url(~@/assets/img/index/connect.png) no-repeat center;
      background-size: cover;
      margin-left: 31px;
      cursor: pointer;
    }
  }
}
</style>
<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup(props, { emit }) {
    const router = useRouter();
    const jumpPage = (url) => {
      router.push(url);
    };
    const scroll = () => {
      emit("toLab");
    };
    const connect = () => {
      let ethereum = window.ethereum;
      ethereum.request({ method: "eth_requestAccounts" });
    };
    return {
      connect,
      jumpPage,
      scroll,
    };
  },
});
</script>
