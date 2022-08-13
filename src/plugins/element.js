import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import localeEN from "element-plus/lib/locale/lang/en";

export default (app) => {
  app.use(ElementPlus, { locale: localeEN });
};
