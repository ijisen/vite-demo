<template>
  <el-config-provider :locale="locale">
    <h1> {{ value }}</h1>
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { ElConfigProvider } from 'element-plus'
  import { elementPlusMessages } from '/@/plugins/i18n'
  import { useI18n } from "vue-i18n";

  export default defineComponent({
    name: 'App',
    components: {
      ElConfigProvider,
    },
    setup() {
      const { locale } = useI18n();
      console.log(locale)
      return {
        value: locale.value,
        locale: elementPlusMessages[locale.value],
      }
    },
  })
</script>
