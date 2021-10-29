import Base from './base.js';
import Page1 from './page1.vue';

new Base.Vue({
  el: '#page1',
  components: { Page1 },
  template: '<Page1/>'
});
