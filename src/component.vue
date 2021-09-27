<template>
  <div class="comp">my component haha change fdf</div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'comp',
  created() {
    this.testComp();
    this.fetch();
    this.fetchPost();
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
  color: yellow;
}
</style>
