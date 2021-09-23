<template>
  <el-config-provider :locale="locales">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { ElConfigProvider } from 'element-plus'
  import { elementPlusMessages } from '/@/plugins/i18n'
  import { useI18n } from "vue-i18n";
  import { useStore } from 'vuex';
  import { StateType as GlobalStateType } from '/@/store/global';

  export default defineComponent({
    name: 'App',
    components: {
      ElConfigProvider,
    },
    computed: {},
    setup() {
      const { locale } = useI18n();
      const store = useStore<{
        global: GlobalStateType;
      }>();
      console.log(locale.value)
      console.log(store.state.global.lang)
      console.log(222)
      // element-ui 国际化切换
      const locales = computed<string>(() => elementPlusMessages[store.state.global.lang]);

      return {
        locales,
      }
    },
  })
</script>
