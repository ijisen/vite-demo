import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n, { elementPlusMessages } from "./plugins/i18n";
import { useElementPlus } from "./plugins/element-plus";
import store from '/@/config/store';
// 自定义样式文件引入
import './styles/index.scss'

// @ts-ignore
const app = createApp(App)
app.use(store);
app.use(router);
app.use(i18n);
app.use(useElementPlus);
app.mount('#app')
