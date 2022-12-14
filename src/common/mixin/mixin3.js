import { useRouter, useRoute } from "vue-router"; // 跟2.0中的this.$router和this.$route的相对应
import { useI18n } from "vue-i18n";

export default function () {
  // setup() {
  const router = useRouter(); // vue3.0已去掉this.$router
  const { t } = useI18n();
  const $t = (text) => {
    return t(text);
  };
  // 3.0已经去掉this.$router等属性，模拟一个能在3.0中使用的push方法
  const $push = (to) => {
    router.push(to);
  };

  return {
    $push,
    $t,
  };
  // }
}
