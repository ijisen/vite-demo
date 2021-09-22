<template>
  <div>
    <h1>{{ $t('menu.home') }}</h1>
    <h1>Home</h1>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import HelloWorld from "/@/components/HelloWorld/index.vue"

  export default defineComponent({
    name: "Home",
    components: {
      HelloWorld
    }
  })
</script>
