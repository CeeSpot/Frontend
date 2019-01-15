<!-- —————————————↓SCSS—————————————————————— -->
<style>
.alink {
  color: black;
}
</style>

<!-- —————————————↓HTML—————————————————————— -->
<template>
  <a class="alink" :href="to" target="_blank">
    <slot></slot>
  </a>
</template>

<!-- ——————————————↓JS——————————————————————— -->
<script>
//import XXX from './components/XXX'

export default {
  name: "alink",
  props: ["to"],
  data() {
    return {
      msg: "this is from alink.vue"
    };
  },
  methods: {}
};
</script>
