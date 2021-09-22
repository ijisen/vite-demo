<template>
  <h1>{{ msg }}</h1>


  <el-date-picker
      v-model="value"
      type="datetime"
      placeholder="选择日期时间">
  </el-date-picker>
  <el-button type="primary" @click="count++">count is: {{ count }}</el-button>
  <el-button type="primary" @click="toggleLang">切换语言</el-button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'
  import { elementPlusMessages } from "/@/plugins/i18n";
  import { useI18n } from "vue-i18n";
  import { setLocale } from "/@/plugins/i18n/config";

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
      let langs = ref(true);
      const { locale, t } = useI18n();
      const count = ref(0);
      const value = ref('');
      // 国际化语言切换
      const toggleLang = (): void => {
        langs.value = !langs.value;
        if(langs.value) {
          locale.value = "zh-CN";
        } else {
          locale.value = "en-US";
        }
        console.log(locale.value)
        setLocale(locale.value);
        // console.log(locale.value)
        // console.log(elementPlusMessages[locale])
        // elementLocale(elementPlusMessages[locale.value]);
      };
      return {
        count,
        value,
        langs,
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
