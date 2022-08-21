<!--
 * @Author: 周东晨 mr_zhoudc@163.com
 * @Date: 2022-08-13 12:39:37
 * @LastEditors: 周东晨 mr_zhoudc@163.com
 * @LastEditTime: 2022-08-21 10:34:18
 * @FilePath: /code/vue3/src/views/Art.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="art-wrapper">
    <div class="title"></div>
    <div class="art-content">
      <div class="left">
        <img src="@/assets/img/index/fly-dragon.jpeg" />
      </div>
      <div class="right-wrapper">
        <div class="right">
          A silly idea would spark some flares and your unintentional creation
          ends up turning into a work of art.
          <br />
          <br />

          Everyone's Dumb creations deserve attention, and we'll select these
          creations on Twitter, in the future will give back to the entire
          community in the form of NFT auctions and physical art.
          <br /><br />
          If you're ready to make your creation (in any form), please tag us on
          Twitter!
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.art-wrapper {
  width: 100%;
  height: calc(100vh - 50px);
  background: #312525;
  padding: 117px 56px 0 122px;
  box-sizing: border-box;
  .title {
    width: 269px;
    height: 50px;
    background: url(~@/assets/img/index/text2.png) no-repeat center;
    background-size: contain;
  }
  .art-content {
    display: flex;
    margin-top: 37px;
    .left {
      width: 723px;
      height: 486px;
      text-align: center;
      div {
        font-weight: 400;
        font-size: 32px;
        line-height: 41px;
        color: rgba(255, 255, 255, 0.88);
        margin-top: 10px;
      }
      img {
        width: 100%;
      }
    }
    .right-wrapper {
      flex: 1;
    }
    .right {
      font-weight: 400;
      font-size: 24px;
      line-height: 31px;
      color: #ffffff;
      width: 454px;
      margin: 0 auto;
    }
  }
}
</style>
