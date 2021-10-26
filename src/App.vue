<template>
  <div id="app">
    vue app of mine112333wew testfdf ggg mmmff aaa bbb ccc gggg ds hunter
    <comp />
    <comp2 />
  </div>
</template>

<script>
import comp from './component.vue';
import comp2 from './comp2.ts';
import { util1, util2 } from './utils.js';
export default {
  name: 'App',
  created() {
    if (process.env.NODE_ENV == 'production') {
      throw new Error('production');
    } else {
      throw new Error(testDefine.a);
    }
    util2();
  },
  components: {
    comp,
    comp2
  }
};
console.log('bbbb app');
</script>
