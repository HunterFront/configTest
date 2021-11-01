import Base from './base.js';
import Index from './index.vue';

import Foo from './components/Foo.vue';

const router = new Base.Router({
  routes: [
    { path: '/foo', component: Foo },
    {
      path: '/bar',
      component: () =>
        import(/* webpackChunkName: "lazyIndex" */ './components/Bar.vue')
    }
  ]
});

new Base.Vue({
  el: '#index',
  components: { Index },
  template: '<Index/>',
  router
});
