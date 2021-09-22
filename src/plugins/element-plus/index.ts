import { App, Component } from "vue";
import "./element-variables.scss";
import {
  ElButton,
  ElLoading,
  ElDatePicker,
} from "element-plus";
import { elementPlusMessages } from '/@/plugins/i18n'

const components = [
  ElButton,
  ElLoading,
  ElDatePicker
];

const plugins = [ElLoading];

export function useElementPlus(app: App) {
  app.config.globalProperties.$ELEMENT = {
    size: 'small',
  }
  components.forEach((component: Component) => {
    const { name } = component;
    name && app.component(name, component);
    /*app.use(component, {
      locale: elementPlusMessages[defaultLang],
    })*/
  });
  plugins.forEach(plugin => {
    app.use(plugin);
  });
}
