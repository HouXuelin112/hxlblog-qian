<template>
  <div class="menu">
    <a-affix :offset-top="10">
      <a-button @click="openMenu" type="circle">
        <a-icon type="menu-unfold" />
      </a-button>
    </a-affix>
    <a-drawer
      title="导航"
      :placement="placement"
      :closable="false"
      :visible="visible"
      @close="onClose"
    >
      <a-menu @click="handleClick">
        <a-menu-item v-for="item in menuItems" :key="item.key">
          <a-icon :type="item.icon" />
          {{ item.displayExpr }}
        </a-menu-item>
      </a-menu>
    </a-drawer>
  </div>
</template>
<script>
export default {
  props: {
    menuItems: {
      type: Array,
      default: () => [],
    },
    placement: {
      type: String,
      default: "left"
    }
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    openMenu() {
      this.visible = true;
    },
    handleClick(e) {
      this.visible = false;
      this.$emit("menuSelected", e);
    },
  },
};
</script>
<style scoped>
.menu {
  position: absolute;
}
</style>
