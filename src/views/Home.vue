<template>
  <div class="home" id="main">
    <a-affix :offset-top="10" @change="change" :style="calendarStyle">
      <a-calendar :fullscreen="false" @panelChange="onPanelChange" :style="{backgroundColor: 'floralwhite', opacity: .8}" />
    </a-affix>
    <Index></Index>
    <a-back-top></a-back-top>
  </div>
</template>

<script>
import Index from "./index/index.vue";
export default {
  name: "Home",
  data() {
    return {
      calendarStyle: {
        position: "absolute",
        top: "80px",
        right: "20px",
      },
    };
  },
  components: {
    Index,
  },
  methods: {
    change(e) {
      console.log(e);
    },
    onPanelChange (e) {
      console.log(e)
    }
  },
};
</script>
<style scoped>
.home {
  background-color: black;
  opacity: 0.8;
}
</style>
