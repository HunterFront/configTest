<template>
  <div id="app">
    vue app of mine112333wew testfdf ggg
    <comp />
    <comp2 />
  </div>
</template>

<script>
import comp from './component.vue';
import comp2 from './comp2.ts';
export default {
  name: 'App',
  components: {
    comp,
    comp2
  }
};
</script>
