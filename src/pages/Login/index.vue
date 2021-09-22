<template>
  <main class="page-login">
    <section>111111</section>
    <aside>12324</aside>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "Login"
  })
</script>

<style lang="scss" scoped>
  .page-login {
    display: flex;
    width: 100%;
    height: 100%;
    section {
      flex: 0 0 300px
    }
    aside {
      flex: 0 0 400px;
    }
  }
</style>
