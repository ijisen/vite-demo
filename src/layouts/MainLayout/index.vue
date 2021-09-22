<template>
  <div class="main-wrapper">
    <div class="menu-bar">
      菜单组件框
    </div>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
  /**
   ==============================================================
   * @Name: BasicLayout 内容布局组件
   * @Author: jisen
   * @Time: 2021-09-17
   * @Description：
   ============================================================== */
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "BasicLayout"
  })
</script>

<style lang="scss" scoped>
  .main-wrapper {
    display: flex;
    width: 100%;
    height: 100%;

    .menu-bar {
      background-color: #5daf34;
      flex: 0 0 200px;
    }

    .main-content {
      flex: 1 1 auto;
      background-color: #f0c78a;
    }
  }
</style>
