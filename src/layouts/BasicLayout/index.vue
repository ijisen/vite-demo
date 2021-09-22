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
   * @Name: BasicLayout 内容布局组件
   * @Author: jisen
   * @Time: 2021-09-17
   * @Description：
   ============================================================== */
  import { defineComponent } from "vue";
  import Header from '/@/components/LayoutHeader/index.vue'
  import Footer from '/@/components/LayoutFooter/index.vue'
  import { storageSession } from '/@/utils/storage.ts'

  export default defineComponent({
    name: "BasicLayout",
    components: {
      Header,
      Footer
    },
    beforeMount() {
      // this.$router.replace('/login')
      console.log(storageSession.getItem('login'))
      console.log('beforeMount')
    },
    beforeUpdate() {
      console.log('beforeUpdate')
    }
  })
</script>
