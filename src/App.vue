<template>
  <div id="app">
    vue app of mine
    <comp />
  </div>
</template>

<script>
import comp from './component.vue';
export default {
  name: 'App',
  components: {
    comp
  }
};
</script>
