<template>
  <div class="index-bottom">
    <a-button
      class="btn"
      size="large"
      type="primary"
      :ghost="ghost.flink"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="onClick('flink')"
    >
      <a-icon type="double-left" />友情链接
    </a-button>
    <a-button
      class="btn"
      size="large"
      type="primary"
      :ghost="ghost.about"
      @click="onClick('about')"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      关于<a-icon type="double-right" />
    </a-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ghost: {
        flink: true,
        about: true,
      },
    };
  },
  methods: {
    onClick (target) {
      if (target === 'flink') {
        this.$router.push({path: "/flink", query: {key: 4}})
      } else {
        this.$router.push({path: "/about", query: {key: 5}})
      }
    },
    onMouseEnter(e) {
      if (e.toElement.innerText === "友情链接") {
        this.ghost.flink = false;
      } else {
        this.ghost.about = false;
      }
    },
    onMouseLeave(e) {
      if (e.fromElement.innerText === "友情链接") {
        this.ghost.flink = true;
      } else {
        this.ghost.about = true;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.index-bottom {
  text-align: center;
  padding: 10px 0;
  .btn {
    width: 20%;
    margin: 10px;
  }
}
</style>
