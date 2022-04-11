<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <h1>hola</h1>
    <label>{{ t('hola') }}</label>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "../components/HelloWorld.vue";
import { useI18n } from 'vue-i18n'

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  setup(){
    const { locale, t } = useI18n({
      inheritLocale: true
    })

    return { locale, t }
  }
};
</script>
