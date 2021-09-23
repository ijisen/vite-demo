import { LocaleMessages, VueMessageType } from 'vue-i18n'

// window.localStorage 存储key
export const localeKey = 'locale';

// 默认语言  zh-CN || en-US
export const defaultLang = 'zh-CN';

/**
 * 验证语言命名规则 zh-CN
 * @returns boolen
 * @author jisen
 */
export const localeNameExp = (lang: string): boolean => {
  const localeExp = new RegExp(`^([a-z]{2})-?([A-Z]{2})?$`);
  return localeExp.test(lang);
}

/**
 * 设置 html lang 属性值
 * @param lang 语言的 key
 * @author jisen
 */
export const setHtmlLang = (lang: string) => {
  /**
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html')?.setAttribute('lang', lang);
}

/**
 * 获取当前选择的语言
 * 获取的浏览器语言默认项目中有可能不支持，所以在config/i18n.ts中要加以判断
 * @returns string
 * @author jisen
 */
export const getLocale = (): string => {
  const lang = typeof window.localStorage !== 'undefined' ? window.localStorage.getItem(localeKey) : '';
  const isNavigatorLanguageValid = typeof navigator !== 'undefined' && typeof navigator.language === 'string';
  const browserLang = isNavigatorLanguageValid ? navigator.language.split('-').join('-') : '';
  return lang || browserLang || defaultLang;
};

/**
 * 切换语言
 * @author jisen
 * @param lang 语言的 key
 * @param realReload 是否刷新页面，默认刷新
 * @param callback
 */
export const setLocale = (lang: string, realReload = true, callback?: Function) => {

  if(lang !== undefined && !localeNameExp(lang)) {
    // for reset when lang === undefined
    throw new Error('setLocale lang format error');
  }
  if(getLocale() !== lang) {
    if(typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem(localeKey, lang || '');
    }

    if(realReload) {
      window.location.reload();
    } else {
      setHtmlLang(lang);

      if(typeof callback === 'function') {
        callback();
      }
    }

  }
};
// 菜单国际化配置
// vxe-table组件国际化

// element-plus国际化
// import enLocale from "element-plus/lib/locale/lang/en";
// import zhLocale from "element-plus/lib/locale/lang/zh-cn";

// 配置
// export const xxxx = {
//   zh: {
//     message: {},
//   },
//   en: {
//     message: {},
//   },
// };


// vite
// const modulesFiles = import.meta.globEager("/src/views/**/locales/*.ts");
// const modulesFiles = import.meta.globEager("/src/views/**/locales/*.ts");


/**
 * 自动导入 框架自定义语言
 * @author jisen
 */
export function importAllLocales(): LocaleMessages<VueMessageType> {
  const modules: LocaleMessages<VueMessageType> = {};
  const files: {
    [propName: string]: any;
  } = {
    // 导入 @/locales 下文件，不包含子目录
    // localesRequireContext:
    localesRequireContext: import.meta.globEager("/src/locales/*.ts"),
    // 导入 @/components 下文件，包含子目录
    // componentsRequireContext:
    componentsRequireContext: import.meta.globEager(
      "/src/components/**/locales/*.ts"
    ),
    // 导入 @/layouts 下文件，包含子目录
    // layoutsRequireContext
    layoutsRequireContext: import.meta.globEager("/src/layout/**/locales/*.ts"),
    // 导入 @/views 下文件，包含子目录
    // viewsRequireContext
    viewsRequireContext: import.meta.globEager("/src/pages/**/locales/*.ts")
  };
  for (const path in files) {
    const item = files[path];
    // console.log(path);
    // console.log(item);
    buildDemo(item);
  }

  function buildDemo(item: {
    [key: string]: any
  }) {
    // console.log(item)
    try {
      // const modulesFiles = import.meta.globEager(item);
      for (const path in item) {
        const modulesContent = item[path];
        // console.log(modulesContent);
        // console.log(modulesFiles[path]);
        // console.log(typeof modulesFiles[path]);
        // console.log(modulesFiles[path].default)
        if(modulesContent.default) {
          // 获取 PascalCase 命名
          const modulesName = path.replace(/(.*\/)*([^.]+).*/gi, "$2");

          if(modules[modulesName]) {
            modules[modulesName] = {
              ...modules[modulesName],
              ...modulesContent.default
            };
          } else {
            modules[modulesName] = modulesContent.default;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(modules)
  return modules
}
