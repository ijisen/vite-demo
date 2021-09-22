<template>
  <div>
    <h1>{{ $t('menu.about') }}</h1>
    <p>{{ $t('page.about.msg') }}</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "About"
  })
</script>
