<template>
  <div id="page1">
    page1
    <div v-on:click="show">click here</div>
  </div>
</template>

<script>
export default {
  name: 'page1',
  methods: {
    show() {
      console.log('show in page1')
      // 当按钮被点击后才去加载 show.js 文件，文件加载成功后执行文件导出的函数
      import(/* webpackChunkName: "show" */ './show.js').then(({show}) => {
        show('Webpack');
      });
    }
  }
};
</script>
