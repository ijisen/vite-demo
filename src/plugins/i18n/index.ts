// 多组件库的国际化和本地项目国际化兼容
import { createI18n } from "vue-i18n";
import elementEn from 'element-plus/es/locale/lang/en';
import elementZhCn from 'element-plus/es/locale/lang/zh-cn'
import {
  defaultLang,
  importAllLocales,
} from "./config";

export const elementPlusMessages: { [key: string]: any } = {
  'zh-CN': elementZhCn,
  'en-US': elementEn,
}

const i18n = createI18n({
  locale: defaultLang, // set locale zh-CN
  fallbackLocale: defaultLang, // set fallback locale en-US
  messages: importAllLocales()
});


export default i18n;
