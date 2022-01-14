<script>
export default {
  data() {
    return {
      message: 'jsx!'
    };
  },
  render() {
    const inputAttrs = {
      type: 'email',
      placeholder: 'Enter your email jsx'
    };

    return (
      <div
        {...{
          attrs: inputAttrs,
          domProps: {
            innerHTML: 'baz'
          }
        }}
      ></div>
    );
  }
};
</script>

<style></style>
