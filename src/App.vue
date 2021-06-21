<template>
  <Web />
</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import Web from "./components/WebLayout.vue";
import VModal from "vue-js-modal";

Vue.use(VModal);

@Component({
  components: {
    HelloWorld,
    Web
  },
  methods: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
})
export default class App extends Vue {}
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
