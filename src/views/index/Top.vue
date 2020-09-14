<template>
  <div class="index-top">
    <a-space align="center">
      <div class="wrapper">
        <a-button
          type="primary"
          size="large"
          :loading="iconLoading"
          @click="onEnter"
          >{{ enter }}<a-icon type="double-right"
        /></a-button>
        <p>{{ poem }}</p>
      </div>
      <span class="span"></span>
    </a-space>
  </div>
</template>
<script>
export default {
  data() {
    return {
      enter: "进入博客",
      poem: "这里本该是一段中二的励志诗句",
      iconLoading: false,
    };
  },
  methods: {
    onEnter() {
      this.iconLoading = true;
      const t = setTimeout(() => {
        this.$router.push({path: "/blog/display", query: {key: 1}})
        clearTimeout(t)
      }, 1000)
    },
  },
};
</script>
<style scoped lang="scss">
.index-top {
  width: 90%;
  height: 100vh;
  margin: 0 auto;
  text-align: center;
  .span {
    height: 100vh;
    display: inline-block;
  }
  .wrapper {
    display: inline-block;
  }
}
</style>
