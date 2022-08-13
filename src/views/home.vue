<!--
 * @Author: 周东晨 mr_zhoudc@163.com
 * @Date: 2022-07-26 09:42:50
 * @LastEditors: 周东晨 mr_zhoudc@163.com
 * @LastEditTime: 2022-08-13 13:34:47
 * @FilePath: /code/vue3/src/views/home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="about">
    <v-header @toLab="toLab" />
    <div class="content-box">
      <div class="content" id="content">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive>
              <component ref="index" :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
    <vFooter />
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import vHeader from "@/components/Header";
import vFooter from "@/components/Footer";
export default defineComponent({
  setup() {
    const index = ref(null);
    const router = useRouter();
    const toLab = () => {
      if (index.value.toScroll) {
        index.value.toScroll();
      } else {
        router.push("/index?lab=true");
      }
    };
    return {
      index,
      toLab,
    };
  },
  components: {
    vHeader,
    vFooter,
  },
});
</script>
<style scoped>
.about {
  width: 100%;
  height: 100%;
  background: #f8f8fa;
}
</style>
