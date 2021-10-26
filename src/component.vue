<template>
  <div class="comp">
    my component haha change fdf dfdfdfdf gfgfgf ss wu comp
  </div>
</template>
<script>
import axios from 'axios';
import Promise from 'core-js/features/promise';
export default {
  name: 'comp',
  created() {
    const a = 1;
    console.log('aaaaa');
    console.log(a);
    this.testComp();
    this.fetch();
    this.fetchPost();
    console.log('promise11');
    console.log(new Promise(() => {}));
  },
  methods: {
    testComp() {
      console.log('my comp');
    },
    fetch() {
      axios
        .get('/user')
        .then(function (response) {
          console.log('response');
          console.log(response);
        })
        .catch(function (error) {
          console.log('error');
          console.log(error);
        });
    },
    fetchPost() {
      axios
        .get('/post')
        .then((res) => {
          console.log('res');
          console.log(res);
        })
        .catch((err) => {
          console.log('err');
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.comp {
  color: blue;
}
</style>
