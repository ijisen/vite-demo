import { Mutation/* , Action */ } from 'vuex';
import { StoreModuleType } from "/@/utils/store";
import settings from '/@/config/settings';
import { defaultLang } from "/@/plugins/i18n/config"
import i18n from "/@/plugins/i18n";

export interface StateType {
  // 左侧展开收起
  collapsed: boolean;
  // 顶部菜单开启
  topNavEnable: boolean;
  // 国际化语言
  lang: string
}

export interface ModuleType extends StoreModuleType<StateType> {
  state: StateType;
  mutations: {
    changeLanguage: Mutation<StateType>;
    changeLayoutCollapsed: Mutation<StateType>;
    setTopNavEnable: Mutation<StateType>;
  };
  actions: {};
}

const initState: StateType = {
  collapsed: false,
  topNavEnable: settings.topNavEnable,
  lang: i18n.global.locale || defaultLang
};

const StoreModel: ModuleType = {
  namespaced: true,
  name: 'global',
  state: {
    ...initState
  },
  mutations: {
    // 语言包切换
    changeLanguage(state, payload) {
      console.log(payload)
      state.lang = payload;
    },
    changeLayoutCollapsed(state, payload) {
      state.collapsed = payload;
    },
    setTopNavEnable(state, payload) {
      state.topNavEnable = payload;
    }
  },
  actions: {}
}


export default StoreModel;
