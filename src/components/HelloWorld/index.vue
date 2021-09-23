<template>
  <h1>{{ msg }}</h1>


  <el-date-picker
      v-model="value"
      type="datetime"
      placeholder="选择日期时间">
  </el-date-picker>
  <el-button type="primary" @click="count++">count is: {{ count }}</el-button>
  <el-button type="primary" @click="toggleLang">切换语言</el-button>
  <h1>{{ locale }}</h1>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'
  import { useStore } from 'vuex';
  import { elementPlusMessages } from "/@/plugins/i18n";
  import { useI18n } from "vue-i18n";
  import { setLocale } from "/@/plugins/i18n/config";
  import { StateType as GlobalStateType } from '/@/store/global';
  import fa from "element-plus/packages/locale/lang/fa";

  export default defineComponent({
    name: 'HelloWorld',
    props: {
      msg: {
        type: String,
        required: false,
        default: 'HelloWorld'
      }
    },
    setup: (props, ctx) => {
      const { locale, t } = useI18n();
      const count = ref(0);
      const value = ref('');
      const store = useStore<{
        global: GlobalStateType;
      }>();
      // 国际化语言切换
      const toggleLang = (): void => {
        // 切换 i18n 数据
        if(locale.value === "zh-CN") {
          locale.value = "en-US";
        } else {
          locale.value = "zh-CN";
        }
        // 修改 store 数据
        store && store.commit('global/changeLanguage', locale.value);
        setLocale(locale.value, false);
        // console.log(locale.value)
        // console.log(elementPlusMessages[locale])
        // elementLocale(elementPlusMessages[locale.value]);
      };
      return {
        count,
        value,
        locale: locale as unknown as string,
        toggleLang
      }
    },
  })
</script>

<style scoped>
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
</style>
