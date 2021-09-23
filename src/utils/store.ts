/**
 * Store utils
 * @author jisen
 */
import { Module, ModuleTree } from 'vuex';

/**
 * 自定义项目 Store Module 类型
 * 为自动导入的 store 做类型限制
 * [@/store文件夹下定义的 store]与[@/views文件夹下定义的`文件store.ts`] 必须继承此类型
 */
export interface StoreModuleType<S> extends Module<S, S> {
  namespaced: true;
  name: string;
}

/**
 * 自动导入 Store
 * @author jisen
 */
export function importAllStore<S>(): ModuleTree<S> {
  const modules: ModuleTree<S> = {};
  const files: {
    [propName: string]: any;
  } = {
    // 导入 @/locales 下文件，不包含子目录
    // localesRequireContext:
    localesRequireContext: import.meta.globEager("/src/store/*.ts"),
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
          // const modulesName = path.replace(/(.*\/)*([^.]+).*/gi, "$2");
          const { name, ...module } = modulesContent.default;
          const modulesName = name || path.replace(/^\.\/(.*)\.\w+$/, "$1");

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

  return modules;
}
