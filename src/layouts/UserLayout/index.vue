<template>
  <section class="basicLayout">
    <Header />
    <div class="basicLayout-content">
      <router-view />
    </div>
    <Footer />
  </section>
</template>

<script lang="ts">
  /**
   ==============================================================
   * @Name: 登录页 布局组件
   * @Author: jisen
   * @Time: 2021-09-17
   * @Description：
   ============================================================== */
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "UserLayout"
  })
</script>

<style lang="scss" scoped>

</style>
